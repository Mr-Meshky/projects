const scoreText = document.getElementById("score");
const saveButton = document.getElementById("save");
const input = document.querySelector("input");
const score = localStorage.getItem("score");
const modal = document.getElementById("modal");
const modalText = modal.querySelector("p");
const modalButton = document.getElementById("modal-button");

// Showing the last user score
scoreText.innerText = JSON.parse(score);

const users = async () => {
  const response = await fetch("../api/highest-points");
  const data = await response.json();
  return data;
};

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const saveDataBase = async () => {
  if (!input.value || !score) {
    showAlert("Invalid username or score");
  } else {
    const data = {
      name: escapeHtml(input.value),
      score: +score,
    };

    const highScores = await users();

    highScores.push(data);
    highScores.sort((a, b) => b.score - a.score);
    highScores.slice(10);

    await fetch("../api/highest-points", {
      method: "POST",
      body: JSON.stringify(highScores),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((respones) => respones.json())
      .then((data) => console.log("True"));

    localStorage.setItem("score", 0);

    window.location.assign("/");
  }
};

const showAlert = (text) => {
  modalText.innerText = text;
  modal.style.display = "flex";
};

const removeAlert = () => {
  modal.style.display = "none";
};

modalButton.addEventListener("click", removeAlert);
saveButton.addEventListener("click", saveDataBase);
