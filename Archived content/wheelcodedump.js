//FROM AUGUST 20, 2017 - WORKING ON VOWEL ISSUE //

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
                "DELAYED REACTION"],
    spaceArray: [],
    vowels: ["A", "E", "I", "O", "U"],
    consonants: ["B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"],
    cards: ["200", "200", "300", "300", "400", "500", "550", "650", "800", "800", "1000", "1200", "1500", "1500", "3000", "Bankrupt", "Bankrupt"],
    yourMoney: 0,
    newValue: 0,
    currentLetter: " ",
    newPuzzle: " ",
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
        // solveBtn.addEventListener("click", wheel.solvePuzzle);
    },

    generatePuzzle: function() {
        console.log("==generatePuzzle==");
        wheel.activateSpin();
        document.getElementById("puzzlearea").innerHTML = " ";
        wheel.newPuzzle = wheel.puzzleArray[Math.floor(Math.random() * wheel.puzzleArray.length)];
        console.log("newPuzzle", wheel.newPuzzle);
        var puzzleArea = document.getElementById("puzzlearea");
        // document.getElementById("lettersubmit").disabled = true;
        // document.getElementById("spin").disabled = false;
        console.log("puzzleArea", puzzleArea);
        for (var i = 0; i < wheel.newPuzzle.length; i++) {
            var puzzleLetter = wheel.newPuzzle[i];
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
            // document.getElementById("lettersubmit").disabled = true;
            // document.getElementById("spin").disabled = false;
        } else {
            wheel.yourMoney = wheel.yourMoney;
            var guessLetter = document.getElementById("lettersubmit");
            guessLetter.addEventListener("click", wheel.validateLetter);
            var vowelBtn = document.getElementById("vowel");
            vowelBtn.addEventListener("click", wheel.buyVowel);
            // document.getElementById("lettersubmit").disabled = false;
            // document.getElementById("spin").disabled = false;
            // var vowelBtn = document.getElementById("vowel");
            // vowelBtn.addEventListener("click", wheel.buyVowel);
        }
    },

    validateLetter: function() {
        console.log("==validateLetter==");
        var currentLetter = document.getElementById("letterguess").value.toUpperCase();
        wheel.currentLetter = currentLetter;
        if(wheel.yourGuesses.indexOf(currentLetter) > -1){
            console.log("pastGuesses", wheel.yourGuesses);
            alert('Lose Turn!');
        }
        else {
            if(wheel.LetterType === 'vowel') {
                var vowelString = "AEIOU";
                var stringIndex = vowelString.indexOf(currentLetter);
                if(stringIndex > -1){
                    wheel.yourGuesses.push(currentLetter);
                    wheel.LetterType = "consonant";
                    document.getElementById("letterguess").value = "";
                    wheel.guessLetter();
                }
                else {
                    alerts.innerHTML = "You must enter a consonant since you didn't buy a vowel!";
                    document.getElementById("letterguess").value = "";
                    wheel.generateCard();
                }
            }
            else {
                wheel.yourGuesses.push(currentLetter);
                document.getElementById("letterguess").value = "";
                wheel.guessLetter();
            }
        }

        /*var pastGuesses = wheel.yourGuesses.indexOf(currentLetter);
        console.log("pastGuesses", pastGuesses);
        if (pastGuesses > -1) {
            alert("Lose turn");
        }
        else {
            var alerts = document.getElementById("alerts");
            var vowelString = "AEIOU";
            var stringIndex = vowelString.indexOf(currentLetter);
            if (stringIndex > -1) {
                 if (wheel.LetterType == "vowel") {
                    wheel.guessLetter();
                 }
                 else {
                    alerts.innerHTML = "You must enter a consonant since you didn't buy a vowel!";
                 }
            } else {
                wheel.letterType = "consonant";
                wheel.yourGuesses.push(currentLetter);
                var alerts = document.getElementById("alerts");
                // alerts.innerHTML = "You must enter a vowel!";
                document.getElementById("lettersubmit").disabled = true;
                var consonantString = "BCDFGHJKLMNPQRSTVWXYZ";
                var cStringIndex = consonantString.indexOf(currentLetter);
                console.log("cStringIndex", cStringIndex);
                wheel.guessLetter();
            }
        }*/
    },

    guessLetter: function() {
        console.log("==guessLetter==");
        console.log("wheel.newValue", wheel.newValue);
        var guessState = false;
        var currentLetter = document.getElementById("letterguess").value.toUpperCase();
        console.log("currentLetter", currentLetter);
        var currentPuzzleArray = document.getElementsByClassName("letterbox");
        var letterIndex = -1;

        for (var i = 0; i < wheel.newPuzzle.length; i++) {
            letterIndex++;
            console.log("wheel", wheel.newPuzzle[i]);

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
            currentGuess.innerHTML = "There are no " + currentLetter + "'s. Please spin again";
            document.getElementById("letterguess").value = "";
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
          //SHOW ALL LETTERS AFTER CORRECT SOLVE GUESS
          var divs = document.querySelectorAll(".letterbox"); //GET ALL LETTERBOXES
          for (var i=0; i<divs.length; i++){
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




//FROM AUGUST 15, 2017//

// var letterIndex = -1;
// for (var i = 0; i < wheel.newPuzzle.length; i++) {
//     letterIndex++;
//     console.log("wheel", wheel.newPuzzle[i]);
// }

// console.log("stringIndex", stringIndex);

//FROM LINES 159-161//
// consonantFlag = true;
// var alerts = document.getElementById("alerts");
// alerts.innerHTML = "You must enter a vowel!";

//==CHECK IF PAST LETTER ALREADY GUESSED==
// if (pastGuesses > -1) {
//     alert("Lose turn");
// } else {
//     var letterIndex = -1;
//     for (var i = 0; i < wheel.newPuzzle.length; i++) {
//         letterIndex++;
//         console.log("wheel", wheel.newPuzzle[i]);


// // // if (cStringIndex > -1) {
// // //     console.log("====CONSONANT GUESSED!!!!!!!!!======")
// // } else {
// //     var pastGuesses = wheel.yourGuesses.indexOf(currentLetter);
// //     console.log("pastGuesses", pastGuesses);
// //     wheel.yourGuesses.push(currentLetter);
// //     //ADDED LINE 120 TO FIX GLITCH FOR MONEY NOT BEING ADDED AFTER VOWEL PURCHASE
// //     // wheel.yourMoney = parseInt(wheel.newValue) + parseInt(wheel.yourMoney);
// //     document.getElementById("spin").disabled = false;
// //     document.getElementById("lettersubmit").disabled = true;
// }

// if (currentLetter == "B") {
//     var alerts = document.getElementById("alerts");
//     alerts.innerHTML = "You must enter a vowel!";
//     document.getElementById("spin").disabled = true;
//     document.getElementById("lettersubmit").disabled = true;
//     document.getElementById("vowel").disabled = false;
// } else {
//     var alerts = document.getElementById("alerts");
//     alerts.innerHTML = " ";
// }

// // if (wheel.letterType == "consonant") {
// //     var vowelFlag = wheel.validateLetter(currentLetter);
// //     console.log("wheel.yourGuesses", wheel.yourGuesses);
// // }
    // if ((!vowelFlag) || (wheel.letterType == "vowel")) {
    //     wheel.letterType = "consonant"
    //     var alerts = document.getElementById("alerts");
    //     alerts.innerHTML = " ";


//-----------------//



//
    // "CURRENT SPIN: " + "&nbsp &nbsp &nbsp &nbsp" +

    // if (currentLetter == wheel.newPuzzle[i]) {
    //     currentPuzzleArray[i].innerHTML = wheel.newPuzzle[i];
    //     wheel.yourMoney = parseInt(wheel.newValue) + parseInt(wheel.yourMoney);
    //     var currentTotal = document.getElementById("totalmoney");
    //     guessState = true;
    //     currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
    //     console.log("wheel.yourMoney", wheel.yourMoney);
    // }

    // guessLetter.addEventListener("click", wheel.guessLetter);

    // runningMoneyTotal: function() {
    //     var updateTotal = document.getElementById("totalmoney");
    //     updateTotal = yourMoney +
    //     var runningTotal = parseInt(currentSpinValue) + parseInt("totalmoney");
    //     console.log("runningTotal", runningTotal);
    //     // document.getElementById("totalChocolate").innerHTML = "Total Chocolates Ordered: " + " " + newChocolate;
    // }

    // var updateTotal = parseInt(wheel.yourMoney) + parseInt(newCardValue);
    // console.log("updateTotal", updateTotal);
    // if ((newCardValue == wheel.cards[13]) && (wheel.yourMoney > 0)) {
    //     console.log("newCardValue", newCardValue);
    //     wheel.yourMoney = 0;
    //     // currentSpinValue.innerHTML = "CURRENT SPIN: " + "$0 - ";
    // } else if ((newCardValue == wheel.cards[14]) && (wheel.yourMoney > 0)) {
    //     console.log("newCardValue", newCardValue);
    //     wheel.yourMoney = 0;
    //     // currentSpinValue.innerHTML = "CURRENT SPIN: " + "$0 - ";
    // } else {
    //     currentSpinValue = currentSpinValue;
    //     console.log("newCardValue", newCardValue);
    // }
    // var yourTotal = parseInt(newCardValue) + parseInt(updateTotal);
    // wheel.yourMoney += yourTotal;
    // console.log("yourTotal", yourTotal);
    // yourTotalNow = document.getElementById("totalmoney");
    // yourTotalNow.innerHTML = "YOUR TOTAL MONEY: " + " " + "$" + yourTotal;
    // var runningSum = parseInt(yourTotal) + parseInt(newCardValue);
    // console.log("runningSum", runningSum);

//     puzzleArray: [
//     		{puzzle: "LIMITLESS", category: "BRADLEY COOPER MOVIES"},
//             {},
//             {}
//         ],
// */

// REPLACES RANDOMIZE LINE (260 in comment)
/*
        var puzzle = wheel.cards[Math.floor(Math.random() * wheel.cards.length)];
        var newCardValue = puzzle.puzzle;
        var category = puzzle.category;
  */






/////REPEAT OF CODE
// var wheel = {
//     puzzleArray: ["LIMITLESS",
//                 "WEDDING CRASHERS",
//                 "LETHAL WEAPON",
//                 "HORSE POWER",
//                 "THE BEATLES",
//                 "BOB DYLAN",
//                 "MIAMI MARLINS",
//                 "NEW ORLEANS SAINTS",
//                 "THREE CARD MONTE",
//                 "MAGIC CARPET RIDE",
//                 "DELAYED REACTION"],
//     vowels: ["A", "E", "I", "O", "U"],
//     cards: ["200", "200", "300", "300", "400", "500", "550", "650", "800", "800", "1000", "1200", "1500", "1500", "3000", "Bankrupt", "Bankrupt"],
//     yourMoney: 0,
//     newValue: 0,
//     newPuzzle: " ",
//     yourGuesses: [],
//     letterType: "consonant",
//
//     initialize: function() {
//         console.log("==initialize==");
//         var newPuzzleBtn = document.getElementById("newpuzzle");
//         newPuzzleBtn.addEventListener("click", wheel.generatePuzzle);
//     },
//
//     userLogin: function() {
//         console.log("==userLogin==");
//     },
//
//     activateSpin: function() {
//         console.log("==activateSpin==");
//         var spinBtn = document.getElementById("spin");
//         spinBtn.addEventListener("click", wheel.generateCard);
//     },
//
//     generateCard: function() {
//         console.log("==generateCard==");
//         var newCardValue = wheel.cards[Math.floor(Math.random() * wheel.cards.length)];
//         wheel.newValue = newCardValue;
//         console.log("newCardValue", newCardValue);
//         var currentSpinValue = document.getElementById("spinmoney");
//         console.log("currentSpinValue", currentSpinValue);
//         currentSpinValue.innerHTML = "CURRENT SPIN: " + "$" + newCardValue;
//         document.getElementById("vowel").disabled = false;
//         if ((newCardValue == "Bankrupt")) {
//             wheel.yourMoney = 0;
//             var currentTotal = document.getElementById("totalmoney");
//             currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
//             console.log("wheel.yourMoney", wheel.yourMoney);
//             document.getElementById("lettersubmit").disabled = true;
//             document.getElementById("spin").disabled = false;
//         } else {
//             var guessLetter = document.getElementById("lettersubmit");
//             guessLetter.addEventListener("click", wheel.guessLetter);
//             document.getElementById("lettersubmit").disabled = false;
//             document.getElementById("spin").disabled = false;
//             var vowelBtn = document.getElementById("vowel");
//             vowelBtn.addEventListener("click", wheel.buyVowel);
//         }
//         // var updateTotal = parseInt(wheel.yourMoney) + parseInt(newCardValue);
//         // console.log("updateTotal", updateTotal);
//         // if ((newCardValue == wheel.cards[13]) && (wheel.yourMoney > 0)) {
//         //     console.log("newCardValue", newCardValue);
//         //     wheel.yourMoney = 0;
//         //     // currentSpinValue.innerHTML = "CURRENT SPIN: " + "$0 - ";
//         // } else if ((newCardValue == wheel.cards[14]) && (wheel.yourMoney > 0)) {
//         //     console.log("newCardValue", newCardValue);
//         //     wheel.yourMoney = 0;
//         //     // currentSpinValue.innerHTML = "CURRENT SPIN: " + "$0 - ";
//         // } else {
//         //     currentSpinValue = currentSpinValue;
//         //     console.log("newCardValue", newCardValue);
//         // }
//         // var yourTotal = parseInt(newCardValue) + parseInt(updateTotal);
//         // wheel.yourMoney += yourTotal;
//         // console.log("yourTotal", yourTotal);
//         // yourTotalNow = document.getElementById("totalmoney");
//         // yourTotalNow.innerHTML = "YOUR TOTAL MONEY: " + " " + "$" + yourTotal;
//         // var runningSum = parseInt(yourTotal) + parseInt(newCardValue);
//         // console.log("runningSum", runningSum);
//     },
//
//     // activatePuzzle: function() {
//     //     console.log("==activatePuzzle==");
//     //     var newGm = document.getElementById("newpuzzle");
//     //     newGm.addEventListener("click", wheel.generatePuzzle);
//     // },
//
//     generatePuzzle: function() {
//         console.log("==generatePuzzle==");
//         wheel.activateSpin();
//         document.getElementById("puzzlearea").innerHTML = " ";
//         wheel.newPuzzle = wheel.puzzleArray[Math.floor(Math.random() * wheel.puzzleArray.length)];
//         console.log("newPuzzle", wheel.newPuzzle);
//         var puzzleArea = document.getElementById("puzzlearea");
//         console.log("puzzleArea", puzzleArea);
//         for (var i = 0; i < wheel.newPuzzle.length; i++) {
//             var puzzleLetter = wheel.newPuzzle[i];
//             var puzzleDiv = document.createElement("div");
//             puzzleDiv.setAttribute("class", "letterbox");
//             puzzleDiv.setAttribute("id", "letter_" + i);
//             // console.log("puzzleDiv", puzzleDiv);
//             puzzleArea.appendChild(puzzleDiv);
//             // puzzleDiv.innerHTML = " " + puzzleLetter;
//         }
//     },
//
//     guessLetter: function() {
//         console.log("==guessLetter==");
//         console.log("wheel.newValue", wheel.newValue);
//         var guessState = false;
//         var currentLetter = document.getElementById("letterguess").value;
//         var currentPuzzleArray = document.getElementsByClassName("letterbox");
//         console.log("currentLetter", currentLetter);
//         if (wheel.letterType == "consonant") {
//             var vowelFlag = wheel.validateLetter(currentLetter);
//             console.log("wheel.yourGuesses", wheel.yourGuesses);
//         }
//         if ((!vowelFlag) || (wheel.letterType == "vowel")) {
//             var alerts = document.getElementById("alerts");
//             alerts.innerHTML = " ";
//             // var currentTotal = document.getElementById("totalmoney");
//             // currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
//             // // wheel.yourMoney = (wheel.yourMoney - 0);
//             var pastGuesses = wheel.yourGuesses.indexOf(currentLetter);
//             console.log("pastGuesses", pastGuesses);
//             wheel.yourGuesses.push(currentLetter);
//             document.getElementById("spin").disabled = false;
//             document.getElementById("lettersubmit").disabled = true;
//             if (pastGuesses > -1) {
//                 alert("Lose turn");
//             } else {
//                 for (var i = 0; i < wheel.newPuzzle.length; i++) {
//                     console.log("wheel", wheel.newPuzzle[i]);
//                     if (currentLetter == wheel.newPuzzle[i]) {
//                         currentPuzzleArray[i].innerHTML = wheel.newPuzzle[i];
//                       	//only change money value if guess was a consonant
//                         if (wheel.letterType !== "vowel"){
//                         	wheel.yourMoney = parseInt(wheel.newValue) + parseInt(wheel.yourMoney);
//                         	var currentTotal = document.getElementById("totalmoney");
//                         	currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
//                         	console.log("wheel.yourMoney", wheel.yourMoney);
//                         }
//                         guessState = true;
//                     }
//                 }
//                 console.log("guessState", guessState);
//                 if (guessState == false && wheel.letterType !== "vowel") {
//                     var currentTotal = document.getElementById("totalmoney");
//                     wheel.yourMoney = Math.max(parseInt(wheel.yourMoney) - parseInt(wheel.newValue), 0);
//                     currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
//                 } else {
//                   	//successful guess...if vowel, allow another vowel purchase
//                   	if (wheel.letterType === "vowel"){
//                     	document.getElementById("vowel").disabled = false;
//                     }
//                     var alerts = document.getElementById("alerts");
//                     alerts.innerHTML = " ";
//                 }
//             }
//         }
//     },

//             console.log("guessState", guessState);
//         if (guessState == false && wheel.letterType !== "vowel") {
//             var currentTotal = document.getElementById("totalmoney");
//             wheel.yourMoney = Math.max(parseInt(wheel.yourMoney) - parseInt(wheel.newValue), 0);
//             currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
//             for (var i = 0; i < currentLetter.length; i++) {
//                 if (guessState == false && wheel.letterType !== "vowel") {
//                 var currentGuess = document.getElementById("guessvalid");
//                 currentGuess.innerHTML = "There are no " + currentLetter + "'s. Please spin again";
//                 }
//             }
//         } else {
//             //SUCCESSFUL GUESS. IF IT'S A VOWEL, ALLOW ANOTHER PURCHASE
//             if (wheel.letterType === "vowel") {
//                 document.getElementById("vowel").disabled = false;
//             }
//             var alerts = document.getElementById("alerts");
//             alerts.innerHTML = " ";
//         }
//     }
// }
// wheel.letterType = "consonant";

//
//     validateLetter: function(checkVowel) {
//         console.log("==validateLetter==");
//         var alerts = document.getElementById("alerts");
//         alerts.innerHTML = "You must enter a consonant since you didn't buy a vowel!";
//         var vowelString = "AEIOU";
//         var stringIndex = vowelString.indexOf(checkVowel);
//         console.log("stringIndex", stringIndex);
//         if (stringIndex > -1) {
//             return true;
//         } else {
//             return false;
//         }
//     },
//
//     buyVowel: function() {
//         console.log("==buyVowel==");
//         console.log("wheel.yourMoney", wheel.yourMoney);
//         if (wheel.yourMoney < 200) {
//                 alert("You do not have enough $ to buy a vowel!");
//                 document.getElementById("spin").disabled = true;
//                 document.getElementById("lettersubmit").disabled = true;
//                 document.getElementById("vowel").disabled = false;
//         } else {
//             wheel.yourMoney = (wheel.yourMoney - 200);
//             var currentTotal = document.getElementById("totalmoney");
//             currentTotal.innerHTML = "YOUR TOTAL MONEY: " + "$" + wheel.yourMoney;
//             document.getElementById("spin").disabled = false;
//             document.getElementById("lettersubmit").disabled = false;
//             document.getElementById("vowel").disabled = true;
//             wheel.letterType = "vowel";
//         }
//     },
//
//     // removeVowelMoney: function() {
//     //     console.log("==removeVowelMoney==");
//     // },
//
//     generateLetter: function() {
//         console.log("==generateLetter==");
//         document.getElementById("lettersubmit").value;
//         wheel.guessLetter();
//     }
//
//
//
//     }
//     wheel.initialize();

// var name = ['f', 'i', 'z', 'j', 'j']
// var guess = 'j'
// var flag = false
//
//
// for(var i = 0; i < name.length; i++){
//
//   if(name[i] === guess){
//     //this means the letter was found.
//     flag = true
//
//   }


// this is in the for loop
  // if (flag){
  //   console.log('you won')
  // } else {
  //   console.log('you lost')
  // }
// /end if

}


//FOR WHEN YOU GET ALL THE LETTERS
var str1 = '';
for(var i = 0; i < currentPuzzleArray.length; i++){
    str1 += currentPuzzleArray[i];
}
var str2 = '';
for(var i = 0; i < wheel.newPuzzle.length; i++){
    str2 += wheel.newPuzzle[i];
}
if(str1 == str2){
    alert('Hey you win!');
    wheel.initialize();
}
