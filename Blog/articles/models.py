from django.db import models

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=500)
    body = models.TextField()
    likes = models.IntegerField(default=0)
    num_comments = models.IntegerField(default=0)

