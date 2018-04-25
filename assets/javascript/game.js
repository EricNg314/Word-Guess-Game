
//Initializing possible outcomes and entries.
var potentialGuess = ["a", "b", "c", "d", "e",
    "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o",
    "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y",
    "z"];

var potentialWords = ["fish", "beef", "chicken", "grape", "apple"];


//Creating variables for records.
var resetGuesses = 14; //Initializing # of guesses to be 9.
var scoreWin = 0;
var scoreLoss = 0;
var guessesLeft = resetGuesses; //Setting guesses remaining to initialize with reset.
var currWordArray = [];
var currWordRevealed = [];
var currWordDisplay = "";
var prevGuesses = []; //Creating empty array.
var gameInitiated;

var selectedWord = potentialWords[Math.floor(Math.random() * potentialWords.length)];
console.log(selectedWord); //Display word selected by computer.

for (var i = 0; i < selectedWord.length; i++) {
    currWordArray.push(selectedWord.charAt(i));
    currWordRevealed.push(" _ ");
}


for (var j = 0; j < currWordRevealed.length; j++) {
    currWordDisplay += " " + currWordRevealed[j] + " ";
}

console.log(currWordArray);
console.log(currWordRevealed);
console.log(currWordDisplay);

document.onkeyup = function () {
    //Storing user input as "userGuess" and turning it lower case for comparison.
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(userGuess); //Display for reference of user choice.



    if (userGuess === " ") {
        gameInitiated = true;
        //Setting information to be provided to html with id=game.
        var html = "<p>What food am I thinking?</p>" +
            "<p>Current Word</p>" +
            "<p>" + currWordDisplay + "</p>" +
            "<p> _________________________ </p>" +
            "<p>Wins: " + scoreWin + "</p>" +
            "<p>Losses: " + scoreLoss + "</p>" +
            "<p>Guesses Left: " + guessesLeft + "</p>" +
            "<p>Your guesses so far: " + prevGuesses + "</p>";

        //Set id game to be html variable.
        document.querySelector('#game').innerHTML = html;

    } else if (gameInitiated === true) {
        for (var i = 0; i < currWordArray.length; i++) {
            if (userGuess === currWordArray[i]) {
                currWordRevealed[i] = currWordArray[i];
            }
        }
        //setting word display to black to avoid writing ontop of itself.
        currWordDisplay = "";

        for (var j = 0; j < currWordRevealed.length; j++) {
            currWordDisplay += " " + currWordRevealed[j] + " ";
        }
        guessesLeft--;
        console.log(currWordRevealed);


    }

    //Setting information to be provided to html with id=game.
    var html = "<p>What food am I thinking?</p>" +
        "<p>Current Word</p>" +
        "<h3>" + currWordDisplay + "</h3>" +
        "<p> _________________________ </p>" +
        "<p>Wins: " + scoreWin + "</p>" +
        "<p>Losses: " + scoreLoss + "</p>" +
        "<p>Guesses Left: " + guessesLeft + "</p>" +
        "<p>Your guesses so far: " + prevGuesses + "</p>";

    //Modify variable html to include invalid entry statement.
    if (potentialGuess.indexOf(userGuess) === -1) {
        html += "<br><h4>Your entry is not a letter.</h4>"
    }

    //Set id game to be html variable.
    document.querySelector('#game').innerHTML = html;
}