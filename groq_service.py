import os
import logging
from groq import Groq

logger = logging.getLogger(__name__)

# Get Groq API key from environment
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
if not GROQ_API_KEY:
    logger.warning("GROQ_API_KEY not found in environment variables")

groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

def summarize_text(text):
    """
    Generate a plain-English summary of the given text.
    Optimized for dyslexic readers with simple language and clear structure.
    """
    if not groq_client:
        raise Exception("Groq API key not configured")
    
    if not text or len(text.strip()) == 0:
        return "No content to summarize"
    
    # Truncate very long texts to avoid token limits
    if len(text) > 10000:
        text = text[:10000] + "..."
    
    try:
        prompt = f"""
        Please create a clear, simple summary of the following text. 
        Make it dyslexia-friendly by using:
        - Short, simple sentences
        - Common, everyday words
        - Clear structure with main points
        - No jargon or complex terms
        - Maximum 3-4 paragraphs
        
        Text to summarize:
        {text}
        """
        
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": "You are an expert at creating clear, simple summaries for people with dyslexia. Use plain English and short sentences."
                },
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        summary = response.choices[0].message.content
        if summary:
            return summary.strip()
        return "Summary could not be generated"
        
    except Exception as e:
        logger.error(f"Groq API error: {e}")
        raise Exception(f"Failed to generate summary: {str(e)}")
