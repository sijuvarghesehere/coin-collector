const player = document.getElementById("player");
const coin = document.getElementById("coin");

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

const gameOverScreen =
document.getElementById("gameOver");

const finalScore =
document.getElementById("finalScore");

const PLAYER_SIZE = 64;
const COIN_SIZE = 48;

let score = 0;
let timeLeft = 60;

let playerX = 0;
let playerY = 0;

const step = 20;

/* PLACE COIN */

function placeCoin(){

    const gameArea =
    document.getElementById("gameArea");

    const maxX =
    gameArea.clientWidth - COIN_SIZE;

    const maxY =
    gameArea.clientHeight - COIN_SIZE;

    const x =
    Math.random() * maxX;

    const y =
    Math.random() * maxY;

    coin.style.left = x + "px";
    coin.style.top = y + "px";
}

/* UPDATE PLAYER */

function updatePlayer(){

    player.style.left =
    playerX + "px";

    player.style.top =
    playerY + "px";

    checkCollision();
}

/* MOVE */

function move(direction){

    if(timeLeft <= 0) return;

    const gameArea =
    document.getElementById("gameArea");

    const maxX =
    gameArea.clientWidth - PLAYER_SIZE;

    const maxY =
    gameArea.clientHeight - PLAYER_SIZE;

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

    playerX =
    Math.max(0,
    Math.min(playerX,maxX));

    playerY =
    Math.max(0,
    Math.min(playerY,maxY));

    updatePlayer();
}

/* COLLISION */

function checkCollision(){

    const playerRect =
    player.getBoundingClientRect();

    const coinRect =
    coin.getBoundingClientRect();

    if(

        playerRect.left <
        coinRect.right &&

        playerRect.right >
        coinRect.left &&

        playerRect.top <
        coinRect.bottom &&

        playerRect.bottom >
        coinRect.top

    ){

        score++;

        scoreEl.textContent =
        score;

        placeCoin();
    }
}

/* BUTTONS */

document.getElementById("up")
.onclick = () => move("up");

document.getElementById("down")
.onclick = () => move("down");

document.getElementById("left")
.onclick = () => move("left");

document.getElementById("right")
.onclick = () => move("right");

/* KEYBOARD */

document.addEventListener(
"keydown",
(e)=>{

    if(e.key==="ArrowUp")
        move("up");

    if(e.key==="ArrowDown")
        move("down");

    if(e.key==="ArrowLeft")
        move("left");

    if(e.key==="ArrowRight")
        move("right");
});

/* TIMER */

const timer =
setInterval(()=>{

    timeLeft--;

    timerEl.textContent =
    timeLeft;

    if(timeLeft <= 0){

        clearInterval(timer);

        finalScore.textContent =
        score;

        gameOverScreen
        .classList
        .add("show");
    }

},1000);

/* RESTART */

document
.getElementById("restartBtn")
.addEventListener(
"click",
()=>location.reload()
);

/* START GAME */

window.addEventListener(
"load",
()=>{

    const gameArea =
    document.getElementById(
        "gameArea"
    );

    playerX =
    (gameArea.clientWidth/2)
    - (PLAYER_SIZE/2);

    playerY =
    (gameArea.clientHeight/2)
    - (PLAYER_SIZE/2);

    updatePlayer();

    placeCoin();
});
