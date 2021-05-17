$(document).ready(function (){
    let displayStr = "0";
    $(".operator").hide();

    $("td").click(function() {
        if (displayStr.charAt(0) == "0") {
            displayStr = displayStr.substring(1);
        }
        if (displayStr.length >= 0 && !(displayStr.includes("+")|| displayStr.includes("-"))) {
            $(".operator").show();
        }
        displayStr += $(this).attr("id");
        $("#display").text(displayStr);

        if (displayStr.length >= 9) {
            $("table").hide();
        }
    })

    $(".operator").click(function(){
        $(".operator").hide();
    })

    $("td").mousedown(function() {
        $(this).css("background-color", "darkgray")
    })

    $("td").mouseup(function() {
        $(this).css("background-color", "lightgray")
    })

    $("button:contains(Reset)").click(function() {
        displayStr = "0";
        $("#display").text(displayStr);
        $(".operator").hide();
        $("table").show();
    })



    $("button:contains(Submit)").click(function() {
        let calcStr = displayStr;
        var equation = {
            onFirst: true,
            operator: "",
            op1: 0,
            op2: 0,    
        };

        function processNum(num, equation) {
            if (equation.onFirst) {
                if (num == "+" || num == "-") {
                    equation.onFirst = false;
                    equation.operator = num;
                    console.log("found operator" + num);
                } else {
                    equation.op1 *= 10;
                    equation.op1 += parseInt(num);
                    console.log("found num for op1 " + num);
                }
            } else {
                equation.op2 *= 10;
                equation.op2 += parseInt(num);
                console.log("found num for op2 " + num);
            }
        }

        let result = 0;

        while (calcStr.length > 1) {
            processNum(calcStr.charAt(0), equation);
            calcStr = calcStr.substring(1);
        }
        processNum(calcStr.charAt(0), equation);

        if (equation.operator == "+") {
            result = equation.op1 + equation.op2;
        } else {
            result = equation.op1 - equation.op2;
        }
        
        displayStr = result.toString();
        $("#display").text(displayStr);

        if (displayStr.length < 9) {
            $("table").show();
        }
    })

    
})