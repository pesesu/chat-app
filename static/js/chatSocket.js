let chatAuthUser = document.querySelector('#auth_user').value;
let roomName = document.querySelector('#room-name').value;


function elementFromString(html) {
    const template = document.createElement('template');
    
    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

const chatSocket = new WebSocket(
    'ws://'+
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/'
);

let chatBtn = document.getElementById('chat-btn')
console.log(chatBtn)
chatBtn.addEventListener('click', () => {
    let chatInput =  document.getElementById('chat-input')
    if (chatInput !== '' && chatInput !== null) {
        console.log("@Auth-user: ", chatAuthUser)
        chatSocket.send(JSON.stringify({
            'message': chatInput.value,
            'auth_user': chatAuthUser,
        }));
    }
})

chatSocket.onmessage = function(e) {
    let chatElement = null;
    let auth_user = document.getElementById('auth_user').value
    let screen = document.getElementById('screen')
    const data = JSON.parse(e.data);
    // console.log('Chat main Data: ', data)
    
    // console.log('AUTH USER: ', auth_user)
    // console.log('SENDER: ', data.sender)

    if (data.sender !== auth_user)
        chatElement = elementFromString( `<div class="other-user mb-3">
            <div class="msg px-3 py-[6px] bg-white text-gray-900 rounded-[20px] inline-block max-w-[60%]">${data.message}</div>
            <div class="time text-xs mt-1 ml-2 text-gray-500">${data.date}</div>
        </div>`)
    else {
        chatElement = elementFromString(`<div class="auth-user flex justify-end mb-3">
            <div class="max-w-[60%]">
                <div class="msg px-3 w-full py-[6px] bg-indigo-300 text-gray-900 rounded-[20px] inline-block">${data.message}</div>
                <div class="flex justify-end">
                    <div class="time text-xs mt-1 mr-2 text-gray-500">${data.date}</div>
                </div>
            </div>
        </div>`)
    }

    screen.appendChild(chatElement);
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};



