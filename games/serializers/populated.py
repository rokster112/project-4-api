from genres.serializers.common import GenreSerializer
from .common import GameSerializer
from reviews.serializers.populated import PopulatedReviewSerializer

class PopulatedGameSerializer(GameSerializer):
  reviews = PopulatedReviewSerializer(many=True)
  genres = GenreSerializer(many=True)

class PopulatedGameGenSer(GameSerializer):
  genres = GenreSerializer(many=True)
