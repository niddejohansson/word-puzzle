let pickedWord = document.getElementById("pickedWord");
let pickedWordButton = document.getElementById("pickedWordButton");
let showPickedWord = document.getElementById("showPickedWord");
let showPickedListWord = document.getElementById("showPickedListWord")
let wordList = document.getElementById("wordList");
let wordOptions = document.getElementById("wordOptions");
let restartButton = document.getElementById("restartButton")
let allWordArray = [];

async function lookUpWord() {
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + pickedWord.value);
    if(res.ok == true) {
        checkWord();
    } else {
        showPickedWord.innerHTML = "The word " + pickedWord.value + " dont exist, try another one";
    }
}

function wordFilter() {
    let wordArray = pickedWord.value.toLowerCase();
    let lastWord = allWordArray[allWordArray.length - 1];
    let counter = 0;
    for(i = 0; i < wordArray.length; i++) {
        if(wordArray[i] !== lastWord[i]) {
        counter++;
    }    
    }
    if(counter > 1) {
        showPickedWord.innerHTML = "The word " + pickedWord.value + " contains more than one change";       
    } else {
        updateUi();
    }
}

function checkOption() {
    if(wordOptions.value == "fourfive"){
        wordLenght = 4;
        endWord = "five"
        allWordArray.push("four");
        showPickedListWord.innerHTML = "Go from FOUR to FIVE";
    } else if(wordOptions.value == "eyelid") {
        wordLenght = 3;
        endWord = "lid"
        allWordArray.push("eye");
        showPickedListWord.innerHTML = "Go from EYE to LID"
    } else if(wordOptions.value == "tigerroses") {
        wordLenght = 5;
        endWord = "roses"
        allWordArray.push("tiger");
        showPickedListWord.innerHTML = "Go from TIGER to ROSES"
    } else if(wordOptions.value == "wheatbread") {
        wordLenght = 5;
        endWord = "bread"
        allWordArray.push("wheat");
        showPickedListWord.innerHTML = "Go from WHEAT to BREAD"
    } 
};

function checkEndWord() {
    if(pickedWord.value == endWord) {
        showPickedListWord.innerHTML = "WOOOOOHOOOOOO! WINNER!!"
    }
}

function checkWord() {
    if(pickedWord.value.length != wordLenght) {
        showPickedWord.innerHTML = "The word " + pickedWord.value + " got the wrong amout of letters";
    } else{
        wordFilter();
    }
}

function updateUi() {
    showPickedWord.innerHTML = "Last word you picked: " + pickedWord.value;
    var liElem = document.createElement("li");
    var lineBreak = document.createElement("br")
    liElem.innerHTML = pickedWord.value;
    wordList.append(liElem, lineBreak);
    allWordArray.push(pickedWord.value.toLowerCase());
    checkEndWord()
}

pickedWordButton.addEventListener("click", () => lookUpWord());
wordOptions.addEventListener("change", () => checkOption());
restartButton.addEventListener("click", () => location.reload());