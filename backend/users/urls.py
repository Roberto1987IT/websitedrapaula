from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import (
    current_user,
    logout,
    RegisterView,
    UserProfileView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    user_profile
)

app_name = 'users'

urlpatterns = [
    # Authentication endpoints
    path('auth/token/', TokenObtainPairView.as_view(), name='token-obtain'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token-verify'),
    
    # User endpoints
    path('api/users/me/', current_user, name='current-user'),
    path('api/users/register/', RegisterView.as_view(), name='register'),
    path('api/users/profile/', UserProfileView.as_view(), name='profile'),
    path('api/auth/logout/', logout, name='logout'),
    
    # Password reset endpoints
    path('api/password/reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('api/password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]