from django.urls import path
from .views import ArticleView,MostLikedView

urlpatterns = [
    path("articles",ArticleView.as_view({
        "get":"list",
        "post":"create",
    })),
    path("articles/most_liked",MostLikedView.as_view()),
    path("articles/<pk>",ArticleView.as_view({
        "get":"retrieve",
        "put":"update",
        "delete":"destroy",
    })),
    
]
