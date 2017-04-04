function clickCheckFormula() {
    var inputFormula = document.getElementById("inputFormula").value;
    var output = document.getElementById("output");
    var outputTypeFormula = document.getElementById("outputTypeFormula");
      if (verificationFormula(inputFormula)) {
        document.getElementById("hiddenForm").hidden = false;
          output.innerHTML = "Количество подформул: " + searchSubformuls(inputFormula);
          var object = getTableTruth(inputFormula);
          var tbody = document.getElementById('tbody');
          tbody.innerHTML = objectToTable(object.table, object.sizeSymbolInFormula);
          outputTypeFormula.innerHTML = getAnswerTypeFormula();
      } else {
         document.getElementById("hiddenForm").hidden = true;
          output.innerHTML = "Данное выражение не является формулой";
      }
}
// Функции для тестов
function newTestTypeFormula() {
 var test = document.getElementById("outputTypeFormula").value;
 var outputCheckTypeFormula = document.getElementById("outputCheckTypeFormula");
 if (verificationFormula(test)) {
    outputCheckTypeFormula.innerHTML = "Данное выражение является формулой";
    document.getElementById("hiddenForm").hidden = false;
    var object = getTableTruth(test);
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = objectToTable(object.table, object.sizeSymbolInFormula);   
      } else {
              document.getElementById("hiddenForm").hidden = true;
          outputCheckTypeFormula.innerHTML = "Данное выражение не является формулой";
      }
}

function clickCheckTest() {
  var formula = document.getElementById("formula").value;
  var enterFormula = document.getElementById("EnterFormula").value;
  var outputResult = document.getElementById("outputResult");
 if (verificationFormula(enterFormula)) {
    var compSearch = searchSubformuls(enterFormula);
        if (formula == compSearch) {
        outputResult.innerHTML = "Верно";
            } else {
            outputResult.innerHTML = "Неверно";
            }
    } else {
          outputResult.innerHTML = "Данное выражение не является формулой";
    }
  }

function clickYes() {
 var outputCheckTypeFormula = document.getElementById("outputCheckTypeFormula");

    if (getCount() == getN()) {
        outputCheckTypeFormula.innerHTML = "Верно, эта формула общезначимая";
    } else {
        outputCheckTypeFormula.innerHTML = "Неверно, эта формула не общезначимая";
    }
}

function clickNo() {
 var outputCheckTypeFormula = document.getElementById("outputCheckTypeFormula");
    if (getCount() == getN()) {
        outputCheckTypeFormula.innerHTML = "Неверно, эта формула общезначимая";
    } else {
        outputCheckTypeFormula.innerHTML = "Верно, эта формула не общезначимая";
    }
}
