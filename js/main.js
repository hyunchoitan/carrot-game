'use strict';

import Field from "./field.js"
import * as sound from "./sound.js"

const playBtn = document.querySelector(".play-btn");
const replayBtn = document.querySelector(".pop-up_replay-btn");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score")
const popUp = document.querySelector("#jsPopUp");
const popUpMessage = document.querySelector(".pop-up_message")


const NUM_OF_ITEMS = 10;
const GAME_DURATION_SEC = 10;


let started = false;
let countdown = undefined;


const gameField = new Field(NUM_OF_ITEMS)


// Game status


const startGame = () => {
    startTimer()
    gameField.initField()
    gameField.initGame()
    showStopBtn()
    showTimerAndScore()
    sound.playBg()
    started = !started
}

const stopGame = (text) => {
    popUpMessage.innerText = text
    stopTimer()
    gameField.initField()
    togglePopUp()
    sound.pauseBg()
    hideStartBtn()
}

const replayGame = () => {
    togglePopUp()
    startGame()
    showStopBtn()
    started = !started
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
            sound.playAlert()
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

const clickItems = (item) => {
    if(item === "carrot") {
        sound.playCarrot()
        changeScore()
    }
    else if(item === "bug") {
        sound.playBug()
        stopGame("You Lost:(")
    }
}

const changeScore = () => {
    const carrots = document.getElementsByClassName("carrot")
    score.innerText = carrots.length
    if(carrots.length === 0) {
        sound.playWin()
        stopGame("You Won:)")
    }
}


// Initialize

const init = () => {
    playBtn.addEventListener("click", ()=>{
        if(started){
            sound.playAlert()
            stopGame("Try Again?")
        } else if(!started) {
            startGame()
        }
    })
    replayBtn.addEventListener("click", replayGame)
    gameField.setClickListener(clickItems)

}

init()