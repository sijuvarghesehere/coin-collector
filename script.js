const player = document.getElementById("player");
const coin = document.getElementById("coin");

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const bestScoreEl = document.getElementById("bestScore");

const gameOverScreen =
document.getElementById("gameOver");

const finalScore =
document.getElementById("finalScore");

const knob =
document.getElementById("joystickKnob");

const PLAYER_SIZE = 72;
const COIN_SIZE = 56;

let score = 0;
let timeLeft = 60;

let playerX = 0;
let playerY = 0;

let moveX = 0;
let moveY = 0;

let bestScore =
localStorage.getItem("bestScore") || 0;

bestScoreEl.textContent =
bestScore;

function placeCoin(){

    const gameArea =
    document.getElementById("gameArea");

    const maxX =
    gameArea.clientWidth - COIN_SIZE;

    const maxY =
    gameArea.clientHeight - COIN_SIZE;

    coin.style.left =
    Math.random()*maxX + "px";

    coin.style.top =
    Math.random()*maxY + "px";
}

function updatePlayer(){

    player.style.left =
    playerX + "px";

    player.style.top =
    playerY + "px";

    checkCollision();
}

function gameLoop(){

    const gameArea =
    document.getElementById("gameArea");

    const maxX =
    gameArea.clientWidth - PLAYER_SIZE;

    const maxY =
    gameArea.clientHeight - PLAYER_SIZE;

    playerX += moveX;
    playerY += moveY;

    playerX =
    Math.max(0,
    Math.min(maxX,playerX));

    playerY =
    Math.max(0,
    Math.min(maxY,playerY));

    updatePlayer();

    requestAnimationFrame(gameLoop);
}

function checkCollision(){

    const p =
    player.getBoundingClientRect();

    const c =
    coin.getBoundingClientRect();

    if(

        p.left < c.right &&
        p.right > c.left &&
        p.top < c.bottom &&
        p.bottom > c.top

    ){

        score++;

        scoreEl.textContent =
        score;

        placeCoin();
    }
}

knob.addEventListener(
"pointermove",
(e)=>{

    if(e.buttons !== 1) return;

    const rect =
    knob.parentElement
    .getBoundingClientRect();

    const centerX =
    rect.left + 60;

    const centerY =
    rect.top + 60;

    const dx =
    e.clientX - centerX;

    const dy =
    e.clientY - centerY;

    const max = 30;

    const dist =
    Math.sqrt(dx*dx+dy*dy);

    const scale =
    dist > max ? max/dist : 1;

    const x = dx*scale;
    const y = dy*scale;

    knob.style.left =
    (32+x)+"px";

    knob.style.top =
    (32+y)+"px";

    moveX = x/8;
    moveY = y/8;
});

knob.addEventListener(
"pointerup",
()=>{

    knob.style.left = "32px";
    knob.style.top = "32px";

    moveX = 0;
    moveY = 0;
});

document.addEventListener(
"keydown",
(e)=>{

    if(e.key==="ArrowUp")
        moveY=-3;

    if(e.key==="ArrowDown")
        moveY=3;

    if(e.key==="ArrowLeft")
        moveX=-3;

    if(e.key==="ArrowRight")
        moveX=3;
});

document.addEventListener(
"keyup",
()=>{

    moveX=0;
    moveY=0;
});

const timer =
setInterval(()=>{

    timeLeft--;

    timerEl.textContent =
    timeLeft;

    if(timeLeft<=0){

        clearInterval(timer);

        if(score>bestScore){

            localStorage.setItem(
                "bestScore",
                score
            );
        }

        finalScore.textContent =
        score;

        gameOverScreen
        .classList
        .add("show");
    }

},1000);

document
.getElementById("restartBtn")
.addEventListener(
"click",
()=>location.reload()
);

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

    placeCoin();

    gameLoop();
});
