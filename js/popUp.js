export default class PopUp {
    constructor() {
        this.popUp = document.querySelector("#jsPopUp");
        this.popUpMessage = document.querySelector(".pop-up_message")
    }

    
    toggle() {
        this.popUp.classList.toggle("hidden")
    }

    showMessage(text) {
        this.popUpMessage.innerText = text
    }
}