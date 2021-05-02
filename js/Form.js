/*


The body of an HTML page can contain several different types of elements-
- h1, h2, h3, h4, h5, h6: display headings of different scales.

- input: to collect input from the user. INPUT BOX
- button: to display a button. and perform update on click

This model of an HTML page is called Document object Model (or DOM).
We will be using the p5 Dom library to create the form.

*/

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
class Form {

  constructor() {
    this.inputBox = createInput("Name");
    this.playButton = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.resetButton = createButton('Reset');
  }

   /*
   function defintion to hide all parameters on form
  */
  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.inputBox.hide();
    this.title.hide();
  }

  
  /*
    function definition to display all the input to all parameters on FORM
  */
  display() {
    this.title.html("Car Racing Game");
    this.title.position(displayWidth / 2 - 50, 0);

    this.inputBox.position(displayWidth / 2 - 40, displayHeight / 2 - 80);

    this.playButton.position(displayWidth / 2 + 30, displayHeight / 2);
    /*
    play.mousePressed() will update fields in dattabase as follows:
      --playerCount by 1 each time play button is clicked.
      --player records with 
         INDEX with the sequence of the play button is clicked
         NAME  with the added input as name 
         DISTANCE as 0(ZERO) at the start of the program
      
    button.mousePressed() can be used to trigger an action when a mouse button is pressed. 
    It expects a function as an argument. The code to display a greeting and update the 
    database when button is pressed.
    
    Arrow functions bind the function to the original object which calls it.
    Here mousePressed is called inside the display function which is called by
    the form object. 
         
    ())=> Arrow function ensures that 'this' remains bound to
    the form object.
   */
    this.playButton.mousePressed(() => {

      this.inputBox.hide();
      this.playButton.hide();

      playerObj.name = this.inputBox.value();
      playerCount += 1;
      playerObj.index = playerCount;

      /*
        function call to change existing values of player records: NAME and DISTANCE
        to a new one based based on the indes(number of the player) in the database
      */
      playerObj.updatePlayerInfo();

      /*
        function call to change existing value of playerCount to a new one based on the value of paramter passed in the database
      */
      playerObj.updateCount(playerCount);

      this.greeting.html("Hello " + playerObj.name);
      this.greeting.position(displayWidth / 2 - 70, displayHeight / 4);
    });


    this.resetButton.position(displayWidth / 2, displayHeight - 10);
    /*
     reset.mousePressed() will update fields in database as follows:
       ----  gameState to 0(ZERO)
       ----  playerCount to 0(ZERO)
  
     button.mousePressed() can be used to trigger an action when a mouse button is pressed. 
     It expects a function as an argument. The code to display a greeting and update the 
     database when button is pressed.

     Arrow functions bind the function to the original object which calls it.
     Here mousePressed is called inside the display function which is called by
     the form object. 
     
     ()=> Arrow function ensures that 'this' remains bound to
     the form object.
    */
    this.resetButton.mousePressed(() => {
      /*
       function call to change existing value of playerCount to a new one based on the value of paramter passed in the database
     */
      playerObj.updateCount(0);

      /*
        function call to change existing value of gameState to a 
        new one based on the value of paramter passed in the database
     */
      gameObj.updateState(0);
    });

  }
}

