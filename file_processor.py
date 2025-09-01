import os
import logging
import docx
import PyPDF2
from io import BytesIO

logger = logging.getLogger(__name__)

def extract_text_from_file(file_path):
    """
    Extract text content from uploaded files (txt, docx, pdf).
    Returns clean text suitable for dyslexic users.
    """
    try:
        file_extension = os.path.splitext(file_path)[1].lower()
        
        if file_extension == '.txt':
            return extract_from_txt(file_path)
        elif file_extension in ['.docx', '.doc']:
            return extract_from_docx(file_path)
        elif file_extension == '.pdf':
            return extract_from_pdf(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_extension}")
            
    except Exception as e:
        logger.error(f"Error processing file {file_path}: {e}")
        raise Exception(f"Could not extract text from file: {str(e)}")

def extract_from_txt(file_path):
    """Extract text from a .txt file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        return clean_text(text)
    except UnicodeDecodeError:
        # Try different encodings
        for encoding in ['latin-1', 'cp1252', 'iso-8859-1']:
            try:
                with open(file_path, 'r', encoding=encoding) as file:
                    text = file.read()
                return clean_text(text)
            except UnicodeDecodeError:
                continue
        raise Exception("Could not decode text file with any supported encoding")

def extract_from_docx(file_path):
    """Extract text from a .docx file"""
    try:
        doc = docx.Document(file_path)
        paragraphs = [paragraph.text for paragraph in doc.paragraphs if paragraph.text.strip()]
        text = '\n'.join(paragraphs)
        return clean_text(text)
    except Exception as e:
        raise Exception(f"Could not read Word document: {str(e)}")

def extract_from_pdf(file_path):
    """Extract text from a .pdf file"""
    try:
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                page_text = page.extract_text()
                text += page_text + "\n"
        
        if not text.strip():
            raise Exception("No text could be extracted from the PDF")
            
        return clean_text(text)
    except Exception as e:
        raise Exception(f"Could not read PDF document: {str(e)}")

def clean_text(text):
    """Clean and format text for better readability"""
    if not text:
        return ""
    
    # Remove excessive whitespace and normalize line breaks
    lines = [line.strip() for line in text.split('\n')]
    lines = [line for line in lines if line]  # Remove empty lines
    
    # Join lines with proper spacing
    cleaned_text = '\n'.join(lines)
    
    # Remove multiple consecutive spaces
    import re
    cleaned_text = re.sub(r' +', ' ', cleaned_text)
    
    return cleaned_text.strip()
