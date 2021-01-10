'use strict';

import PopUp from "./popUp.js"
import Field from "./field.js"
import Visibility from "./visibility.js"
import Timer from "./timer.js"
import * as sound from "./sound.js"

const playBtn = document.querySelector(".play-btn");
const replayBtn = document.querySelector(".pop-up_replay-btn");
const score = document.querySelector(".score")

const NUM_OF_ITEMS = 10;
const GAME_DURATION_SEC = 10;


let started = false;


const gameField = new Field(NUM_OF_ITEMS)
const finishBanner = new PopUp()
const elements = new Visibility()
const gameTimer = new Timer(GAME_DURATION_SEC)
gameTimer.setStopGameListener((message)=>stopGame(message))

// Game status


const startGame = () => {
    gameTimer.start()
    gameField.initField()
    gameField.initGame()
    elements.showStop()
    elements.showTimerAndScore(NUM_OF_ITEMS)
    sound.playBg()
    started = !started
}

const stopGame = (text) => {
    finishBanner.showMessage(text)
    gameTimer.stop()
    gameField.initField()
    finishBanner.toggle()
    sound.pauseBg()
    elements.hideStart()
}

const replayGame = () => {
    finishBanner.toggle()
    startGame()
    elements.showStop()
    started = !started
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