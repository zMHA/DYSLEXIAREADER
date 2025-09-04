DyslexiFy 🧩

Making digital content easier to read for people with dyslexia.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

DyslexiFy is a web application that transforms websites and documents (PDF, Word, TXT) into clear, dyslexia-friendly formats. It extracts text, generates simplified summaries using GROQ AI, and provides customizable reading options such as fonts, spacing, and background colors.

🌍 Live Demo: [DyslexiFy on Render](https://dyslexiareader.onrender.com/)

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

👥 Team

Developed by zMHA for Syrotech Hackathon.
