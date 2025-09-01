import trafilatura
import logging
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

def get_website_text_content(url: str) -> str:
    """
    Extract the main text content from a website URL.
    Returns clean, readable text suitable for dyslexic users.
    """
    try:
        # Validate URL
        parsed = urlparse(url)
        if not parsed.scheme or not parsed.netloc:
            raise ValueError("Invalid URL format")
        
        logger.info(f"Fetching content from: {url}")
        
        # Download the webpage
        downloaded = trafilatura.fetch_url(url)
        if not downloaded:
            raise Exception("Failed to download webpage content")
        
        # Extract main text content
        text = trafilatura.extract(downloaded, include_comments=False, include_tables=True)
        
        if not text:
            raise Exception("No readable content found on the webpage")
        
        # Clean up the text
        text = text.strip()
        
        # Remove excessive whitespace
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        cleaned_text = '\n'.join(lines)
        
        logger.info(f"Successfully extracted {len(cleaned_text)} characters of text")
        return cleaned_text
        
    except Exception as e:
        logger.error(f"Error extracting text from URL {url}: {e}")
        raise Exception(f"Could not extract text from webpage: {str(e)}")
