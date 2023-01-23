from django.db import models
import json

# Create your models here.
class Review(models.Model):
  title = models.CharField(max_length=50)
  text = models.TextField(max_length=1000)
  created_at = models.DateTimeField(auto_now_add=True)
  game = models.ForeignKey(
    'games.Game',
    related_name='reviews',
    on_delete= models.CASCADE
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='reviews',
    on_delete = models.CASCADE
  )
  class Meta:
    ordering = ('created_at', )

  def __str__(self):
    return f'{self.title}'