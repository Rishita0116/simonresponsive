var color=["red","blue","yellow","green"];

var gamePattern=[];
var userPattern=[];

var started=false;
var level=0;

if(window.innerWidth<1040){
    $("#level-title").text("Click here to Start");
}

$(document).on("keypress",function(){
    gameStart();
});

function gameStart(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
}

$(".btn").on("click", function(){
    var userChosenColor=$(this).attr("id");

    userPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    changeLogoColor(userChosenColor);

    checkAns(userPattern.length-1);
    //console.log(userPattern);
});

function checkAns(currLevel){
    if(gamePattern[currLevel]===userPattern[currLevel]){
        //console.log("success");
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        //console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        if(window.innerWidth<1040){
            $("#level-title").html("Game Over!<br>Click here to restart");
        }
        else{
            $("#level-title").html("Game Over!<br>Press Any Key to Restart");
        }
        startOver();
    }
}

function nextSequence(){
    userPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNum=Math.floor(Math.random()*4);
    var randomChosenColor=color[randomNum];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(color){
    var audio=new Audio("sounds/"+ color+ ".mp3");
    audio.play();
}

function animatePress(currColor){
    $("#"+ currColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currColor).removeClass("pressed");
    },150);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


//Game logo
function changeLogoColor(color){
    $("#game").css("color",color);
}