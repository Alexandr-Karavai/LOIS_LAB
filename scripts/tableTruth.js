var NEGATION = "!";

var CONJUNCTION = "&";
var DISJUNCTION = "|";
var IMPLICATION = "->";
var EQUIVALENCE = "~";

var OPENING_BRACKET = "(";
var CLOSING_BRACKET = ")";
var countAnswer = 0;
var n

function getAnswerTypeFormula() {
  if (countAnswer == n) {
    countAnswer = 0;
      return "Данная формула является общезначимой";
   } else {
     countAnswer = 0;
      return "Данная формула не является общезначимой";
   }
}

function getCount() {
  return countAnswer;
}

function getN() {
  return n;
}

function getTableTruth(formula){
  var ANSWER = formula;
    var symbolInFormula = getSymbolInFormula(formula);
    symbolInFormula.sort();
    var sizeSymbolInFormula = symbolInFormula.length;
    n = Math.pow(2, sizeSymbolInFormula);
    var table = {}
    countAnswer = 0;
    for (var i = 0; i < n; i++) {
        var currentNumber = numberInBinaryString(i, sizeSymbolInFormula);
        var tempObject = getConstantForSymbol(symbolInFormula, currentNumber);
        tempObject[ANSWER] = getAnswer(formula, tempObject);
        table[i] = tempObject;
            

          if (tempObject[ANSWER] == 1) {
            countAnswer++;
          }
    }
      return  {
                  table: table,
                  sizeSymbolInFormula: sizeSymbolInFormula
              }
}

function getSymbolInFormula(formula){
    var symbol = "([A-Z])";
    symbol = new RegExp(symbol, "g");
    var results = formula.match(symbol) || [];
    var symbolInFormula = results.filter(function (symbol, index) {
        return results.indexOf(symbol) == index;
    });
    return symbolInFormula;
}

function numberInBinaryString(number, stringLength){
    var string = (number >>> 0).toString(2);
    for (var i = string.length; i < stringLength; i++){
        string = "0" + string;
    }
    return string;
}

function getConstantForSymbol(symbolInFormula, currentNumber){
    var object = {};
    for (var i = 0; i < symbolInFormula.length; i++){
        var symbol = symbolInFormula[i];
        object[symbol] = currentNumber[i];
    }

    return object;
}

function getAnswer(formula, tempObject){
    var constFormula = formula;
    for (var key of Object.keys(tempObject)) {
        var val = tempObject[key];
        constFormula = constFormula.replace(new RegExp(key, 'g'), val);
    }
    return calculateFormula(constFormula);
}

function calculateFormula(formula){
    var regFormula = "([(][" + NEGATION + "][0-1][)])|" +
        "([(][0-1]((" + CONJUNCTION + ")|("+ "\\" + DISJUNCTION + ")|(" + IMPLICATION + ")|(" + EQUIVALENCE + "))[0-1][)])";
    regFormula = new RegExp(regFormula);
    while (regFormula.exec(formula) != null){
        var subFormula = regFormula.exec(formula)[0];
        var result = calculateSimpleFormula(subFormula);
        formula = formula.replace(subFormula, result);
    }

    return formula;
}

function calculateSimpleFormula(formula){
    if (formula.indexOf(NEGATION) > -1){
        return findNEGATION(formula);
    } else if (formula.indexOf(CONJUNCTION) > -1){
        return findCONJUNCTION(formula);
    } else if (formula.indexOf(DISJUNCTION) > -1){
        return findDISJUNCTION(formula);
    } else if (formula.indexOf(IMPLICATION) > -1){
        return findIMPLICATION(formula);
    } else if (formula.indexOf(EQUIVALENCE) > -1){
        return findEQUIVALENCE(formula);
    }
}

function findNEGATION(formula) {

    var number = parseInt(formula[2]);
    if (!number) {
      return 1;
    } else {
      return 0;
    }
}

function findCONJUNCTION(formula) {

    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[3]);
    if (firstValue&&secondValue) {
      return 1;
    } else {
      return 0;
    }
}

function findDISJUNCTION(formula) {
    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[3]);
    if (firstValue||secondValue) {
      return 1;
    } else {
      return 0;
    }
}

function findIMPLICATION(formula) {

    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[4]);
    if ((!firstValue)||secondValue) {
      return 1;
    } else {
      return 0;
    }
}

function findEQUIVALENCE(formula) {

    var firstValue = parseInt(formula[1]);
    var secondValue = parseInt(formula[3]);
    if (firstValue==secondValue) {
      return 1;
    } else {
      return 0;
    }
}

function objectToTable(tableG, unicsymbolSizeG){
    var n = Math.pow(2, unicsymbolSizeG);
    var innerHTML = "";
    var tr = "<tr>";
      for (var key of Object.keys(tableG[0])) {
        tr += "<td>" + key + "</td>"
      }
      tr += "</tr>";
        innerHTML += tr;
          for (var i = 0; i < n; i++) {
            var object = tableG[i];
            var tr = "<tr>";
              for (var key of Object.keys(object)) {
                var val = object[key];
                  tr += "<td>" + val + "</td>"
              }
        tr += "</tr>";
        innerHTML += tr;
    }
    return innerHTML;
}
