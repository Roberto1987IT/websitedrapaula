# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse
from django.urls import path, include

# View imports
from api import views

def home(request):
    return HttpResponse("Welcome to the API!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include api app's URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Token obtain endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint
    path('users/', include('users.urls')),  # Include the users app's URL configuration
    path('', home),
]
