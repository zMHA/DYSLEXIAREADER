# 🧩 DyslexiFy  
*Making digital content easier to read for people with dyslexia.*  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Made with Flask](https://img.shields.io/badge/Made%20with-Flask-blue.svg)](#)  
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-green.svg)](#)  

🌍 **Live Demo:** [Test on Render](https://dyslexiareader.onrender.com/)  
🎥 **Demo Video:** [Availabla on Youtube](https://www.youtube.com/watch?v=xlBXimVAtUo&t=183s)  

---

## ✨ About the Project  
**DyslexiFy** is a web application that transforms websites and documents (PDF, Word, TXT) into **dyslexia-friendly formats**. It automatically extracts text, simplifies content with **AI-powered summaries**, and lets users customize their reading experience with fonts, spacing, and colors.  

💡 *Designed with accessibility-first principles to support dyslexic readers worldwide.*  

---

## 🚀 Features  
- 📄 Upload documents (TXT, PDF, DOC, DOCX) or paste website URLs  
- 🔍 Auto-clean content extraction with Trafilatura  
- 🧠 AI summaries powered by **GROQ AI**  
- 🔤 Adjustable font size, line spacing, and column width  
- 🎨 Background color customization + **OpenDyslexic font**  
- 📑 Export as **dyslexia-friendly PDF**  

---

⚠️ Important Note

When using the URL input feature, some websites may not allow automated text extraction due to restrictions (e.g., paywalls, scripts, or blocked content). In such cases:

Text might not be extracted properly.

Summaries may not be generated.

👉 For best results, use open-access websites or upload documents directly.

---

## 🛠️ Getting Started  

### 🔹 Run Locally  
```bash
# 1. Clone repository
git clone https://github.com/zMHA/DYSLEXIAREADER.git
cd DYSLEXIAREADER

# 2. Create & activate virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install .

# 4. Configure API key
echo GROQ_API_KEY=your_groq_api_key_here > .env

# 5. Start the app
python main.py

```

### 👉 Open in browser: http://127.0.0.1:5000


###🔹 Try Online (Render Deployment)

Skip setup and try the hosted version instantly:
👉 https://dyslexiareader.onrender.com/

# 🏗️ System Architecture

- Frontend: Jinja2 + Bootstrap 5, OpenDyslexic font, JS customization controls
- Backend: Flask + SQLAlchemy, PDF/DOCX/TXT processing, Trafilatura (web scraping)
- AI Layer: GROQ API for simplified summaries
- Export: WeasyPrint for generating accessible PDFs

# 📦 Tech Stack

- Frameworks: Flask, SQLAlchemy, Bootstrap 5, Jinja2
- AI/Utilities: GROQ API, Trafilatura, PyPDF2, python-docx, WeasyPrint
- Database: SQLite
- Deployment: Render
- Fonts & Design: OpenDyslexic, accessibility-first CSS

# 📌 Hackathon Relevance

- ✅ Accessibility-first MVP
- ✅ Deployed & working (local + cloud)
- ✅ Real-world impact: helping dyslexic readers consume digital content


👥 Team

👨‍💻 Developed by zMHA



✨ DyslexiFy isn’t just an MVP — it’s a step toward making digital knowledge inclusive for everyone.
