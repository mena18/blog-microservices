import jwt
from django.conf import settings
from rest_framework import exceptions
from rest_framework_simplejwt.tokens import RefreshToken


def authenticate(request):

    authorization_heaader = request.headers.get('Authorization')

    if not authorization_heaader:
        raise exceptions.AuthenticationFailed('user not found')
    try:
        # header = 'Token xxxxxxxxxxxxxxxxxxxxxxxx'
        access_token = authorization_heaader.split(' ')[1]
        payload = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload['user_id'],payload['user_email']

    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('access_token expired')
    except IndexError:
        raise exceptions.AuthenticationFailed('Token prefix missing')
    except:
        raise exceptions.AuthenticationFailed('Auth Failed')


    