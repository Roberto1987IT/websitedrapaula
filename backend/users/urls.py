from django.urls import path, reverse_lazy, include
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenVerifyView
from .views import (
    CustomTokenObtainPairView,
    CustomRefreshTokenView,
    get_notes,
    logout,
    is_authenticated,
    RegisterView,
    UserProfileView,
    activation_sended,
    send_activate_link_by_email
)

app_name = 'users'

auth_urlpatterns = [
    # JWT Authentication
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # Session Authentication (if needed)
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', logout, name='logout'),
]

user_urlpatterns = [
    # User Management
    path('', UserProfileView.as_view(), name='current_user'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('is_authenticated/', is_authenticated, name='is_authenticated'),
    
    # Notes
    path('notes/', get_notes, name='notes'),
]

password_urlpatterns = [
    # Password Change
    path('change/', 
        auth_views.PasswordChangeView.as_view(
            template_name='users/password_change_form.html',
            success_url=reverse_lazy('users:password_change_done')
        ), 
        name='password_change'
    ),
    path('change/done/', 
        auth_views.PasswordChangeDoneView.as_view(
            template_name='users/password_change_done.html'
        ), 
        name='password_change_done'
    ),
    
    # Password Reset
    path('reset/', 
        auth_views.PasswordResetView.as_view(
            template_name='users/password_reset_form.html',
            email_template_name='users/password_reset_email.html',
            success_url=reverse_lazy('users:password_reset_done')
        ), 
        name='password_reset'
    ),
    path('reset/done/', 
        auth_views.PasswordResetDoneView.as_view(
            template_name='users/password_reset_done.html'
        ), 
        name='password_reset_done'
    ),
    path('reset/<uidb64>/<token>/', 
        auth_views.PasswordResetConfirmView.as_view(
            template_name='users/password_reset_confirm.html',
            success_url=reverse_lazy('users:password_reset_complete')
        ), 
        name='password_reset_confirm'
    ),
    path('reset/complete/', 
        auth_views.PasswordResetCompleteView.as_view(
            template_name='users/password_reset_complete.html'
        ), 
        name='password_reset_complete'
    ),
]

activation_urlpatterns = [
    path('activation/sent/', activation_sended, name='activation_sent'),
    path('activation/resend/', send_activate_link_by_email, name='resend_activation'),
    # Add your activation confirmation URL here if needed
]

urlpatterns = [
    # Authentication
    path('auth/', include(auth_urlpatterns)),
    
    # User endpoints
    path('', include(user_urlpatterns)),
    
    # Password management
    path('password/', include(password_urlpatterns)),
    
    # Activation
    path('activation/', include(activation_urlpatterns)),
    
    # Backward compatibility (keep your old URLs working)
    path('signup/', RegisterView.as_view(), name='user_register'),  # Legacy
]