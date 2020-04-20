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
  constructor(vendor, description, date, amount, id) {
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
  displayExpenses(savedExpenses.sort(compareDates));
  document.getElementById("expense-date").focus();
};

const clearButton = document
  .getElementById("clear-expenses-btn")
  .addEventListener("click", () => {
    const tempExpenses = localStorage.getItem("expenses");
    localStorage.clear();
    localStorage.setItem("tempExpenses", tempExpenses);
    location.reload();
  });

const inputForm = document
  .getElementById("expense-form")
  .addEventListener("submit", () => {
    const date = document.getElementById("expense-date").value;
    const description = document.getElementById("expense-description").value;
    const amount = document.getElementById("expense-amount").value;
    const vendor = document.getElementById("expense-vendor").value;
    addNewExpense(vendor, description, date, amount);
  });

const addNewExpense = (vendor, description, date, amount) => {
  const id = Date.now() + Math.random();
  const newExpense = new Expense(vendor, description, date, amount, id);
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





// Function untested
const updateExistingExpense = (expense) => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const matchingExpense = savedExpenses.find(
    () => expense.id === savedExpenses.id);

  const index = savedExpenses.indexOf(matchingExpense);
  savedExpenses[index] = expense;
  window.localStorage.setItem("expenses", JSON.stringify(savedExpenses));
};





const deleteExpense = (expense) => {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const matchingExpense = savedExpenses.find((savedExpense) => {
    return expense.id === savedExpense.id;
  });
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
  const d = new Date(`${value} 00:00:00`);
  const month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const dateFormtted = `${month}-${day}-${year}`;
  return dateFormtted;
};

const displayExpenses = (savedSortedExpenses) => {
  if (savedSortedExpenses.length > 0) {
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
    let t = text.textContent;
    text.textContent = `${t.charAt(0).toUpperCase()}${t.slice(1)}`;
    switch (expense) {
      case "id":
        // Hide ID column
        return;
        text.textContent = "ID";
        break;
      case "amount":
        text.textContent = "$";
        break;
      default:
    }
    th.appendChild(text);
    row.appendChild(th);
  }
};

const appendClassName = (value) => `${value}-format`;

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
  testingDelete();
};



const tableRow = document.querySelector('table').addEventListener("click", (e) => {
  // console.log(e.target.parentElement);
  // console.log(e.target.parentElement.querySelector('.id-format').textContent);
  const selectedRow = e.target.parentElement;
  
  const selectedRowID = selectedRow.querySelector('.id-format').textContent;
  const selectedRowDate = selectedRow.querySelector('.date-format').textContent;
  const selectedRowVendor = selectedRow.querySelector('.vendor-format').textContent;
  const selectedRowDescription = selectedRow.querySelector('.description-format').textContent;
  const selectedRowAmount = selectedRow.querySelector('.amount-format').textContent;

  // selectedRowVendor, selectedRowDescription, selectedRowDate, selectedRowAmount, selectedRowID
  const exp = new Expense(selectedRowVendor, selectedRowDescription, selectedRowDate, selectedRowAmount, selectedRowID);
  console.log(exp);
  
  deleteExpense(exp);

  // console.log(selectedRowID);

  // const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
  // console.log(savedExpenses);

  // const matchingExpense = savedExpenses.find(() => savedExpenses.id === selectedRowID);
  // const index = savedExpenses.indexOf(matchingExpense);
  // if (index > -1) {
  //   savedExpenses.splice(index, 1);
  //   localStorage.setItem("expenses", JSON.stringify(savedExpenses));
  // }

});



function testingDelete() {
  var index,
    table = document.querySelector("table");
  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].onClick = function () {
      index = this.rowIndex;
      console.log(index);
    };
  }
}















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