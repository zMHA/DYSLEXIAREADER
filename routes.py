import logging
from flask import render_template, request, flash, redirect, url_for, make_response
from app import app, db
from models import ProcessedContent
from groq_service import summarize_text
from web_scraper import get_website_text_content
from file_processor import extract_text_from_file
from pdf_generator import generate_pdf
from io import BytesIO

logger = logging.getLogger(__name__)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'docx', 'doc'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """Main landing page with input options"""
    return render_template('index.html')

@app.route('/process_url', methods=['POST'])
def process_url():
    """Process URL input and extract text content"""
    try:
        url = request.form.get('url', '').strip()
        if not url:
            flash('Please enter a valid URL', 'error')
            return redirect(url_for('index'))
        
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        logger.info(f"Processing URL: {url}")
        
        text_content = get_website_text_content(url)
        if not text_content:
            flash('Could not extract text from the provided URL', 'error')
            return redirect(url_for('index'))
        
        try:
            summary = summarize_text(text_content)
        except Exception as e:
            logger.error(f"Summary generation failed: {e}")
            summary = "Summary generation unavailable"
        
        processed_content = ProcessedContent(
            source_type='url',
            source_value=url,
            original_text=text_content,
            summary=summary
        )
        db.session.add(processed_content)
        db.session.commit()
        
        return render_template('reader.html', 
                             content=text_content, 
                             summary=summary,
                             source=url,
                             content_id=processed_content.id)
    except Exception as e:
        logger.error(f"Error processing URL: {e}")
        flash('An error occurred while processing the URL', 'error')
        return redirect(url_for('index'))

@app.route('/process_file', methods=['POST'])
def process_file():
    """Process file upload and extract text content"""
    try:
        if 'file' not in request.files:
            flash('No file selected', 'error')
            return redirect(url_for('index'))
        
        file = request.files['file']
        if file.filename == '':
            flash('No file selected', 'error')
            return redirect(url_for('index'))
        
        if not allowed_file(file.filename):
            flash('File type not supported. Please upload .txt, .pdf, .docx, or .doc files', 'error')
            return redirect(url_for('index'))
        
        logger.info(f"Processing uploaded file: {file.filename}")
        
        # Process file in memory (BytesIO instead of saving to disk)
        file_stream = BytesIO(file.read())
        text_content = extract_text_from_file(file_stream, file.filename)
        
        if not text_content:
            flash('Could not extract text from the uploaded file', 'error')
            return redirect(url_for('index'))
        
        try:
            summary = summarize_text(text_content)
        except Exception as e:
            logger.error(f"Summary generation failed: {e}")
            summary = "Summary generation unavailable"
        
        processed_content = ProcessedContent(
            source_type='file',
            source_value=file.filename,
            original_text=text_content,
            summary=summary
        )
        db.session.add(processed_content)
        db.session.commit()
        
        return render_template('reader.html', 
                             content=text_content, 
                             summary=summary,
                             source=file.filename,
                             content_id=processed_content.id)
    except Exception as e:
        logger.error(f"Error processing file: {e}")
        flash('An error occurred while processing the file', 'error')
        return redirect(url_for('index'))

@app.route('/export_pdf/<int:content_id>')
def export_pdf(content_id):
    """Export processed content as PDF"""
    try:
        content = ProcessedContent.query.get_or_404(content_id)
        pdf_data = generate_pdf(content.original_text, content.summary, content.source_value)
        response = make_response(pdf_data)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = f'attachment; filename=dyslexify_export_{content_id}.pdf'
        return response
    except Exception as e:
        logger.error(f"Error generating PDF: {e}")
        flash('An error occurred while generating the PDF', 'error')
        return redirect(url_for('index'))

@app.errorhandler(413)
def too_large(e):
    flash('File too large. Maximum file size is 16MB.', 'error')
    return redirect(url_for('index'))

@app.errorhandler(404)
def not_found(e):
    flash('Page not found', 'error')
    return redirect(url_for('index'))

@app.errorhandler(500)
def server_error(e):
    logger.error(f"Server error: {e}")
    flash('An internal error occurred', 'error')
    return redirect(url_for('index'))
