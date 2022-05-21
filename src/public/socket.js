const socket = io();

const form = document.getElementById("send-hand");
const handsList = document.getElementById("hands-list");

customElements.define('hand-list-element', HandListElement, {extends: "li"});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById("username");

    if (username.value) {
        socket.emit("hand", username.value);
    }
});

socket.on('hand', function(username) {
    const handListElement = document.createElement("li", { is: "hand-list-element" });
    handListElement.setAttribute("username", username);
    handsList.appendChild(handListElement);
});
