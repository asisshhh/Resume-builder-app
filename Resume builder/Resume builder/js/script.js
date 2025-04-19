// Add smooth theme transition
document.documentElement.style.setProperty('--transition-duration', '0.3s');

// Improve theme switching
function switchTheme(theme) {
    try {
        const themeLink = document.getElementById('theme-css');
        const newThemeHref = `css/themes/${theme}.css`;
        
        // Create new link element
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.id = 'theme-css';
        newLink.href = newThemeHref;
        
        // Add the new stylesheet first
        document.head.appendChild(newLink);
        
        // Remove the old stylesheet after transition
        newLink.onload = () => {
            if (themeLink) {
                themeLink.remove();
            }
        };

        // Handle loading error
        newLink.onerror = () => {
            console.error(`Failed to load theme: ${theme}`);
            newLink.remove();
            if (themeLink) {
                // Keep the old theme if new one fails to load
                themeLink.removeAttribute('disabled');
            }
        };
    } catch (error) {
        console.error('Error switching theme:', error);
    }
}

// Update theme switcher event listener
document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            switchTheme(this.value);
        });
    }
});

// form repeater
$(document).ready(function(){
    try {
        $('.repeater').repeater({
            initEmpty: false,
            defaultValues: {
                'text-input': ''
            },
            show: function(){
                try {
                    $(this).slideDown();
                    generateCV(); // Update CV when adding new item
                } catch (error) {
                    console.error('Error showing repeater item:', error);
                }
            },
            hide: function(deleteElement){
                try {
                    $(this).slideUp(deleteElement);
                    setTimeout(() => {
                        generateCV();
                    }, 500);
                } catch (error) {
                    console.error('Error hiding repeater item:', error);
                    deleteElement(); // Ensure item is deleted even if there's an error
                }
            },
            isFirstItemUndeletable: true,
            ready: function(setIndexes) {
                // Called after repeater is initialized
                console.log('Repeater is ready');
            }
        });
    } catch (error) {
        console.error('Error initializing repeater:', error);
    }
});