from django.urls import path
from .views import Test

urlpatterns = [
    path("test",Test.as_view()),
    # path("articles",ArticleView.as_view({
    #     "get":"list",
    #     "post":"create",
    # })),
    # path("articles/<pk>",ArticleView.as_view({
    #     "get":"retrieve",
    #     "put":"update",
    #     "delete":"destroy",
    # })),
]
