var wheel = {
    puzzleArray: ["LIMITLESS",
                "WEDDING CRASHERS",
                "LETHAL WEAPON",
                "HORSE POWER",
                "THE BEATLES",
                "BOB DYLAN",
                "MIAMI MARLINS",
                "NEW ORLEANS SAINTS",
                "THREE CARD MONTE",
                "MAGIC CARPET RIDE",
                "DELAYED REACTION"],
    vowels: ["A", "E", "I", "O", "U"],
    cards: ["200", "200", "300", "300", "400", "500", "550", "650", "800", "800", "1000", "1200", "1500", "1500", "3000", "Bankrupt", "Bankrupt"],
    yourMoney: 0,
    newValue: 0,
    newPuzzle: " ",
    yourGuesses: [],
    letterType: "consonant",
    playerName: null,

    initialize: function() {
        console.log("==initialize==");
        var newPuzzleBtn = document.getElementById("newpuzzle");
        newPuzzleBtn.addEventListener("click", wheel.generatePuzzle);
        //Get player name
        wheel.playerName = prompt("Please enter your name to begin playing");
        while (!wheel.playerName || wheel.playerName.trim() === "") {
        	wheel.playerName = prompt("Please enter your name to begin playing");
        }
        //ACTIVATE SOLVE BUTTON EVENT LISTENER//
        var solveBtn = document.getElementById("solve");
        solveBtn.addEventListener("click", wheel.solvePuzzle);
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
            document.getElementById("lettersubmit").disabled = true;
            document.getElementById("spin").disabled = false;
        } else {
            wheel.yourMoney = wheel.yourMoney;
            var guessLetter = document.getElementById("lettersubmit");
            guessLetter.addEventListener("click", wheel.guessLetter);
            document.getElementById("lettersubmit").disabled = false;
            document.getElementById("spin").disabled = false;
            var vowelBtn = document.getElementById("vowel");
            vowelBtn.addEventListener("click", wheel.buyVowel);
        }
    },

    generatePuzzle: function() {
        console.log("==generatePuzzle==");
        wheel.activateSpin();
        document.getElementById("puzzlearea").innerHTML = " ";
        wheel.newPuzzle = wheel.puzzleArray[Math.floor(Math.random() * wheel.puzzleArray.length)];
        console.log("newPuzzle", wheel.newPuzzle);
        var puzzleArea = document.getElementById("puzzlearea");
        console.log("puzzleArea", puzzleArea);
        for (var i = 0; i < wheel.newPuzzle.length; i++) {
            var puzzleLetter = wheel.newPuzzle[i];
            var puzzleDiv = document.createElement("div");
            //HIDE SPACES
            // if (wheel.newPuzzle[i] === " ") {
            //     puzzleDiv.setAttribute("class", "letterbox space");
            //     //in CSS: .space { opacity: 0; }
            // } else {
                puzzleDiv.setAttribute("class", "letterbox");
            // }
            puzzleDiv.setAttribute("id", "letter_" + i);
            // console.log("puzzleDiv", puzzleDiv);
            if (wheel.newPuzzle[i] === " "){
              	puzzleArea.appendChild(document.createElement("br"));
            } else {
              	puzzleDiv.innerHTML = "&nbsp;";
            	puzzleArea.appendChild(puzzleDiv);
            }
        }
    },

    guessLetter: function() {
        console.log("==guessLetter==");
        console.log("wheel.newValue", wheel.newValue);
        var guessState = false;
        var currentLetter = document.getElementById("letterguess").value.toUpperCase();
        var currentPuzzleArray = document.getElementsByClassName("letterbox");
        console.log("currentLetter", currentLetter);
        if (wheel.letterType == "consonant") {
            var vowelFlag = wheel.validateLetter(currentLetter);
            console.log("wheel.yourGuesses", wheel.yourGuesses);
        }
        if ((!vowelFlag) || (wheel.letterType == "vowel")) {
            var alerts = document.getElementById("alerts");
            alerts.innerHTML = " ";
            // var currentTotal = document.getElementById("totalmoney");
            // currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
            // // wheel.yourMoney = (wheel.yourMoney - 0);
            var pastGuesses = wheel.yourGuesses.indexOf(currentLetter);
            console.log("pastGuesses", pastGuesses);
            wheel.yourGuesses.push(currentLetter);
            document.getElementById("spin").disabled = false;
            document.getElementById("lettersubmit").disabled = true;
            if (pastGuesses > -1) {
                alert("Lose turn");
            } else {
                for (var i = 0; i < wheel.newPuzzle.length; i++) {
                    console.log("wheel", wheel.newPuzzle[i]);
                if (currentLetter == wheel.newPuzzle[i]) {
                    currentPuzzleArray[i].innerHTML = wheel.newPuzzle[i];
//ONLY CHANGES MONEY VALUE IF GUESS WAS A CONSONANT
                    if (wheel.letterType !== "vowel"){
                    	wheel.yourMoney = parseInt(wheel.newValue) + parseInt(wheel.yourMoney);
                    	var currentTotal = document.getElementById("totalmoney");
                    	currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
                    	console.log("wheel.yourMoney", wheel.yourMoney);
                    }
                    guessState = true;
                    }
                }
                    console.log("guessState", guessState);
            if (guessState == false && wheel.letterType !== "vowel") {
                var currentTotal = document.getElementById("totalmoney");
                wheel.yourMoney = Math.max(parseInt(wheel.yourMoney) - parseInt(wheel.newValue), 0);
                currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
                for (var i = 0; i < currentLetter.length; i++) {
                    if (guessState == false && wheel.letterType !== "vowel") {
                    var currentGuess = document.getElementById("guessvalid");
                    currentGuess.innerHTML = "There are no " + currentLetter + "'s. Please spin again";
                    }
                }
            } else {
                //Successful guess... if it's a vowel, allow another purchase
                if (wheel.letterType === "vowel") {
                    document.getElementById("vowel").disabled = false;
                }
                var alerts = document.getElementById("alerts");
                alerts.innerHTML = " ";
                }
            }
        }
    },

    validateLetter: function(checkVowel) {
        console.log("==validateLetter==");
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = "You must enter a consonant since you didn't buy a vowel!";
        var vowelString = "AEIOU";
        var stringIndex = vowelString.indexOf(checkVowel);
        console.log("stringIndex", stringIndex);
        if (stringIndex > -1) {
            return true;
        } else {
            return false;
        }
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
            document.getElementById("vowel").disabled = true;
            wheel.letterType = "vowel";
        }
    },

    solvePuzzle: function(guessLetter) {
      console.log("==solvePuzzle==");
      var solveGuess = prompt("What is your guess?");
      if (solveGuess.toUpperCase() === wheel.newPuzzle) {
          //WIN CONDITION FOR CORRECT GUESS
          alert("Way to go! You did it!");
          //SHOW ALL LETTERS
          var divs = document.querySelectorAll(".letterbox"); //get all letterboxes
          for (var i=0; i<divs.length; i++){
          	  var index = parseInt(divs[i].id.replace("letter_", ""), 10); //get number at end of id
              divs[i].textContent = wheel.newPuzzle.charAt(index); //put letter from solution into div
          }
      } else {
        //INCORRECT GUESS CONDITION
        alert("Incorrect");
      }
    },

    // removeVowelMoney: function() {
    //     console.log("==removeVowelMoney==");
    // },

    generateLetter: function() {
        console.log("==generateLetter==");
        document.getElementById("lettersubmit").value;
        wheel.guessLetter();
    }



    }
    wheel.initialize();
