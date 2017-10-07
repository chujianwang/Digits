$(document).ready(function () {
	$("#submitButton").click(function () {
		if(document.getElementById("input").validity.rangeOverflow||document.getElementById("input").validity.rangeUnderflow){
			alert("Please input number between 1 and 999999");
		}
		else{
			var input = $("#input").val();
			var output=getDigit(input);
			var txt = $("<p></p>").text("The number you input is: "+input+" Final output: " + output);
			$("#outputArea").append(txt);
		}		
	});
	$("#resetButton").click(function () {
		$("#outputArea").empty();
	});
});

function getDigit(input) {
	var digits = input.toString().length;
	var set1 = putDigitInSet(digits,input);
	var firstDigit = Array.from(set1).pop();
	var carryFlag=ifCarry(firstDigit,set1);
	var newFirstDigit=getNewFirstDigit(firstDigit,set1);
	var smallNum=getSmallNum(set1);
	var output=0;

	if (carryFlag == 10) {
		if (set1.has(0)) {
			output = smallNum;
			for (var flag = 0; flag < digits; flag++) {
				output = output * 10 + smallNum;
			}
		} else {
			output = smallNum * Math.pow(10, digits);
		}
	} else {
		if (!set1.has(0)) {
			output = newFirstDigit * Math.pow(10, digits - 1);
		} else {
			output = smallNum;
			for (var flag = 0; flag < digits - 1; flag++) {
				output = output * 10 + smallNum;
			}
		}
	}
	
	return output;
}

function putDigitInSet(digits,input){
	var set1 = new Set();
	for (var i = 0; i < digits; i++) {
		var digit = input % 10;
		set1.add(digit);
		input = (input - digit) / 10;
	}
	return set1;
}

function ifCarry(firstDigit,set1){
	var j;
	for (j = firstDigit; j <= 9; j++) {
		if (!set1.has(j)) {
			break;
		}
	}
	
	return carryFlag=j;
}

function getNewFirstDigit(firstDigit,set1){
	var h;
	for (h = 1; h <= 9; h++) {
		if (!set1.has(h) && h > firstDigit) {
			break;
		}
	}
	return newFirstDigit=h;
}

function getSmallNum(set1){
	var k;
	for (k = 1; k <= 9; k++) {
		if (!set1.has(k)) {
			break;
		}
	}
	return smallNum=k;
}