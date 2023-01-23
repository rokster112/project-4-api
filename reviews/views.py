from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer
from .models import Review

# Create your views here.
class ReviewListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, _request):
    reviews = Review.objects.all()
    # print('reviews ------>', reviews)
    serialized_reviews = ReviewSerializer(reviews, many=True)
    return Response(serialized_reviews.data, status=status.HTTP_200_OK)

  def post (self, request):
    request.data['owner']= request.user.id
    print(request.data)
    creating_review = ReviewSerializer(data=request.data)
    try:
      creating_review.is_valid(True)
      # creating_review.owner == request.user
      creating_review.save()
      return Response(creating_review.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get_review(self, pk):
    try:
      return Review.objects.get(pk=pk)
    except Review.DoesNotExist:
      raise NotFound(detail='Review is not found')

  def get(self, _request, pk):
    review = self.get_review(pk=pk) 
    serialized_review = ReviewSerializer(review)
    return Response(serialized_review.data)

  def delete(self, request, pk):
    delete_review = self.get_review(pk)
    if delete_review.owner.id != request.user.id:
        raise PermissionDenied('Unauthorised, you are not the owner')
    delete_review.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    request.data['owner']= request.user.id
    review_to_update = self.get_review(pk=pk)
    review_updated = ReviewSerializer(review_to_update, data=request.data)
    if review_updated.owner != request.user:
        raise PermissionDenied('Unauthorised, you are not the owner')
    try:
      review_updated.is_valid(True)
      review_updated.save()
      return Response(review_updated.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


