from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views
from .views import *
from rest_framework_simplejwt.views import  TokenVerifyView

app_name = 'users'

urlpatterns = [
    path('users/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('users/token/verify/', TokenVerifyView().as_view(), name="token_verify"),
    path('users/notes/', get_notes, name='get_notes'),
    path('users/logout/', logout, name = 'logout'),
    path('users/is_authenticated/', is_authenticated, name="is_authenticated"),
    path('users/signup/', RegisterView.as_view(), name='user_register'),
    path('users/profile/', UserProfileView.as_view(), name='user_profile'),

    path('users/password_change/', auth_views.PasswordChangeView.as_view(success_url='/users/password_change/done/'), name='password_change'),
    path('users/password_change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),

    # PASSWORD RESET
    path('users/password-reset/',
        auth_views.PasswordResetView.as_view(
            template_name="users/password_reset_form.html",
            email_template_name="users/password_reset_email.html",
            success_url=reverse_lazy("users:password_reset_done")
        ),
        name='password_reset'
    ),

    path('users/password-reset/done/',
        auth_views.PasswordResetDoneView.as_view(
            template_name="users/password_reset_done.html"
        ),
        name='password_reset_done'),

    path('users/password-reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name="users/password_reset_confirm.html",
        success_url=reverse_lazy("users:password_reset_complete")
        ),
         name='password_reset_confirm'
    ),

    path('users/password-reset/complete/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name="users/password_reset_complete.html"
        ),
        name='password_reset_complete'),    

    path('users/activation_sended/', activation_sended, name='activation_sended'),
]
