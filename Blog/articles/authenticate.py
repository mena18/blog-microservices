import jwt
from django.conf import settings
from rest_framework import exceptions

def authenticate(request,admin=0):

    authorization_heaader = request.headers.get('Authorization')

    if not authorization_heaader:
        raise exceptions.AuthenticationFailed('user not found')
    try:
        # header = 'Token xxxxxxxxxxxxxxxxxxxxxxxx'
        access_token = authorization_heaader.split(' ')[1]
        payload = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        if admin==0 or payload['admin']:
            return payload['user_id'],payload['user_email']
        raise exceptions.AuthenticationFailed('permission denied')
            

    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('access_token expired')
    except IndexError:
        raise exceptions.AuthenticationFailed('Token prefix missing')
    # except:
    #     raise exceptions.AuthenticationFailed('Auth Failed')


    