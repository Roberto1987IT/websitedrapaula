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
    PasswordResetConfirmView
)

app_name = 'users'

# Authentication URLs
auth_patterns = [
    path('token/', TokenObtainPairView.as_view(), name='token-obtain'),  # Correct endpoint for login
    path('login/', TokenObtainPairView.as_view(), name='login'),  # Alias for login
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
]

# User Management URLs
user_patterns = [
    path('me/', current_user, name='current-user'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),  # Include authentication URLs
    path('users/', include(user_patterns)),  # Include user management URLs
]