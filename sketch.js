/*
C - 40: Car racing game stage 5

Developer: 

Goals:
● Create new database fields to track status of each player throughout the game.

● Create a leaderboard for the last gameState.

● Display the rank of each player when the game ends.

*/

//Declare variables for game objects and behaviour indicators(FLAGS)
var canvas, backgroundImage;
var databaseObj;

var formObj;
var gameObj, gameState;
var playerObj, playerCount, allPlayers;

var car1, car2, car3, car4, cars;
var track, car1Img, car2Img, car3Img, car4Img, groundImg;

var carsAtFinishLine;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
    track = loadImage("images/track.jpg");
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
    groundImg = loadImage("images/ground.png");
}

//define the initial environment of the software(before it is used)
//by defining the declared variables with default values
function setup() {
    createCanvas(displayWidth - 20, displayHeight - 30);

    //initialize the database
    databaseObj = firebase.database();

    gameObj = new Game();

    gameState = 0; //0=WAIT, 1=PLAY, 2=END

    //function call to retrieve existing value of gameState from database
    gameObj.getState();

    //function call to start the GAME i.e. gameState will activate  0 WAIT state
    gameObj.start();

}

//All modifications, changes, conditions, manipulations, actionscommands to be executed and checked, continuously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
    background("white");

    //conditions for GAMESTATE to change from 0 to 1 to 2
    if (playerCount === 4) {
        /*
             function call to change existing value of gameState to a 
             new one based on the value of paramter passed in the database
        */
        gameObj.updateState(1);
    }
    else if (carsAtFinishLine === 4){
         /*
             function call to change existing value of gameState to a 
             new one based on the value of paramter passed in the database
        */
             gameObj.updateState(2);
    }

    if (gameState === 1) {
        clear();
        /*
            function call to activate the game to START 1 mode and 
            aligned all players to starting positions at the start line
        */
        gameObj.play();
    }
    else if (gameState == 2) {
        clear();
         /*
            function call to end the game from gameState 1 to 2 and display leaderboard with ranks for each player
        */
        gameObj.end();
    }

}

/* READ READ READ READ

CRUD - creating READING UPDATING DELETING

.ref() is used to refer to the location of the
database value(field) we care about.

.on() creates a listener which keeps
listening to the changes in the database.

.set() is used to set the value in the
database



READ READ READ READ */