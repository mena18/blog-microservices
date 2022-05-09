from django.shortcuts import render
from rest_framework.response import Response
from accounts.serializers import LoginSerializer, SignUpSerializer, UserSerializer
from accounts.models import User
from rest_framework.views import APIView
import jwt
from django.conf import settings
from rest_framework import exceptions
from rest_framework_simplejwt.tokens import RefreshToken
from  rest_framework import status
import datetime
# Create your views here.


def authenticate(self, request):

    authorization_heaader = request.headers.get('Authorization')

    if not authorization_heaader:
        return None
    try:
        # header = 'Token xxxxxxxxxxxxxxxxxxxxxxxx'
        access_token = authorization_heaader.split(' ')[1]
        payload = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('access_token expired')
    except IndexError:
        raise exceptions.AuthenticationFailed('Token prefix missing')

    user = User.objects.filter(id=payload['user_id']).first()
    if user is None:
        raise exceptions.AuthenticationFailed('User not found')

    if not user.is_active:
        raise exceptions.AuthenticationFailed('user is inactive')

    self.enforce_csrf(request)
    return (user, None)


class LoginView(APIView):
    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.filter(email=request.data['email']).first()
            if user and user.check_password(request.data['password']):
                access_token_payload = {
                    'user_id': user.id,
                    'user_email':user.email,
                    'admin':user.is_superuser,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=90),
                    'iat': datetime.datetime.utcnow(),
                }
                token = jwt.encode(access_token_payload,
                              settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

                return Response({'token':token})
            return Response({'error':"user not found"})
        return Response({'token':serializer.errors})



class SignupView(APIView):
    def post(self,request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = User()
            user.email = request.data['email']
            user.set_password(request.data['password'])  
            user.save()
            return Response({"id": user.id}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors})
            
