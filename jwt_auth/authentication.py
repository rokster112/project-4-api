from rest_framework.authentication import BasicAuthentication
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.exceptions import PermissionDenied 
import jwt
from django.conf import settings 


class JWTAuthentication(BasicAuthentication):
  def authenticate(self, request):
    header = request.headers.get('Authorization')
    if not header:
      return None
    
    if not header.startswith('Bearer'):
      print('Failed at token syntax')
      raise PermissionDenied('The token is not valid')
    
    token = header.replace('Bearer ', '')

    try:
      payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])

      user = User.objects.get(pk=payload.get('sub'))

    except jwt.exceptions.InvalidTokenError:
      print('Failed at token decode')
      raise PermissionDenied('Inavlid token')
    
    except User.DoesNotExist:
      raise PermissionDenied('User not found')

    return (user, token)
