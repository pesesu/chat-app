# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
#     re_path(r'ws/utility/(?P<room_name>\w+)/$', consumers.UnseenMessageConsumer.as_asgi()),
#     re_path(r'ws/lobby/(?P<room_name>\w+)/(?P<other_user_id>\w+)/$', consumers.LobbyConsumer.as_asgi()),
#     re_path(r"ws/chat/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
#     re_path(r"ws/chats/$", consumers.ChatsConsumer.as_asgi()),
]