const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("list");
const totalDisplay = document.getElementById("total");

let expenses = [];

form.addEventListener("submit", addExpense);

function addExpense(e) {
    e.preventDefault();

    const expense = {
        id: Date.now(),
        title: titleInput.value,
        amount: Number(amountInput.value)
    };

    expenses.push(expense);
    displayExpenses();
    updateTotal();

    titleInput.value = "";
    amountInput.value = "";
}

function displayExpenses() {
    list.innerHTML = "";
    expenses.forEach(expense => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="expense-info">
                <span class="expense-title">${expense.title}</span>
                <span class="expense-amount">Rs.${expense.amount}</span>
            </div>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})"> ✕
</button>
        `;

        list.appendChild(li);
    });
}


function deleteExpense(id) {
    const confirmDelete = confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    expenses = expenses.filter(expense => expense.id !== id);
    displayExpenses();
    updateTotal();
}


function updateTotal() {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    totalDisplay.innerText = `Rs.${total}`;
}
