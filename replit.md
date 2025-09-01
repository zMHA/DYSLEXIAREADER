# Overview

DyslexiFy is a web application designed to make digital content more accessible for people with dyslexia. The application processes websites and documents (PDFs, Word docs, text files) to extract text content and generate simplified summaries using AI. It provides dyslexia-friendly reading features including adjustable fonts, customizable spacing, background colors, and the OpenDyslexic font family.

The application's core purpose is to transform complex web content and documents into clear, readable formats that reduce cognitive load for dyslexic readers through simplified language, better typography, and customizable display options.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive design
- **Accessibility-First Design**: Custom CSS focused on dyslexia-friendly typography using OpenDyslexic font family
- **Interactive Controls**: JavaScript-based reader controls for font size, line spacing, column width, and background colors
- **Responsive Layout**: Bootstrap grid system ensuring accessibility across devices

## Backend Architecture
- **Web Framework**: Flask with SQLAlchemy ORM for database operations
- **MVC Pattern**: Clear separation between models (data), routes (controllers), and templates (views)
- **File Processing Pipeline**: Modular processors for different file types (PDF, DOCX, TXT)
- **Content Extraction**: Trafilatura library for clean web content extraction
- **Error Handling**: Comprehensive logging and user-friendly error messages

## Data Processing
- **Text Extraction**: Separate modules for different content sources:
  - Web scraping using Trafilatura for clean HTML content extraction
  - PDF processing with PyPDF2
  - Word document handling with python-docx
  - Text file processing with multiple encoding support
- **AI Summarization**: OpenAI GPT integration for generating dyslexia-friendly summaries
- **Content Storage**: SQLAlchemy models for persistent storage of processed content

## PDF Generation
- **Export Functionality**: WeasyPrint for generating dyslexia-friendly PDF exports
- **Custom Styling**: HTML/CSS templates optimized for print with accessibility features

# External Dependencies

## Third-Party APIs
- **OpenAI API**: GPT model integration for text summarization with dyslexia-friendly prompts
- **Configuration**: API key management through environment variables

## Database
- **SQLAlchemy**: ORM for database abstraction
- **SQLite**: Default database (configurable via DATABASE_URL environment variable)
- **Connection Management**: Pool recycling and pre-ping for connection reliability

## Content Processing Libraries
- **Trafilatura**: Web content extraction and cleaning
- **PyPDF2**: PDF text extraction
- **python-docx**: Microsoft Word document processing
- **WeasyPrint**: HTML to PDF conversion for exports

## Frontend Dependencies
- **Bootstrap 5**: UI framework via CDN
- **Font Awesome**: Icon library via CDN
- **Google Fonts**: OpenDyslexic font family integration
- **Custom JavaScript**: Reader control functionality

## File Upload Management
- **Werkzeug**: Secure filename handling and file upload processing
- **File Size Limits**: 16MB maximum upload size
- **Supported Formats**: TXT, PDF, DOCX, DOC files