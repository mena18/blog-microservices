from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article
from .serializers import ArticleSerializer

from .producer import publish

# from .models import Product, User
# from .serializers import ProductSerializer


class ArticleView(viewsets.ViewSet):
    def list(self, request):
        products = Article.objects.all()
        serializer = ArticleSerializer(products, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        publish('add_article',serializer.data['id']);
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        product = Article.objects.get(id=pk)
        serializer = ArticleSerializer(product)
        return Response(serializer.data)

    def update(self, request, pk=None):
        product = Article.objects.get(id=pk)
        serializer = ArticleSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):
        product = Article.objects.get(id=pk)
        product.delete()
        publish('delete_article',pk);
        return Response(status=status.HTTP_204_NO_CONTENT)