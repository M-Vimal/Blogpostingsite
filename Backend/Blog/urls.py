from django.urls import path
from .views import *
from rest_framework_simplejwt.views import  TokenRefreshView



urlpatterns = [
    path('',HomeView.as_view()),
    path('register/',RegisterApiView.as_view()),
    path('login/',LoginApiView.as_view()),
    path('logout/',LogoutApiView.as_view()),
    path('api/token/', TokenRefreshView.as_view()),
    path('myposts/',MypostApiView.as_view()),
    path('singleblog/<str:pk>/',SingleblogApiView.as_view()),
    path('myposts/delete/<str:pk>/',UpdateDeleteApiView.as_view()),
    path('myposts/update/<str:pk>/',UpdateDeleteApiView.as_view()),
    path('myposts/create/',MypostApiView.as_view()),

]
