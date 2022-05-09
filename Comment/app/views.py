from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Comment,Articles,Likes
from .serializers import CommentSerializer
from .authenticate import authenticate
from .producer import publish

# figure out authentication with jwt
# finish comment & likes
# work on rabitmq and manage communication


# Create your views here.

class CommentView(APIView):
    def get(self,request,article_pk):
        comments = Articles.objects.get(id=article_pk).comments.all()
        data = CommentSerializer(comments,many=True).data
        return Response({"comments":data})
        

    def post(self,request,article_pk):
        # need to add midle ware for auth & check body is valid 
        user_id,user_email = authenticate(request)
        comment = Comment()
        comment.user = user_id
        comment.email = user_email
        comment.body = request.data['body']
        comment.article_id = article_pk
        comment.save()
        publish("add_comment",article_pk)
        return Response({"detail":"comment created successfully"})

        

class LikeView(APIView):
    def post(self,request,article_pk):
        user_id,user_email = authenticate(request)
        try:
            Likes.objects.create(user=user_id,article_id=article_pk)
            publish("add_like",article_pk)
            return Response({"detail":"liked successfully"})
        except:
            return Response({"detail":"already liked"})

    
    def delete(self,request,article_pk):
        user_id,user_email = authenticate(request)
        d = Likes.objects.filter(user=user_id,article_id=article_pk).delete()
        if d:
            publish("delete_like",article_pk)
            return Response({"detail":"deleted successfully"})
        else:
            return Response({"detail":"like not found"})

    