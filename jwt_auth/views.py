from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
import jwt
User = get_user_model()
from datetime import datetime, timedelta
from jwt_auth.serializers.common import UserSerializer
from django.conf import settings

# Create your views here
class RegisterView(APIView):

  def post (self, request):
    create_user = UserSerializer(data=request.data)
    try:
      create_user.is_valid(raise_exception=True)
      create_user.save()
      return Response(create_user.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print(str(e))
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
  def post(self, request):
    password = request.data.get('password')
    username = request.data.get('username')
    try:
      user_login = User.objects.get(username=username)
    except User.DoesNotExist:
      raise PermissionDenied('Credentials are incorrect!')
    if not user_login.check_password(password):
      raise PermissionDenied('Credentials are incorrect!')

    dt = datetime.now() + timedelta(days=7)

    token = jwt.encode(
      {
        'sub': user_login.id,
        'exp': int(dt.strftime('%s'))
      },
      settings.SECRET_KEY,
      'HS256'
    )
    print('TOKEN ----->', token)
    return Response({ 'token': token, 'message': f'Welcome back {user_login.username}' })