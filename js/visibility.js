export default class Visibility {
constructor(){
    this.playBtn = document.querySelector(".play-btn");
    this.timer = document.querySelector(".timer");
    this.score = document.querySelector(".score")
    }

    
showStop() {
    this.playBtn.style.visibility = "visible"
    this.playBtn.innerHTML = `<i class="fas fa-stop"></i>`

}

showTimerAndScore(itemCount) {
    this.timer.style.visibility = "visible";
    this.score.style.visibility = "visible";
    this.score.innerText = itemCount;
}

hideStart() {
    this.playBtn.style.visibility = "hidden"
}

}