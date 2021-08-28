  
function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(ex) {
    const exArr = [];
    ex = ex.replace(/ /g, '');
    let valDig = "";

    for (let i = 0; i < ex.length; i++) {

        if (ex[i].charCodeAt(0) > 47 && ex[i].charCodeAt(0) < 58) {
            valDig += ex[i];

            if (i == ex.length - 1) {
                exArr.push(+valDig);
            }
        }

        else if (ex[i].charCodeAt(0) > 39 || ex[i].charCodeAt(0) < 46){
            if (valDig) {
                exArr.push(+valDig);
                valDig = "";
            }
            exArr.push(ex[i]);
        }
    }

    function calculator (exArr, actionArr) {      
        let index = 0;
        let acum = 0;

        for (let i of actionArr) {
            acum = 0;
            index = 0;
            if (i == "*") {
                index = exArr.indexOf(i, index);
                acum = exArr[index - 1] * exArr[index + 1];
                exArr.splice(index-1, 3, acum);
            }
            else if (i == "/") {
                index = exArr.indexOf(i, index);
                if (exArr[index - 1] / exArr[index + 1] == Infinity || exArr[index - 1] / exArr[index + 1] == -Infinity) {
                    throw "TypeError: Division by zero.";
                }
                acum = exArr[index - 1] / exArr[index + 1];
                exArr.splice(index-1, 3, acum);
                }
            else if (i == "+") {
                index = exArr.indexOf(i, index);
                acum = exArr[index - 1] + exArr[index + 1];
                exArr.splice(index-1, 3, acum);
            }
            else if (i == "-") {
                index = exArr.indexOf(i, index);
                acum = exArr[index - 1] - exArr[index + 1];
                exArr.splice(index-1, 3, acum);
            }
        }
        return exArr[0];
    }


    function calculatorBracket(exArr) {
        let checkBrackets = true;
        let acum = 0;

        while(checkBrackets) {
            acum = 0;
            if ( (exArr.indexOf(")") < exArr.indexOf("(")) || (exArr.indexOf(")") != -1 &&exArr.indexOf("(") == -1)) {
                throw "ExpressionError: Brackets must be paired";
            }
            if (exArr.indexOf("(") == -1) {
                break;
            }

            let indexF = exArr.lastIndexOf("(");
            let indexS = exArr.indexOf(")", indexF);

            let actionArr = exArr.slice(indexF, indexS).filter( i => {
                if (i == "*" || i == "/" || i == "-" || i == "+") return true;
            });
            actionArr = actionArr.sort((a, b) => {
                if ((b == '*' || b == '/') && (a == '-' || a == '+')) {
                    return 1;
                }
                else if ((b == '-' || b == '+') && (a == '*' || a == '/')) {
                    return -1;
                }});
      
            acum = calculator(exArr.slice(indexF + 1, indexS), actionArr);
            exArr.splice(indexF, indexS - indexF + 1, acum);

        }
        let actionArr = exArr.filter( i => {
            if (i == "*" || i == "/" || i == "-" || i == "+") return true;
        });
        actionArr = actionArr.sort((a, b) => {
            if ((b == '*' || b == '/') && (a == '-' || a == '+')) {
                return 1;
            }
            else if ((b == '-' || b == '+') && (a == '*' || a == '/')) {
                return -1;
            }});

        return calculator(exArr, actionArr);
    }

    return calculatorBracket(exArr);
}

module.exports = {
    expressionCalculator
}