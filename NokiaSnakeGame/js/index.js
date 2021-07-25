/* 
1. Instead of window.setinterval use  window.requestAnimationFrame(main); 
2. In Javascript x an y are measured by keeping top right as origin (0,0)
3. array unshift adds element adds at begining of array

*/
//let board = document.getElementById('board');

let direction = {x:0 ,y:0};
const soundFood = new Audio("/music/food.mp3");
const soundgameover = new Audio("/music/gameover.mp3");
const soundMove= new Audio("/music/move.mp3");
const soundGamePlay = new Audio("/music/music.mp3");


let gridsize = 28;
let lastframeupdate = 0;
let fps = 150;
//let fpsspeed = .005;
let inputMovement = {x : 0, y : 0};

let snakearr = [
    { x : 13 , y :15 }
];
let foodpos = {x: 10,y:12}

let score = 0;

let hscore = 0;

// Game Functions
// In game after every frame position and diplay is refreshed

function main(ctime){
    window.requestAnimationFrame(main);
    //fps = 1/fpsspeed;
    if((ctime-lastframeupdate) < fps)
        return;
    //console.log(ctime);
    lastframeupdate = ctime;

    gameEngine();
}


function isCollided()
{
    if(snakearr[0].x == 0 || snakearr[0].x == gridsize || snakearr[0].y == 0 || snakearr[0].y == gridsize)
        return true;
    return false;
}

function gameEngine()
{
    // update snake and food location
    // snakearr will contain the location for showing snake blocks

    // logic when collide
    if(isCollided())
    {
        soundgameover.play();
        alert("Game Over !! Your Score : " + score);
        if(score > hscore)
            hscore = score;
        score = 0;
        let scoreh4 = document.getElementById('hscore');
        scoreh4.innerHTML = 'High Score ' + hscore;
        // reset 
        snakearr = [{ x : 13 , y :15 }];
        foodpos = {x: 10,y:12};
        inputMovement = {x : 0, y : 0};
        fps = 150;
    }

    // logic for food eaten -- include food into snakearr as head in inputmovement direction
    if(snakearr[0].x === foodpos.x && snakearr[0].y === foodpos.y)
    {
        snakearr.unshift({x : snakearr[0].x + inputMovement.x , 
        y : snakearr[0].y + inputMovement.y});


        // update food new location
        // generate random number between a to b
        let a = 2 , b = gridsize-2;
        r_num = a + (b - a) * Math.random();
        r_num = Math.round(r_num);
        foodpos = {
            x : r_num, y : r_num-1
        }

        // increment score
        score++;

        switch(score){
            case 5:
                fps = 120; 
                break;
            case 10:
                fps = 100; 
                break;
            case 15:
                fps = 80; 
                break;
            case 20:
                fps = 70; 
                break;
            default:
                break;
        }


    }
    let scoreh4 = document.getElementById('score');
    scoreh4.innerHTML = 'Score ' + score;

      // move snake continuously to one position in the direction of input movement in every frame by shifting all elements
    
    
    if(snakearr.length > 1){
        for(let i = snakearr.length-1; i >= 0 ; i--)
        {
            console.log(i);
            //console.log(snakearr[i].x);
            //console.log(snakearr[i].y);
            if(i == 0){
                snakearr[0].x = snakearr[0].x + inputMovement.x;
                snakearr[0].y = snakearr[0].y + inputMovement.y;
                
            }
            else{
                let new_x = snakearr[i-1].x;
                let new_y = snakearr[i-1].y;
                
                snakearr[i].x = new_x;
                snakearr[i].y = new_y;
            }


        }
    }
    else{
        snakearr[0].x = snakearr[0].x + inputMovement.x;
        snakearr[0].y = snakearr[0].y + inputMovement.y;
    }


    // display snake and food
    // create a div and set grid start location and append in board 

    board.innerHTML = "";

    // Display Snake 
    snakearr.forEach((e,index) => {
        let snakeElement = document.createElement('div');
        if(index == 0){
            snakeElement.classList.add('shead');
        }
        else{
            snakeElement.classList.add('sbody');
        }
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;
        board.appendChild(snakeElement);
    });

// Display Food
let foodElement = document.createElement('div');
foodElement.classList.add('food');
foodElement.style.gridColumnStart = foodpos.x;
foodElement.style.gridRowStart = foodpos.y;
board.appendChild(foodElement);
}

// Game play functions
window.requestAnimationFrame(main);

// Start on any key press and set direction
window.addEventListener('keydown',function(e){
    soundMove.play();
    // x = 1 means x = x + 1 right move
    // x = -1 means x = x - 1 left move
    // x = 0 means moving up or down
    
    switch(e.key){
        case 'ArrowRight' :
            console.log('ArrowRight')
            inputMovement.x = 1;
            inputMovement.y = 0;
            break;
        case 'ArrowLeft' :
            console.log('ArrowLeft')
            inputMovement.x = -1;
            inputMovement.y = 0;
            break;
        case 'ArrowUp' :
            console.log('ArrowUp')
            inputMovement.x = 0;
            inputMovement.y = -1;
            break;
        case 'ArrowDown' :
            console.log('ArrowDown')
            inputMovement.x = 0;
            inputMovement.y = 1;
            break;
        default:
            console.log(e.key);
            

    }
})