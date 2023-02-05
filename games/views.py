from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied

from .serializers.common import GameSerializer
from .models import Game
from .serializers.populated import PopulatedGameSerializer, PopulatedGameGenSer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class GameListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, _request):
    games = Game.objects.all()
    # print('GAMES ------>', games)
    serialized_games = PopulatedGameGenSer(games, many=True)
    return Response(serialized_games.data, status=status.HTTP_200_OK)

  def post(self, request):
    # print('requesting data ------>', request.data)
    request.data['owner']= request.user.id
    print(request.data)
    game_to_add = GameSerializer(data=request.data)
    try:
      game_to_add.is_valid(raise_exception=True)
      print(game_to_add.validated_data)
      game_to_add.save()
      return Response(game_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      # print(message='Denied, you do not have a permission')
      return Response({'detail': str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class GameDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_game(self, pk):
    try:
      return Game.objects.get(pk=pk)
    except Game.DoesNotExist:
      print('This is the error ---->', NotFound)
      raise NotFound(detail='game is not found')

  def get(self, _request, pk):
      game = self.get_game(pk=pk)
      serialized_game = PopulatedGameSerializer(game)
      return Response(serialized_game.data)

  def delete(self, request, pk):
    game_to_delete = self.get_game(pk=pk)
    if game_to_delete.owner != request.user:
        print('ERROR')
        raise PermissionDenied('Unauthorised, you are not the owner')
    else: 
      game_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    request.data['owner']= request.user.id
    game_to_update = self.get_game(pk=pk)
    if game_to_update.owner != request.user:
        raise PermissionDenied('Unauthorised, you are not the owner')
    game_updated = GameSerializer(game_to_update, data=request.data)
    try:
      game_updated.is_valid(raise_exception=True)
      game_updated.save()
      return Response(game_updated.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print(str(e))
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
      
