var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var widthH = cvs.width;
var heightH = cvs.height;
var unitBox = 10;
var snake = [];
var dec=0;
var score = 0;
var color = ['red', 'blue', 'yellow', 'black', 'grey', 'green', 'orange','teal','purple','maroon','lime','olive','navy','aqua',
'fuchsia','silver'];


ctx.fillStyle = '#7CFC00';
ctx.fillRect(0,0,700,700);


document.addEventListener("keydown",direction);

var d;
function direction(e){
    if(e.keyCode == 37 && d != "right")
        {
            d = "left";
        }
    else if(e.keyCode == 38 && d != "down")
        {
            d = "up";
        }
    else if(e.keyCode == 39 && d != "left")
        {
            d = "right";
        }
    else if(e.keyCode == 40 && d != "up")
        {
            d = "down";
        }
}

function collision(head,array)
    {
        for(var i = 0 ; i < array.length ; i++)
            {
                if(head.x == array[i].x && head.y == array[i].y)
                    {
                        return true;
                    }
            }
        return false;
    }



for(var i = 0 ; i<=3 ; i++)
    { 
        snake.push( {
            x:(widthH/2)-dec,
            y:heightH/2
            });
     
     dec+=10;
    }


let food = {
    x : Math.floor(Math.random() * 70) * unitBox,
    y : Math.floor(Math.random() * 70) * unitBox
}


function draw(){
    ctx.fillStyle = '#7CFC00';
    ctx.fillRect(0,0,700,700);
    
    for(i=0;i<snake.length;i++)
        {
            var STYLE = color[Math.floor(Math.random() * color.length)];
            ctx.fillStyle = STYLE;
            // ctx.fillStyle = (i==0)? "#000000" : "#ffffff";
            ctx.fillRect(snake[i].x,snake[i].y,unitBox,unitBox);
            ctx.strokeRect(snake[i].x,snake[i].y,unitBox,unitBox);
        }
    ctx.fillStyle = "#672E3B";
    ctx.fillRect(food.x,food.y,unitBox,unitBox);
    ctx.strokeRect(food.x,food.y,unitBox,unitBox);
     
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    
    if(d == "left")
        {
            snakeX -= unitBox;
        }
    if(d == "up")
        {
            snakeY -= unitBox;
        }
    if(d == "right")
        {
            snakeX += unitBox;
        }
    if(d == "down")
        {
            snakeY += unitBox;
        }
    
    
    if(snakeX == food.x && snakeY == food.y)
        {
            score++;
            food = {
            x : Math.floor(Math.random() * 70) * unitBox,
            y : Math.floor(Math.random() * 70) * unitBox
            }
        }else{
            snake.pop();
        }
    
    var newHead = {x:snakeX,y:snakeY};
    
    // GAME OVER CONDITIONS
    if(snakeX < 0 || snakeX > 70 * unitBox || snakeY < 0 || snakeY > 70 * unitBox)
        {
            clearInterval(game);
             
        }
    
    
    
    
    snake.unshift(newHead); 
    
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(score,20,20);
   
}

var game =setInterval(draw,100);
