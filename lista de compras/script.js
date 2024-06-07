const form = document.getElementById('item-form')
const itemList = document.getElementById('item-list')
document.addEventListener('DOMContentLoaded', function () {
  const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
  };


  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  function inputDecimal() {
    if (!calculator.displayValue.includes('.')) {
      calculator.displayValue += '.';
    }
  }

  function handleOperator(nextOperator) {
    const { displayValue, operator, firstOperand } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand === null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }

  function performCalculation(operator, firstOperand, secondOperand) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
  }

  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }

  updateDisplay();

  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains('decimal')) {
      inputDecimal();
      updateDisplay();
      return;
    }

    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('equal-sign')) {
      handleOperator('=');
      updateDisplay();
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  });
});
form.addEventListener('submit', function (event) {
  event.preventDefault()


  const itemInput = document.getElementById("item-input")
  const itemText = itemInput.value.trim()

  if (itemText !== "") {
    const item = createListaItem(itemText)
    itemList.appendChild(item)
    itemInput.value = ""
  }
})

function createListaItem(itemText) {
  const item = document.createElement('li')
  item.classList.add('item')
  const textSpan = document.createElement('span')
  textSpan.textContent = itemText

  const divbtn = document.createElement('div')

  const botaoPrioridades = document.createElement("button");
  botaoPrioridades.textContent = "Prioridades";
  botaoPrioridades.classList.add("priority-btn");
  botaoPrioridades.addEventListener("click", function() {
    // Mover o item para o topo da lista
  const lista = document.getElementById("item-list");
    lista.insertBefore(item, lista.childNodes[0]);
    item.style.backgroundColor = "#DCDCDC";
    item.style.fontWeight = "bold";
  });

  const deleteBnt = document.createElement('button')
  deleteBnt.textContent = 'excluir'
  deleteBnt.classList.add('delete-btn')
  deleteBnt.addEventListener('click', function () {
    item.remove()
  })
  divbtn.appendChild(deleteBnt);
  divbtn.appendChild(botaoPrioridades);

  // Adicionar div de botões ao item de lista
  item.appendChild(textSpan)
  item.appendChild(divbtn);
  return item;
}