// DyslexiFy Reader Controls
// Manages all accessibility and display controls for the reader

document.addEventListener('DOMContentLoaded', function() {
    // Get control elements
    const fontSizeSlider = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const lineSpacingSlider = document.getElementById('lineSpacing');
    const lineSpacingValue = document.getElementById('lineSpacingValue');
    const columnWidthSelect = document.getElementById('columnWidth');
    const backgroundColorRadios = document.querySelectorAll('input[name="bgColor"]');
    const dyslexicFontToggle = document.getElementById('dyslexicFont');
    
    // Get content elements
    const mainContent = document.getElementById('mainContent');
    const summaryContent = document.getElementById('summaryContent');
    
    // Initialize default values
    updateFontSizeDisplay();
    updateLineSpacingDisplay();
    
    // Font size control
    fontSizeSlider.addEventListener('input', function() {
        const fontSize = this.value + 'px';
        mainContent.style.fontSize = fontSize;
        summaryContent.style.fontSize = fontSize;
        updateFontSizeDisplay();
        savePreferences();
    });
    
    // Line spacing control
    lineSpacingSlider.addEventListener('input', function() {
        const lineHeight = this.value;
        mainContent.style.lineHeight = lineHeight;
        summaryContent.style.lineHeight = lineHeight;
        updateLineSpacingDisplay();
        savePreferences();
    });
    
    // Column width control
    columnWidthSelect.addEventListener('change', function() {
        const width = this.value;
        
        // Remove existing width classes
        mainContent.classList.remove('text-width-narrow', 'text-width-medium', 'text-width-wide');
        summaryContent.classList.remove('text-width-narrow', 'text-width-medium', 'text-width-wide');
        
        // Add new width class
        const widthClass = 'text-width-' + width;
        mainContent.classList.add(widthClass);
        summaryContent.classList.add(widthClass);
        
        savePreferences();
    });
    
    // Background color control
    backgroundColorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const color = this.value;
            
            // Remove existing background classes
            mainContent.classList.remove('bg-white-theme', 'bg-cream-theme', 'bg-yellow-theme', 'bg-gray-theme');
            summaryContent.classList.remove('bg-white-theme', 'bg-cream-theme', 'bg-yellow-theme', 'bg-gray-theme');
            
            // Add new background class
            const bgClass = 'bg-' + color + '-theme';
            mainContent.classList.add(bgClass);
            summaryContent.classList.add(bgClass);
            
            savePreferences();
        });
    });
    
    // Dyslexic font toggle
    dyslexicFontToggle.addEventListener('change', function() {
        if (this.checked) {
            mainContent.classList.remove('font-standard');
            mainContent.classList.add('font-dyslexic');
            summaryContent.classList.remove('font-standard');
            summaryContent.classList.add('font-dyslexic');
        } else {
            mainContent.classList.remove('font-dyslexic');
            mainContent.classList.add('font-standard');
            summaryContent.classList.remove('font-dyslexic');
            summaryContent.classList.add('font-standard');
        }
        savePreferences();
    });
    
    // Helper functions
    function updateFontSizeDisplay() {
        fontSizeValue.textContent = fontSizeSlider.value + 'px';
    }
    
    function updateLineSpacingDisplay() {
        lineSpacingValue.textContent = lineSpacingSlider.value;
    }
    
    function savePreferences() {
        // Save user preferences to localStorage
        const preferences = {
            fontSize: fontSizeSlider.value,
            lineSpacing: lineSpacingSlider.value,
            columnWidth: columnWidthSelect.value,
            backgroundColor: document.querySelector('input[name="bgColor"]:checked').value,
            dyslexicFont: dyslexicFontToggle.checked
        };
        
        localStorage.setItem('dyslexifyPreferences', JSON.stringify(preferences));
    }
    
    function loadPreferences() {
        // Load saved preferences
        const saved = localStorage.getItem('dyslexifyPreferences');
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                
                // Apply saved preferences
                if (preferences.fontSize) {
                    fontSizeSlider.value = preferences.fontSize;
                    fontSizeSlider.dispatchEvent(new Event('input'));
                }
                
                if (preferences.lineSpacing) {
                    lineSpacingSlider.value = preferences.lineSpacing;
                    lineSpacingSlider.dispatchEvent(new Event('input'));
                }
                
                if (preferences.columnWidth) {
                    columnWidthSelect.value = preferences.columnWidth;
                    columnWidthSelect.dispatchEvent(new Event('change'));
                }
                
                if (preferences.backgroundColor) {
                    const bgRadio = document.querySelector(`input[name="bgColor"][value="${preferences.backgroundColor}"]`);
                    if (bgRadio) {
                        bgRadio.checked = true;
                        bgRadio.dispatchEvent(new Event('change'));
                    }
                }
                
                if (preferences.dyslexicFont !== undefined) {
                    dyslexicFontToggle.checked = preferences.dyslexicFont;
                    dyslexicFontToggle.dispatchEvent(new Event('change'));
                }
                
            } catch (e) {
                console.warn('Could not load saved preferences:', e);
            }
        }
    }
    
    // Load preferences on page load
    loadPreferences();
    
    // Keyboard shortcuts for accessibility
    document.addEventListener('keydown', function(e) {
        // Alt + 1-4 for quick background color changes
        if (e.altKey && !e.ctrlKey && !e.shiftKey) {
            switch(e.key) {
                case '1':
                    document.getElementById('bgWhite').click();
                    e.preventDefault();
                    break;
                case '2':
                    document.getElementById('bgCream').click();
                    e.preventDefault();
                    break;
                case '3':
                    document.getElementById('bgYellow').click();
                    e.preventDefault();
                    break;
                case '4':
                    document.getElementById('bgGray').click();
                    e.preventDefault();
                    break;
                case 'f':
                    dyslexicFontToggle.click();
                    e.preventDefault();
                    break;
            }
        }
        
        // Ctrl + Plus/Minus for font size adjustment
        if (e.ctrlKey && (e.key === '+' || e.key === '=' || e.key === '-')) {
            e.preventDefault();
            const currentSize = parseInt(fontSizeSlider.value);
            let newSize;
            
            if (e.key === '+' || e.key === '=') {
                newSize = Math.min(24, currentSize + 1);
            } else {
                newSize = Math.max(12, currentSize - 1);
            }
            
            fontSizeSlider.value = newSize;
            fontSizeSlider.dispatchEvent(new Event('input'));
        }
    });
    
    // Add keyboard shortcut hints
    const shortcutHelp = document.createElement('div');
    shortcutHelp.className = 'mt-3 p-2 bg-light rounded small';
    shortcutHelp.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        <kbd>Alt + 1-4</kbd> Change background<br>
        <kbd>Alt + F</kbd> Toggle font<br>
        <kbd>Ctrl + +/-</kbd> Font size
    `;
    
    const controlsCard = document.querySelector('.reader-controls .card-body');
    if (controlsCard) {
        controlsCard.appendChild(shortcutHelp);
    }
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add reading progress indicator
    function updateReadingProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = docHeight - winHeight;
        const pctScrolled = Math.floor(scrollTop / trackLength * 100);
        
        // Update progress in the title or create a progress bar
        if (pctScrolled <= 100) {
            document.title = `(${pctScrolled}%) DyslexiFy Reader`;
        }
    }
    
    // Throttled scroll listener for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateReadingProgress();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    console.log('DyslexiFy Reader Controls initialized successfully');
});
