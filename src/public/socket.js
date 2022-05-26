const form = document.getElementById("send-hand");
const handsList = document.getElementById("hands-list");

customElements.define('hand-list-element', HandListElement, {extends: "li"});

let socket;

const handsMap = new Map();

function setupSocketIO(subPath) {
    const socketOptions = {};

    if (subPath) {
        socketOptions.path = `/${subPath}/socket.io/`;
    }

    socket = io("/", socketOptions);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById("username");

        if (username.value) {
            socket.emit("hand", username.value);
        }
    });

    socket.on('hand', function(message) {
        const handListElement = document.createElement("li", { is: "hand-list-element" });
        handListElement.setAttribute("id", message.id);
        handListElement.setAttribute("username", message.username);
        handsList.appendChild(handListElement);
        handsMap.set(message.id, handListElement);
    });

    // delete hand list element on receiving corresponding “delete” message
    socket.on('hand-delete', (id) => {
        if (handsMap.has(id)) {
            handsMap.get(id).remove();
            handsMap.delete(id);
        }
    });
}

// send a “delete” message for a specific hand list element
function removeHandListElement(id) {
    if (handsMap.has(id)) {
        socket.emit("hand-delete", id);
        handsMap.get(id).remove();
        handsMap.delete(id);
    }
}
