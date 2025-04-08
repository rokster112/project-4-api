from rest_framework import serializers
from ..models import Game

from rest_framework import serializers
from ..models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

    def validate_year(self, value):
        if not isinstance(value, int) or value <= 0:
            raise serializers.ValidationError("Year must be a positive integer.")
        return value

    def validate_image_url(self, value):
        try:
            import validators
            if not validators.url(value):
                raise serializers.ValidationError("Invalid image URL.")
        except Exception:
            raise serializers.ValidationError("Invalid image URL.")
        return value
