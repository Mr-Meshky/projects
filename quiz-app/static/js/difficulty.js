const buttons = document.querySelectorAll("button");

const slectHandler = (event) => {
  const level = event.target.dataset.difficulty;
  localStorage.setItem("level", level);
  window.location.assign("/");
};

buttons.forEach((button) => {
  button.addEventListener("click", slectHandler);
});
