// Dark/Light Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.setAttribute('title', 'Toggle dark/light mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Add to body
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-theme') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme when clicked
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            // Switch to dark theme
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            
            // Add special animation effect for theme change
            const ripple = document.createElement('div');
            ripple.className = 'theme-ripple';
            ripple.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.5s ease;
            `;
            document.body.appendChild(ripple);
            
            // Animate the ripple
            setTimeout(() => {
                ripple.style.opacity = '1';
                setTimeout(() => {
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(ripple);
                    }, 500);
                }, 200);
            }, 0);
        } else {
            // Switch to light theme
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            
            // Add special animation effect for theme change
            const ripple = document.createElement('div');
            ripple.className = 'theme-ripple';
            ripple.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(255, 255, 255, 0.7);
                z-index: 999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.5s ease;
            `;
            document.body.appendChild(ripple);
            
            // Animate the ripple
            setTimeout(() => {
                ripple.style.opacity = '1';
                setTimeout(() => {
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(ripple);
                    }, 500);
                }, 200);
            }, 0);
        }
    });
});