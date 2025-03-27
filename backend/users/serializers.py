from rest_framework import serializers
from .models import NoteToken, CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", 
            "email", 
            "full_name", 
            "phone", 
            "username",
            "birthday", 
            "gender", 
            "country", 
            "password"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "phone": {"required": False},
            "birthday": {"required": False},
            "gender": {"required": False},
            "country": {"required": False},
            "username": {"required": False}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    def create(self, validated_data):
        # Use email as username if not provided
        validated_data.setdefault('username', validated_data['email'])
        
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            phone=validated_data.get('phone', ''),
            gender=validated_data.get('gender', ''),
            country=validated_data.get('country', ''),
            birthday=validated_data.get('birthday', None)
        )
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class NoteTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteToken
        fields = ["id", "description", "owner"]