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

window.onload = () => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  displayExpenses(savedExpenses);
  document.getElementById('expense-date').focus();  
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
  var html = "<table border class='expenses-table'>"
  html += "<tr>";
  html += "<td class='expense-header-row'>Vendor</td>";
  html += "<td class='expense-header-row'>Description</td>";
  html += "<td class='expense-header-row'>Date</td>";
  html += "<td class='expense-header-row'>Amount</td>";
  html += "<td class='expense-header-row'><input id='delete-all' type='checkbox' class='check-box'></td></tr>";
  for (var i = 0; i < expenses.length; i++) {
    html += "<tr>";
    html += "<td class='expense-data-row vendor-format'>" + expenses[i].vendor + "</td>";
    html += "<td class='expense-data-row description-format'>" + expenses[i].description + "</td>";
    html += "<td class='expense-data-row  date-format'>" + displayDate(expenses[i].date) + "</td>";
    html += "<td class='expense-data-row enMoney'>" + displayCurrency(expenses[i].amount) + "</td>";
    html += "<td class='expense-data-row checkbox-format'><input type='checkbox' class='delete-checkbox'></td>";
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("display-expenses").innerHTML = html;
}

const displayCurrency = (value) => {
    const dec = value.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2;
    return numberWithCommas(Number(value).toFixed(len));
}

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const displayDate = (value) => {
    const d = new Date(value);
    const month = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(d);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);    
    const year = new Intl.DateTimeFormat('en', {year: 'numeric' }).format(d);
    const dateFormtted = `${month}-${day}-${year}`;
    return dateFormtted;
}