import PopUp from "./popUp.js"
import Field from "./field.js"
import Visibility from "./visibility.js"
import Timer from "./timer.js"
import * as sound from "./sound.js"


//Builder Pattern
export default class GameBuilder {
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }
    withItemCounts(num){
        this.itemCounts = num;
        return this;
    }
    build = () =>{
        console.log(this);
        return new Game (
            this.gameDuration,
            this.itemCounts
        )
    }
}


class Game {
    constructor(gameDuration, itemCounts){
        this.gameDuration = gameDuration;
        this.itemCounts = itemCounts;

        this.playBtn = document.querySelector(".play-btn");
        this.replayBtn = document.querySelector(".pop-up_replay-btn");
        this.score = document.querySelector(".score")

        this.started = false;

        this.gameField = new Field(itemCounts)
        this.finishBanner = new PopUp()
        this.elements = new Visibility()
        this.gameTimer = new Timer(gameDuration)
        this.gameTimer.setStopGameListener((message)=>this.stop(message))

        this.playBtn.addEventListener("click", ()=>{
            if(this.started){
                sound.playAlert()
                this.stop("Try Again?")
            } else if(!this.started) {
                this.start()
            }
        })
        this.replayBtn.addEventListener("click", this.replay)
        this.gameField.setClickListener(this.clickItems)

    }

    start= () => {
        this.gameTimer.start()
        this.gameField.initField()
        this.gameField.initGame()
        this.elements.showStop()
        this.elements.showTimerAndScore(this.itemCounts)
        sound.playBg()
        this.started = !this.started
    }
    
    stop= (text) => {
        this.finishBanner.showMessage(text)
        this.gameTimer.stop()
        this.gameField.initField()
        this.finishBanner.toggle()
        sound.pauseBg()
        this.elements.hideStart()
    }
    
    replay= () => {
        this.finishBanner.toggle()
        this.start()
        this.elements.showStop()
        this.started = !this.started
    }

    
clickItems = (item) => {
    if(item === "carrot") {
        sound.playCarrot()
        this.changeScore()
    }
    else if(item === "bug") {
        sound.playBug()
        this.stop("You Lost:(")
    }
}

changeScore = () => {
    const carrots = document.getElementsByClassName("carrot")
    this.score.innerText = carrots.length
    if(carrots.length === 0) {
        sound.playWin()
        this.stop("You Won:)")
    }
}
}