from django.template.defaulttags import register

from chat.models import UserProfile


@register.filter(name='times') 
def times(number):
    return range(number)

@register.filter(name='getter') 
def getter(obj, number):
    return obj[number]

@register.filter(name='profile_username') 
def profile_username(number):
    return UserProfile.objects.get(id=number).user.username

@register.filter(name='profile_user_id') 
def profile_user_id(number):
    return UserProfile.objects.get(id=number).user.id

