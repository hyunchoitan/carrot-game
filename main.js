'use strict';

const gameField = document.querySelector(".game-field");
const playBtn = document.querySelector(".play-btn");
const replayBtn = document.querySelector(".pop-up_replay-btn");

const NUM_OF_ITEMS = 9;
const IMG_SIZE = 80;    


// Game ststus


const initGame = () => {
    placeItem("carrot", "/img/carrot.png")
    placeItem("bug", "/img/bug.png")
}

const startGame = () => {
    removeAllItems()
    initGame()
}

// placing Items in random position

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

const removeAllItems = () => {
    const carrots = document.getElementsByClassName("carrot");
    const bugs = document.getElementsByClassName("bug");
    while(carrots.length > 0) {
        gameField.removeChild(carrots[0])
    }
    while(bugs.length > 0) {
        gameField.removeChild(bugs[0])
    }
}

// Timer


const init = () => {
    initGame();
    playBtn.addEventListener("click", startGame)
    replayBtn.addEventListener("click", startGame)

}

init()