# ⚽ Football Quiz App

A fun, fast quiz game built with vanilla HTML, CSS, and JavaScript — powered by live football trivia from [The Trivia API](https://the-trivia-api.com/).

🔗 **Live Demo → [quiz-game-sports.vercel.app](https://quiz-game-sports.vercel.app/)**

![Quiz App Preview](https://img.shields.io/badge/status-live-brightgreen) ![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow) ![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black)

---

## 🎮 Features

- 🌐 **Live questions** fetched from The Trivia API — no repeats
- ✅ **Instant feedback** — correct answers highlight green, wrong ones red
- 📊 **Progress bar** that fills as you advance through questions
- 🏆 **Dynamic result messages** based on your final score
- 📱 **Fully responsive** — works on mobile, tablet, and desktop

---

## 🖼️ Screens

| Start | Quiz | Result |
|-------|------|--------|
| Welcome screen with a start button | Question with 4 answer choices | Final score with a motivational message |

---

## 🚀 Getting Started

**Option 1 — Just play it:** [quiz-game-sports.vercel.app](https://quiz-game-sports.vercel.app/)

**Option 2 — Run locally:**

No build tools, no dependencies. Just clone and open.

```bash
git clone https://github.com/your-username/football-quiz-app.git
cd football-quiz-app
```

Then open `index.html` in your browser — that's it!

---

## 📁 Project Structure

```
football-quiz-app/
├── index.html      # App structure & screens
├── style.css       # Styling & color palette
└── script.js       # Game logic & API calls
```

---

## 🎨 Color Palette

| Color | Hex | Used For |
|-------|-----|----------|
| Charcoal Blue | `#264653` | Page background, question text |
| Verdigris | `#2a9d8f` | Progress bar, score info, correct answers |
| Tuscan Sun | `#e9c46a` | Answer button borders, result text |
| Sandy Brown | `#f4a261` | Headings, button hover |
| Burnt Peach | `#e76f51` | Primary buttons, incorrect answers |

---

## 🌐 API

Questions are fetched from **[The Trivia API](https://the-trivia-api.com/)** — free, no API key required.

```
GET https://the-trivia-api.com/v2/questions?categories=sport_and_leisure&limit=5&tags=football
```

---

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- [The Trivia API](https://the-trivia-api.com/)
- [Vercel](https://vercel.com/) — deployment

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Made with ❤️ and a love for football trivia.
