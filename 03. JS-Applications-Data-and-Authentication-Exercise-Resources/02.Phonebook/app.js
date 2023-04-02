function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", getInfo)
}

function showContacts(data){
    let container = document.getElementById("phonebook");

    console.log(data);

    let content = Object.keys(data)

    console.log(content);
//     .map((entry) => `${entry.person}: ${entry.phone}`)
//     .join("\n");

//   container.textContent = content;

}

async function getInfo(){
    const url = "http://localhost:3030/jsonstore/phonebook";
    const response = await fetch(url);
    const data = await response.json();

    showContacts(data);
}

async function createNew(person, phone){
    const url = "http://localhost:3030/jsonstore/phonebook";
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          person: person,
          phone: phone
        }),
      });

      const data = await response.json();

    console.log(data);
}

attachEvents();

getInfo()
