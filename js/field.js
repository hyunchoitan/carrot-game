`use strict`;

const IMG_SIZE = 80;

export default class Field {
    constructor(itemCount) {
        this.itemCount = itemCount;
        this.field = document.querySelector(".game-field");
        this.field.addEventListener("click", this.onClick)
    }

    initField() {
        this.field.innerHTML = '';
    }


    initGame () {
        this._placeItem("carrot", "/img/carrot.png")
        this._placeItem("bug", "/img/bug.png")
    }

// placing Items in random position

    _placeItem (className, src) {
        for(let i=0; i<this.itemCount; i++){
            const img = document.createElement("img")
            img.setAttribute("class", className)
            img.setAttribute("src", src)
            const position = this.getRandomPosition()
            img.style.transform = `translate(${position[0]}px,${position[1]}px)`
            this.field.appendChild(img)
        } 
    }

    
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
    
    onClick = (event) => {
        const targetItem = event.target
        if(targetItem.className === "carrot") {
            this.field.removeChild(targetItem)
            this.onItemClick && this.onItemClick("carrot")
        }
        else if(targetItem.className === "bug") {
            this.onItemClick && this.onItemClick("bug")
        }
    }

    getRandomPosition() {
    const gameFieldWidth = this.field.clientWidth;
    const gameFieldHeight = this.field.clientHeight;
    const randomX = Math.floor(getRandomNumber(gameFieldWidth))
    const randomY = Math.floor(getRandomNumber(gameFieldHeight))
    return [randomX, randomY]
}

}

const getRandomNumber = (max) => {
    return Math.random()*(max- IMG_SIZE);
}