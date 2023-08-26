
def get_room_name(user_1: str, user_2: str):
    index = 0
    
    while index < len(user_1) and index < len(user_2):
        if ord(user_1[index].lower()) < ord(user_2[index].lower()):
            return f'{user_1}_{user_2}'
        if ord(user_1[index].lower()) > ord(user_2[index].lower()):
            return f'{user_2}_{user_1}'
        else:
            index += 1
    
    if len(user_1) < len(user_2):
        return f'{user_1}_{user_2}'
    else: return f'{user_2}_{user_1}'
    
