import * as sound from "./sound.js"

export default class Timer {
    constructor(gameDuration){
        this.gameDuration = gameDuration;
        this.countDown = undefined;
        this.timer = document.querySelector(".timer");
    }

    setStopGameListener(onStopGame){
        this.onStopGame = onStopGame
    }

    start = () => {
        let remainingSec = this.gameDuration
        this._paintTimerText(remainingSec)
        this.countDown = setInterval(()=>{
            if(remainingSec<=0){
                clearInterval(this.countDown)
                sound.playAlert()
                this.onStopGame && this.onStopGame("Time Over!")
                return;
            }
            this._paintTimerText(--remainingSec)
        },1000)
    }

    
    stop =() =>{
        clearInterval(this.countDown);
}


    _paintTimerText(time) {
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60);
        const TimerMin = minutes <10 ? `0${minutes}`:minutes
        const TimerSec = seconds <10 ? `0${seconds}`:seconds
        return this.timer.innerText = `${TimerMin}:${TimerSec}`
    }
}


