# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import home

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include api app's URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Token obtain endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint
    path('', home),
]