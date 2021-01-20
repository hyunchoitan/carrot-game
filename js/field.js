`use strict`;

const IMG_SIZE = 80;

export const ItemType = Object.freeze({
    carrot : "carrot",
    bug : "bug"
})

export class Field {
    constructor(itemCount) {
        this.itemCount = itemCount;
        this.field = document.querySelector(".game-field");
        this.field.addEventListener("click", this.onClick)
    }

    initField() {
        this.field.innerHTML = '';
    }


    initGame () {
        this._placeItem(ItemType.carrot, "https://hyunchoitan.github.io/carrot-game/img/carrot.png")
        this._placeItem(ItemType.bug, "https://hyunchoitan.github.io/carrot-game/img/bug.png")
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
        if(targetItem.className === ItemType.carrot) {
            this.field.removeChild(targetItem)
            this.onItemClick && this.onItemClick(ItemType.carrot)
        }
        else if(targetItem.className === ItemType.bug) {
            this.onItemClick && this.onItemClick(ItemType.bug)
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