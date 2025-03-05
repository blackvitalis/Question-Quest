const userName = document.getElementById("username");
const goButton = document.getElementById("go");

function saveName() {
  let name = userName.value.trim() || "Guest"; // Default to "Guest" if empty
  localStorage.setItem("username", name);
  localStorage.setItem("quizScore", "000"); // Initialize score as "000" for new users
  window.location.href = "dashboard.html"; // Redirect to dashboard
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

  // Save updated score to localStorage
  localStorage.setItem("quizScore", score.toString().padStart(3, "0"));
}
