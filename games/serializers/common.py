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
        # If you're using base64 images, check if it's a valid base64 string
        if value.startswith('data:image'):
            # Optional: Add more checks to validate base64 string format
            pass
        else:
            # If not base64, check if it's a valid URL
            try:
                import validators
                if not validators.url(value):
                    raise serializers.ValidationError("Invalid image URL.")
            except Exception:
                raise serializers.ValidationError("Invalid image URL.")
        return value
