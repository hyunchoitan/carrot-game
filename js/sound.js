const bgSound = new Audio("https://hyunchoitan.github.io/carrot-game/sound/bg.mp3")
const bugSound = new Audio("https://hyunchoitan.github.io/carrot-game/sound/bug_pull.mp3")
const carrotSound = new Audio("https://hyunchoitan.github.io/carrot-game/sound/carrot_pull.mp3")
const winSound = new Audio("https://hyunchoitan.github.io/carrot-game/sound/game_win.mp3")
const alertSound = new Audio("https://hyunchoitan.github.io/carrot-game/sound/alert.wav")


const playSound = (audioElement) => {
    audioElement.play()
}

const pauseSound = (audioElement) => {
    audioElement.pause()
    audioElement.currentTime = 0;
}



export function playBg() {
    playSound(bgSound)
}

export function pauseBg() {
    pauseSound(bgSound)
}



export function playCarrot() {
    playSound(carrotSound)
}


export function playBug() {
    playSound(bugSound)
}


export function playWin() {
    playSound(winSound)
}


export function playAlert() {
    playSound(alertSound)
}