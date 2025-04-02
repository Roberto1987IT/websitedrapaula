from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, LoginSerializer, CustomUserSerializer
from .models import CustomUser
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

def activation_sended(request):
    """Render activation sent confirmation page"""
    return render(request, 'users/activation/sent.html')  # Updated template path

def send_activate_link_by_email(user, request):
    """
    Send account activation email with secure token
    """
    current_site = get_current_site(request)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    activation_link = f"{getattr(settings, 'SITE_DOMAIN', 'http://localhost:8000')}{reverse('users:confirm', kwargs={'uidb64': uid, 'token': token})}"

    context = {
        'user': user,
        'domain': current_site.domain,
        'activation_link': activation_link
    }
    
    send_mail(
        subject="Activate Your Account",
        message=f"Click the link to activate your account: {activation_link}",
        from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@example.com'),
        recipient_list=[user.email],
        html_message=render_to_string('users/activation/email.html', context)  # Updated template path
    )

class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom JWT token obtain view with cookie support"""
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            res = Response({
                'success': True,
                'user': {
                    'id': response.data.get('user_id', None),
                    'email': request.user.email if request.user.is_authenticated else None
                }
            })
            res.set_cookie(
                key="access_token",
                value=tokens['access'],
                httponly=True,
                secure=not settings.DEBUG,
                samesite="Lax",
                path="/",
                max_age=3600  # 1 hour
            )
            res.set_cookie(
                key="refresh_token",
                value=tokens['refresh'],
                httponly=True,
                secure=not settings.DEBUG,
                samesite="Lax",
                path="/",
                max_age=86400  # 1 day
            )
            return res
        except Exception as e:
            logger.error(f"Token obtain error: {str(e)}")
            return Response(
                {'success': False, 'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class CustomTokenRefreshView(TokenRefreshView):
    """Custom JWT token refresh view"""
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token') or request.data.get('refresh')
            if not refresh_token:
                return Response(
                    {'refreshed': False, 'error': 'Refresh token missing'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            
            res = Response({'refreshed': True})
            res.set_cookie(
                key="access_token",
                value=response.data['access'],
                httponly=True,
                secure=not settings.DEBUG,
                samesite="Lax",
                path="/",
                max_age=3600  # 1 hour
            )
            return res
        except Exception as e:
            logger.error(f"Token refresh error: {str(e)}")
            return Response(
                {'refreshed': False, 'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Get current authenticated user data"""
    serializer = UserSerializer(request.user)
    return Response({
        'success': True,
        'user': serializer.data
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Logout by clearing JWT cookies"""
    response = Response({'success': True})
    response.delete_cookie('access_token', path='/')
    response.delete_cookie('refresh_token', path='/')
    return response

class RegisterView(APIView):
    permission_classes = []  # Allow unauthenticated access

    def post(self, request):
        data = request.data
        if not data.get('accept_terms'):
            return Response({"error": "You must accept the terms and conditions."}, status=400)
        serializer = UserSerializer(data=request.data)  # Use UserSerializer here
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveUpdateAPIView):
    """User profile management endpoint"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        try:
            response = super().update(request, *args, **kwargs)
            return Response({
                'success': True,
                'user': response.data
            })
        except Exception as e:
            logger.error(f"Profile update error: {str(e)}")
            return Response(
                {'success': False, 'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class PasswordResetRequestView(generics.GenericAPIView):
    """Custom password reset request view"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Implement your password reset logic here
        return Response({'success': True, 'message': 'Password reset email sent'})

class PasswordResetConfirmView(generics.GenericAPIView):
    """Custom password reset confirmation view"""
    permission_classes = [AllowAny]
    
    def post(self, request, uidb64, token):
        # Implement your password reset confirmation logic here
        return Response({'success': True, 'message': 'Password reset successful'})