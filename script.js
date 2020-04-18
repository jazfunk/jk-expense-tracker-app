class Expense {
  constructor(id, date, description, amount, vendor) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.vendor = vendor;
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  //e.preventDefault();
  validateFormValues();
});

function validateFormValues() {
    const date = document.getElementById('expense-date').value;
    const description = document.getElementById('expense-description').value;
    const amount = document.getElementById('expense-amount').value;
    const vendor = document.getElementById('expense-vendor').value;
    
    addNewExpense(date, description, amount, vendor);
}

const setDefaultInputValues = () => {
  document.getElementById("expense-date").value = "";
  document.getElementById("expense-description").value = "";
  document.getElementById("expense-amount").value = "";
  document.getElementById("expense-vendor").value = "";
};

window.onload = () => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  displayExpenses(savedExpenses);
  setDefaultInputValues();
};

const addNewExpense = (date, description, amount, vendor) => {
  const id = Date.now() + Math.random(); 
  const newExpense = new Expense(id, date, description, amount, vendor);
  setLocalExpenses(newExpense);
};

const setLocalExpenses = (newExpense) => {
  const savedExpenses =
    JSON.parse(window.localStorage.getItem("expenses")) || [];
  savedExpenses.push(newExpense);
  displayExpenses(savedExpenses);
  window.localStorage.setItem("expenses", JSON.stringify(savedExpenses));
};

const updateExistingExpense = (expense) => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const matchingExpense = savedExpenses.find(
    (savedExpense) => expense.id === savedExpenses.id
  );
  const index = savedExpenses.indexOf(matchingExpense);
  savedExpenses[index] = expense;
  window.localStorage.setItem("expenses", JSON.stringify(savedExpenses));
};

function displayExpenses(expenses) {
  var html = "<table border class='expenses-table'>";
  html += "<td>Vendor</td>";
  html += "<td>Description</td>";
  html += "<td>Date</td>";
  html += "<td>Amount</td>";
  html += "<td><input id='delete-all' type='checkbox' class='check-box'></td>";
  for (var i = 0; i < expenses.length; i++) {
    html += "<tr>";
    html += "<td>" + expenses[i].vendor + "</td>";
    html += "<td>" + expenses[i].description + "</td>";
    html += "<td>" + expenses[i].date + "</td>";
    html += "<td>" + expenses[i].amount + "</td>";
    html += "<td><input type='checkbox' class='delete-checkbox'></td>";
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("display-expenses").innerHTML = html;
}
