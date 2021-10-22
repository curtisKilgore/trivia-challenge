const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "alerts",
    choice2: "booleans",
    choice3: "strings",
    choice4: "numbers",
    answer: 1,
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choice1: "quotes",
    choice2: "curl brackets",
    choice3: "parentheses",
    choice4: "square brackets",
    answer: 3,
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    answer: 4,
  },
];

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    // Go to highscores page
    return window.location.assign("/highscores.html");
  }
  questionCounter++;
  // Random Question
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // Question reference
  currentQuestion = availableQuestions[questionIndex];
  // Set question
  question.innerText = currentQuestion.question;
  // Set choices
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // Remove answered question
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// Reference to user answer choice
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // Correct or wrong answer animation
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 800);
  });
});

startGame();
