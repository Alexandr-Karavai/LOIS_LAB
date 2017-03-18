var char = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFormula() {
    var formula = char[getRandomInt(0, char.length - 1)];
    var size = getRandomInt(0, 10);
    var symbol = "([0-1A-Z])";
    symbol = new RegExp(symbol, "g");

    for (var index = 0; index < size; index++) {
        var results = formula.match(symbol);
        var changeChar = getRandomInt(0, results.length - 1);
        changeChar = results[changeChar];
        var replaceOnNew = replaceOnNewFormula();
        formula = formula.replace(changeChar, replaceOnNew);
    }
    return formula;
}

function replaceOnNewFormula(){
    var randomInt = getRandomInt(0,4);
    switch(randomInt){
        case 0:
            return replaceOnNegation();
        case 1:
            return replaceOnConjunction();
        case 2:
            return replaceOnDisjunction();
        case 3:
            return replaceOnImplication();
        case 4:
            return replaceOnEquivalence();
    }
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function replaceOnNegation(){
    var string = "(!x)";
    string = string.replaceAt(2, char[getRandomInt(0, char.length - 1)]);
    return string;
}

function replaceOnConjunction(){
    var string = "(x&x)";
    string = string.replaceAt(1, char[getRandomInt(0, char.length - 1)]);
    string = string.replaceAt(3, char[getRandomInt(0, char.length - 1)]);
    return string;
}

function replaceOnDisjunction(){
    var string = "(x|x)";
    string = string.replaceAt(1, char[getRandomInt(0, char.length - 1)]);
    string = string.replaceAt(3, char[getRandomInt(0, char.length - 1)]);
    return string;
}

function replaceOnImplication(){
    var string = "(x->x)";
    string = string.replaceAt(1, char[getRandomInt(0, char.length - 1)]);
    string = string.replaceAt(4, char[getRandomInt(0, char.length - 1)]);
    return string;
}

function replaceOnEquivalence(){
    var string = "(x~x)";
    string = string.replaceAt(1, char[getRandomInt(0, char.length - 1)]);
    string = string.replaceAt(3, char[getRandomInt(0, char.length - 1)]);
    return string;
}
