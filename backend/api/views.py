# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from .models import UserProfile, Document
from .serializers import DocumentSerializer
from django.http import HttpResponse
from rest_framework import generics
from .models import Document  # Assuming you have a Document model
from . import serializers  # Import the serializers module

class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = serializers.DocumentSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )

def home(request):
    return HttpResponse("Welcome to the API!")