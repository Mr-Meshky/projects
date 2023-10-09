const questionText = document.getElementById("question-text"),
  answerList = document.querySelectorAll(".answer-text"),
  loader = document.querySelector(".loading"),
  container = document.querySelector(".questions"),
  scoreText = document.getElementById("question-score"),
  nextButton = document.getElementById("next-button"),
  finishButton = document.getElementById("finish-button"),
  questionNumber = document.getElementById("question-number");

const level = localStorage.getItem("level") || "medium";
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
const CUREECT_BONUS = 10;

let formattedData = null,
  questionIndex = 0,
  correctAnswer = null,
  score = 0,
  isAccepted = true;

const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = {
      question: item.question,
    };
    const answers = [...item.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerIndex, 0, item.correct_answer);
    questionObject.answers = answers;
    questionObject.correctAnswerIndex = correctAnswerIndex;
    return questionObject;
  });

  return result;
};

async function fetchData() {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (error) {
    document.getElementById("error").style.display = "block";
  }
}

const start = () => {
  showQuestion();
};

const showQuestion = async () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = await question;
  answerList.forEach(async (button, index) => {
    button.innerText = await answers[index];
  });
  loader.style.display = "none";
  container.style.display = "block";
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  if (index === correctAnswer) {
    event.target.classList.add("correct");
    score += CUREECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  if (questionIndex < formattedData.length - 1) {
    questionIndex++;
    isAccepted = true;
    loader.style.display = "block";
    container.style.display = "none";
    removeClasses();
    start();
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
