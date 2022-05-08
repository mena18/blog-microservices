from rest_framework import serializers
from accounts.models import User

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=100, min_length=3, write_only=True)
    password2 = serializers.CharField(
        max_length=100, min_length=3, write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password','password2']

class LoginSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField(min_length=3, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'email',
                  'first_name', 'last_name','image']
