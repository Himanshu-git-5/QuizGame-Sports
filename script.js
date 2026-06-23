// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 5;
// const API_URL = `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&category=21&type=multiple`;
const API_URL = `https://the-trivia-api.com/v2/questions?categories=sport_and_leisure&limit=10&tags=football`;

// ─── State ────────────────────────────────────────────────────────────────────
let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

// ─── DOM Refs ─────────────────────────────────────────────────────────────────
const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const currentQEl = document.getElementById("current-question");
const totalQEl = document.getElementById("total-questions");
const scoreEl = document.getElementById("score");
const answerContainer = document.getElementById("answer-container");
const progressBar = document.getElementById("progress");
const finalScoreEl = document.getElementById("final-score");
const maxScoreEl = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

// ─── Screen Helpers ───────────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ─── Fetch Questions ──────────────────────────────────────────────────────────
async function fetchQuestions() {
  questionText.textContent = "Loading questions…";
  answerContainer.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // if (data.response_code !== 0 || !data.results.length) {
    //   throw new Error("No questions returned");
    // }

    if (!Array.isArray(data) || !data.length) {
      throw new Error("No questions returned");
    }

    // Decode HTML entities from the API
    // questions = data.results.map(q => ({
    //   question: decodeHTML(q.question),
    //   correct:  decodeHTML(q.correct_answer),
    //   answers:  shuffle([
    //     decodeHTML(q.correct_answer),
    //     ...q.incorrect_answers.map(decodeHTML),
    //   ]),
    // }));

    questions = data.map(q => ({
      question: q.question.text,
      correct: q.correctAnswer,
      answers: shuffle([q.correctAnswer, ...q.incorrectAnswers]),
    }));

    totalQEl.textContent = TOTAL_QUESTIONS;
    maxScoreEl.textContent = TOTAL_QUESTIONS;
    renderQuestion();
  } catch (err) {
    questionText.textContent = "⚠️ Could not load questions. Check your connection and restart.";
    console.error(err);
  }
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderQuestion() {
  const q = questions[currentIndex];
  answered = false;

  // Header
  currentQEl.textContent = currentIndex + 1;
  scoreEl.textContent = score;
  questionText.textContent = q.question;

  // Progress bar
  progressBar.style.width = `${(currentIndex / TOTAL_QUESTIONS) * 100}%`;

  // Answer buttons
  answerContainer.innerHTML = "";
  // NOTE: your HTML uses id="answer-container" but CSS targets .answers-container
  // We add the CSS class here so the flex layout applies correctly.
  answerContainer.className = "answers-container";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => handleAnswer(btn, answer));
    answerContainer.appendChild(btn);
  });
}

// ─── Answer Logic ─────────────────────────────────────────────────────────────
function handleAnswer(selectedBtn, selectedAnswer) {
  if (answered) return;   // prevent double-clicks
  answered = true;

  const correct = questions[currentIndex].correct;
  const allBtns = answerContainer.querySelectorAll(".answer-btn");

  // Highlight every button
  allBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedAnswer === correct) score++;

  // Advance after a short delay
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }, 1200);
}

// ─── Results ──────────────────────────────────────────────────────────────────
function showResults() {
  finalScoreEl.textContent = score;
  progressBar.style.width = "100%";

  // Dynamic message
  const pct = score / TOTAL_QUESTIONS;
  if (pct === 1) resultMessage.textContent = "🏆 Perfect Score! Brilliant!";
  else if (pct >= 0.8) resultMessage.textContent = "🎉 Great Job!";
  else if (pct >= 0.6) resultMessage.textContent = "👍 Not Bad!";
  else if (pct >= 0.4) resultMessage.textContent = "😅 Keep Practising!";
  else resultMessage.textContent = "📚 Better Luck Next Time!";

  showScreen("result");
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function shuffle(arr) {
  return arr
    .map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
startBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  showScreen("quiz");
  fetchQuestions();
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  showScreen("quiz");
  fetchQuestions();
});