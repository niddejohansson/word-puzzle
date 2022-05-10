//gör en if-sats som jämför [1] med [1] osv. 
//Om dom inte stämmer överens så addera 1, om det då blir mer än 1 ska inte ordet godkännas

let pickedWord = document.getElementById("pickedWord");
let pickedWordButton = document.getElementById("pickedWordButton");
let showPickedWord = document.getElementById("showPickedWord");
let showPickedListWord = document.getElementById("showPickedListWord")
let wordList = document.getElementById("wordList");
let wordOptions = document.getElementById("wordOptions");
let wordLenght;
let lastPickedWord;
let letterArray = "";
let startWord = "";
let endWord = "";
let previousWord = "";
let allWordArray = [];
let lastWord = "";


async function lookUpWord() {
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + pickedWord.value)
    //console.log(res)
    if(res.ok == true) {
        checkWord();
        previousWord = pickedWord.value;
    } else {
        showPickedWord.innerHTML = "The word " + pickedWord.value + " dont exist, try another one";
    }
}

function compareWords() {

}

function wordFilter() {
    let wordArray = pickedWord.value;
    lastWord = allWordArray[allWordArray.length - 1];
    let counter = 0;
    console.log(letterArray, lastWord)
    for(i = 0; i < wordArray.length; i++) {
        console.log(wordArray[i], lastWord[i])

        if(wordArray[i] !== lastWord[i]) {
        counter++;
    }
    console.log(counter)
    
    }
    if(counter > 1) {
        console.log("too many changes")
        
    }else {
        console.log("rätt!")
        updateUi();
    }
     

}
    

function checkOption() {
    if(wordOptions.value == "fourfive"){
        wordLenght = 4;
        startWord = "four"
        endWord = "five"
        allWordArray.push("four");
        showPickedListWord.innerHTML = "Go from FOUR to FIVE";
    } else if(wordOptions.value == "eyelid") {
        wordLenght = 3;
        startWord = "eye"
        endWord = "lid"
        showPickedListWord.innerHTML = "Go from EYE to LID"
    } else if(wordOptions.value == "tigerroses") {
        wordLenght = 5;
        startWord = "tiger"
        endWord = "roses"
        showPickedListWord.innerHTML = "Go from TIGER to ROSES"
    } else if(wordOptions.value == "wheatbread") {
        wordLenght = 5;
        startWord = "wheat"
        endWord = "bread"
        showPickedListWord.innerHTML = "Go from WHEAT to BREAD"
    } else {
        showPickedListWord.innerHTML = "Pick words in the list above"
    }
};

function checkEndWord() {
    if(pickedWord.value == endWord) {
        alert("Grattis du vann");
    }
}


function checkWord() {
    //loopa igenom pickedWord och kolla om det stämmer överens med det på förhand valda ordet.
    //om detta blir false, kör inte updateUi, blir det true ska updateUi köras.
    if(pickedWord.value.length != wordLenght) {
        console.log("fel antal bokstäver")
        showPickedWord.innerHTML = "The word " + pickedWord.value + " got the wrong amout of letters";
    } else{
        //kör en funktion för att se om bokstäverna stämmer med ordet innan
        
        wordFilter();
        console.log("rätt antal bokstäver")
    }
    console.log("i checkWord " + pickedWord.value)
}

function updateUi() {
    showPickedWord.innerHTML = "Last word you picked: " + pickedWord.value;
    var liElem = document.createElement("li");
    var lineBreak = document.createElement("br")
    liElem.innerHTML = pickedWord.value;
    wordList.append(liElem, lineBreak);
    console.log("i updateUi " + pickedWord.value);
    allWordArray.push(pickedWord.value);
    checkEndWord()
    console.log(allWordArray)
}

pickedWordButton.addEventListener("click", () => lookUpWord());
wordOptions.addEventListener("change", () => checkOption());
