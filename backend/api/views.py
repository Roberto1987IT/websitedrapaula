from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from api.models import Document  # Only Document comes from api.models
from users.models import UserProfile  # UserProfile comes from users.models
from .serializers import RegisterSerializer, UserProfileSerializer, DocumentSerializer

User = get_user_model()  # Gets your CustomUser model

class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]  # Changed to require authentication

    def get_queryset(self):
        # Only show documents owned by the current user
        return Document.objects.filter(owner=self.request.user)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = serializer.save()
        
        return Response(
            {
                "success": True,
                "user": {
                    "email": user.email,
                    "full_name": user.full_name
                }
            },
            status=status.HTTP_201_CREATED
        )

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Using the related_name 'profile' we defined in models
            profile = request.user.profile
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except AttributeError:
            # Handle case where profile doesn't exist
            return Response(
                {
                    "error": "Profile not found",
                    "detail": "Please complete your profile"
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def patch(self, request):
        try:
            profile = request.user.profile
            serializer = UserProfileSerializer(
                profile, 
                data=request.data, 
                partial=True
            )
            
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            serializer.save()
            return Response(serializer.data)
            
        except AttributeError:
            return Response(
                {"error": "Profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )