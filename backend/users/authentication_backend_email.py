from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()
class EmailAuthBackend(ModelBackend):
    """Authenticate using email instead of username."""
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None

        
class CockiesJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return None
        
        validated_token = self.get_validated_token(access_token)
        try:
            user = self.get_user(validated_token=validated_token)
        except:
            return None
        
        return (user, validated_token)