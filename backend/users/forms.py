import datetime
from django import forms
from .models import *
from django_recaptcha.fields import ReCaptchaField

class LoginForm(forms.Form):
    email = forms.EmailField(required=True, max_length=256)
    password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)


class RegisterFormUser(forms.ModelForm):
    class Meta:
        model = CustomUser  # Your custom user model
        fields = [
            'email', 
            'password', 
            'confirm_password',
            'full_name', 
            'phone', 
            'username', 
            'birthday', 
            'gender', 
            'country']

    class Gender(models.TextChoices):
        SELECT = "Select", "Select"
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"

    

    captcha = ReCaptchaField()
        
    email = forms.EmailField(required=True)
    password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)
    confirm_password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)
    full_name = forms.CharField(max_length=100, required=True)
    phone = forms.CharField(max_length=20, required=False)
    username=forms.CharField(max_length=100, required=False)

    birthday = forms.DateField(
        widget=forms.SelectDateWidget(
            empty_label=("Choose Year", "Choose Month", "Choose Day"),
            years=range(1950, datetime.date.today().year + 1)
        )
    )
    
    gender = forms.ChoiceField(
        choices = Gender.choices,
        required=False,
        initial=Gender.SELECT
        )
    
    country = forms.CharField(max_length=100, required=False)
        

class RegisterFormCompanie(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)
    confirm_password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)
    companie_name = forms.CharField(max_length=100, required=True)
    billing_address = forms.CharField(max_length=100, required=True)
    shipping_address = forms.CharField(max_length=20, required=False)
    payment_method = forms.CharField(max_length=100, required=False)
    phone = forms.CharField(max_length=20, required=False)
    captcha = ReCaptchaField()
    

class PasswordChangeForm(forms.Form):
    old_password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)
    new_password = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)
    new_password_confirm = forms.CharField(widget=forms.PasswordInput(), max_length=256, required=True)

class ProfileUserUpdateDataForm(forms.ModelForm):
    class Meta:
        model = CustomUser 
        fields = [
            'email',   
            'full_name',   
            'phone',   
            'username',   
            'birthday',   
            'gender',   
            'country',
            ]  
        
    birthday = forms.DateField(
        widget=forms.SelectDateWidget(
            empty_label=("Choose Year", "Choose Month", "Choose Day"),
            years=range(1950, datetime.date.today().year + 1)
        )
    )

    password = forms.CharField(
         widget=forms.PasswordInput(
             attrs={
                 'placeholder': 'Enter your password to confirm changes', 
                 'autocomplete': 'new-password'
                 }
            ),
        required=True,
    )


class ProfileBuisnesUpdateDataForm(forms.ModelForm):
    class Meta:
        model = BuisnesUser
        fields = [
            'email',   
            'companie_name',   
            'billing_address',   
            'shipping_address',   
            'payment_method',   
            'phone',   
            ]


class ConfirationApplyData(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['password']

    