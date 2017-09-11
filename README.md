# Wheel of Fortune

This was one of the most challenges projects during my NYCDA web development intensive course, a single-player Wheel of Fortune game app where players are required to enter their first name before playing a game. The functions are spin, guess a letter, buy a vowel, or solve the puzzle.

# Code snippet

As the bulk of this project was done using Javascript, here is a portion of one of the primary functions that begins a new game.

generatePuzzle: function() {
        console.log("==generatePuzzle==");
        wheel.activateSpin();
        wheel.yourMoney = 0;
        var currentTotal = document.getElementById("totalmoney");
        currentTotal.innerHTML = "";
        document.getElementById("puzzlearea").innerHTML = " ";
        wheel.newPuzzle = wheel.puzzleArray[Math.floor(Math.random() * wheel.puzzleArray.length)];
        
# Deployment

This project was deployed using Heorku and is available at https://wheeloffortuneproject.herokuapp.com.
