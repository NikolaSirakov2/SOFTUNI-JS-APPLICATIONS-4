function attachEvents() {
  document.getElementById("refresh").addEventListener("click", getAllMsg);
  
  document.getElementById("submit").addEventListener("click", addPost)
}

function renderMsg(data) {
  let container = document.getElementById("messages");

  let content = Object.values(data)
    .map((entry) => `${entry.author}: ${entry.content}`)
    .join("\n");

  container.textContent = content;

  console.log(container);
}

function addPost(){
    const author = document.querySelector("input[name='author']");
    const text = document.querySelector("input[name='content']");

    postInfo(author.value, text.value);

    author.value = "";
    text.value = "";
}

async function getAllMsg() {
  let response = await fetch("http://localhost:3030/jsonstore/messenger");
  let data = await response.json();

  renderMsg(data);
}

async function postInfo(name, text) {
  const url = "http://localhost:3030/jsonstore/messenger";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      author: name,
      content: text,
    }),
  });
  const data = await response.json();
  return data;
}

attachEvents();
