from .models import UserProfile
from utils.order import get_room_name


def friends_context(request):
    friends = UserProfile.objects.get(UserProfile).friends
    return {'friends': friends}
