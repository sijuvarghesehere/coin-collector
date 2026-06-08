const player = document.getElementById("player");
const coin = document.getElementById("coin");

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

let score = 0;
let timeLeft = 60;

let playerX = 180;
let playerY = 400;

const step = 20;

function placeCoin() {
    const x = Math.floor(Math.random() * 340);
    const y = Math.floor(Math.random() * 440);

    coin.style.left = x + "px";
    coin.style.top = y + "px";
}

placeCoin();

function updatePlayer() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    checkCollision();
}

function move(direction) {

    if(timeLeft <= 0) return;

    switch(direction){

        case "up":
            playerY -= step;
            break;

        case "down":
            playerY += step;
            break;

        case "left":
            playerX -= step;
            break;

        case "right":
            playerX += step;
            break;
    }

    playerX = Math.max(0, Math.min(playerX, 360));
    playerY = Math.max(0, Math.min(playerY, 460));

    updatePlayer();
}

function checkCollision(){

    const playerRect = player.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    if(
        playerRect.left < coinRect.right &&
        playerRect.right > coinRect.left &&
        playerRect.top < coinRect.bottom &&
        playerRect.bottom > coinRect.top
    ){
        score++;
        scoreEl.textContent = score;
        placeCoin();
    }
}

document.getElementById("up").onclick = () => move("up");
document.getElementById("down").onclick = () => move("down");
document.getElementById("left").onclick = () => move("left");
document.getElementById("right").onclick = () => move("right");

document.addEventListener("keydown", (e)=>{

    if(e.key==="ArrowUp") move("up");
    if(e.key==="ArrowDown") move("down");
    if(e.key==="ArrowLeft") move("left");
    if(e.key==="ArrowRight") move("right");

});

const timer = setInterval(()=>{

    timeLeft--;

    timerEl.textContent = timeLeft;

    if(timeLeft <= 0){

        clearInterval(timer);

        document.getElementById("finalScore").textContent = score;

        document.getElementById("gameOver").classList.remove("hidden");
    }

},1000);

updatePlayer();