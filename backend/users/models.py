# users/models.py
from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser, Group, Permission
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

class CustomUser(AbstractUser):
    """
    Custom user model that extends Django's AbstractUser.
    Uses email as the primary identifier instead of username.
    """
    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",
        blank=True,
        verbose_name=_("groups"),
        help_text=_("The groups this user belongs to.")
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions_set",
        blank=True,
        verbose_name=_("user permissions"),
        help_text=_("Specific permissions for this user.")
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ['-date_joined']
    
    class Gender(models.TextChoices):
        SELECT = "SELECT", _("Select")
        MALE = "MALE", _("Male")
        FEMALE = "FEMALE", _("Female")
        OTHER = "OTHER", _("Other")
        PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY", _("Prefer not to say")

    # Core Fields
    email = models.EmailField(
        _("email address"),
        unique=True,
        blank=False,
        null=False,
        help_text=_("Required. Must be a valid email address.")
    )
    full_name = models.CharField(
        _("full name"),
        max_length=150,
        blank=False,
        null=False
    )
    phone = PhoneNumberField(
        _("phone number"),
        blank=True,
        null=True,
        help_text=_("International format preferred (e.g. +12125552368)")
    )
    
    # Additional Fields
    username = models.CharField(
        _("username"),
        max_length=100,
        blank=True,
        null=True,
        help_text=_("Optional. Not used for login.")
    )
    birthday = models.DateField(
        _("birthday"),
        blank=True,
        null=True
    )
    gender = models.CharField(
        _("gender"),
        max_length=20,
        choices=Gender.choices,
        default=Gender.SELECT
    )
    country = CountryField(
        _("country"),
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_("Designates whether this user should be treated as active.")
    )
    # avatar = models.ImageField(
    #     _("avatar"),
    #     upload_to='avatars/',
    #     blank=True,
    #     null=True
    # )

    def __str__(self):
        return self.email or self.full_name

    @property
    def profile(self):
        """Easy access to user's profile"""
        return self.userprofile

class BusinessUser(CustomUser):
    """
    Business account extending the base CustomUser model.
    """
    class Meta:
        verbose_name = _("Company")
        verbose_name_plural = _("Companies")
        ordering = ['company_name']

    company_name = models.CharField(
        _("company name"),
        max_length=100,
        blank=False,
        null=False
    )
    billing_address = models.CharField(
        _("billing address"),
        max_length=200,
        blank=False,
        null=False
    )
    shipping_address = models.CharField(
        _("shipping address"),
        max_length=200,
        blank=False,
        null=False
    )
    payment_method = models.CharField(
        _("payment method"),
        max_length=100,
        blank=False,
        null=False
    )
    tax_id = models.CharField(
        _("tax ID"),
        max_length=50,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.company_name

class UserProfile(models.Model):
    """
    Extended profile information for users.
    """
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name=_("user")
    )
    age = models.PositiveIntegerField(
        _("age"),
        blank=True,
        null=True
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

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")

    def __str__(self):
        return f"{self.user.email}'s Profile"

class NoteToken(models.Model):
    """
    Token model for user notes.
    """
    description = models.CharField(
        _("description"),
        max_length=300,
        blank=False,
        null=False
    )
    owner = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="note_tokens",
        verbose_name=_("owner")
    )
    created_at = models.DateTimeField(
        _("created at"),
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _("updated at"),
        auto_now=True
    )
    is_active = models.BooleanField(
        _("active"),
        default=True
    )

    class Meta:
        verbose_name = _("Note Token")
        verbose_name_plural = _("Note Tokens")
        ordering = ['-created_at']

    def __str__(self):
        return f"Token for {self.owner.email}"