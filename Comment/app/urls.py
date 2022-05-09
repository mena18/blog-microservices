from django.urls import path
from .views import CommentView,LikeView

urlpatterns = [
    path("article/<article_pk>/comment",CommentView.as_view()),
    path("article/<article_pk>/like",LikeView.as_view()),
]
