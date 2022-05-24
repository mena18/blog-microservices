from rest_framework import serializers
from .models import Article

from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)



class ArticleSerializer(TaggitSerializer,serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Article
        fields = "__all__"
