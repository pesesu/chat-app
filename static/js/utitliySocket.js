let utilityAuthUser = document.querySelector('#auth_user').value;
let utilityRoomName = document.querySelector('#room-name').value;



// function navigateChatUrl(room_id, user_id) {
//     if (window.location.protocol==='http:'){
//         window.location.replace(`http://${window.location.host}/chat/${room_id}/${user_id}/`)
//     }else {
//          window.location.replace(`https:/${window.location.host}/chat/${room_id}/${user_id}/`)
//     }
    
//     // console.log(window.location.host)
// }

const utilitySocket = new WebSocket(
    'ws://'+
    window.location.host +
    '/ws/utility/' +
    utilityRoomName +
    '/'
);

//  const newest_interval = setInterval(() => {
//     chatsSocket.send(JSON.stringify({'message': 'This is chats'}));
//  }, 4000)

//  clearInterval(interval)



utilitySocket.onmessage = function(e) {
    const data = JSON.parse(e.data);

};

utilitySocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

let utilityBtn = document.getElementById('chat-btn')
console.log(utilityBtn)
utilityBtn.addEventListener('click', () => {
    console.log('Clicked Chat button')
    let utilityInput =  document.getElementById('chat-input')
    console.log('Waiting to send message.')
    setInterval(() => {
        utilitySocket.send(JSON.stringify({
            'message': utilityInput.value,
        }));
    }, 1000)
    
})