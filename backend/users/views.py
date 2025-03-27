from .serializers import NoteTokenSerializer, UserSerializer
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.shortcuts import render
from django.urls import reverse
from .models import NoteToken
from .forms import *
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import get_user_model
from .permissions import IsNotAuthenticated
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

def activation_sended(request):
    return render(request, 'users/activation_sended.html')

def send_activate_link_by_email(user, request):
    """
    Sends an email with an activation link containing a secure token.
    """
    current_site = get_current_site(request)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    activation_link = settings.SITE_DOMAIN + reverse('users:activate_account', kwargs={'uidb64': uid, 'token': token})

    subject = "Activate Your Account"
    html_message = render_to_string('users/account_activation_email.html', {
        'user': user, 
        'domain': current_site.domain,
        'activation_link': activation_link
    })
    
    plain_message = f"Click the link to activate your account: {activation_link}"
    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, plain_message, from_email, [user.email], html_message=html_message)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            res = Response()
            res.data = {'success': True}

            res.set_cookie(
                key="access_token",
                value=tokens['access'],
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
            
            res.set_cookie(
                key="refresh_token",
                value=tokens['refresh'],
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
            
            return res
        except Exception as e:
            logger.error(f"Token obtain error: {str(e)}")
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'refreshed': False, 'error': 'Refresh token missing'}, status=status.HTTP_400_BAD_REQUEST)

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)
            
            res = Response()
            res.data = {'refreshed': True}

            res.set_cookie(
                key="access_token",
                value=response.data['access'],
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
            return res
        except Exception as e:
            logger.error(f"Token refresh error: {str(e)}")
            return Response({'refreshed': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    try:
        notes = NoteToken.objects.filter(owner=request.user)
        serializer = NoteTokenSerializer(notes, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Get notes error: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        response = Response({'success': True})
        response.delete_cookie('access_token', path='/', samesite='None')
        response.delete_cookie('refresh_token', path='/', samesite='None')
        return response
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            user = serializer.save()
            
            # Send activation email if needed
            if settings.EMAIL_ACTIVATION_REQUIRED:
                try:
                    send_activate_link_by_email(user, request)
                except Exception as e:
                    logger.error(f"Activation email error: {str(e)}")
            
            response_data = {
                'success': True,
                'user': {
                    'email': user.email,
                    'full_name': user.full_name
                }
            }
            
            # Auto-login after registration if needed
            if settings.AUTO_LOGIN_AFTER_REGISTRATION:
                token_view = CustomTokenObtainPairView()
                token_response = token_view.post(request)
                if token_response.status_code == 200:
                    response_data.update(token_response.data)
            
            return Response(response_data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return Response({
                'success': False,
                'error': str(e),
                'errors': getattr(e, 'detail', serializer.errors if 'serializer' in locals() else None)
            }, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Profile update error: {str(e)}")
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)