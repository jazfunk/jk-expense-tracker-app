// class Expense {
//   constructor(id, date, description, amount, vendor) {
//     this.id = id;
//     this.date = date;
//     this.description = description;
//     this.amount = amount;
//     this.vendor = vendor;
//   }
// }
class Expense {
  constructor(id, date, description, amount, vendor) {
    this.vendor = vendor;
    this.description = description;
    this.date = date;
    this.amount = amount;
    this.id = id;
  }
}

window.onload = () => {
  checkForUndo();
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  displayExpensesNEW(savedExpenses.sort(compareDates));
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
  displayExpensesNEW(savedExpenses);
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

const displayExpensesNEW = (savedSortedExpenses) => {
  if (savedSortedExpenses.length > 1) {
    let displayTo = document.querySelector("table");
    let expenseHeaders = Object.keys(savedSortedExpenses[0]);
    generateExpensesTable(displayTo, savedSortedExpenses);
    generateExpensesTableHead(displayTo, expenseHeaders);
  }
};

const generateExpensesTableHead = (displayTo, expenseHeaders) => {
  let thead = displayTo.createTHead();
  let row = thead.insertRow();
  for (let expense of expenseHeaders) {
    let th = document.createElement("th");
    let text = document.createTextNode(expense);
    let headerText = "";
    switch (expense) {
      case "id":
        // Hide ID column
        return;
        break;
      case "vendor":
        headerText = "Vendor";
        break;
      case "description":
        headerText = "Description";
        break;
      case "date":
        headerText = "Date";
        break;
      case "amount":
        headerText = "$";
        break;
      default:
    }
    text.textContent = headerText;
    th.appendChild(text);
    row.appendChild(th);
  }
};

const generateExpensesTable = (displayTo, expenses) => {
  for (let element of expenses) {
    let row = displayTo.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      cell.className = appendClassName(key);
      let text = document.createTextNode(element[key]);
      switch (key) {
        case "date":
          text.textContent = displayDate(text.textContent);
          break;
        case "amount":
          text.textContent = displayCurrency(text.textContent);
          break;
        default:
      }
      cell.appendChild(text);
    }
  }
};

const appendClassName = (value) => `${value}-format`;

// Refactor this using document.createElement()
// .innerHTML is potentially unsafe
// const displayExpenses = (expenses) => {
//   var html = "<table border class='expenses-table'>";
//   html += "<tr>";
//   html += "<td class='expense-header-row'>Vendor</td>";
//   html += "<td class='expense-header-row'>Description</td>";
//   html += "<td class='expense-header-row'>Date</td>";
//   html += "<td class='expense-header-row'>$</td>";
//   html +=
//     "<td class='expense-header-row'><input id='delete-all' type='checkbox' class='check-box'></td></tr>";
//   for (var i = 0; i < expenses.length; i++) {
//     html += "<tr>";
//     html +=
//       "<td class='expense-data-row vendor-format'>" +
//       expenses[i].vendor +
//       "</td>";
//     html +=
//       "<td class='expense-data-row description-format'>" +
//       expenses[i].description +
//       "</td>";
//     html +=
//       "<td class='expense-data-row  date-format'>" +
//       displayDate(expenses[i].date) +
//       "</td>";
//     html +=
//       "<td class='expense-data-row enMoney'>" +
//       displayCurrency(expenses[i].amount) +
//       "</td>";
//     html +=
//       "<td class='expense-data-row checkbox-format'><input type='checkbox' class='delete-checkbox'></td>";
//     html += "</tr>";
//   }
//   html += "</table>";
//   document.getElementById("display-expenses").innerHTML = html;
// };
