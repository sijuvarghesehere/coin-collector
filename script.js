const player = document.getElementById("player");
const coin = document.getElementById("coin");
const magnet = document.getElementById("magnet");

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const bestScoreEl = document.getElementById("bestScore");
const levelEl = document.getElementById("level");
const goalText = document.getElementById("goalText");

const gameArea =
document.getElementById("gameArea");

const gameOverScreen =
document.getElementById("gameOver");

const pauseScreen =
document.getElementById("pauseScreen");

const pauseBtn =
document.getElementById("pauseBtn");

const resumeBtn =
document.getElementById("resumeBtn");

const finalScore =
document.getElementById("finalScore");

const floatingScore =
document.getElementById("floatingScore");

const knob =
document.getElementById("joystickKnob");

const PLAYER_SIZE = 72;
const COIN_SIZE = 56;

let score = 0;
let timeLeft = 60;

let level = 1;
let goal = 20;

let paused = false;

let playerX = 0;
let playerY = 0;

let moveX = 0;
let moveY = 0;

let magnetActive = false;

const obstacles = [];

let bestScore =
localStorage.getItem("bestScore") || 0;

bestScoreEl.textContent =
bestScore;

/* --------------------------
OBSTACLES
--------------------------- */

function setupObstacles(){

```
const ids = [

    "tree1",
    "tree2",
    "tree3",

    "rock1",
    "rock2",
    "rock3"
];

ids.forEach(id=>{

    const el =
    document.getElementById(id);

    const x =
    Math.random() *
    (gameArea.clientWidth - 100);

    const y =
    Math.random() *
    (gameArea.clientHeight - 150);

    el.style.left =
    x + "px";

    el.style.top =
    y + "px";

    obstacles.push(el);
});
```

}

/* --------------------------
COIN
--------------------------- */

function placeCoin(){

```
const maxX =
gameArea.clientWidth - COIN_SIZE;

const maxY =
gameArea.clientHeight - COIN_SIZE;

coin.style.left =
Math.random()*maxX + "px";

coin.style.top =
Math.random()*maxY + "px";
```

}

/* --------------------------
MAGNET
--------------------------- */

function spawnMagnet(){

```
const maxX =
gameArea.clientWidth - 64;

const maxY =
gameArea.clientHeight - 64;

magnet.style.display =
"block";

magnet.style.left =
Math.random()*maxX + "px";

magnet.style.top =
Math.random()*maxY + "px";
```

}

setInterval(()=>{

```
if(
    paused ||
    magnetActive ||
    timeLeft <= 0
) return;

spawnMagnet();
```

},15000);

/* --------------------------
PLAYER
--------------------------- */

function updatePlayer(){

```
player.style.left =
playerX + "px";

player.style.top =
playerY + "px";
```

}

/* --------------------------
COLLISION
--------------------------- */

function isObstacleCollision(){

```
const p =
player.getBoundingClientRect();

for(
    let obstacle of obstacles
){

    const o =
    obstacle.getBoundingClientRect();

    if(

        p.left < o.right &&
        p.right > o.left &&
        p.top < o.bottom &&
        p.bottom > o.top

    ){

        return true;
    }
}

return false;
```

}

function checkCoinCollision(){

```
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

    floatingScore.style.left =
    playerX + "px";

    floatingScore.style.top =
    playerY + "px";

    floatingScore.classList.remove(
        "scorePop"
    );

    void floatingScore.offsetWidth;

    floatingScore.classList.add(
        "scorePop"
    );

    placeCoin();

    checkLevel();
}
```

}

function checkMagnetCollision(){

```
if(
    magnet.style.display ===
    "none"
) return;

const p =
player.getBoundingClientRect();

const m =
magnet.getBoundingClientRect();

if(

    p.left < m.right &&
    p.right > m.left &&
    p.top < m.bottom &&
    p.bottom > m.top

){

    magnet.style.display =
    "none";

    magnetActive = true;

    setTimeout(()=>{

        magnetActive = false;

    },10000);
}
```

}

/* --------------------------
LEVELS
--------------------------- */

function checkLevel(){

```
if(score >= goal){

    level++;

    goal += 20;

    levelEl.textContent =
    level;

    goalText.textContent =
    "Collect " + goal +
    " Coins";

    timeLeft += 15;
}
```

}

/* --------------------------
GAME LOOP
--------------------------- */

function gameLoop(){

```
if(paused){

    requestAnimationFrame(
        gameLoop
    );

    return;
}

const oldX =
playerX;

const oldY =
playerY;

playerX += moveX;
playerY += moveY;

const maxX =
gameArea.clientWidth -
PLAYER_SIZE;

const maxY =
gameArea.clientHeight -
PLAYER_SIZE;

playerX =
Math.max(
    0,
    Math.min(
        maxX,
        playerX
    )
);

playerY =
Math.max(
    0,
    Math.min(
        maxY,
        playerY
    )
);

updatePlayer();

if(
    isObstacleCollision()
){

    playerX = oldX;
    playerY = oldY;

    updatePlayer();
}

checkCoinCollision();

checkMagnetCollision();

if(magnetActive){

    const coinX =
    parseFloat(
        coin.style.left
    );

    const coinY =
    parseFloat(
        coin.style.top
    );

    coin.style.left =
    coinX +
    ((playerX-coinX)*0.05)
    + "px";

    coin.style.top =
    coinY +
    ((playerY-coinY)*0.05)
    + "px";
}

requestAnimationFrame(
    gameLoop
);
```

}

/* --------------------------
JOYSTICK
--------------------------- */

knob.addEventListener(
"pointermove",
(e)=>{

```
if(e.buttons !== 1)
return;

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
Math.sqrt(
    dx*dx +
    dy*dy
);

const scale =
dist > max ?
max/dist : 1;

const x =
dx * scale;

const y =
dy * scale;

knob.style.left =
(32+x)+"px";

knob.style.top =
(32+y)+"px";

moveX = x/8;
moveY = y/8;
```

});

knob.addEventListener(
"pointerup",
()=>{

```
knob.style.left =
"32px";

knob.style.top =
"32px";

moveX = 0;
moveY = 0;
```

});

/* --------------------------
KEYBOARD
--------------------------- */

document.addEventListener(
"keydown",
(e)=>{

```
if(e.key==="ArrowUp")
    moveY=-3;

if(e.key==="ArrowDown")
    moveY=3;

if(e.key==="ArrowLeft")
    moveX=-3;

if(e.key==="ArrowRight")
    moveX=3;
```

});

document.addEventListener(
"keyup",
()=>{

```
moveX=0;
moveY=0;
```

});

/* --------------------------
PAUSE
--------------------------- */

pauseBtn.addEventListener(
"click",
()=>{

```
paused = true;

pauseScreen.classList.add(
    "show"
);
```

});

resumeBtn.addEventListener(
"click",
()=>{

```
paused = false;

pauseScreen.classList.remove(
    "show"
);
```

});

/* --------------------------
TIMER
--------------------------- */

const timer =
setInterval(()=>{

```
if(paused)
return;

timeLeft--;

timerEl.textContent =
timeLeft;

if(timeLeft <= 0){

    clearInterval(
        timer
    );

    if(
        score >
        bestScore
    ){

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
```

},1000);

/* --------------------------
RESTART
--------------------------- */

document
.getElementById(
"restartBtn"
)
.addEventListener(
"click",
()=>location.reload()
);

/* --------------------------
START
--------------------------- */

window.addEventListener(
"load",
()=>{

```
playerX =
(gameArea.clientWidth/2)
-
(PLAYER_SIZE/2);

playerY =
(gameArea.clientHeight/2)
-
(PLAYER_SIZE/2);

updatePlayer();

placeCoin();

setupObstacles();

gameLoop();
```

});
