'use strict';

const gameField = document.querySelector(".game-field");
const gameFieldSize = gameField.getBoundingClientRect()
const playBtn = document.querySelector(".play-btn");
const replayBtn = document.querySelector(".pop-up_replay-btn");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score")
const popUp = document.querySelector("#jsPopUp");
const popUpMessage = document.querySelector(".pop-up_message")

const NUM_OF_ITEMS = 20;
const IMG_SIZE = 80;
const GAME_DURATION_SEC = 10;


let started = false;
let countdown = undefined;


// Game status


const initGame = () => {
    placeItem("carrot", "/img/carrot.png")
    placeItem("bug", "/img/bug.png")
}

const startGame = () => {
    gameField.innerHTML = '';
    startTimer()
    initGame()
    showStopBtn()
    showTimerAndScore()
    started = !started
}

const stopGame = (text) => {
    popUpMessage.innerText = text
    stopTimer()
    gameField.innerHTML = ''
    togglePopUp()
    hideStartBtn()
}

const replayGame = () => {
    togglePopUp()
    startGame()
    showStopBtn()
    started = !started
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

// Timer

const paintTimerText = (time) => {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    const TimerMin = minutes <10 ? `0${minutes}`:minutes
    const TimerSec = seconds <10 ? `0${seconds}`:seconds
    return timer.innerText = `${TimerMin}:${TimerSec}`
}

const startTimer = () => {
    let remainingSec = GAME_DURATION_SEC;
    paintTimerText(remainingSec)
    countdown = setInterval(()=>{
        if(remainingSec<=0){
            clearInterval(countdown)
            stopGame("Time Over!")
            return;
        }
        paintTimerText(--remainingSec)
    },1000)
}

const stopTimer = () => {
    clearInterval(countdown);
}

// Show and Hide btn, card, timer and score

const showStopBtn = () => {
    playBtn.style.visibility = "visible"
    playBtn.innerHTML = `<i class="fas fa-stop"></i>`

}

const showStartBtn = () => {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
}

const togglePopUp = () => {
    popUp.classList.toggle("hidden")
}

const showTimerAndScore = () => {
    timer.style.visibility = "visible";
    score.style.visibility = "visible";
    score.innerText = NUM_OF_ITEMS;
}

const hideStartBtn = () => {
    playBtn.style.visibility = "hidden"
}

// click Items

const clickItems = (event) => {
    const targetItem = event.target
    if(targetItem.className === "carrot") {
        gameField.removeChild(targetItem)
        changeScore()
    }
    else if(targetItem.className === "bug") {
        stopGame("Try Again?")
    }
}

const changeScore = () => {
    const carrots = document.getElementsByClassName("carrot")
    score.innerText = carrots.length
    if(carrots.length === 0) {
        stopGame("Congrats!")
    }
}




// Initialize

const init = () => {
    playBtn.addEventListener("click", ()=>{
        if(started){
            stopGame("play?")
        } else if(!started) {
            startGame()
        }
    })
    replayBtn.addEventListener("click", replayGame)
    gameField.addEventListener("click", clickItems)

}

init()