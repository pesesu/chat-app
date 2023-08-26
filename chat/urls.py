from django.urls import path 

from . import views


urlpatterns = [
    path('', views.index, name='login'),
    path('chats/', views.chats, name='chats'),
    path('chat/<str:room>/<str:user_id>/', views.chat, name='chat'),
    path('register/', views.register, name='register'),
    path('friend-add/<str:pk>/', views.add_friend, name='friend-add'),
    path('friends/', views.friends, name='friends',)
]