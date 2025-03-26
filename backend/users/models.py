from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser, Group, Permission
from django_countries import countries


class CustomUser(AbstractUser):
    '''
    SINGLE USER
    '''

    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",  # Add unique related_name
        blank=True
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions_set",  # Add unique related_name
        blank=True
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    class Gender(models.TextChoices):
        SELECT = "Select", "Select"
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"

    #todo gender subclas with 3 options(select, male, female)
    #todo descuss with team about avatar field. logical of storege(binar_code in DB or path to file)
    #todo add avatar field to DB, form and template
    #todo phone number validation
    is_active = models.BooleanField(_("Active"), default=False)
    email = models.EmailField(unique=True, max_length=256,  blank=False, null=False)
    password = models.CharField(_("Password"), max_length=256, blank=False, null=False)
    full_name = models.CharField(_("Full Name"), max_length=100, blank=False, null=False)
    phone =models.CharField(_("Phone Number"), blank=True, max_length=25 ,null=True)
    username = models.CharField(_("Username"), max_length=100, blank=True, null=True)
    birthday = models.DateField(_("Birthday"),default=None, blank=True, null=True)
    gender = models.CharField(_("Gender"), choices=Gender.choices, default=Gender.SELECT, max_length=10)
    country = models.CharField(_("Country"), choices=countries, max_length=100, blank=True, null=True)

    #avatar = models.ImageField(_("Avatar"), '''upload_to='avatars/',''' blank=True, null=True)

    def __str__(self):
        return self.full_name

class BuisnesUser(CustomUser):
    '''
    Buisnes account
    '''
    '''groups = models.ManyToManyField(
        Group,
        related_name="buisnesuser_set", # Add unique related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="buisnesuser_permissions_set",  # Add unique related_name
        blank=True
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
'''
    class Meta:
        verbose_name = "Companie"
        verbose_name_plural = "Companies"
    
    #email = models.EmailField(unique=True, blank=False, null=False)
    companie_name = models.CharField(_("Companie Name"), max_length=100, blank=False, null=False)
    billing_address = models.CharField(_("Billing Address"), max_length=100, blank=False, null=False)
    shipping_address = models.CharField(_("Shipping Address"), max_length=100, blank=False, null=False)
    payment_method = models.CharField(_("Payment Method"), max_length=100, blank=False, null=False)
    #phone =models.CharField(_("Phone Number"), max_length=25 , blank=True, null=True)
    

class NoteToken(models.Model):
    description=models.CharField(max_length=300)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="note_token")





