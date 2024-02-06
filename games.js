var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var lv = 0;
var isGameStarted = false;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    lv++;
    $("h1#level-title").text(`Level ${lv}`);
}

function checkPattern(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
                userClickedPattern.length = 0;
            }, 1000);
        }
    }else{
        console.log("fail");
        playSound("wrong");
        $("body").toggleClass("game-over");
        $("h1#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(()=> {
            $("body").toggleClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    userClickedPattern.length = 0;
        gamePattern.length = 0;
        lv = 0;
        isGameStarted = false;
}

function playSound(name){
    new Audio(`./sounds/${name}.mp3`).play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).toggleClass("pressed");

    setTimeout(() => {
        $(`#${currentColor}`).toggleClass("pressed");
    }, 100);
}

$(`.btn`).on("click", function(event){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkPattern(userClickedPattern.length - 1);
});

$(document).on("keypress", function(){
    if(!isGameStarted){
        nextSequence();
        isGameStarted = true;
    }
});