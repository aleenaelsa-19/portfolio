# Aleena Elsa Manu — Cyber Red & Black Personal Portfolio

A modern, high-tech, and animation-rich developer portfolio website engineered for **Aleena Elsa Manu**, a first-year Bachelor of Technology (B.Tech) student from Kollam, Kerala, India.

Built with a striking **Crimson Red & Obsidian Black theme**, interactive canvas embers, custom neon cursor, dynamic typewriter effects, 3D card tilt physics, and synthesized cyber audio feedback.

---

## 🌟 Visual Theme & Features

- **Theme Palette**: Pitch obsidian black (`#060608`, `#0c0b11`), charcoal glass (`rgba(16, 14, 22, 0.72)`), and glowing electric scarlet/crimson red (`#ff2a51`, `#e11d48`, `#881337`).
- **Interactive Red Embers & Sparks Canvas**: A lightweight 60fps HTML5 Canvas in the background that spawns gentle floating red sparks that react to the cursor and connect with faint red neural lines.
- **Custom Cyber Red Cursor**: Smooth trailing neon cursor follower with tactile click contraction and expansion over buttons/cards (automatically hidden on mobile/touch screens).
- **Dynamic Multi-Role Typewriter**: Seamlessly cycles through titles (*"Aspiring Web Developer"*, *"Technology Enthusiast"*, *"First-Year B.Tech Student"*, *"Lifelong Learner"*).
- **3D Interactive Card Tilt**: Smooth 3D perspective rotation on cards responding to mouse position.
- **Synthesized Cyber Sound Effects**: Futuristic micro-interaction blips powered by Web Audio API (toggleable with the audio button in the top navigation).
- **Animated Skill Progress Fill**: Skills fill up dynamically with glowing crimson gradients upon scrolling into view.
- **Animated Stat Counters**: Incremental counter animation for degree year and core languages.

---

## 📁 Project Structure

```text
portfolio/
├── index.html            # Main semantic HTML5 webpage with cyber structure
├── style.css             # Red & Black design tokens, neon glows, 3D tilt, keyframes
├── script.js             # Canvas embers, cursor follower, typewriter, sound FX, form handling
├── README.md             # Documentation & customization guide
└── assets/
    ├── avatar.svg        # Red & black cyber developer avatar illustration
    └── favicon.svg       # Glowing red monogram favicon
```

---

## 🚀 Sections Included

1. **Header & Navigation**: Fixed frosted-glass navbar with active link tracking, sound FX toggle, and responsive mobile drawer.
2. **Hero / Home**:
   - Status badge: *"First-Year B.Tech Student • Kollam, Kerala"*.
   - Headline: *"Hey there! I'm Aleena Elsa Manu"*.
   - Dynamic Typewriter subtitle with blinking red cursor.
   - Buttons: **"Explore My Portfolio"** (with cyber shimmer sweep), **"Contact Me"**, and **"Curriculum Vitae"** modal.
   - Profile illustration with glowing red rings and floating tech badges (`Java`, `C`, `Python`, `Web Dev`).
3. **About Me**:
   - Personal narrative detailing Aleena's passion for technology, computing fundamentals, and website development.
   - Quick info cards (Location: *Kollam, Kerala, India*, Current Standing, Learning Philosophy).
4. **My Skills**:
   - Primary animated cards for **Java**, **C**, and **Python** clearly marked with **"Beginner • Learning"** badges, coursework topics, and animated progress bars.
   - Secondary grid showcasing **HTML5**, **CSS3**, **JavaScript**, and **Git / GitHub**.
5. **My Interests**:
   - 5 dedicated cards with custom icons: **Website Development**, **Frontend Development**, **Programming**, **Creative Problem Solving**, and **Exploring New Technologies**.
6. **My Projects**:
   - Prominent notice banner: *"Currently learning and working towards building exciting projects. More coming soon!"*
   - Cards with status pills:
     - **Personal Portfolio Website** (*Live Project*)
     - **Programming Lab & Logic Repository** (*In Progress / Academic Practice*)
     - **Interactive Mini Web Experiments** (*Upcoming / Planned*)
7. **My Education**:
   - **Bachelor of Technology (B.Tech)** First Year, Kerala, India.
   - Academic milestones covering computational thinking, OOP in Java, and engineering mathematics.
8. **Contact Me**:
   - Direct Email: `aleenaelsamanu2030@cs.ajce.in` with a **1-click "Copy Email"** button and interactive toast alert.
   - Location: *Kollam, Kerala, India*.
   - Functional contact form with client-side validation that triggers a pre-filled email client via `mailto:` with instant feedback.
9. **Footer & Extras**:
   - Quick navigation links, social placeholders, copyright year, floating **Back to Top** button, and CV information dialog.

---

## 🛠️ How to View & Run Locally

### Option 1: Direct File Open
Simply double-click `index.html` or drag it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Using VS Code Live Server
1. Open the `portfolio` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **"Open with Live Server"**.

### Option 3: Using Python Local Server
Run the following in PowerShell or Terminal:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## ✏️ How to Customize

- **To update the profile photo**: Replace `assets/avatar.svg` in `index.html` with your photograph file (e.g., `assets/photo.jpg`).
- **To add a resume PDF**: Place your PDF file in `assets/resume.pdf` and link it inside `#cv-modal`.
- **To update social links**: Edit the URLs inside the GitHub and LinkedIn anchor tags in both `#contact` and the footer.
