const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('total-income');
const expenceDisplay = document.getElementById('total-expense');

let transactions =[];

form.addEventListener('submit', function(e){
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if(!description || isNaN(amount)) return;

    const transaction ={
        id: Date.now(),
        description,
        amount,
        type
    };
    transactions.push(transaction);
    descriptionInput.value='';
    amountInput.value='';
    renderTransactions();
});

function renderTransactions(){
    transactionList.innerHTML='';

    let income =0;
    let expense = 0;

    transactions.forEach(tx =>{
        const li = document.createElement('li');
        li.className = tx.type;
        li.innerHTML=`
        ${tx.description} - $${tx.amount.toFixed(2)}
        <button onclick="deleteTransaction(${tx.id})">Delete</button>
        `;
        transactionList.appendChild(li);

        if(tx.type === 'income') income += tx.amount;
        else expense += tx.amount;
    });

    const balance = income - expense;

    balanceDisplay.textContent = balance.toFixed(2);
    incomeDisplay.textContent = income.toFixed(2);
    expenseDisplay.textContent = expense.toFixed(2);    
}

function deleteTransaction(id){
    transactions = transactions.filter(tx => tx.id !== id);
}