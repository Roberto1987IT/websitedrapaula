from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import RegisterView, UserProfileView, DocumentList

urlpatterns = [
    # User Registration
    path('api/register/', RegisterView.as_view(), name='register'),
    
    # User Profile (Requires Authentication)
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),
    
    # Document Management
    path('api/documents/', DocumentList.as_view(), name='document-list'),
]

# Serve media files ONLY during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)