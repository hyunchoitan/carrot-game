'use strict';

const gameField = document.querySelector(".game-field");
const gameFieldSize = gameField.getBoundingClientRect()
const playBtn = document.querySelector(".play-btn");
const replayBtn = document.querySelector(".pop-up_replay-btn");
const timer = document.querySelector(".timer");
const popUp = document.querySelector("#jsPopUp");

const NUM_OF_ITEMS = 9;
const IMG_SIZE = 80;



let started = undefined;
let count = 10


// Game status


const initGame = () => {
    placeItem("carrot", "/img/carrot.png")
    placeItem("bug", "/img/bug.png")
}

const startGame = () => {
    removeAllItems()
    startTimer()
    initGame()
    showStopBtn()
}

const stopGame = () => {
    stopTimer()
    removeAllItems()
    showStartBtn()
}

const replayGame = () => {
    togglePopUp()
    startGame()
}

// placing Items in random position

const getRandomNumber = (min, max) => {
    return Math.random()*(max- min- IMG_SIZE);
}

const getRandomPosition = () => {
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

const paintText = () => {
    if(count>=0){
        const minutes = Math.floor(count/60);
        const seconds = Math.floor(count%60);
        const TimerMin = minutes <10 ? `0${minutes}`:minutes
        const TimerSec = seconds <10 ? `0${seconds}`:seconds
        return timer.innerText = `${TimerMin}:${TimerSec}`
    }
}

const countdown = () => {
    paintText()
    count--
}

const startTimer = () => {
        setInterval(countdown,1000)
}

const stopTimer = () => {
        clearInterval(countdown);
        count = 10;
   
}

// Change button

const showStopBtn = () => {
    playBtn.innerHTML = `<i class="fas fa-stop"></i>`
    playBtn.removeEventListener("click",startGame);
    playBtn.addEventListener("click", stopGame)
}

const showStartBtn = () => {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    playBtn.removeEventListener("click",stopGame);
    playBtn.addEventListener("click", startGame)
}

const togglePopUp = () => {
    popUp.classList.toggle("hidden")
}

// click Items

const clickItems = (event) => {
    const targetItem = event.target
    if(targetItem.className === "carrot") {
        gameField.removeChild(targetItem)
    }
    else if(targetItem.className === "bug") {
        stopGame()
        togglePopUp()
    }
}



// Initialize

const init = () => {
    playBtn.addEventListener("click", startGame)
    replayBtn.addEventListener("click", replayGame)
    gameField.addEventListener("click", clickItems)

}

init()