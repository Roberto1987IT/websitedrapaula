# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.http import HttpResponse
from users import views as user_views

def home(request):
    return HttpResponse("Welcome to the API!")

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Authentication Endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User Registration Endpoint
    path('api/auth/register/', user_views.RegisterView.as_view(), name='register'),
    
    # User Profile Endpoints
    path('api/users/', include('users.urls')),
    path('api/v1/', include('users.urls')),
    
    # Home
    path('', home, name='home'),
]