window.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const newTheme = themeStylesheet.getAttribute('href') === 'style-dark.css' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        if (theme === 'light') {
            themeStylesheet.setAttribute('href', 'style-light.css');
            themeIcon.textContent = '🌙';
        } else {
            themeStylesheet.setAttribute('href', 'style-dark.css');
            themeIcon.textContent = '☀️';
        }
    }

    // Leet Speak Name Transformation
    const profileName = document.querySelector('.profile-name');
    const originalText = profileName.getAttribute('data-original');
    const leetText = profileName.getAttribute('data-leet');
    let animationTimeout;
    let isAnimating = false;

    function animateText(targetText, delay = 40) {
        // Clear any existing animation
        clearTimeout(animationTimeout);
        isAnimating = false;
        
        const currentText = profileName.textContent;
        const maxLength = Math.max(currentText.length, targetText.length);
        let currentIndex = 0;
        isAnimating = true;

        function updateChar() {
            if (currentIndex < maxLength) {
                let newText = '';
                for (let i = 0; i < maxLength; i++) {
                    if (i <= currentIndex) {
                        newText += targetText[i] || '';
                    } else {
                        newText += currentText[i] || '';
                    }
                }
                profileName.textContent = newText.trim();
                currentIndex++;
                animationTimeout = setTimeout(updateChar, delay);
            } else {
                profileName.textContent = targetText;
                isAnimating = false;
            }
        }

        updateChar();
    }

    profileName.addEventListener('mouseenter', () => {
        animateText(leetText, 35);
    });

    profileName.addEventListener('mouseleave', () => {
        animateText(originalText, 30);
    });
});
