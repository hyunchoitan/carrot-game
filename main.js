'use strict';

const gameField = document.querySelector(".game-field");

const NUM_OF_ITEMS = 9;
const IMG_SIZE = 80;    

const getRandomNumber = (min, max) => {
    return Math.random()*(max- min-80);
}

const getRandomPosition = () => {
    const gameFieldSize = gameField.getBoundingClientRect()
    const randomX = Math.floor(getRandomNumber(gameFieldSize.left, gameFieldSize.right))
    const randomY = Math.floor(getRandomNumber(gameFieldSize.top, gameFieldSize.bottom))
    return [randomX, randomY]
}

const placeItem = (className, src) => {
    for(let i=0; i<NUM_OF_ITEMS; i++){
        const img = document.createElement("img")
        img.setAttribute("class", className)
        img.setAttribute("src", src)
        const position = getRandomPosition()
        img.style.transform = `translate(${position[0]}px,${position[1]}px)`
        gameField.appendChild(img)
    } 
}


const initGame = () => {
    placeItem("carrot", "/img/carrot.png")
    placeItem("bug", "/img/bug.png")
}

initGame()