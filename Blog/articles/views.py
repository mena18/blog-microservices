from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from taggit.models import Tag
from django.db.models import Q



from .models import Article
from .serializers import ArticleSerializer

from .producer import publish
from .authenticate import authenticate

from django.db.models import Count

# from .models import Product, User
# from .serializers import ProductSerializer



"""
Search by tag name

tag = get_object_or_404(Tag,slug=tag_slug)
posts = Post.published.filter(tags__in = [tag])

"""

"""
Find similar articles with the same tag

tags_id = post.tags.values_list('id',flat=True)
similar_posts = Post.published.filter(tags__in=tags_id).exclude(id=post.id)
similar_posts = similar_posts.annotate(same_tags=Count('tags')).order_by('-same_tags','-publish')[:4]


"""

"""
make the text markdown
use signals to delete or create posts and inform the other side
change article image to become image field
"""


class ArticleView(viewsets.ViewSet):
    def list(self, request):
        slug = request.GET.get("query","")
        tag_slug = request.GET.get("tag","")
        if slug :
            tag = Tag.objects.filter(slug__icontains=slug).first()
            if tag:
                articles = Article.objects.filter(Q(title__icontains=slug) | Q(tags__in = [tag]))
            else:
                articles = Article.objects.filter(title__icontains=slug)     
        elif tag_slug:
            tag = get_object_or_404(Tag,slug=tag_slug)
            articles = Article.objects.filter(tags__in = [tag])
        else:
            articles = Article.objects.all()
        
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def create(self, request):
        authenticate(request,admin=1)
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publish('add_article',serializer.data['id']);
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        article = Article.objects.get(id=pk)
        article_data = ArticleSerializer(article).data

        tags_id = article.tags.values_list('id',flat=True)
        similar_articles = Article.objects.filter(tags__in=tags_id).exclude(id=article.id)
        similar_articles = similar_articles.annotate(same_tags=Count('tags')).order_by('-same_tags','-date')[:4]
        similar_articles_data = ArticleSerializer(similar_articles, many=True).data

        return Response({"similar_articles":similar_articles_data,"article":article_data})

    def update(self, request, pk=None):
        authenticate(request,admin=1)
        product = Article.objects.get(id=pk)
        serializer = ArticleSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):
        authenticate(request,admin=1)
        product = Article.objects.get(id=pk)
        product.delete()
        publish('delete_article',pk);
        return Response(status=status.HTTP_204_NO_CONTENT)


    def most_liked(self,request):
        articles = Article.objects.order_by("-likes").all()[0:5]
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

