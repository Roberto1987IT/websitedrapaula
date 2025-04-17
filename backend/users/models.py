# users/models.py
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser, Group, Permission
from django_countries.fields import CountryField
from django.core.validators import RegexValidator
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of username.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    """
    Custom user model that extends Django's AbstractUser.
    Uses email as the primary identifier instead of username.
    """
    # Remove username field completely
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'phone']  # Added phone as required field
    objects = CustomUserManager()

    class Gender(models.TextChoices):
        MALE = "M", _("Male")
        FEMALE = "F", _("Female")
        OTHER = "O", _("Other")
        PREFER_NOT_TO_SAY = "PNS", _("Prefer not to say")
        UNSPECIFIED = "", _("Unspecified")

    # Core Fields
    email = models.EmailField(
        _("email address"),
        unique=True,
        blank=False,
        null=False,
        help_text=_("Required. Must be a valid email address."),
        # Add widget attributes if using Django forms
    )
    full_name = models.CharField(
        _("full name"),
        max_length=150,
        blank=False,
        null=False
    )
    phone = models.CharField(
        _("phone number"),
        max_length=20,
        blank=False,  # Changed to required
        null=False,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ],
        help_text=_("International format (e.g. +12125552368)"),
        # Add widget attributes if using Django forms
    )
    
    # Registration-specific fields
    accept_terms = models.BooleanField(
        _("terms accepted"),
        default=False,
        help_text=_("Designates whether the user accepted terms and conditions.")
    )
    terms_accepted_at = models.DateTimeField(
        _("terms accepted at"),
        null=True,
        blank=True,
        help_text=_("When the user accepted the terms and conditions.")
    )
    
    # Additional Fields
    birthday = models.DateField(
        _("birthday"),
        blank=True,
        null=True
    )
    gender = models.CharField(
        _("gender"),
        max_length=5,
        choices=Gender.choices,
        default=Gender.UNSPECIFIED,
        blank=True
    )
    country = CountryField(
        _("country"),
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_("Designates whether this user can log in.")
    )
    is_verified = models.BooleanField(
        _("verified"),
        default=False,
        help_text=_("Designates whether the user has verified their email.")
    )
    date_updated = models.DateTimeField(
        _("date updated"),
        auto_now=True
    )

    # Relationships
    groups = models.ManyToManyField(
        Group,
        verbose_name=_("groups"),
        blank=True,
        help_text=_("The groups this user belongs to."),
        related_name="customuser_groups",
        related_query_name="customuser"
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="customuser_permissions",
        related_query_name="customuser"
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ['-date_joined']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['is_active']),
            models.Index(fields=['accept_terms']),
        ]

    def __str__(self):
        return self.email

    def clean(self):
        """Normalize the email address and set terms accepted timestamp"""
        if self.email:
            self.email = self.email.lower()
        if self.accept_terms and not self.terms_accepted_at:
            self.terms_accepted_at = timezone.now()
        super().clean()

    def save(self, *args, **kwargs):
        """Ensure terms_accepted_at is set when accept_terms is True"""
        if self.accept_terms and not self.terms_accepted_at:
            self.terms_accepted_at = timezone.now()
        super().save(*args, **kwargs)

    @property
    def profile(self):
        """Easy access to user's profile"""
        if hasattr(self, 'userprofile'):
            return self.userprofile
        return None


class UserProfile(models.Model):
    """Extended profile information for users."""
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='userprofile',
        verbose_name=_("user")
    )
    bio = models.TextField(
        _("biography"),
        blank=True,
        null=True,
        max_length=500
    )
    website = models.URLField(
        _("website"),
        blank=True,
        null=True
    )
    language = models.CharField(
        _("preferred language"),
        max_length=10,
        default='en'
    )
    timezone = models.CharField(
        _("timezone"),
        max_length=50,
        default='UTC'
    )
    avatar = models.ImageField(
        _("avatar"),
        upload_to='avatars/',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")

    def __str__(self):
        return f"{self.user.email}'s Profile"


class BusinessUser(CustomUser):
    """Business account extending the base CustomUser model."""
    company_name = models.CharField(
        _("company name"),
        max_length=100,
        blank=False
    )
    tax_id = models.CharField(
        _("tax ID"),
        max_length=50,
        blank=True,
        null=True
    )
    company_website = models.URLField(
        _("company website"),
        blank=True,
        null=True
    )
    company_size = models.CharField(
        _("company size"),
        max_length=20,
        blank=True,
        null=True,
        choices=[
            ('1-10', '1-10 employees'),
            ('11-50', '11-50 employees'),
            ('51-200', '51-200 employees'),
            ('201-500', '201-500 employees'),
            ('501+', '501+ employees'),
        ]
    )

    class Meta:
        verbose_name = _("Business User")
        verbose_name_plural = _("Business Users")

    def __str__(self):
        return f"{self.company_name} ({self.email})"


class NoteToken(models.Model):
    """Token model for user notes."""
    description = models.CharField(
        _("description"),
        max_length=300
    )
    owner = models.ForeignKey(
        CustomUser,
        on_delete=models.PROTECT,  # Changed from CASCADE to PROTECT
        related_name="note_tokens"
    )
    token = models.CharField(
        _("token"),
        max_length=100,
        unique=True
    )
    is_active = models.BooleanField(
        _("active"),
        default=True
    )
    created_at = models.DateTimeField(auto_now_add=True)  # Ensure only auto_now_add is used
    expires_at = models.DateTimeField(
        _("expires at"),
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Note Token")
        verbose_name_plural = _("Note Tokens")
        ordering = ['-created_at']

    def __str__(self):
        return f"Token for {self.owner.email}"

# Removed invalid SQL statement. If needed, execute this SQL in a database management tool or via Django's database connection.