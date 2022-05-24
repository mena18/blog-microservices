from django.urls import path
from .views import ArticleView

urlpatterns = [
    path("articles",ArticleView.as_view({
        "get":"list",
        "post":"create",
    })),
    
    path("articles/most_liked",ArticleView.as_view({
        "get":"most_liked",
    })),

    
    path("articles/<pk>",ArticleView.as_view({
        "get":"retrieve",
        "put":"update",
        "delete":"destroy",
    })),
    
]
