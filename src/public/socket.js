const socket = io();

const form = document.getElementById("send-hand");

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById("username");

    if (username.value) {
        console.log("sending hand");
        socket.emit("hand", username.value);
    }
});