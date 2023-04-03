function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", getInfo);
    document.getElementById("btnCreate").addEventListener("click", createContact)
}

function showContacts(data){
    
    let container = document.getElementById("phonebook");
    console.log(data);
    container.innerHTML = "";

    let content = Object.values(data)
    content.forEach(person => {
        let pers = document.createElement("li");
        let butt = document.createElement("button");
        pers.innerText = `${person.person}: ${person.phone}`;
        butt.innerText = "Delete";
        
       butt.addEventListener("click", deleteP(person._id));

        pers.append(butt);
        container.appendChild(pers);
    })
}

function createContact(){
    const person = document.getElementById("person");
    const phone = document.getElementById("phone");

    createNew(person.value, phone.value)
    person.value = "";
    phone.value = "";
}

function deleteP(id){
    
    const idNum = id;
    deletePerson(idNum)
    
}


async function getInfo(){
    const url = "http://localhost:3030/jsonstore/phonebook";
    const response = await fetch(url);
    const data = await response.json();

    return showContacts(data);
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

    return data;
}

async function deletePerson(id){
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(null),
      });

      const information = await response.json();

    return information;
}

attachEvents()