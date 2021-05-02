/*
-> databaseReference.on() creates a listener which keeps listening to the
gameState from the database. When the gameState is changed in
the database, the function passed as an argument to it is executed.
Note: Here the function is directly written inside the .on() listener.

-> databaseReference.update() will update the database reference.
Here "/" refers to the main database inside which gameState is created.


writing code to create objects even though the blueprint/ CLASS isn't
defined yet. This is called writing code using abstraction
*/

class Game {
  constructor() {

  }

  /*
      function definition to get/read/retrieve existing value of gameState from database
  */
  getState() {
    var gameStateRef = databaseObj.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  updateState(state) {
    databaseObj.ref('/').update({
      gameState: state
    });
  }

  /*
    function defintion to start the GAME i.e. gameState will remain in WAIT(0) state 
    displaying the FORM until all 4 players are registered
  */
  async start() {
    if (gameState === 0) { //as long as gameState is on WAIT
      playerObj = new Player(); //generate a new player

      var playerCountRef = await databaseObj.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        playerObj.getCount(); //get the number of players registered
      }

      formObj = new Form(); //create new form for registration
      formObj.display(); //display the generated form
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1Img", car1Img);

    car2 = createSprite(300, 200);
    car2.addImage("car2Img", car2Img);

    car3 = createSprite(500, 200);
    car3.addImage("car3Img", car3Img);

    car4 = createSprite(700, 200);
    car4.addImage("car4Img", car4Img);

    cars = [car1, car2, car3, car4];

  }

  /*
    function defintion to activate the game to START 1 mode and 
    aligned all players to starting positions at the start line
  */
  play() {
    formObj.hide();
    //textSize(30);
    //text("Game Start", 120, 100);

    /*
        static function call to retrieve existing player records: name and distance 
        value for all registered players according to the index in the database  
    */
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(groundImg);

      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === playerObj.index) {
          cars[index - 1].shapeColor = "red";

          //assigning camera with the same position with the car
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;

          //Creating an indicator
          fill('yellow');
          stroke("yellow");
          strokeWeight(10);
          ellipse(x, y, 90, 90);

        }
        else {
          cars[index - 1].shapeColor = "black";
          //no indicator will be assigned
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if (keyIsDown(UP_ARROW) && playerObj.index !== null) {
      playerObj.distance += 40;

      /*
        function call to change existing value in the data base of distance and name to a 
        new one based on the value of captured 
      */
      playerObj.updatePlayerInfo();
      console.log("Distance covered during race: " + playerObj.distance);
    }
    if (playerObj.distance == 5300) {
      console.log(playerObj.name + " has completed the race");
      //gameState = 2;
      console.log("Distance covered: " + playerObj.distance);

      //updating rank of individual players
      playerObj.rank += 1;

      /*
        function call to change existing value in the data base of distance and name to a 
        new one based on the value of captured 
      */
      playerObj.updatePlayerInfo();
      /*
             static function call to change existing value of carsAtEnd to a 
              new one based on the value of paramter passed in the database
      */
      Player.updateCarsAtEnd(playerObj.rank);

    }
    
    drawSprites();
  }

  /*
  function call to end the game from gameState 1 to 2 and display leaderboard with ranks for each player
  */
  end() {

  }

}