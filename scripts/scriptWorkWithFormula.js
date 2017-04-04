var unaryOrBinaryComplexFormula = new RegExp('([(][!]([A-Z]|[0-1])[)])|([(]([A-Z]|[0-1])((&)|(\\|)|(->)|(~))([A-Z]|[0-1])[)])', 'g');
var atomOrConstant = new RegExp('([A-Z]|[0-1])', 'g');
var replaceFormula = "R";
var result;
var tempFormula;

function searchSubformuls(formula) {

        result = formula.match(atomOrConstant, 'g');
        while (formula !== tempFormula ) {
          tempFormula = formula;
          result.push(formula.match(unaryOrBinaryComplexFormula, 'g'));
          formula = formula.replace(unaryOrBinaryComplexFormula, replaceFormula);
        }
          result = result.join(',');
          result = result.split(',');
              for (var i = 0; i < result.length; i++ )
                for (var j = i + 1; j < result.length; )
                  if (result[i] == result[j]) result.splice(j, 1);
                    else j++
            return result.length-1;
}

function verificationFormula(formula){

      while (formula != tempFormula ) {
        tempFormula = formula;
        formula = formula.replace(unaryOrBinaryComplexFormula, replaceFormula);
      }
      tempFormula=0;
    var resultType = formula.match(new RegExp(atomOrConstant, 'g'));
    if ((formula.length == 1) && (resultType != null) && (resultType.length == 1)) {
        return true;
    } else {
        return false;
    }
}
