let button = document.getElementById("submit");
button.addEventListener("click", (e) => {
  e.preventDefault();
  createStudent();
});

function createStudent() {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const facultyNumber = document.getElementById("facultyNumber");
  const grade = document.getElementById("grade");

  createNew(
    firstName.value,
    lastName.value,
    facultyNumber.value,
    Number(grade.value)
  );
  console.log("test 2");

  firstName.value = "";
  lastName.value = "";
  facultyNumber.value = "";
  grade.value = "";
}

async function getStudentsInfo() {
  const url = "http://localhost:3030/jsonstore/collections/students";
  const response = await fetch(url);
  const data = await response.json();

  let info = Object.entries(data);

  let table = document.getElementById("results");
  let body = document.getElementById("body");

  info.forEach((student) => {
    let row = document.createElement("tr");

    row.innerHTML = `<td>${student[1].firstName}</td>
        <td>${student[1].lastName}</td>
        <td>${student[1].facultyNumber}</td>
        <td>${student[1].grade}</td>`;

    body.appendChild(row);
  });
}

getStudentsInfo();

async function createNew(firstName, lastName, facultyNumber, grade) {
  console.log("test");
  const url = "http://localhost:3030/jsonstore/collections/students";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      facultyNumber: facultyNumber,
      grade: grade,
    }),
  });

  const data = await response.json();

  return data;
}
