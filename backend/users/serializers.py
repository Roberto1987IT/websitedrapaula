from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import NoteToken, CustomUser
from django_countries.serializers import CountryFieldMixin

User = get_user_model()

class UserSerializer(CountryFieldMixin, serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    accept_terms = serializers.BooleanField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
            "password2",
            "full_name", 
            "phone",
            "birthday",
            "gender",
            "country",
            "accept_terms"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "phone": {"required": True},
            "birthday": {"required": False},
            "gender": {"required": False},
            "country": {"required": False}
        }

    def validate(self, data):
        # Password matching validation
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Passwords don't match."})
        
        # Terms acceptance validation
        if not data['accept_terms']:
            raise serializers.ValidationError({"accept_terms": "You must accept the terms."})
        
        return data

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    def validate_phone(self, value):
        if not value:
            raise serializers.ValidationError("Phone number is required.")
        return value

    def create(self, validated_data):
        # Remove fields not needed for user creation
        validated_data.pop('password2')
        validated_data.pop('accept_terms')
        
        # Create user with all fields
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            phone=validated_data.get('phone', ''),
            gender=validated_data.get('gender', ''),
            country=validated_data.get('country', ''),
            birthday=validated_data.get('birthday', None)
        )
        return user

    def to_representation(self, instance):
        # Remove sensitive fields from response
        representation = super().to_representation(instance)
        representation.pop('password', None)
        return representation

class NoteTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteToken
        fields = ["id", "description", "owner"]
        read_only_fields = ["owner"]

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'full_name', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")
        return user