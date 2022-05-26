class HandListElement extends HTMLLIElement {
    constructor() {
        super();

        this.username = document.createElement("span");
        this.appendChild(this.username);

        this.deleteButton = document.createElement("button");
        this.deleteButton.classList.add("btn", "btn-danger", "ms-2");
        this.deleteButton.innerHTML = "<i class=\"bi bi-trash\"></i>";
        this.appendChild(this.deleteButton);

        this.deleteButton.addEventListener("click", (e) => {
            removeHandListElement(this.id);
        })
    }

    connectedCallback() {
        if (this.hasAttribute("username")) {
            this.username.innerText = this.getAttribute("username");
        }
    }
}