const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
  {
    question: "What does `var` stand for in JavaScript?",
    answers: [
      { text: "Variable", correct: true },
      { text: "Variation", correct: false },
      { text: "Variant", correct: false },
      { text: "Vary", correct: false },
    ],
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
      { text: "Netscape", correct: true },
      { text: "Google", correct: false },
    ],
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "// This is a comment", correct: true },
      { text: "'This is a comment", correct: false },
      { text: "/* This is a comment */", correct: true },
      { text: "# This is a comment", correct: false },
    ],
  },
  {
    question: "Which method is used to convert a string to a number?",
    answers: [
      { text: "Number()", correct: true },
      { text: "parseInt()", correct: true },
      { text: "toString()", correct: false },
      { text: "String()", correct: false },
    ],
  },
  {
    question:
      'What is the correct syntax for referring to an external script called "script.js"?',
    answers: [
      { text: '<script name="script.js">', correct: false },
      { text: '<script src="script.js">', correct: true },
      { text: '<script href="script.js">', correct: false },
      { text: '<script file="script.js">', correct: false },
    ],
  },
];

startButton.addEventListener("click", () => {
  if (startButton.innerText === "Restart Quiz") {
    restartQuiz();
  } else {
    startQuiz();
  }
});

nextButton.addEventListener("click", nextButtonHandler);

function startQuiz() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (correct) {
    score++;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart Quiz";
    startButton.classList.remove("hide");
    showResults();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function nextButtonHandler() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionContainerElement.classList.add("hide");
  nextButton.classList.add("hide");
  startButton.innerText = `Restart Quiz`;
  startButton.classList.remove("hide");

  const resultMessage = document.createElement("div");
  resultMessage.innerText = `Quiz Complete! Your final score is: ${score} / ${shuffledQuestions.length}`;
  resultMessage.classList.add("result-message");
  document.getElementById("quiz-container").appendChild(resultMessage);
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  const resultMessage = document.querySelector(".result-message");
  if (resultMessage) {
    resultMessage.remove();
  }
  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}
