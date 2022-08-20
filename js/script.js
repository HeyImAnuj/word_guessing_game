const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];// makin word a global variable, so we can access anywhere


function randomWord() {
    // grtting random object from wordlist
    let ranObj = WordList[Math.floor(Math.random() * WordList.length)];
    word = ranObj.word; //getting word of random object
    maxGuesses = 8; corrects = []; incorrects = [];
    

    hint.innerHTML = ranObj.hint;
    guessLeft.innerHTML = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Z,a-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)){
        if(word.includes(key)) {// if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key){
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--; //decrement guesses by 1
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length){//if user found all letters
            alert(`Congrats you found the word ${word.toUpperCase()}`);
            randomWord(); //calling randomWord func, so the game reset
    
        }else if(maxGuesses < 1) {//if user couldn't found all letters
            alert("Game Over! you don't have remaining guesses");
            for (let i = 0; i < word.length; i++) { //show all letters in the Input
                inputs.querySelectorAll("input")[i].value = word[i];
                }
            }
    });
    }
    


resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input",  initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
