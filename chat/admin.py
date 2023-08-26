from django.contrib import admin

from .models import (
    UserProfile,
    Message,
    RoomGroup,
    Lobby,
    Utility
)


admin.site.register([
    UserProfile,
    Message,
    RoomGroup,
    Lobby,
    Utility
])
