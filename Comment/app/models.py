from django.db import models

# Create your models here.

class Articles(models.Model):
    pass

    def __str__(self):
        return f"Article {self.id}"

class Comment(models.Model):
    article = models.ForeignKey(Articles,related_name="comments",on_delete=models.CASCADE)
    body = models.TextField()
    date = models.DateField(auto_now_add=True)
    user = models.IntegerField()
    email = models.EmailField()

    def __str__(self):
        return f"user{(self.user)} on {self.article}    ({self.body[:30]}..)"




class Likes(models.Model):
    article = models.ForeignKey(Articles,related_name="likes",on_delete=models.CASCADE)
    user = models.IntegerField()
    
    class Meta:
        unique_together = ('article', 'user',)


    def __str__(self):
        return f"user{(self.user)} on {self.article}"
    