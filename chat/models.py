from django.db import models
from django.contrib.auth.models import User
from utils.order import get_room_name
# Create your models here.

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='auth_user')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    friends = models.ManyToManyField(User)
    date_create = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.user.username
    

class Message(models.Model):
    sender = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.sender)

class RoomGroup(models.Model):
    group_name = models.CharField(max_length=255)
    messages = models.ManyToManyField(Message, blank=True)
    #date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.group_name
    

class Lobby(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    other_user = models.ForeignKey(User, related_name='friend', on_delete=models.CASCADE)
    last_message = models.TextField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-last_updated',]
    
    
    def get_room(self):
        return get_room_name(self.user.username, self.other_user.username)
    
    def __str__(self):
            return f'{self.user.username} -- {self.other_user.username}'
        
class Utility(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room_group = models.CharField(max_length=255)
    unseen_count = models.IntegerField(default=0)
    online_status = models.BooleanField(default=False)
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.online_status)