
let chatsAuthUser = document.querySelector('#auth_user').value;

function elementFromHtml(html) {
    const template = document.createElement('template');
    
    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}


function navigateChatUrl(room_id, user_id) {
    if (window.location.protocol==='http:'){
        window.location.replace(`http://${window.location.host}/chat/${room_id}/${user_id}/`)
    }else {
         window.location.replace(`https:/${window.location.host}/chat/${room_id}/${user_id}/`)
    }
    
    // console.log(window.location.host)
}

const chatsSocket = new WebSocket(
    'ws://'+
    window.location.host +
    '/ws/chats/'
);

//  const newest_interval = setInterval(() => {
//     chatsSocket.send(JSON.stringify({'message': 'This is chats'}));
//  }, 4000)

//  clearInterval(interval)



chatsSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    let rooms = data.rooms
    let otherUsernames = data.other_usernames
    let otherIds = data.other_ids
    let authUsernames = data.auth_usernames
    let newFriend = null
    // console.log('chats data: ', data)
    // console.log('Connected to chats on left')

    let friendsWrapper = document.querySelector('#friends-wrapper')
    // console.log(friendsWrapper);
    let friendsChild = document.querySelector('#friends-child')
    // console.log(friendsChild)
    let newFriendsChild = elementFromHtml(`<div id="friends-child"></div>`)
    friendsWrapper.appendChild(newFriendsChild)
    // console.log(friendsWrapper)
    for (let i=0; i < rooms.length; i ++) {
        
        newFriend = elementFromHtml(`
        <div onClick="navigateChatUrl('${rooms[i]}', ${otherIds[i]})" class="friend mx-3 flex items-center gap-3 px-3 py-3 border-b border-[#25324B]">
            <img src="/static/images/profile.jpg" class="w-10 h-10 rounded-[50%]" alt="">
            <div class="w-[100%]">
                <div class="username font-[500] text-gray-200">
                    ${otherUsernames[i]}
                </div>
                <div class="flex justify-between items-center w-[100%]">
                    <div class="last-text text-gray-400 text-sm">
                        Hello How are you
                    </div>
                    <div
                        class="unseen-count px-2 rounded-[20px]  bg-indigo-400 font-bold text-sm text-gray-900">
                        10
                    </div>
                </div>
            </div>
        </div>`)
        let current_user = document.getElementById('auth_user').value
        // console.log('Current Users name: ', current_user)
        
        if (authUsernames[i] === current_user) {
            if (otherUsernames[i] !== current_user) {
                newFriendsChild.appendChild(newFriend)
            }
        }
        // console.log('RECEIVED SIGNAL.')
        // console.log('Auth auth User: ', current_user, authUsernames[i])
    }
    
    // console.log(newFriendsChild)
    friendsChild.remove()
    friendsWrapper.appendChild(newFriendsChild)

};

chatsSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

let chatsBtn = document.getElementById('chat-btn')
console.log(chatsBtn)
chatsBtn.addEventListener('click', () => {
    // console.log('Clicked Chat button')
    let chatsInput =  document.getElementById('chat-input')
    console.log('Waiting to send message.')
    setTimeout(() => {
        chatsSocket.send(JSON.stringify({
            'message': chatsInput.value,
            'auth_user': chatsAuthUser
        }));
    }, 2000)   
})