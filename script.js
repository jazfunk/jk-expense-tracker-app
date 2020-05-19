const table = document.querySelector("#main-table");
const expensesTable = new ExpensesTable(table);

window.onload = () => {
  checkForUndoAll();
  checkForUndoExpense();
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expensesTable.display(savedExpenses);
  displayExpensesTotal(savedExpenses);
  document.getElementById("expense-date").focus();
};

const clearButton = document
  .getElementById("clear-expenses-btn")
  .addEventListener("click", () => {
    const tempExpenses = localStorage.getItem("expenses");
    localStorage.clear();
    localStorage.setItem("tempExpenses", tempExpenses);
    expensesTable.display(getSavedExpenses());
  });

const inputForm = document
  .getElementById("input-expense-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("expense-date").value;
    const description = document.getElementById("expense-description").value;
    const amount = document.getElementById("expense-amount").value;
    const vendor = document.getElementById("expense-vendor").value;
    addNewExpense(vendor, description, date, amount);
    displayExpensesTotal(getSavedExpenses());
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
  }
  if (a.date < b.date) {
    comparison = 1;
  }
  return comparison;
};

const setLocalExpenses = (newExpense) => {
  const savedExpenses = getSavedExpenses();

  savedExpenses.push(newExpense);
  expensesTable.display(savedExpenses);
  localStorage.setItem("expenses", JSON.stringify(savedExpenses));
  localStorage.removeItem("tempExpenses");
  localStorage.removeItem("deletedExpense");
};

const deleteExpense = (expenseId) => {
  const expenses = getSavedExpenses().filter(
    (expense) => expense.id !== parseFloat(expenseId)
  );
  localStorage.setItem("expenses", JSON.stringify(expenses));
  const savedExpenses = getSavedExpenses();
  expensesTable.display(savedExpenses);
  displayExpensesTotal(savedExpenses);

  //   const matchingExpense = savedExpenses.find(
  //     (savedExpense) => parseFloat(expenseId) === savedExpense.id
  //   );
  //   const index = savedExpenses.indexOf(matchingExpense);
  //   if (index > -1) {
  //     savedExpenses.splice(index, 1);
  //     localStorage.setItem("expenses", JSON.stringify(savedExpenses));
  //     localStorage.setItem("deletedExpense", JSON.stringify(matchingExpense));
  //   }
};

const getSavedExpenses = () => {
  return JSON.parse(window.localStorage.getItem("expenses")) || [];
};

document.querySelector("#main-table").addEventListener("click", (e) => {
  if (e.target.className === "action-btn clickable") {    
    deleteExpense(e.target.getAttribute("data-expense-id"));
  }
});

const checkForUndoAll = () => {
  const undoLink = document.getElementById("undo-message");
  const undoDisplayText = "Undo Clear All?";
  const deletedExpenses = localStorage.getItem("tempExpenses") || [];
  undoLink.textContent = deletedExpenses.length > 0 ? undoDisplayText : "";

  if (deletedExpenses.length > 0) {
    console.log("no deleted epenses");
    setTimeout(function () {
      document.getElementById("undo-message").textContent = "";
      localStorage.removeItem("tempExpenses");
      location.reload();
    }, 5000);
  }
};

const undoAllExpensesLink = document
  .getElementById("undo-message")
  .addEventListener("click", (e) => {
    const tempExpenses = localStorage.getItem("tempExpenses");
    localStorage.setItem("expenses", tempExpenses);
    localStorage.removeItem("tempExpenses");
    location.reload();
  });

const checkForUndoExpense = () => {
  const undoExpenseLink = document.getElementById("undo-expense-message");
  const undoExpenseDisplayText = "Undo Delete?";
  const deletedExpense = localStorage.getItem("deletedExpense") || [];
  undoExpenseLink.textContent =
    deletedExpense.length > 0 ? undoExpenseDisplayText : "";

  if (deletedExpense.length > 0) {
    console.log("no deleted epense");
    setTimeout(() => {
      document.getElementById("undo-message").textContent = "";
      localStorage.removeItem("deletedExpense");
      location.reload();
    }, 5000);
  }
};

const undoExpenseLink = document
  .getElementById("undo-expense-message")
  .addEventListener("click", (e) => {
    const tempExpense = JSON.parse(localStorage.getItem("deletedExpense"));
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    savedExpenses.push(tempExpense);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));
    localStorage.removeItem("deletedExpense");
    location.reload();
  });

const displayExpensesTotal = (expenses) => {
  const total = expenses.reduce((a, b) => {
    const nextNumber = parseFloat(b.amount);
    return a + nextNumber;
  }, 0);
  document.getElementById(
    "total-display"
  ).textContent = `Total Expenses:  $${total.toFixed(2)}`;
};
