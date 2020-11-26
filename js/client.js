const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');

const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
});
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
});
socket.on('left', data =>{
    append(`${name} left the chat`,'left');
});


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.Value;
    
    append(`you: ${message}`, 'right');
    socket.emit('send',message);
    messageinput.value = ''
    
});
