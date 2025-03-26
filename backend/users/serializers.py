from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import NoteToken, CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
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
        }

    def create(self, validated_data):
        '''
        create new user instance, given the validated data
        '''     
        username = validated_data.get('email', validated_data['email'])
        
        user = User.objects.create_user(
            email=validated_data['email'],
            username=username, 
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            phone=validated_data['phone'],
            gender=validated_data['gender'],
            country=validated_data['country'],
            birthday=validated_data['birthday'],
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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token


class NoteTokenSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = NoteToken
        fields = ["id", "description", "owner"]

    
