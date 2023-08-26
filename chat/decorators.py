from django.shortcuts import redirect

def redirect_login(view_func):
    def wrapper(request, *args, **kwargs):
        print(request.user.is_authenticated())
        if request.user.is_authenticated():
            return view_func(request, *args, **kwargs)
        else:
            return redirect('index') 
    return wrapper