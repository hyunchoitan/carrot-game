const bgSound = new Audio("/sound/bg.mp3")
const bugSound = new Audio("/sound/bug_pull.mp3")
const carrotSound = new Audio("/sound/carrot_pull.mp3")
const winSound = new Audio("/sound/game_win.mp3")
const alertSound = new Audio("/sound/alert.wav")


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