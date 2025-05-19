async function createForm() {
  await fetch(`/contact`, {
    method: "POST",
    body: JSON.stringify({
      name: `${document.getElementById("name").value}`,
      email: `${document.getElementById("email").value}`,
      message: `${document.getElementById("message").value}`,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((result) => result.json());

  await loadContactForms();
}

async function loadContactForms() {
  loadPage();
  await fetch(`/contact`)
    .then((result) => result.json())
    .then((resultJson) => {
      const table = document.createElement("table");
      table.setAttribute("id", "contactForms");

      const tableRow = document.createElement("tr");

      const tableHeadingName = document.createElement("th");
      tableHeadingName.innerHTML = "Name";
      tableRow.appendChild(tableHeadingName);

      const tableHeadingEmail = document.createElement("th");
      tableHeadingEmail.innerHTML = "Email";
      tableRow.appendChild(tableHeadingEmail);

      const tableHeadingMessage = document.createElement("th");
      tableHeadingMessage.innerHTML = "Message";
      tableRow.appendChild(tableHeadingMessage);

      table.appendChild(tableRow);

      resultJson.forEach((form) => {
        const contactTableRow = document.createElement("tr");
        const contactTableName = document.createElement("td");
        const contactTableEmail = document.createElement("td");
        const contactTableMessage = document.createElement("td");

        contactTableName.innerHTML = form.user_name;
        contactTableEmail.innerHTML = form.user_email;
        contactTableMessage.innerHTML = form.user_message;

        contactTableRow.appendChild(contactTableName);
        contactTableRow.appendChild(contactTableEmail);
        contactTableRow.appendChild(contactTableMessage);

        table.appendChild(contactTableRow);
      });

      const preExistingTable = document.getElementById("contactForms");
      if (preExistingTable) {
        preExistingTable.remove();
      }

      document.body.appendChild(table);
    });
}

function loadPage() {
  const onButton = document.getElementById("audioOn");
  onButton.addEventListener("click", function () {
    AudioCommands();
  });

  const offButton = document.getElementById("audioOff");
  offButton.addEventListener("click", function () {
    turnOffLibrary();
  });
}

function AudioCommands() {
  if (annyang) {
    const commands = {
      "change the color to :color": function (color) {
        document.body.style.background = color;
      },
      "navigate to :page": function (page) {
        window.location.href = page + "Page.html";
      },
    };

    annyang.addCommands(commands);

    annyang.start();
  }
}

function turnOffLibrary() {
  if (annyang) {
    annyang.abort();
  }
}

window.onload = createForm();
