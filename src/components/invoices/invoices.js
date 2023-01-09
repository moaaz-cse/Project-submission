let tableData,
  sortingId = true,
  sortingName = false,
  sortingDate = false,
  sortingTotalAmount = false,
  sortingBalance = false;

const invoiceDataTable = async () => {
  const response = await fetch("./invoices.json");
  if (!response.ok) {
    throw new Error("Someting went wron");
  }
  const responseData = await response.json();

  const invoiceData = responseData.invoiceData;
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  let row = "";
  invoiceData.map((data) => {
    row += `<section class="grid" id=${data.InvoiceId}>
            <div class="client-id">${data.InvoiceId}</div>
            <div class="client-name">${data.ClientName}</div>
            <div class="date">${data.Date}</div>
            <div class="date">${data.DueDate}</div>
            <div class="amount">$${data.Total}</div>
            <div class="amount">$${data.Balance}</div>
            <div class="${data.Status}">${data.Status}</div>
          </section>`;
  });
  //retunring data as array
  tableRow = invoiceData.map((data) => {
    return `<section class="grid" id=${data.InvoiceId}>
    <div class="client-id">${data.InvoiceId}</div>
    <div class="client-name" value="${data.ClientName}">${data.ClientName}</div>
    <div class="date" value="${data.Date.replaceAll("[-+.^:,/]", "")}">${
      data.Date
    }</div>
    <div class="date" value="${data.DueDate}">${data.DueDate}</div>
    <div class="amount" value=${data.Total}>$${data.Total}</div>
    <div class="amount" value=${data.Balance}>$${data.Balance}</div>
    <div class="${data.Status}" value="${data.Status}">${data.Status}</div>
    <div style="display: none;" value="${data.ClientType}"></div>
  </section>`;
  });
  tableData = tableRow;
  table.insertAdjacentHTML("beforeend", row);
};

//sorting data based on ID
const sortById = () => {
  sortingId = !sortingId;
  let sortedId = "";
  if (sortingId) {
    tableData.map((index) => {
      sortedId += index;
    });
  } else {
    let length = tableData.length - 1;
    for (length; length >= 0; length--) {
      sortedId += tableData[length];
    }
  }
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  table.insertAdjacentHTML("beforeend", sortedId);
};

//sorting based on names.
const sortByName = (node) => {
  sortingName = !sortingName;
  let sortedNames = [];
  let sortedNamesList = "";
  let element = document.createElement("span");

  if (sortingName) {
    tableData.map((index) => {
      element.innerHTML = index;
      sortedNames.push(index);
    });
    let valueFirst = document.createElement("span");
    let valueSecond = document.createElement("span");
    sortedNames = sortedNames.sort((first, next) => {
      valueFirst.innerHTML = first;
      valueSecond.innerHTML = next;
      if (
        valueFirst.firstChild.childNodes[node].getAttribute("value") <
        valueSecond.firstChild.childNodes[node].getAttribute("value")
      ) {
        return -1;
      }
      if (
        valueFirst.firstChild.childNodes[node].getAttribute("value") >
        valueSecond.firstChild.childNodes[node].getAttribute("value")
      ) {
        return 1;
      }
      return 0;
    });

    sortedNames.map((index) => {
      sortedNamesList += index;
    });
  } else {
    tableData.map((index) => {
      sortedNamesList += index;
    });
  }
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  table.insertAdjacentHTML("beforeend", sortedNamesList);
};

//sorting data based on  Amount
const sortByAmount = (node) => {
  sortingTotalAmount = !sortingTotalAmount;
  let sortedByAmount = "";
  let sortedAmount = [];
  let element = document.createElement("span");

  tableData.map((index) => {
    element.innerHTML = index;
    sortedAmount.push(index);
  });

  let valueFirst = document.createElement("span");
  let valueSecond = document.createElement("span");

  sortedAmount = sortedAmount.sort((first, next) => {
    valueFirst.innerHTML = first;
    valueSecond.innerHTML = next;
    if (sortingTotalAmount) {
      if (
        (valueFirst.firstChild.childNodes[node].getAttribute("value"),
        valueSecond.firstChild.childNodes[node].getAttribute("value"))
      ) {
        return (
          valueFirst.firstChild.childNodes[node].getAttribute("value") -
          valueSecond.firstChild.childNodes[node].getAttribute("value")
        );
      }
    } else {
      if (
        (valueFirst.firstChild.childNodes[node].getAttribute("value"),
        valueSecond.firstChild.childNodes[node].getAttribute("value"))
      ) {
        return (
          valueSecond.firstChild.childNodes[node].getAttribute("value") -
          valueFirst.firstChild.childNodes[node].getAttribute("value")
        );
      }
    }
  });
  sortedAmount.map((index) => {
    sortedByAmount += index;
  });
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  table.insertAdjacentHTML("beforeend", sortedByAmount);
};
//sorting by payment status.
const sortByStatus = () => {
  let sortedStatus = "";
  let statusSelected = document.getElementById("Status").value;
  let element = document.createElement("span");
  tableData.map((index) => {
    element.innerHTML = index;
    let statusVal = element.firstChild.childNodes[13].getAttribute("value");
    if (statusSelected.toString() === statusVal.toString()) {
      sortedStatus += index;
    }
    if (statusSelected.toString() === "any") {
      sortedStatus += index;
    }
  });
  // console.log(sortedStatus);
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  table.insertAdjacentHTML("beforeend", sortedStatus);
};

//sorting by Client type.
const sortByClient = () => {
  let sortedClient = "";
  let clientType = document.getElementById("Client").value;
  let element = document.createElement("span");
  tableData.map((index) => {
    element.innerHTML = index;
    let clientTypeVal = element.firstChild.childNodes[15].getAttribute("value");
    if (clientType.toString() === clientTypeVal.toString()) {
      sortedClient += index;
    }
    if (clientType.toString() === "any") {
      sortedClient += index;
    }
  });
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  table.insertAdjacentHTML("beforeend", sortedClient);
};

//sorting based on Date input.

const sortByDate = (node) => {
  sortingDate = !sortingDate;
  let sortedDateList = "";
  let sortedDate = [];
  let element = document.createElement("span");

  tableData.map((index) => {
    element.innerHTML = index;
    sortedDate.push(index);
  });
  let valueFirst = document.createElement("span");
  let valueSecond = document.createElement("span");

  sortedDate = sortedDate.sort((first, next) => {
    valueFirst.innerHTML = first;
    valueSecond.innerHTML = next;
    if (sortingDate) {
      return (
        valueFirst.firstChild.childNodes[node]
          .getAttribute("value")
          .replace(/[-/]/g, "")
          .split("")
          .reverse()
          .join("") -
        valueSecond.firstChild.childNodes[node]
          .getAttribute("value")
          .replace(/[-/]/g, "")
          .split("")
          .reverse()
          .join("")
      );
    } else {
      return (
        valueSecond.firstChild.childNodes[node]
          .getAttribute("value")
          .replace(/[-/]/g, "")
          .split("")
          .reverse()
          .join("") -
        valueFirst.firstChild.childNodes[node]
          .getAttribute("value")
          .replace(/[-/]/g, "")
          .split("")
          .reverse()
          .join("")
      );
    }
  });
  sortedDate.map((index) => {
    sortedDateList += index;
  });
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  table.insertAdjacentHTML("beforeend", sortedDateList);
};

invoiceDataTable();
