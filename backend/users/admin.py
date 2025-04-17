from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext_lazy as _
from .models import CustomUser, BusinessUser, NoteToken, UserProfile
from django import forms

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = '__all__'

class CustomUserCreationForm(UserCreationForm):
    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput,
        help_text=_("Enter the same password as above, for verification.")
    )
    
    class Meta:
        model = CustomUser
        fields = ('email', 'full_name')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(_("Passwords don't match"))
        return password2

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    
    list_display = (
        'email',
        'full_name',
        'is_active',
        'is_staff',
        'is_verified',
        'date_joined',
        'last_login'
    )
    
    search_fields = ('email', 'full_name', 'phone')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined', 'last_login')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
            'fields': (
                'full_name',
                'phone',
                'birthday',
                'gender',
                'country',
                'accept_terms'
            )
        }),
        (_('Status'), {
            'fields': (
                'is_verified',
                'is_active',
            )
        }),
        (_('Permissions'), {
            'fields': (
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions'
            ),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'full_name',
                'password1',
                'password2',
                'accept_terms',
                'is_active',
                'is_staff'
            ),
        }),
    )
    
    list_filter = (
        'is_active',
        'is_staff',
        'is_superuser',
        'is_verified',
        'gender',
        'country',
        'date_joined'
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if 'password' in form.base_fields:
            form.base_fields['password'].help_text = _(
                "Raw passwords are not stored, so there is no way to see this "
                "user's password, but you can change the password using "
                "<a href=\"../password/\">this form</a>."
            )
        return form

@admin.register(BusinessUser)
class BusinessUserAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'company_name',
        'tax_id',
        'is_active',
        'is_verified',
        'date_joined'
    )
    search_fields = ('email', 'company_name', 'tax_id', 'full_name')
    list_filter = ('is_active', 'is_verified', 'company_size', 'date_joined')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined', 'last_login')
    
    fieldsets = (
        (None, {'fields': ('email',)}),
        (_('Company Info'), {
            'fields': (
                'company_name',
                'tax_id',
                'company_website',
                'company_size'
            )
        }),
        (_('Personal Info'), {
            'fields': (
                'full_name',
                'phone',
                'birthday',
                'gender',
                'country',
                'accept_terms'
            )
        }),
        (_('Status'), {
            'fields': (
                'is_verified',
                'is_active',
            )
        }),
        (_('Permissions'), {
            'fields': (
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions'
            ),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'language', 'timezone', 'created_at')
    search_fields = ('user__email', 'user__full_name', 'bio')
    list_filter = ('language', 'timezone')
    raw_id_fields = ('user',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        (None, {
            'fields': ('user',)
        }),
        (_('Profile Info'), {
            'fields': (
                'bio',
                'website',
                'avatar'
            )
        }),
        (_('Preferences'), {
            'fields': (
                'language',
                'timezone'
            )
        }),
        (_('Metadata'), {
            'fields': (
                'created_at',
                'updated_at'
            ),
            'classes': ('collapse',)
        }),
    )
    
    def created_at(self, obj):
        return obj.user.date_joined
    created_at.short_description = _('Created at')
    
    def updated_at(self, obj):
        return obj.user.date_updated
    updated_at.short_description = _('Updated at')

@admin.register(NoteToken)
class NoteTokenAdmin(admin.ModelAdmin):
    list_display = (
        'description',
        'owner',
        'token',
        'is_active',
        'created_at',
        'expires_at'
    )
    list_filter = ('is_active', 'created_at')
    search_fields = ('description', 'owner__email', 'token')
    raw_id_fields = ('owner',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at',)
    
    fieldsets = (
        (None, {
            'fields': (
                'owner',
                'description',
                'token'
            )
        }),
        (_('Status'), {
            'fields': (
                'is_active',
                'expires_at'
            )
        }),
        (_('Metadata'), {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )