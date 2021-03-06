
//Initializing possible outcomes and entries.
var potentialGuess = ["a", "b", "c", "d", "e",
    "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o",
    "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y",
    "z"];

// var potentialWords = ["fish"];
var potentialWords = ["fish", "pumpkin", "chicken", "lychee", "apple",
    "borscht", "sago", "tapioca", "dumpling", "lobster"];


//Creating variables for records.
var resetGuesses = 14; //Initializing # of guesses to be 9.
var scoreWin = 0;
var scoreLoss = 0;
var guessesLeft = resetGuesses; //Setting guesses remaining to initialize with reset.
var currWordArray = [];
var currWordRevealed = [];
var currWordDisplay = "";
var prevGuesses = []; //Creating empty array.
var gameInitiated = false;
var goodGuess = false;
var currWordDisplay = "";
var selectedWord = getNewWord()

// debugError()
currWordRevealed = getWordRevealed(selectedWord);
currWordDisplay = getWordDisplay();


// debugError()
// console.log(selectedWord);

document.onkeyup = function () {
    //Storing user input as "userGuess" and turning it lower case for comparison.
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    // console.log(userGuess); //Display for reference of user choice.


    // console.log("Game initiated: " + gameInitiated);
    if (gameInitiated === true) {
        for (var i = 0; i < currWordArray.length; i++) {
            if (userGuess === currWordArray[i]) {
                currWordRevealed[i] = currWordArray[i];
                goodGuess = true; //Set to true if user guessed right.
            }
        }

        // console.log(currWordRevealed);
        if (goodGuess === true) { //Check to see if user should lose a guess.
            goodGuess = false;
            play_hit_sound();
        } else {
            guessesLeft--;
            prevGuesses.push(" " + userGuess.toUpperCase());
            play_miss_sound();
        }

        if (guessesLeft <= 0) { //Check to see if no more guesses are available to enter. User losses.
            // console.log("Before reset");
            // debugError();
            scoreLoss++;
            selectedWord = getNewWord();
            guessesLeft = resetGuesses;
            prevGuesses.length = 0;
            currWordRevealed = getWordRevealed(selectedWord);
            currWordDisplay = getWordDisplay();
            // console.log("After reset");
            // debugError();
        }

        currWordDisplay = getWordDisplay()
        if (currWordRevealed.indexOf("_") === -1) { //Check to see if no more letters are available to enter. User wins.
            // console.log("Before reset");
            // debugError();
            scoreWin++;
            selectedWord = getNewWord();
            guessesLeft = resetGuesses;
            prevGuesses.length = 0;
            currWordRevealed = getWordRevealed(selectedWord);
            currWordDisplay = getWordDisplay();
            // console.log("After reset");
            // debugError();
        }
    }
    gameInitiated = true;
    outputDisplay();
}

function getNewWord() {
    // console.log("getNewWord initated.");
    selectedWord = potentialWords[Math.floor(Math.random() * potentialWords.length)];
    return selectedWord;
}

function getWordRevealed(selectedWord) {
    // console.log("getWordRevealed initated.");
    currWordRevealed.length = 0; //Set it to empty while creating new array.
    currWordArray.length = 0; //Set the character array to empty.
    for (var i = 0; i < selectedWord.length; i++) {
        currWordArray.push(selectedWord.charAt(i));
        currWordRevealed.push("_");
    }
    return currWordRevealed;
}

function getWordDisplay() {
    // console.log("getWordDisplay initated.");
    currWordDisplay = ""; //setting word display to black to avoid writing ontop of itself.
    for (var j = 0; j < currWordRevealed.length; j++) {
        currWordDisplay += "  " + currWordRevealed[j] + "  ";
    }
    return currWordDisplay;
}

//Setting information to be provided to html with id=game.
function outputDisplay() {
    // console.log("outputDisplay initated.");
    var html = "<h2>What food am I thinking?</h2>" +
        "<p>Current Word</p>" +
        "<h2>" + currWordDisplay + "</h2>" +
        "<p> _________________________ </p>" +
        "<p>Wins: " + scoreWin + "</p>" +
        "<p>Losses: " + scoreLoss + "</p>" +
        "<p>Guesses Left: " + guessesLeft + "</p>" +
        "<p>Your guesses so far: " + prevGuesses + "</p>";

    //Set id game to be html variable.
    document.querySelector('#game').innerHTML = html;
}

function debugError() {
    console.log("INITIATE VARIABLE DEBUGGER");
    console.log("resetGuesses: " + resetGuesses); //Initializing # of guesses to be 9.
    console.log("scoreWin: " + scoreWin);
    console.log("scoreLoss: " + scoreLoss);
    console.log("guessesLeft: " + guessesLeft); //Setting guesses remaining to initialize with reset.
    console.log("currWordArray: " + currWordArray);
    console.log("currWordRevealed: " + currWordRevealed);
    console.log("currWordDisplay: " + currWordDisplay);
    console.log("prevGuesses: " + prevGuesses); //Creating empty array.
    console.log("gameInitiated: " + gameInitiated);
    console.log("goodGuess: " + goodGuess);
    console.log("currWordDisplay: " + currWordDisplay);
    console.log("selectedWord: " + selectedWord);
    console.log("END VARIABLE DEBUGGER");
}

function play_miss_sound() {
    document.getElementById('audioTagMiss').play();
}

function play_hit_sound() {
    document.getElementById('audioTagHit').play();
}