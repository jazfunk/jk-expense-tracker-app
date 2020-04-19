class Expense {
  constructor(id, date, description, amount, vendor) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.vendor = vendor;
  }
}

window.onload = () => {
  checkForUndo();
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  displayExpenses(savedExpenses.sort(compareDates));
  document.getElementById("expense-date").focus();
};

const checkForUndo = () => {
  const undoLink = document.getElementById("undo-message");
  const undoDisplayText = "Expenses Deleted, click here to restore.";
  const deletedExpenses = localStorage.getItem("tempExpenses") || [];
  undoLink.textContent = deletedExpenses.length > 0 ? undoDisplayText : "";
};

const undoLink = document
  .getElementById("undo-message")
  .addEventListener("click", (e) => {
    const tempExpenses = localStorage.getItem("tempExpenses");
    localStorage.setItem("expenses", tempExpenses);
    localStorage.removeItem("tempExpenses");
    location.reload();
  });

const clearButton = document
  .getElementById("clear-expenses-btn")
  .addEventListener("click", () => {
    const tempExpenses = localStorage.getItem("expenses");
    localStorage.clear();
    localStorage.setItem("tempExpenses", tempExpenses);
    location.reload();
  });

const form = document
  .getElementById("expense-form")
  .addEventListener("submit", () => {
    const date = document.getElementById("expense-date").value;
    const description = document.getElementById("expense-description").value;
    const amount = document.getElementById("expense-amount").value;
    const vendor = document.getElementById("expense-vendor").value;
    addNewExpense(date, description, amount, vendor);
  });

const addNewExpense = (date, description, amount, vendor) => {
  const id = Date.now() + Math.random();
  const newExpense = new Expense(id, date, description, amount, vendor);
  setLocalExpenses(newExpense);
};

const compareDates = (a, b) => {
  let comparison = 0;
  if (a.date > b.date) {
    comparison = -1;
  } else if (a.date < b.date) {
    comparison = 1;
  }
  return comparison;
};

const setLocalExpenses = (newExpense) => {
  const savedExpenses =
    JSON.parse(window.localStorage.getItem("expenses")) || [];
  savedExpenses.push(newExpense);
  displayExpenses(savedExpenses);
  localStorage.setItem("expenses", JSON.stringify(savedExpenses));
  localStorage.removeItem("tempExpenses");
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

const deleteExpense = (expense) => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const matchingExpense = savedExpenses.find(
    (savedExpense) => expense.id === savedExpenses.id
  );
  const index = savedExpenses.indexOf(matchingExpense);
  if (index > -1) {
    savedExpenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));
  }
};

const displayCurrency = (value) => {
  const dec = value.split(".")[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  return addCommasToDollars(Number(value).toFixed(len));
};

const addCommasToDollars = (value) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const displayDate = (value) => {
  const d = new Date(value);
  const month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const dateFormtted = `${month}-${day}-${year}`;
  return dateFormtted;
};

// Refactor this using document.createElement()
// .innerHTML is potentially unsafe
const displayExpenses = (expenses) => {
  var html = "<table border class='expenses-table'>";
  html += "<tr>";
  html += "<td class='expense-header-row'>Vendor</td>";
  html += "<td class='expense-header-row'>Description</td>";
  html += "<td class='expense-header-row'>Date</td>";
  html += "<td class='expense-header-row'>$</td>";
  html +=
    "<td class='expense-header-row'><input id='delete-all' type='checkbox' class='check-box'></td></tr>";
  for (var i = 0; i < expenses.length; i++) {
    html += "<tr>";
    html +=
      "<td class='expense-data-row vendor-format'>" +
      expenses[i].vendor +
      "</td>";
    html +=
      "<td class='expense-data-row description-format'>" +
      expenses[i].description +
      "</td>";
    html +=
      "<td class='expense-data-row  date-format'>" +
      displayDate(expenses[i].date) +
      "</td>";
    html +=
      "<td class='expense-data-row enMoney'>" +
      displayCurrency(expenses[i].amount) +
      "</td>";
    html +=
      "<td class='expense-data-row checkbox-format'><input type='checkbox' class='delete-checkbox'></td>";
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("display-expenses").innerHTML = html;
};