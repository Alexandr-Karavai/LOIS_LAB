function clickCheckFormula() {
    var inputFormula = document.getElementById("inputFormula").value;
    var output = document.getElementById("output");
    var outputTypeFormula = document.getElementById("outputTypeFormula");
      if (verificationFormula(inputFormula)) {
          output.innerHTML = "Количество подформул: " + searchSubformuls(inputFormula);
          var object = getTableTruth(inputFormula);
          var tbody = document.getElementById('tbody');
          tbody.innerHTML = objectToTable(object.table, object.sizeSymbolInFormula);
          outputTypeFormula.innerHTML = getAnswerTypeFormula();
      } else {
          output.innerHTML = "Данное выражение не является формулой";
      }
}

function newTestSubformula() {
    var test = document.getElementById("output");
    test.innerHTML = generateFormula();
}

function newTestTypeFormula() {
 var test = document.getElementById("outputTypeFormula");
 test.innerHTML = generateFormula();
 var object = getTableTruth(test.textContent);
 var tbody = document.getElementById('tbody');
 tbody.innerHTML = objectToTable(object.table, object.sizeSymbolInFormula);
}

function clickCheckTest() {
  var formula = document.getElementById("formula").value;
  var test = document.getElementById("output");
  var compSearch = searchSubformuls(test.textContent);
  var outputResult = document.getElementById("outputResult");
    if (formula == compSearch) {
      outputResult.innerHTML = "Верно";
    } else {
      outputResult.innerHTML = "Неверно";
    }
    newTestSubformula();
  }

function clickYes() {
 var outputCheckTypeFormula = document.getElementById("outputCheckTypeFormula");

    if (getN() == getCount()) {
        outputCheckTypeFormula.innerHTML = "Верно, эта формула общезначимая";
    } else {
        outputCheckTypeFormula.innerHTML = "Неверно, эта формула не общезначимая";
    }
    newTestTypeFormula();
}

function clickNo() {
 var outputCheckTypeFormula = document.getElementById("outputCheckTypeFormula");
    if (getN() == getCount()) {
        outputCheckTypeFormula.innerHTML = "Неверно, эта формула общезначимая";
    } else {
        outputCheckTypeFormula.innerHTML = "Верно, эта формула не общезначимая";
    }
    newTestTypeFormula();
}
