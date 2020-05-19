class ExpensesTable {
  constructor(table) {
    this.table = table;
  }
  display(expenses) {
    this.table.innerHTML = "";
    if (expenses.length > 0) {
      let expenseHeaders = Object.keys(expenses[0]);
      this.generateHeader();
      this.generateRows(expenses);
    } else {
      this.generateHeader();
      const emptyRow = this.table.insertRow();
      const emptyCell = emptyRow.insertCell();
      emptyCell.setAttribute("colspan", 4);
      emptyCell.textContent = "No expenses added yet";
    }
  }

  generateHeader() {
    const thead = this.table.createTHead();
    const headerRow = thead.insertRow();

    headerRow.appendChild(this.createHeaderCell(""));
    headerRow.appendChild(this.createHeaderCell("Vendor"));
    headerRow.appendChild(this.createHeaderCell("Description"));
    headerRow.appendChild(this.createHeaderCell("Date"));
    headerRow.appendChild(this.createHeaderCell("$"));
  }

  createHeaderCell(text) {
    const cell = document.createElement("th");
    cell.appendChild(document.createTextNode(text));
    return cell;
  }

  generateRows(expenses) {
    for (let expense of expenses) {
      let row = this.table.insertRow();

      const actionCell = row.insertCell();
      actionCell.className = "action-format";
      const actionButton = document.createElement("BUTTON");
      actionButton.setAttribute('data-expense-id', expense.id);
      actionButton.className = "action-btn clickable";
      actionButton.textContent = "Delete";
      actionCell.appendChild(actionButton);

      const vendorCell = row.insertCell();
      vendorCell.className = "vendor-format";
      vendorCell.textContent = expense.vendor;

      const descriptionCell = row.insertCell();
      descriptionCell.className = "description-format";
      descriptionCell.textContent = expense.description;

      const dateCell = row.insertCell();
      dateCell.className = "date-format";
      dateCell.textContent = this.displayDate(expense.date);
      
      const amountCell = row.insertCell();
      amountCell.className = "amount-format";
      amountCell.textContent = this.displayCurrency(expense.amount);
    }
  }

  displayDate(value) {
    const d = new Date(`${value} 00:00:00`);
    const month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const dateFormtted = `${month}-${day}-${year}`;
    return dateFormtted;
  }

  displayCurrency(value) {
    const dec = value.split(".")[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    const fixedValue = Number(value).toFixed(len);
    return fixedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
