from django.contrib import admin
from .models import CustomUser, BusinessUser, NoteToken



# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    model=CustomUser


    exclude = ['first_name', 'last_name', 'is_staff', 'is_superuser', 'groups', 'user_permissions']


    list_display =  [
            'email',
            'first_name',
            'last_name',
            'is_active',
            'date_joined'
        ]

class BusinessUserAdmin(admin.ModelAdmin):
    model=BusinessUser

    exclude = ['username','first_name', 'last_name', 'is_staff', 'is_superuser', 'groups', 'user_permissions']

    list_display =  [
            'email',
            'company_name',
            'billing_address',
            'is_active',
            'payment_method'
        ]


class NotesTokenAdmin(admin.ModelAdmin):
    model = NoteToken
    list_display =  [
            'description',
            'owner'
            ]


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(BusinessUser, BusinessUserAdmin)
admin.site.register(NoteToken, NotesTokenAdmin)