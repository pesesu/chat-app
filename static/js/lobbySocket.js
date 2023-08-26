
let currentRoomName = document.querySelector('#room-name').value;
let otherUserId = document.querySelector('#other-user-id').value;
let LobbyAuthUser = document.querySelector('#auth_user').value;

// console.log('other user id: ', otherUserId)
// console.log('room name: ', currentRoomName)

function elementFromHtml(html) {
    const template = document.createElement('template');
    
    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

// console.log('location: ', window.location.host);
// console.log('room: ', roomName);
const lobbySocket = new WebSocket(
    'ws://'+
    window.location.host +
    '/ws/lobby/' +
    currentRoomName +
    '/' +
    otherUserId +
    '/'
);

//  const new_interval = setInterval(() => {
//     lobbySocket.send(JSON.stringify({'message': 'This is lobby Message'}));
//  }, 4000)

//  clearInterval(interval)



lobbySocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    console.log('Lobby data: ', data)
};

lobbySocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

let lobbyBtn = document.getElementById('chat-btn')
console.log(lobbyBtn)
lobbyBtn.addEventListener('click', () => {
    console.log('Clicked Chat button')
    let lobbyInput =  document.getElementById('chat-input')
    if (lobbyInput !== '' && lobbyBtn !== null) {
        lobbySocket.send(JSON.stringify({
            'message': lobbyInput.value,
            'auth_user': LobbyAuthUser,
            'other_user_id': otherUserId
        }));
    }
})