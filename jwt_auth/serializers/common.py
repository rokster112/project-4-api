from xml.dom import ValidationErr
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  confirm_password = serializers.CharField(write_only=True)

  def validate(self, data):
    password = data.pop('password')
    confirm_password = data.pop('confirm_password')

    if password != confirm_password:
      raise ValidationErr({ 'confirm_password': 'Does not match the password'})

    password_validation.validate_password(password)

    data['password'] = make_password(password)

    return data
    
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password', 'confirm_password')