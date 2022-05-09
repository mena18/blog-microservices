from django.contrib import admin
from .models import Articles,Comment,Likes
# Register your models here.



admin.site.register(Articles)
admin.site.register(Comment)
admin.site.register(Likes)