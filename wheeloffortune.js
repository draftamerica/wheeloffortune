var wheel = {
    puzzleArray: ["LIMITLESS",
        "CURIOUS GEORGE",
        "WEDDING CRASHERS",
        "LETHAL WEAPON",
        "HORSE POWER",
        "THE BEATLES",
        "BOB DYLAN",
        "MIAMI MARLINS",
        "NEW ORLEANS SAINTS",
        "THREE CARD MONTE",
        "MAGIC CARPET RIDE",
        "DELAYED REACTION"
    ],
    spaceArray: [],
    vowels: ["A", "E", "I", "O", "U"],
    consonants: ["B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"],
    cards: ["200", "200", "300", "300", "400", "500", "550", "650", "800", "800", "1000", "1200", "1500", "1500", "3000", "Bankrupt", "Bankrupt"],
    yourMoney: 0,
    newValue: 0,
    currentLetter: "",
    newPuzzle: "",
    yourGuesses: [],
    letterType: "consonant",
    playerName: null,

    initialize: function() {
        console.log("==initialize==");
        var newPuzzleBtn = document.getElementById("newpuzzle");
        newPuzzleBtn.addEventListener("click", wheel.generatePuzzle);
        //GET PLAYER NAME
        wheel.playerName = prompt("Please enter your name to begin playing");
        while (!wheel.playerName || wheel.playerName.trim() === "") {
            wheel.playerName = prompt("Please enter your name to begin playing");
        }
        //ACTIVATE SOLVE BUTTON EVENT LISTENER//
        var solveBtn = document.getElementById("solve");
        solveBtn.addEventListener("click", wheel.solvePuzzle);
    },

    generatePuzzle: function() {
        console.log("==generatePuzzle==");
        wheel.activateSpin();
        wheel.yourMoney = 0;
        var currentTotal = document.getElementById("totalmoney");
        currentTotal.innerHTML = "";
        document.getElementById("puzzlearea").innerHTML = " ";
        wheel.newPuzzle = wheel.puzzleArray[Math.floor(Math.random() * wheel.puzzleArray.length)];
        console.log("newPuzzle", wheel.newPuzzle);
        var puzzleArea = document.getElementById("puzzlearea");
        console.log("puzzleArea", puzzleArea);
        var puzzleLetter = wheel.newPuzzle;
        console.log("Puzzle: ", puzzleLetter);
        for (var i = 0; i < wheel.newPuzzle.length; i++) {
            var puzzleDiv = document.createElement("div");
            puzzleDiv.setAttribute("class", "letterbox");
            puzzleDiv.setAttribute("id", "letter_" + i);
            if (wheel.newPuzzle[i] === " ") {
                var wordSpace = (document.createElement("br"));
                wordSpace.setAttribute("id", "letter_" + i);
                puzzleArea.appendChild(wordSpace);
            } else {
                // puzzleDiv.innerHTML = puzzleLetter;
                puzzleDiv.innerHTML = "&nbsp;";
                puzzleArea.appendChild(puzzleDiv);
            }
        }
    },

    userLogin: function() {
        console.log("==userLogin==");
    },

    activateSpin: function() {
        console.log("==activateSpin==");
        var spinBtn = document.getElementById("spin");
        spinBtn.addEventListener("click", wheel.generateCard);
    },

    generateCard: function() { //spinner
        //remove message from #guessvalid
        document.querySelector("#guessvalid").textContent = "";
        console.log("==generateCard==");
        var newCardValue = wheel.cards[Math.floor(Math.random() * wheel.cards.length)];
        wheel.newValue = newCardValue;
        console.log("newCardValue", newCardValue);
        var currentSpinValue = document.getElementById("spinmoney");
        console.log("currentSpinValue", currentSpinValue);
        currentSpinValue.innerHTML = "$" + newCardValue;
        document.getElementById("vowel").disabled = false;
        if ((newCardValue == "Bankrupt")) {
            wheel.yourMoney = 0;
            var currentTotal = document.getElementById("totalmoney");
            currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
            console.log("wheel.yourMoney", wheel.yourMoney);
        } else {
            wheel.yourMoney = wheel.yourMoney;
            var guessLetter = document.getElementById("lettersubmit");
            guessLetter.addEventListener("click", wheel.validateLetter);
            var vowelBtn = document.getElementById("vowel");
            vowelBtn.addEventListener("click", wheel.buyVowel);
        }
    },

    validateLetter: function() {
        console.log("==validateLetter==");
        var currentLetter = document.getElementById("letterguess").value.toUpperCase();
        wheel.currentLetter = currentLetter;
        if (wheel.yourGuesses.indexOf(currentLetter) > -1) {
            console.log("pastGuesses", wheel.yourGuesses);
            document.getElementById("letterguess").value = "";
            alert('Lose Turn!');
        } else {
            if (wheel.letterType === "consonant") {
                var vowelString = "AEIOU";
                var stringIndex = vowelString.indexOf(currentLetter);
                if (stringIndex > -1) {
                    alerts.innerHTML = "You must buy a vowel to enter a vowel!";
                    document.getElementById("letterguess").value = "";
                } else {
                    wheel.yourGuesses.push(currentLetter);
                    document.getElementById("letterguess").value = "";
                    wheel.guessLetter();
                }
            }
            if (wheel.letterType === 'vowel') {
                var vowelString = "AEIOU";
                var stringIndex = vowelString.indexOf(currentLetter);
                if (stringIndex > -1) {
                    wheel.yourGuesses.push(currentLetter);
                    document.getElementById("letterguess").value = "";
                    wheel.guessLetter();
                } else {
                    alerts.innerHTML = "You must enter a consonant since you didn't buy a vowel!";
                    document.getElementById("letterguess").value = "";
                    wheel.generateCard();
                }
            }
        }
    },

    guessLetter: function() {
        console.log("==guessLetter==");
        console.log("wheel.newValue", wheel.newValue);
        var guessState = false;
        var currentLetter = document.getElementById("letterguess").value.toUpperCase();
        console.log("currentLetter", currentLetter);
        var currentPuzzleArray = document.getElementsByClassName("letterbox");
        console.log('CurrentPuzzleArray: ', currentPuzzleArray);
        var letterIndex = -1;

        for (var i = 0; i < wheel.newPuzzle.length; i++) {
            letterIndex++;
            if (wheel.newPuzzle[i] == " ") {
                console.log("===found blank===");
                letterIndex = letterIndex - 1;
            }
            if (wheel.currentLetter == wheel.newPuzzle[i]) {
                currentPuzzleArray[letterIndex].innerHTML = wheel.newPuzzle[i];

                //ONLY CHANGES MONEY VALUE IF GUESS WAS A CONSONANT
                if (wheel.letterType !== "vowel") {
                    wheel.yourMoney = parseInt(wheel.newValue) + parseInt(wheel.yourMoney);
                    var currentTotal = document.getElementById("totalmoney");
                    currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
                    console.log("wheel.yourMoney", wheel.yourMoney);
                }
                guessState = true;
            }
        }

        if (guessState == false && wheel.letterType !== "vowel") {
            var currentTotal = document.getElementById("totalmoney");
            wheel.yourMoney = Math.max(parseInt(wheel.yourMoney) - parseInt(wheel.newValue), 0);
            currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
            var currentGuess = document.getElementById("guessvalid");
            currentGuess.innerHTML = "There are none of those. Please spin again";
            document.getElementById("letterguess").value = "";
        }
        wheel.letterType = "consonant";
    },

    buyVowel: function() {
        console.log("==buyVowel==");
        console.log("wheel.yourMoney", wheel.yourMoney);
        if (wheel.yourMoney < 200) {
            alert("You do not have enough $ to buy a vowel!");
            document.getElementById("spin").disabled = true;
            document.getElementById("lettersubmit").disabled = true;
            document.getElementById("vowel").disabled = false;
        } else {
            wheel.yourMoney = (wheel.yourMoney - 200);
            var currentTotal = document.getElementById("totalmoney");
            currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
            document.getElementById("spin").disabled = false;
            document.getElementById("lettersubmit").disabled = false;
            document.getElementById("vowel").disabled = false;
            wheel.letterType = "vowel";
        }
    },

    solvePuzzle: function(guessLetter) {
        console.log("==solvePuzzle==");
        var solveGuess = prompt("What is your guess?");
        if (solveGuess.toUpperCase() === wheel.newPuzzle) {
            //WIN CONDITION FOR CORRECT GUESS
            alert("Way to go! You did it!");
            //SHOW ALL LETTERS AFTER CORRECT SOLVE GUESS
            var divs = document.querySelectorAll(".letterbox"); //GET ALL LETTERBOXES
            for (var i = 0; i < divs.length; i++) {
                var index = parseInt(divs[i].id.replace("letter_", ""), 10); //GET NUMBER FROM END OF ID
                divs[i].textContent = wheel.newPuzzle.charAt(index); //PUT LETTER FROM SOLUTION INSIDE DIV
            }
        } else {
            //INCORRECT GUESS CONDITION
            alert("Incorrect guess");
        }
    },

    generateLetter: function() {
        console.log("==generateLetter==");
        document.getElementById("lettersubmit").value;
        wheel.guessLetter();
    }


}
wheel.initialize();
