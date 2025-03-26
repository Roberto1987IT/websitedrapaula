from .serializers import NoteTokenSerializer, UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.shortcuts import render
from django.urls import reverse
from .models import *
from .forms import *
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import get_user_model
from rest_framework import generics
from .permissions import *


def activation_sended(request):
    return render(request, 'users/activation_sended.html')


def send_activate_link_by_email(user, request):
    """
    Sends an email with an activation link containing a secure token.
    """

    curent_site = get_current_site(request)
    uid = urlsafe_base64_encode(force_bytes(user.pk))  # Encode user ID
    token = default_token_generator.make_token(user)  # Generate secure token
    activation_link = settings.SITE_DOMAIN + reverse('users:activate_account', kwargs={'uidb64': uid, 'token': token})

    subject = "Activate Your Account"
    html_message = render_to_string('users/account_activation_email.html', {
        'user': user, 
        'domain': curent_site.domain,
        'activation_link': activation_link
        }
    )
    
    plain_message = f"Click the link to activate your account: {activation_link}"
    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, plain_message, from_email, [user.email], html_message=html_message)


class CustomTokenObtainPairView(TokenObtainPairView):
    #serializer_class = MyTokenObtainPairSerializer()
    
    def post(self, request, *args, **kwargs):
        try:
        
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {
                'success': True
            }

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
                )
            
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
                )
            
            return res
        
        except:
        
            return Response({'success': False})


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
       
        try:
        
            refresh_token = request.COOKIES.get('refresh_token')          

            request.data['refresh'] = refresh_token
            
            response =  super().post(request, *args, **kwargs)
            
            tokens = response.data
            
            access_token = tokens['access']
            
            res = Response()
            res.data = {'refreshed' : True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/"
            )
        
            return res
        
        except:
        
            return Response({'refreshed' : False})
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = NoteToken.objects.filter(owner = user)
    serializer = NoteTokenSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    result = {
        'authenticated': True
    }
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        response = Response()

        response.data = {'success':True}

        response.delete_cookie(
            'access_token',
            path='/',
            samesite='None'
        )
        response.delete_cookie(
            'refresh_token',
            path='/',
            samesite='None'
        )
        return response
    except:
        return Response({'success':False})


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny, IsNotAuthenticated]


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user



