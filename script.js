// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('theme-light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        themeIcon.textContent = '🌙';
    } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
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
