DyslexiFy 🧩

Making digital content easier to read for people with dyslexia.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

✨ Overview

DyslexiFy is a web application that transforms websites and documents (PDF, Word, TXT) into dyslexia-friendly formats. It automatically extracts text, simplifies it with AI summaries, and lets users customize their reading experience through fonts, spacing, and colors.

💡 Built for accessibility-first design and real-world impact.

🌍 Live Demo: [DyslexiFy on Render](https://dyslexiareader.onrender.com/)
🎥 Demo Video: Coming Soon

🚀 Features

✅ Upload files (TXT, PDF, DOCX, DOC) or paste website URLs
✅ AI-powered summaries using GROQ AI
✅ Adjustable font size, line spacing, column width
✅ Support for OpenDyslexic font
✅ Custom background colors for easy reading
✅ Export simplified text as dyslexia-friendly PDF


🛠️ Getting Started
🔹 Run Locally

Clone the repo

git clone https://github.com/zMHA/DYSLEXIAREADER.git
cd DYSLEXIAREADER


Create virtual environment & activate

python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate


Install dependencies

pip install .


Add API key
Create a .env file in the project root:

GROQ_API_KEY=your_groq_api_key_here


Run the app

python main.py


🔗 Open in browser: http://127.0.0.1:5000

🔹 Try Online (Render Deployment)

No setup required! Access instantly:
👉 https://dyslexiareader.onrender.com/

🏗️ System Architecture

Frontend

Jinja2 + Bootstrap 5 (responsive UI)

OpenDyslexic font + accessibility-first CSS

Reader customization controls (JS)

Backend

Flask + SQLAlchemy (API + DB)

File/text processing: PDFs, DOCX, TXT

Trafilatura (website content extraction)

GROQ AI (text summarization)

WeasyPrint (PDF export)


You said:
Syrotech MVP
is a global virtual hackathon focused on building high-impact web applications that drive positive change in society. Open to developers, designers, and creators of all backgrounds and skill levels, this hackathon challenges participants to showcase real, working MVPs that solve meaningful problems across domains such as healthcare, education, accessibility, climate, mental health, and more.

Whether your MVP is newly built or something you've been refining, what matters is how effectively it addresses a real-world issue. We are looking for well-designed, fully functional, and thoughtfully documented web applications that demonstrate both utility and purpose.

 

This is your opportunity to transform your technical skills into something with measurable social impact — and be recognized for building solutions that matter.

Requirements
✅ Submission Requirements
Participants must submit the following through Devpost:

A deployed web application (MVP) that is accessible to judges

A GitHub repository containing:

Clean, well-organized code

A complete README with setup instructions, feature explanations, and licensing

A brief project write-up that explains:

The problem or social issue your app addresses

Your proposed solution and impact

Key features and intended user base

An optional demo video (recommended to help showcase your application’s functionality and UX)
ChatGPT said:

Got it ✅ Thanks for sharing the Syrotech MVP Hackathon details. Here’s a structured breakdown to make sure your submission aligns with all requirements:

📌 Hackathon Overview

Event Type: Global Virtual Hackathon

Focus: High-impact web applications (MVPs) with measurable social impact

Domains: Healthcare, Education, Accessibility, Climate, Mental Health, and more

Participants: Open to developers, designers, creators of all levels

Evaluation Criteria: Functionality, usability, impact, documentation, and design

✅ Submission Requirements (via Devpost)
1. Deployed MVP (Web Application)

Must be publicly accessible (e.g., deployed on Vercel, Netlify, Heroku, Streamlit Cloud, Render, etc.).

Should demonstrate real functionality (not just mockups).

2. GitHub Repository

Code Quality: Clean, modular, well-documented.

README File:

Clear setup instructions (how to run locally and deploy).

Feature descriptions.

Licensing information (e.g., MIT, Apache 2.0, GPL).

Screenshots/GIFs if possible.

3. Project Write-Up

Problem Statement: Define the social issue addressed.

Proposed Solution: How your app solves it & potential impact.

Key Features: List of core functionalities.

Target Audience: Intended users & beneficiaries.

4. Demo Video (Optional, but Recommended)

Length: 2–3 minutes.

Content: Show the app in action (key flows, UI/UX).

Can be recorded with Loom, OBS, Screenity, or Pictory AI.

🏆 Tips for a Strong Submission

Keep the MVP scope realistic: focus on 2–3 core impactful features.

Highlight real-world utility instead of overloading with features.

Emphasize social impact in the write-up.

Add user-friendly documentation so judges can test it easily.

Use modern UI frameworks (React, Next.js, Tailwind, etc.) for a polished look.

Deploy early and test accessibility.

👉 Do you want me to help you draft the GitHub README template (with sections for problem, solution, features, setup, license, etc.) so you’ll just fill in your project details?

You said:
# DyslexiFy 🧩  
*Making digital content easier to read for people with dyslexia.*
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

DyslexiFy is a web application that transforms websites and documents (PDF, Word, TXT) into **clear, dyslexia-friendly formats**. It extracts text, generates simplified summaries using **GROQ AI**, and provides customizable reading options such as fonts, spacing, and background colors.

---

## ✨ Features
- 📄 Upload files (TXT, PDF, DOCX, DOC) or paste URLs  
- 🔍 Extracts and cleans main content automatically  
- 🧠 AI-powered summaries with GROQ  
- 🔤 Adjustable font size, line spacing, and column width  
- 🎨 Background color and OpenDyslexic font support  
- 📑 Export simplified content as dyslexia-friendly PDF  

---

## 🚀 Quick Start

### 1. Clone the repository

bash
git clone https://github.com/zMHA/DYSLEXIAREADER.git
cd DYSLEXIAREADER
2. Set up environment
bash
Copy code
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
3. Install dependencies
bash
Copy code
pip install .
(dependencies are managed via pyproject.toml)

4. Configure API Key
Create a .env file in the project root:

env
Copy code
GROQ_API_KEY=your_groq_api_key_here
5. Run the app
bash
Copy code
python main.py
Now open in your browser:
👉 http://127.0.0.1:5000

🏗 System Architecture
Frontend
Jinja2 + Bootstrap 5 for responsive UI

Accessibility-first CSS: OpenDyslexic font, adjustable spacing, background colors

JavaScript reader controls for customization

Backend
Flask + SQLAlchemy for API + database

File processing pipeline for PDFs, DOCX, TXT

Trafilatura for web scraping & clean content extraction

GROQ AI for simplified summaries

WeasyPrint for PDF export

📦 Dependencies
Flask (web framework)

SQLAlchemy + SQLite (database)

Trafilatura (web content extraction)

PyPDF2 (PDF extraction)

python-docx (Word parsing)

WeasyPrint (PDF export)

Bootstrap 5 + OpenDyslexic font (frontend)

GROQ API (AI summarization)

python-dotenv (for managing secrets)

(All managed via pyproject.toml)

📌 Hackathon Notes
✅ Accessibility-first design

✅ Works locally + deployable to Replit, Render, Heroku

✅ Real-world impact: helps dyslexic readers access digital content

👥 Team
Developed by zMHA for Syrotech Hackathon.




ye meri readme hy, https://dyslexiareader.onrender.com/ aur ye deployed link hy esko render per deploy kia hy baqi readme edit kro local aur render donu ki installation likho es mai r links ki jaga dedo ek ye depoly link aur ek video link ki empty space chor dina wo bana k phr dalon ga
ChatGPT said:

Perfect 🚀 You’ve already got a strong README! I’ll refine it for the Syrotech MVP submission by:

Adding both local setup & Render deployment instructions

Including placeholders for your live demo link and demo video link

Making it more hackathon-judge–friendly with clean sections

Here’s the polished version:

DyslexiFy 🧩

Making digital content easier to read for people with dyslexia.

DyslexiFy is a web application that transforms websites and documents (PDF, Word, TXT) into clear, dyslexia-friendly formats. It extracts text, generates simplified summaries using GROQ AI, and provides customizable reading options such as fonts, spacing, and background colors.

🌍 Live Demo: DyslexiFy on Render

🎥 Demo Video: Coming Soon

✨ Features

📄 Upload files (TXT, PDF, DOCX, DOC) or paste URLs

🔍 Extracts and cleans main content automatically

🧠 AI-powered summaries with GROQ

🔤 Adjustable font size, line spacing, and column width

🎨 Background color and OpenDyslexic font support

📑 Export simplified content as dyslexia-friendly PDF

🚀 Quick Start
🔹 Option 1: Run Locally

Clone the repository

git clone https://github.com/zMHA/DYSLEXIAREADER.git
cd DYSLEXIAREADER


Set up virtual environment

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate


Install dependencies

pip install .
# dependencies are managed via pyproject.toml


Configure API Key
Create a .env file in the project root:

GROQ_API_KEY=your_groq_api_key_here


Run the app

python main.py


Now open in your browser:
👉 http://127.0.0.1:5000

🔹 Option 2: Use Render Deployment

Skip setup and try the live app instantly:
👉 https://dyslexiareader.onrender.com/

🏗 System Architecture
Frontend

Jinja2 + Bootstrap 5 for responsive UI

Accessibility-first CSS: OpenDyslexic font, adjustable spacing, background colors

JavaScript reader controls for customization

Backend

Flask + SQLAlchemy (API + database)

File processing pipeline for PDFs, DOCX, TXT

Trafilatura for web scraping & clean content extraction

GROQ AI for simplified summaries

WeasyPrint for PDF export

📦 Dependencies

Flask (web framework)

SQLAlchemy + SQLite (database)

Trafilatura (web content extraction)

PyPDF2 (PDF extraction)

python-docx (Word parsing)

WeasyPrint (PDF export)

Bootstrap 5 + OpenDyslexic font (frontend)

GROQ API (AI summarization)

python-dotenv (manage secrets)
(All managed via pyproject.toml)

📌 Hackathon Notes

✅ Accessibility-first design
✅ Works locally + deployable to Replit, Render, Heroku
✅ Real-world impact: helps dyslexic readers access digital content

👥 Team

Developed by zMHA for Syrotech Hackathon.

Do you want me to also make a shorter "Project Write-up" section (Problem, Solution, Impact, Target Users) so you can directly paste it into Devpost without rewriting?

You said:
naah not well styled Readme
ChatGPT said:

Got it 👍 You want your README to look more professional and stylish — like a hackathon project page that instantly grabs attention.
I’ll rework your README with better structure, clear sections, emojis, and badges, while keeping it clean and judge-friendly.

Here’s the polished version:

🧩 DyslexiFy

Making digital content easier to read for people with dyslexia.






🌍 Live Demo: Click Here

🎥 Demo Video: Coming Soon

✨ Overview

DyslexiFy is a web application that transforms websites and documents (PDF, Word, TXT) into dyslexia-friendly formats. It automatically extracts text, simplifies it with AI summaries, and lets users customize their reading experience through fonts, spacing, and colors.

💡 Built for accessibility-first design and real-world impact.

🚀 Features

✅ Upload files (TXT, PDF, DOCX, DOC) or paste website URLs
✅ AI-powered summaries using GROQ AI
✅ Adjustable font size, line spacing, column width
✅ Support for OpenDyslexic font
✅ Custom background colors for easy reading
✅ Export simplified text as dyslexia-friendly PDF

🛠️ Getting Started
🔹 Run Locally

Clone the repo

git clone https://github.com/zMHA/DYSLEXIAREADER.git
cd DYSLEXIAREADER


Create virtual environment & activate

python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate


Install dependencies

pip install .


Add API key
Create a .env file in the project root:

GROQ_API_KEY=your_groq_api_key_here


Run the app

python main.py


🔗 Open in browser: http://127.0.0.1:5000

🔹 Try Online (Render Deployment)

No setup required! Access instantly:
👉 https://dyslexiareader.onrender.com/

🏗️ System Architecture

Frontend

Jinja2 + Bootstrap 5 (responsive UI)

OpenDyslexic font + accessibility-first CSS

Reader customization controls (JS)

Backend

Flask + SQLAlchemy (API + DB)

File/text processing: PDFs, DOCX, TXT

Trafilatura (website content extraction)

GROQ AI (text summarization)

WeasyPrint (PDF export)

📦 Tech Stack

Backend: Flask, SQLAlchemy, Python

Frontend: Bootstrap 5, Jinja2, OpenDyslexic font

AI: GROQ API

Utilities: Trafilatura, PyPDF2, python-docx, WeasyPrint

Deployment: Render

Database: SQLite


👥 Team

👨‍💻 Developed by zMHA
📌 Submission for Syrotech MVP Hackathon

✨ DyslexiFy is more than an MVP — it’s a step toward making the internet inclusive for everyone.
