

function telephoneCheck(str) {

    // Will hold all digits found in the string
    let numArray = [];

    /* Set of regular expressions to parse apart the str into 
    its component parts and check for invalid character usage */
    let areaCodeRegex = /([0-9]){3}/gi;
    let paranthesesRegex = /\(...\)/g;
    let openParanthesesRegex = /\(/g;
    let closeParanthesesRegex = /\)/g;
    let lettersCheckRegex = /[a-zA-Z]/g;
    let symbolsCheckRegex = /[^\(\)\-\d\s]/g;
    let paranthesesCheck = str.match(paranthesesRegex);

    let invalidCharacters = [str.match(symbolsCheckRegex)];


    // Pushes all numbers as ints from str into numArray
    for(var i = 0; i < str.length; i++) {
        if(!Number.isNaN(parseInt(str[i]))){
            numArray.push(parseInt(str[i]))
        }
    }


    // Checks if there are any letters or invalid symbols in the phone number
    if(str.match(lettersCheckRegex) != null || str.match(symbolsCheckRegex) != null){
        console.log("These characters are not valid: " + "\"" + invalidCharacters + "\"");
        return false;
    }


    /* Check if there any broken pairs of parantheses present in the phone
    number. */
    if(str.match(openParanthesesRegex) != null || str.match(closeParanthesesRegex) != null) {
        if(str.match(paranthesesRegex) == null){
            return false;
        } else if(paranthesesCheck != null) {
            if(paranthesesCheck.length != 1) {
                return false;
            }
        }
    }


    /* Check if there is a valid number of digits in the phone number,
    as well as if the country code is 1 (if it is included) */
    if(numArray.length > 11 || numArray.length < 10) {
        console.log("Not a valid US phone number.")
        return false;
    } else if(numArray.length == 11) {
        if(numArray[0] != 1) {
            console.log("Not a valid US phone number.")
            return false;
        } else if(str[0] != "1") {
            return false;
        }
    }
    return true;
}

// DOM selectors
let userInput = document.getElementById("user-input");
let testButton = document.getElementById("test-button");
let resetButton = document.getElementById("reset-button");



testButton.addEventListener("click", function(){
    let result = telephoneCheck(userInput.value);
    if(result == true){
        userInput.value = "Valid number!"
    } else {
        userInput.value = "Invalid number."
    }

});

resetButton.addEventListener("click", function(){
    userInput.value = "";
});

