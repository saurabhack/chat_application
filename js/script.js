const socket = io('http://localhost:8000'); 
const form = document.querySelector("#messageSender");
const messageInput = document.querySelector("#messageInput");
const messageContainer = document.querySelector("#chat-window");

const name = prompt("Enter your name to join");

const append = (message, position) => {
    if (position === "left") {
        messageContainer.innerHTML += `<div class="flex items-center mb-4">
            <div class="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-[60%]">
                <p><strong>${message.name}:</strong> ${message.text}</p>
            </div>
        </div>`;
    } else {
        messageContainer.innerHTML += `<div class="flex items-center justify-end mb-4">
            <div class="bg-gray-200 py-2 px-4 rounded-lg max-w-[60%] text-right">
                <p><strong>You:</strong> ${message.text}</p>
            </div>
        </div>`;
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append({ name: "You", text: message }, "right"); 
    socket.emit('send', message); 
    messageInput.value = ""; 
});

socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
    append({ name, text: 'joined the chat' }, "left"); 
});

socket.on('receive', (data) => { 
    append({ name: data.name, text: data.message }, "left"); 
});


socket.on('user-left', name => {
    append({ name, text: 'left the chat' }, 'left');
});
