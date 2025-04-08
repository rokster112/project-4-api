from django.db import models

# Create your models here.
class Game(models.Model):
    title = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    developer = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    image_url = models.TextField()
    genres = models.ManyToManyField(
        'genres.Genre',
        related_name='games'
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='games',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.title} - ({self.year})'
