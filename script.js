class Expense {
  constructor(id, date, description, amount, vendor) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.vendor = vendor;
  }
}


document.querySelector("form").addEventListener("click", (e) => {
  e.preventDefault;
  addNewExpense("3/15/2020", "desc text", "2.22", "McDonalds");
});

const setDefaultInputValues = () => {
    document.getElementById('expense-date').value = "Date of Expense";
    document.getElementById('expense-description').value = "Description";
    document.getElementById('expense-amount').value = "Amount of Expense";
    document.getElementById('expense-vendor').value = "Vendor";
}

window.onload = () => {
  // Temporary until this part is built propertly //
  getLocalExpenses(window.localStorage.getItem("expenses"));
  setDefaultInputValues();
  // End of temp code //
};

const getLocalExpenses = (expenses) => {
  var mainContentCell = document.querySelector(".main-cell");
  mainContentCell.innerText = expenses;
};

const addNewExpense = (date, description, amount, vendor) => {
  const id = Date.now() + Math.random();
  const newExpense = new Expense(id, date, description, amount, vendor);
  setLocalExpenses(newExpense);
};

const setLocalExpenses = (newExpense) => {
  const savedExpenses = JSON.parse(window.localStorage.getItem("expenses")) || [];
  savedExpenses.push(newExpense);
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
