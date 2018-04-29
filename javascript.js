//if we click on start/reset button
  //if we are playing
    //reload page
  //if we are not playing
    //set score to zero
    //show time remaining
    //reduce time by 1sec in loops
      //is there time left?
        //yes->continue
        //no->game over
    //change button text to reset
    //generate new Q&A


//if we click on an answer box
  //if we are playing
    //correct?
      //yes
        //increase the score
        //show correct box for 1sec
        //generate new Q&A
      //no
        //show try again box for 1sec

let score = 0;
let isPlaying = false;
const gameLength = 30;
let timeRemaining = gameLength;
let number1 = 0;
let number2 = 0;
let random = 0;

let choice1 = 0;
let choice2 = 0;
let choice3 = 0;
let choice4 = 0;
let correctAnswer = 0;

let answers = [];


//sets game elements and data back to their starting values
function resetGame() {
    isPlaying = true;
    score = 0;
    timeRemaining = gameLength;
    document.getElementById("time-remaining").style.display = "block";
    document.getElementById("time-value").innerHTML = timeRemaining;
    document.getElementById("start-reset").innerHTML ="Reset Game";
    document.getElementById("game-over").style.display = "none";
}


//renders a multiplication problem and stores the correct answer along with
//3 wrong answers each randomly assigned to a choice button. Stores value 
//of each choice.
function generateQuestion() {
      number1 = Math.ceil(Math.random() * 10);
      number2 = Math.ceil(Math.random() * 10);
      correctAnswer = number1 * number2;
      document.getElementById("question").innerHTML = number1 + " X " + number2;
      document.getElementById("choice1").innerHTML = "<p>" + correctAnswer + "</p>";
    
     
    
      let positions = [];
      while(positions.length < 4) {
          random = Math.ceil(Math.random() * 4);
          if(positions.length === 0) {
              positions.push(random);
          } else if(positions.indexOf(random) === -1) {
              positions.push(random);
          }
      }
    
    
      answers = [];
      answers[positions[0] - 1] = correctAnswer;
      for (let i = 1; i <= 3; i++) {
          random = Math.ceil(Math.random() * 100);
          answers[positions[i] - 1] = random;
      }
    
     
    
      for (let i = 0; i < answers.length; i++) {
          document.getElementById("choice" + (i +1)).innerHTML = answers[i];
      }
    
      
      choice1 = answers[0];
      choice2 = answers[1];
      choice3 = answers[2];
      choice4 = answers[3];
    
}



//checks to see if selected answer is correct and notifies player
//if answer is correct, a new question is generated
//if answer is wrong, player is asked to try again
function checkAnswer(guessedAnswer) {
    if(isPlaying) {
        if(correctAnswer === guessedAnswer) {
            score++;
            
//            let allChoices = document.getElementsByClassName("choice");
//            for(let i = 0; i < allChoices.length; i++) {
//                allChoices[i].style.backgroundColor = "white";
//                
//            }
            
            
            document.getElementById("score-value").innerHTML = score;
            document.getElementById("correct").style.display = "block";
            let showCorrect = setTimeout(function() {
                document.getElementById("correct").style.display = "none";
            }, 1000);
            generateQuestion();    
        } else {
            document.getElementById("wrong").style.display = "block";
            let showWrong = setTimeout(function() {
                document.getElementById("wrong").style.display = "none";
                
            }, 1000);
            
//            switch(guessedAnswer) {
//                case choice1:
//                    document.getElementById("choice1").style.backgroundColor = "#bc61f4";
//                    break;
//                case choice2:
//                    document.getElementById("choice2").style.backgroundColor = "#bc61f4";
//                    break;
//                case choice3:
//                    document.getElementById("choice3").style.backgroundColor = "#bc61f4";
//                    break;
//                case choice4:
//                    document.getElementById("choice4").style.backgroundColor = "#bc61f4";
//                    break;
//            }
        }
        
    }
}



//starts countdown timer and generates series of 
//multiplication problems until timer reaches 0
//when timer reaches 0, player is shown their score
function playGame() {
    if(isPlaying) {
        location.reload();
    } else if(!isPlaying) {
        resetGame();
        generateQuestion();      
        
         let timer = setInterval(function() {
            timeRemaining--;
            document.getElementById("time-value").innerHTML = timeRemaining;
            
            if (timeRemaining <= 0) {
                clearInterval(timer);
                document.getElementById("final-score").innerHTML = score;
                document.getElementById("game-over").style.display = "block";
                
                let allChoices = document.getElementsByClassName("choice");
                
                for (let i = 0; i < allChoices.length; i++) {
                    allChoices[i].style.display = "none";
                }
            }
            
         }, 1000);
         
        
    }
}

