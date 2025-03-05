let questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "London", "Rome"],
    answer: 1,
  },
  {
    question: "What is the square root of 25?",
    options: ["5", "3", "15", "10"],
    answer: 0,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Caravaggio"],
    answer: 0,
  },
  {
    question: "The capital of Nigeria?",
    options: ["Lagos", "Calabar", "Abuja", "Port Harcourt"],
    answer: 2,
  },
  {
    question: "What is the name of a baby Goat?",
    options: ["Lamb", "Kid", "Chick", "Mutton"],
    answer: 1,
  },
];

function loadScore() {
  let storedScore = localStorage.getItem("quizScore");

  // If no score is found, set it to "000"
  document.getElementById("score-points").innerText = storedScore
    ? storedScore.padStart(3, "0")
    : "000";
}

// Load score when the page loads
window.onload = loadScore;

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionElements = document.querySelectorAll(".option");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");
const scorePoint = document.getElementById("score-point");

function loadDashboard() {
  let storedName = localStorage.getItem("username") || "Guest";
  let storedScore = localStorage.getItem("quizScore") || "000";

  // Update dashboard with name and score
  document.getElementById("playername").innerText = storedName;
  document.getElementById("score-points").innerText = storedScore.padStart(
    3,
    "0"
  ); // Ensure 3-digit format
}

// Ensure this runs only on dashboard.html
if (window.location.pathname.includes("dashboard.html")) {
  window.onload = loadDashboard;
}

function displayQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;

  optionElements.forEach((option, index) => {
    option.textContent = question.options[index];

    // Reset styles for new question
    option.style.backgroundColor = "";
    option.style.filter = "none";
    option.disabled = false;
  });

  resultElement.textContent = ""; // Clear previous result
}

function checkAnswer(answer) {
  const question = questions[currentQuestion];
  if (answer === question.answer) {
    score++;
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = `Incorrect. The correct answer is ${
      question.options[question.answer]
    }.`;
  }
  localStorage.setItem("quizScore", score);
}

displayQuestion();

document.querySelectorAll(".option").forEach((button, index) => {
  button.addEventListener("click", function () {
    let correctAnswerIndex = questions[currentQuestion].answer; // Get correct answer index

    document.querySelectorAll(".option").forEach((btn, btnIndex) => {
      if (btnIndex === correctAnswerIndex) {
        btn.style.backgroundColor = "green"; // Correct answer turns green
      } else {
        btn.style.backgroundColor = btn === this ? "red" : "rgba(0, 0, 0, 0.2)"; // Wrong answer turns red, others blurred
        btn.style.filter = "blur(3px)";
      }
      btn.disabled = true; // Disable all buttons after selection
    });

    // Save score and allow next question
    checkAnswer(index);
    nextButton.style.display = "block";
  });
});

optionElements.forEach((option) => {
  option.addEventListener("click", () => {
    const answer = Array.prototype.indexOf.call(optionElements, option);
    checkAnswer(answer);
    nextButton.style.display = "block";
  });
});

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    questionElement.textContent = "Quiz finished!";
    optionElements.forEach((option) => {
      option.style.display = "none";
    });
    resultElement.textContent = `Your final score is ${score} out of ${questions.length}.`;

    nextButton.style.display = "none"; // Hide next button
    document.querySelector(".home-btn").style.display = "block"; // Show dashboard button
  } else {
    displayQuestion();
    resultElement.textContent = "";
    nextButton.style.display = "block";
  }
});


let progress = 0;

function increaseProgress() {
  if (progress < 100) {
    progress += 20; // Increase by 20%
    document.getElementById("progress-bar").style.width = progress + "%";
  }
}

// Ensure the score is displayed properly (default to 0 if not set)
document.getElementById("score-points").innerText = storedScore
  ? storedScore.padStart(3, "0")
  : "000";

let storedScore = localStorage.getItem("quizScore");
document.getElementById("score-points").textContent = storedScore;

function goToDashboard() {
  window.location.href = "dashboard.html"; // Redirects to dashboard
}
