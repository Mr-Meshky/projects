const users = async () => {
  const response = await fetch("../api/highest-points");
  const data = await response.json();
  return data;
};

const loadHandler = async () => {
  const highScores = await users();

  const list = document.querySelector("ol");

  const content = highScores.map((item, index) => {
    return `
      <li>
          <div>
          <span> ${index + 1} </span>
          ${item.name}
          </div>
          <span> ${item.score} </span>
      </li>
        `;
  });

  list.innerHTML = content.join("");
};

window.addEventListener("DOMContentLoaded", loadHandler);
