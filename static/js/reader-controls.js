// DyslexiFy Reader Controls - Modern Implementation
class ReaderControls {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadSavedSettings();
        this.initializeProgressTracking();
        this.initializeAnimations();
        this.addKeyboardShortcuts();
        console.log('DyslexiFy Reader Controls initialized successfully');
    }

    initializeElements() {
        // Control elements
        this.fontSizeSlider = document.getElementById('fontSize');
        this.lineSpacingSlider = document.getElementById('lineSpacing');
        this.columnWidthSelect = document.getElementById('columnWidth');
        this.bgColorRadios = document.querySelectorAll('input[name="bgColor"]');
        this.dyslexicFontToggle = document.getElementById('dyslexicFont');
        this.controlsToggle = document.getElementById('controlsToggle');
        this.controlsContent = document.getElementById('controlsContent');
        
        // Content areas
        this.mainContent = document.getElementById('mainContent');
        this.summaryContent = document.getElementById('summaryContent');
        
        // Value display elements
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.lineSpacingValue = document.getElementById('lineSpacingValue');
        
        // Progress elements
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        
        // All content sections for styling
        this.contentSections = [this.mainContent, this.summaryContent];
        
        // State
        this.controlsVisible = true;
    }

    bindEvents() {
        // Font size control
        if (this.fontSizeSlider) {
            this.fontSizeSlider.addEventListener('input', (e) => {
                this.updateFontSize(e.target.value);
            });
        }

        // Line spacing control
        if (this.lineSpacingSlider) {
            this.lineSpacingSlider.addEventListener('input', (e) => {
                this.updateLineSpacing(e.target.value);
            });
        }

        // Column width control
        if (this.columnWidthSelect) {
            this.columnWidthSelect.addEventListener('change', (e) => {
                this.updateColumnWidth(e.target.value);
            });
        }

        // Background color control
        this.bgColorRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateBackgroundColor(e.target.value);
            });
        });

        // Font toggle
        if (this.dyslexicFontToggle) {
            this.dyslexicFontToggle.addEventListener('change', (e) => {
                this.updateFontFamily(e.target.checked);
            });
        }

        // Controls panel toggle
        if (this.controlsToggle) {
            this.controlsToggle.addEventListener('click', () => {
                this.toggleControlsPanel();
            });
        }

        // Progress tracking
        this.initializeScrollTracking();
    }

    updateFontSize(size) {
        const fontSize = size + 'px';
        this.contentSections.forEach(section => {
            if (section) {
                section.style.fontSize = fontSize;
            }
        });
        
        if (this.fontSizeValue) {
            this.fontSizeValue.textContent = fontSize;
        }
        
        this.savePreferences();
        this.announceChange(`Font size changed to ${size} pixels`);
    }

    updateLineSpacing(spacing) {
        this.contentSections.forEach(section => {
            if (section) {
                section.style.lineHeight = spacing;
            }
        });
        
        if (this.lineSpacingValue) {
            this.lineSpacingValue.textContent = spacing;
        }
        
        this.savePreferences();
        this.announceChange(`Line spacing changed to ${spacing}`);
    }

    updateColumnWidth(width) {
        const widthClasses = ['text-width-narrow', 'text-width-medium', 'text-width-wide'];
        const newClass = `text-width-${width}`;
        
        this.contentSections.forEach(section => {
            if (section) {
                section.classList.remove(...widthClasses);
                section.classList.add(newClass);
            }
        });
        
        this.savePreferences();
        this.announceChange(`Text width changed to ${width}`);
    }

    updateBackgroundColor(color) {
        const bgClasses = ['bg-white-theme', 'bg-cream-theme', 'bg-yellow-theme', 'bg-gray-theme'];
        const newClass = `bg-${color}-theme`;
        
        this.contentSections.forEach(section => {
            if (section) {
                section.classList.remove(...bgClasses);
                section.classList.add(newClass);
            }
        });
        
        this.savePreferences();
        this.announceChange(`Background color changed to ${color}`);
    }

    updateFontFamily(useDyslexicFont) {
        const fontClasses = ['font-dyslexic', 'font-standard'];
        const addClass = useDyslexicFont ? 'font-dyslexic' : 'font-standard';
        const removeClass = useDyslexicFont ? 'font-standard' : 'font-dyslexic';
        
        this.contentSections.forEach(section => {
            if (section) {
                section.classList.remove(removeClass);
                section.classList.add(addClass);
            }
        });
        
        this.savePreferences();
        this.announceChange(`Font family changed to ${useDyslexicFont ? 'OpenDyslexic' : 'standard'}`);
    }

    toggleControlsPanel() {
        if (!this.controlsContent || !this.controlsToggle) return;
        
        this.controlsVisible = !this.controlsVisible;
        const icon = this.controlsToggle.querySelector('i');
        
        if (this.controlsVisible) {
            this.controlsContent.style.display = 'block';
            if (icon) icon.className = 'fas fa-chevron-left';
            this.controlsToggle.setAttribute('aria-expanded', 'true');
        } else {
            this.controlsContent.style.display = 'none';
            if (icon) icon.className = 'fas fa-chevron-right';
            this.controlsToggle.setAttribute('aria-expanded', 'false');
        }
    }

    initializeScrollTracking() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    this.updateReadingProgress();
                    scrollTimeout = null;
                }, 50);
            }
        });
    }

    updateReadingProgress() {
        if (!this.progressFill || !this.progressText) return;
        
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = docHeight - winHeight;
        
        if (trackLength <= 0) {
            this.progressFill.style.width = '100%';
            this.progressText.textContent = '100%';
            return;
        }
        
        const pctScrolled = Math.min(100, Math.max(0, Math.floor(scrollTop / trackLength * 100)));
        
        this.progressFill.style.width = `${pctScrolled}%`;
        this.progressText.textContent = `${pctScrolled}%`;
        
        // Update document title for additional feedback
        document.title = pctScrolled > 0 ? `(${pctScrolled}%) DyslexiFy Reader` : 'DyslexiFy Reader';
    }

    initializeProgressTracking() {
        // Initialize display values
        if (this.fontSizeValue && this.fontSizeSlider) {
            this.fontSizeValue.textContent = this.fontSizeSlider.value + 'px';
        }
        if (this.lineSpacingValue && this.lineSpacingSlider) {
            this.lineSpacingValue.textContent = this.lineSpacingSlider.value;
        }
        
        // Initialize progress
        this.updateReadingProgress();
    }

    initializeAnimations() {
        // Add entrance animations to content sections
        this.contentSections.forEach((section, index) => {
            if (section) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    savePreferences() {
        const preferences = {
            fontSize: this.fontSizeSlider?.value,
            lineSpacing: this.lineSpacingSlider?.value,
            columnWidth: this.columnWidthSelect?.value,
            backgroundColor: document.querySelector('input[name="bgColor"]:checked')?.value,
            dyslexicFont: this.dyslexicFontToggle?.checked,
            controlsVisible: this.controlsVisible
        };
        
        try {
            localStorage.setItem('dyslexifyPreferences', JSON.stringify(preferences));
        } catch (e) {
            console.warn('Could not save preferences:', e);
        }
    }

    loadSavedSettings() {
        try {
            const saved = localStorage.getItem('dyslexifyPreferences');
            if (!saved) return;
            
            const preferences = JSON.parse(saved);
            
            // Apply saved preferences
            if (preferences.fontSize && this.fontSizeSlider) {
                this.fontSizeSlider.value = preferences.fontSize;
                this.updateFontSize(preferences.fontSize);
            }
            
            if (preferences.lineSpacing && this.lineSpacingSlider) {
                this.lineSpacingSlider.value = preferences.lineSpacing;
                this.updateLineSpacing(preferences.lineSpacing);
            }
            
            if (preferences.columnWidth && this.columnWidthSelect) {
                this.columnWidthSelect.value = preferences.columnWidth;
                this.updateColumnWidth(preferences.columnWidth);
            }
            
            if (preferences.backgroundColor) {
                const bgRadio = document.querySelector(`input[name="bgColor"][value="${preferences.backgroundColor}"]`);
                if (bgRadio) {
                    bgRadio.checked = true;
                    this.updateBackgroundColor(preferences.backgroundColor);
                }
            }
            
            if (preferences.dyslexicFont !== undefined && this.dyslexicFontToggle) {
                this.dyslexicFontToggle.checked = preferences.dyslexicFont;
                this.updateFontFamily(preferences.dyslexicFont);
            }
            
            if (preferences.controlsVisible !== undefined) {
                this.controlsVisible = !preferences.controlsVisible;
                this.toggleControlsPanel();
            }
            
        } catch (e) {
            console.warn('Could not load saved preferences:', e);
        }
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + 1-4 for quick background color changes
            if (e.altKey && !e.ctrlKey && !e.shiftKey) {
                const shortcuts = {
                    '1': 'bgWhite',
                    '2': 'bgCream', 
                    '3': 'bgYellow',
                    '4': 'bgGray',
                    'f': 'dyslexicFont'
                };
                
                if (shortcuts[e.key]) {
                    e.preventDefault();
                    const element = document.getElementById(shortcuts[e.key]);
                    if (element) {
                        element.click();
                        this.announceChange(`Keyboard shortcut activated: ${e.key}`);
                    }
                }
            }
            
            // Ctrl + Plus/Minus for font size adjustment
            if (e.ctrlKey && (e.key === '+' || e.key === '=' || e.key === '-')) {
                e.preventDefault();
                if (!this.fontSizeSlider) return;
                
                const currentSize = parseInt(this.fontSizeSlider.value);
                let newSize;
                
                if (e.key === '+' || e.key === '=') {
                    newSize = Math.min(24, currentSize + 1);
                } else {
                    newSize = Math.max(12, currentSize - 1);
                }
                
                this.fontSizeSlider.value = newSize;
                this.updateFontSize(newSize);
            }
            
            // ESC to toggle controls panel
            if (e.key === 'Escape') {
                this.toggleControlsPanel();
            }
        });
    }

    announceChange(message) {
        // Create live region for screen reader announcements
        const announcer = document.getElementById('screen-reader-announcer') || 
                         this.createScreenReaderAnnouncer();
        
        announcer.textContent = message;
        
        // Clear after a short delay
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }

    createScreenReaderAnnouncer() {
        const announcer = document.createElement('div');
        announcer.id = 'screen-reader-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        return announcer;
    }
}

// Global functions for template usage
window.copyToClipboard = function() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    
    const text = mainContent.innerText;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showTemporaryMessage('Content copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
};

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showTemporaryMessage('Content copied to clipboard!', 'success');
    } catch (err) {
        showTemporaryMessage('Could not copy content', 'error');
    }
    
    document.body.removeChild(textArea);
}

function showTemporaryMessage(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `modern-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
        <button type="button" class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ReaderControls();
});