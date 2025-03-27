from rest_framework import serializers
from django.contrib.auth import get_user_model
from phonenumber_field.serializerfields import PhoneNumberField
from users.models import UserProfile  # Import from users app
from api.models import Document      # Import from api app

User = get_user_model()  # This gets your CustomUser model from settings.AUTH_USER_MODEL

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'author', 'type', 'date', 'description', 'file']
        read_only_fields = ['id']

class UserProfileSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField(required=False)
    
    class Meta:
        model = UserProfile
        fields = ['age', 'gender', 'phone', 'birth_date', 'country']
        extra_kwargs = {
            'age': {'required': False},
            'gender': {'required': False},
            'birth_date': {'required': False},
            'country': {'required': False}
        }

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    phone = PhoneNumberField(required=False)
    
    # Profile fields (will be saved to UserProfile model)
    age = serializers.IntegerField(required=False, min_value=1)
    gender = serializers.CharField(required=False)
    birth_date = serializers.DateField(required=False)
    country = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            'email', 'password', 'confirm_password',
            'full_name', 'phone', 'age', 'gender',
            'birth_date', 'country'
        ]
        extra_kwargs = {
            'full_name': {'required': True},
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match"})
        
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "This email is already registered"})
        
        return data

    def create(self, validated_data):
        # Extract profile data
        profile_data = {
            'age': validated_data.pop('age', None),
            'gender': validated_data.pop('gender', ''),
            'birth_date': validated_data.pop('birth_date', None),
            'country': validated_data.pop('country', '')
        }
        
        # Create user
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],  # Using email as username
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            phone=validated_data.get('phone', ''),
        )
        
        # Create profile
        UserProfile.objects.create(user=user, **profile_data)
        
        return user

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(source='userprofile', required=False)
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'full_name', 'phone',
            'is_active', 'date_joined', 'profile'
        ]
        read_only_fields = ['id', 'email', 'date_joined']