from django.db import models
from taggit.managers import TaggableManager


# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=255)
    image = models.CharField(max_length=500)
    body = models.TextField()
    likes = models.IntegerField(default=0)
    num_comments = models.IntegerField(default=0)
    date = models.DateField(auto_now=True)
    
    tags = TaggableManager()


    def __str__(self):
        return f"({self.id}) - {self.title}"

    def get_tags(self):
        return ""
