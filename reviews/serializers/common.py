from rest_framework import serializers
from ..models import Review


class ReviewSerializer(serializers.ModelSerializer):
  # owner = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all())
  class Meta:
    model = Review
    fields = '__all__'