// HubStack Hydration Engine
async function init() {
    // 1. Identify User from URL (Query param, Path, or Default)
    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('user');
    
    if (!username) {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(s => s && !s.includes(':') && s !== 'index.html');
        
        // Handle Vercel-style clean URL (/username) vs local path
        if (pathSegments.length > 0) {
            // If the path ends with /users/name, second to last check
            const userIdx = pathSegments.indexOf('users');
            if (userIdx !== -1 && pathSegments[userIdx + 1]) {
                username = pathSegments[userIdx + 1];
            } else {
                // Otherwise assume the first non-system segment is the username
                username = pathSegments[pathSegments.length - 1];
            }
        }
        
        // Ultimate fallback
        if (!username || username === 'hubstack') {
            username = 'demo';
        }
    }

    try {
        console.log(`HubStack: Loading profile for "${username}"...`);
        const response = await fetch(`users/${username}/user.json`);
        
        // On file:// protocol, response.ok might be false even if the file exists (status 0)
        if (!response.ok && response.status !== 0) {
            throw new Error(`User JSON not found (Status: ${response.status})`);
        }
        
        const data = await response.json();
        hydratePage(data);
    } catch (error) {
        console.error('HubStack Error:', error);
        
        let errorMsg = error.message;
        if (error.name === 'TypeError' && window.location.protocol === 'file:') {
            errorMsg = "Blocage de sécurité navigateur (CORS). Le navigateur refuse de lire le fichier JSON en local sans serveur web. Utilisez 'Live Server' ou 'npx serve'.";
        }

        document.body.innerHTML = `<div class="container" style="text-align: center; padding-top: 100px;">
            <h1>Oops ! Impossible de charger le profil</h1>
            <p>Le profil "${username}" n'a pas pu être chargé.</p>
            <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0; font-size: 0.9rem; color: #ff4444; border: 1px solid rgba(255,0,0,0.2)">
                <strong>Détail :</strong> ${errorMsg}
            </div>
            <a href="index.html?user=demo" style="color: var(--accent-primary)">Réessayer avec le profil démo</a>
        </div>`;
    }
}

function hydratePage(data) {
    // Metadata
    document.getElementById('page-title').textContent = `${data.name} | HubStack`;
    document.getElementById('meta-description').setAttribute('content', data.bio);
    if (data.favicon) {
        document.getElementById('favicon').setAttribute('href', data.favicon);
    }

    // Header
    const avatar = document.getElementById('user-avatar');
    avatar.src = data.avatar;
    avatar.alt = data.name;
    avatar.style.display = 'block';

    const nameEl = document.getElementById('user-name');
    nameEl.textContent = data.name;
    nameEl.setAttribute('data-original', data.name);
    nameEl.setAttribute('data-leet', data.leetName);

    document.getElementById('user-bio').textContent = data.bio;
    document.getElementById('footer-text').textContent = `HubStack - With ❤️ by ${data.name}`;

    // Main Links (Grid)
    const linksGrid = document.getElementById('main-links');
    linksGrid.innerHTML = '';

    // Hobby Card (if exists)
    if (data.hobby) {
        const hobbyHTML = `
            <div class="hobby-card-small">
                <img src="${data.hobby.image}" alt="${data.hobby.label}" class="hobby-image-small">
                <div class="hobby-overlay-small">
                    <span class="hobby-icon-small">${data.hobby.icon}</span>
                </div>
            </div>`;
        linksGrid.innerHTML += hobbyHTML;
    }

    // Links Column
    const linksColumn = document.createElement('div');
    linksColumn.className = 'links-column';
    
    const github = data.links.github;
    const linkedin = data.links.linkedin;

    if (github) {
        linksColumn.innerHTML += `
            <a href="${github.url}" class="link-card ${github.primary ? 'primary' : ''}" target="_blank" rel="noopener noreferrer">
                <span class="link-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </span>
                <span class="link-text">
                    <span class="link-title">${github.title}</span>
                    ${github.badge ? `<span class="link-badge">${github.badge}</span>` : ''}
                </span>
            </a>`;
    }

    if (linkedin) {
        linksColumn.innerHTML += `
            <a href="${linkedin.url}" class="link-card" target="_blank" rel="noopener noreferrer">
                <span class="link-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </span>
                <span class="link-text">
                    <span class="link-title">${linkedin.title}</span>
                    <span class="link-subtitle">${linkedin.subtitle}</span>
                </span>
            </a>`;
    }
    linksGrid.appendChild(linksColumn);

    // Dynamic Sections (Skills, etc.)
    const sectionsContainer = document.getElementById('dynamic-sections');
    sectionsContainer.innerHTML = '';

    data.sections.forEach(section => {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'section';
        sectionEl.innerHTML = `<h2 class="section-title">${section.title}</h2>`;
        
        const grid = document.createElement('div');
        grid.className = 'skills-grid';
        
        section.items.forEach(item => {
            const isLink = !!item.url;
            const card = document.createElement(isLink ? 'a' : 'div');
            card.className = item.type || 'skill-card';
            if (item.learning) card.classList.add('learning');
            
            if (isLink) {
                card.href = item.url;
                card.target = "_blank";
                card.rel = "noopener noreferrer";
            }

            const iconHTML = item.icon.startsWith('http') || item.icon.includes('/') 
                ? `<img src="${item.icon}" alt="${item.name}" class="skill-favicon">`
                : item.icon;

            card.innerHTML = `
                <span class="skill-icon">${iconHTML}</span>
                <div class="skill-text">
                    <span class="skill-name">${item.name}</span>
                    ${item.subtitle ? `<span class="skill-subtitle">${item.subtitle}</span>` : ''}
                </div>
            `;
            grid.appendChild(card);
        });
        
        sectionEl.appendChild(grid);
        sectionsContainer.appendChild(sectionEl);
    });

    // Re-setup Animations and Theme
    setupInteractions();
}

function setupInteractions() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.onclick = () => {
        const newTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.replace('theme-dark', 'theme-light');
            themeIcon.textContent = '🌙';
        } else {
            document.body.classList.replace('theme-light', 'theme-dark');
            themeIcon.textContent = '☀️';
        }
    }

    // Leet Speak
    const profileName = document.getElementById('user-name');
    const originalText = profileName.getAttribute('data-original');
    const leetText = profileName.getAttribute('data-leet');
    let animationTimeout;

    function animate(target, delay = 40) {
        clearTimeout(animationTimeout);
        const currentText = profileName.textContent;
        const maxLength = Math.max(currentText.length, target.length);
        let idx = 0;

        function step() {
            if (idx < maxLength) {
                let text = '';
                for (let i = 0; i < maxLength; i++) {
                    text += (i <= idx) ? (target[i] || '') : (currentText[i] || '');
                }
                profileName.textContent = text.trim();
                idx++;
                animationTimeout = setTimeout(step, delay);
            } else {
                profileName.textContent = target;
            }
        }
        step();
    }

    profileName.onmouseenter = () => animate(leetText, 35);
    profileName.onmouseleave = () => animate(originalText, 30);
}

init();
