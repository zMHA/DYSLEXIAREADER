from datetime import datetime
from app import db

class ProcessedContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source_type = db.Column(db.String(20), nullable=False)  # 'url' or 'file'
    source_value = db.Column(db.Text, nullable=False)  # URL or filename
    original_text = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<ProcessedContent {self.id}: {self.source_type}>'
