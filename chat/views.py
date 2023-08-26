from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import UserProfile, RoomGroup, Message
from utils.order import get_room_name
from .decorators import redirect_login


def index(request):
    message = None
    if request.method == 'POST':
        username = request.POST['username']
        password =  request.POST['password']
        
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return redirect('chats')
        else:
            message = 'Incorrect Username or Password'
        
    # messages = Message.objects.all()
    # groups = RoomGroup.objects.all()
        
    # for i in messages:
    #     i.delete()
    
    # for i in groups:
    #     i.delete()
    
    # print('Cleared all.')
        
        

        
    return render(request, 'chat/index.html')


def register(request):
    message =  None
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password_1 = request.POST['password1']
        password_2 = request.POST['password2']
        
        if password_1 == password_2:
            User.objects.create_user(username=username, email=email, password=password_1)
            return redirect('login')
        else:
            message = 'Password does not match'
    return render(request, 'chat/register.html')


@login_required(login_url='/')
# @redirect_login
def chats(request):
    user = UserProfile.objects.get(user=request.user)
    _friends = user.friends.all()
    rooms = []
    friends = []
    results = []
    message = None
    for friend in _friends:
        rooms.append(get_room_name(request.user.username, friend.username))
        friends.append(UserProfile.objects.get(user=friend))
        
    if request.method == 'GET':
        friend = request.GET.get('friend')
        print('friend')
        if friend is not None and friend != '':
            users = User.objects.filter(username__icontains=friend)
            for usr in users:
                results.append(UserProfile.objects.get(user=usr))
        if len(results) == 0:
            message = 'No User Found'
            
    context = {
        'user': user,
        'friends_rooms': zip(friends, rooms),
        'results': results,
        'msg': message,
    }
    return render(request, 'chat/chats.html', context)


@login_required(login_url='/')
# @redirect_login
def chat(request, room, user_id):
    username = User.objects.get(id=user_id).username
    context = {
        'room': room, 
        'user_id': user_id,
        'username': username
    }
    return render(request, 'chat/chat.html', context)


@login_required(login_url='/')
def add_friend(request, pk):
    friend = User.objects.get(id=pk)
    
    auth_user_profile = UserProfile.objects.get(user=request.user)
    if not friend in auth_user_profile.friends.all():
        auth_user_profile.friends.add(friend)
        auth_user_profile.save()
    return redirect('chats')
        

@login_required(login_url='/')
def friends(request):
    user = UserProfile.objects.get(user=request.user)
    _friends = user.friends.all()
    rooms = []
    friends = []
    for friend in _friends:
        rooms.append(get_room_name(request.user.username, friend.username))
        friends.append(UserProfile.objects.get(user=friend))
    context = {
        'friends_rooms': zip(friends, rooms)
    }
    return render(request, 'chat/friends.html', context)
