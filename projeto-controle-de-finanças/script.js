let transactions = [];
let initialBalance = 0;

document.getElementById('setInitialBalanceBtn').addEventListener('click', setInitialBalance);
document.getElementById('addTransactionBtn').addEventListener('click', addTransaction);
document.getElementById('clearAllBtn').addEventListener('click', clearAllData);

document.getElementById('initialBalance').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        setInitialBalance();
    }
});

document.getElementById('description').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTransaction();
    }
});

document.getElementById('amount').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTransaction();
    }
});

function setInitialBalance() {
    const balance = parseFloat(document.getElementById('initialBalance').value);
    if (!isNaN(balance)) {
        initialBalance = balance;
        updateUI();
        document.getElementById('initialBalance').value = '';
    } else {
        alert('Por favor, insira um valor válido para o saldo inicial.');
    }
}

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('transactionType').value;
    
    if (description && !isNaN(amount)) {
        const transaction = {
            id: generateId(),
            description,
            amount: type === 'expense' ? -amount : amount
        };
        
        transactions.push(transaction);
        updateUI();
        
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('transactionType').value = 'income';
    } else {
        alert('Por favor, preencha a descrição e o valor corretamente.');
    }
}

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

function updateUI() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    
    let balance = initialBalance;
    
    transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.innerHTML = `
            ${transaction.description} <span>${transaction.amount < 0 ? '-' : '+'} R$ ${Math.abs(transaction.amount).toFixed(2)}</span>
        `;
        transactionList.appendChild(transactionItem);
        
        balance += transaction.amount;
    });
    
    document.getElementById('balance').innerText = `R$ ${balance.toFixed(2)}`;
}

function clearAllData() {
    transactions = [];
    initialBalance = 0;
    updateUI();
}
