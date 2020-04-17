var expenses = [];

class Expense {
  constructor(id, date, description, amount, vendor) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.vendor = vendor;
  }
}

let addNewExpense = (date, description, amount, vendor) => {
  const id = Date.now() + Math.random();
  const newExpense = new Expense(id, date, description, amount, vendor);
  debugger;
  expenses.push(newExpense);
  console.table(expenses);
};

document.getElementById("add-expense-btn").addEventListener("click", (e) => {
  e.preventDefault;
  debugger;
  addNewExpense("3/15/2020", "desc text", "2.22", "McDonalds");
});

function updateExistingExpenses(expense) {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const matchingExpense = expenses.find(function (savedExpenses) {
    return expense.id === savedExpenses.id;
  });
  const index = savedExpenses.indexOf(matchingExpense);
  savedExpenses[index] = expense;
  window.localStorage.setItem("expenses", JSON.stringify(savedExpenses));
}
