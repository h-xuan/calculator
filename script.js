var operator;
var firstNum;
var secondNum;
var currentNum = "";
var hasDecimal;
var hasSign;


//////// GET KEYS ////////////
var working = document.querySelector('#working');
var answer = document.querySelector('#answer');

var add = document.querySelector('#add');
var minus = document.querySelector('#minus');
var multiply = document.querySelector('#multiply');
var divide = document.querySelector('#divide');

var equal = document.querySelector('#equal');
var cancel = document.querySelector('#cancel');
var backspace = document.querySelector('#backspace');
var decimal = document.querySelector('#decimal');
var sign = document.querySelector('#sign');


//////// ON CLICKS ///////////

var numbers = document.querySelectorAll('#calc-grid .num');
numbers.forEach(function(num) {
	num.addEventListener('click', function() {
		working.textContent += num.innerHTML;
		currentNum += num.innerHTML;
	})
});

var operators = document.querySelectorAll('#calc-grid .op');
operators.forEach(function(op){
	var symbol = "";
	op.addEventListener('click', function(){
		switch(op.id) {
			case 'add':
				symbol = '+';
				break;
			case 'minus':
				symbol = '-';
				break;
			case 'multiply':
				symbol = '*';
				break;
			case 'divide':
				symbol = "/";
				break;
		}

		// first number negative
		if(working.textContent === "" && op.id === 'minus')
		{
			currentNum = "-";
			working.textContent = "-";
		}

		else if(working.textContent !== "")
		{
		// if last char is a number
			if (!isNaN(parseFloat(working.textContent.slice(-1))))
			{
				working.textContent += symbol;


				// if it's the first number
				if(!firstNum)
				{
					console.log(currentNum);
					firstNum = parseFloat(currentNum);
					currentNum = "";
					operator = symbol;
				}
				// if first number already exists
				else {
					secondNum = parseFloat(currentNum);
					ans = operate(firstNum, secondNum, operator);

					if (ans > 99999999 || ans < 99999999)
					{
						answer.textContent = ans.toExponential(5).toString();
					}
					else if (ans.toString().length > 10)
					{
						ans = parseFloat(ans).toFixed(10);
						answer.textContent = ans.toString();
					}
					else {
						answer.textContent = ans.toString();
					}
					firstNum = ans;
					operator = symbol;
				};
				hasDecimal = false;
				hasSign = false;
				currentNum = "";
			}



			// if it's an operator
			else {

				// if it's minus (negative sign)
				if (op.id === 'minus' && !hasSign)
				{
					currentNum += "-";
					working.textContent += "-";
					hasSign = true;
				} else {
					working.textContent = working.textContent.slice(0,-1) + symbol;
				operator = symbol;
				}

				
			}
		} 

		// if previous answer exists
		else if (working.textContent === "" && answer.textContent !== "")
		{
			firstNum = parseFloat(answer.textContent);
			working.textContent = answer.textContent + symbol;
			operator = symbol;
		}
	})
})

equal.addEventListener('click', function() {
	if(working.textContent !== "" && !isNaN(parseFloat(working.textContent.slice(-1)))){
		// if it's just a single number
		if (!operator)
		{
			answer.textContent = working.textContent;
			working.textContent = "";
		}
		else{
			secondNum = parseFloat(currentNum);
			ans = operate(firstNum, secondNum, operator);
			console.log(firstNum, secondNum);
			
			if (ans > 99999999 || ans < 99999999)
				{
					// ans = ans.toExponential(5);
					answer.textContent = ans.toExponential(5).toString();
				}
			else if (ans.toString().length > 10)
				{
					ans = parseFloat(ans).toFixed(10);
					answer.textContent = ans.toString();
				}
				else {
					answer.textContent = ans.toString();
				}

			working.textContent = "";
			currentNum = "";
			firstNum = undefined;
			operator = undefined;
			hasDecimal = false;
			hasSign = false;
		}
	}
})

cancel.addEventListener('click', function() {
	working.textContent = "";
	answer.textContent = "";
	currentNum = "";
	firstNum = undefined;
	secondNum = undefined;
	operator = undefined;

})

backspace.addEventListener('click', function() {
	if (working.textContent !== "")
	{
		currentNum = currentNum.slice(0,-1);
		working.textContent = working.textContent.slice(0,-1);
	}
})

decimal.addEventListener('click', function() {
	if (working.textContent !== "" && !hasDecimal)
	{
		working.textContent += ".";
		currentNum += ".";
		hasDecimal = true;
	}
})


// parse working string and evaluate answer
function operate(first, second, op) {
	switch(op) {
			case '+':
				return first+second;
				break;
			case '-':
				return first-second;
				break;
			case '*':
				return first*second;
				break;
			case '/':
				return first/second;
				break;
		}
}