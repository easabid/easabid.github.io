// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize train animations
    setupProjectTrain();
    setupCertTrain();
    setupAchievementTrain();
    
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.loading-progress-bar');
    const loadingText = document.querySelector('.loading-text');
    
    // Create binary code effect for loading screen
    const binaryCodeContainer = document.querySelector('.binary-code');
    
    for (let i = 0; i < 10; i++) {
        const binaryLine = document.createElement('div');
        binaryLine.className = 'binary-line';
        binaryLine.style.left = `${Math.random() * 100}%`;
        binaryLine.style.animationDuration = `${Math.random() * 5 + 3}s`;
        binaryLine.textContent = generateBinaryString(Math.floor(Math.random() * 50) + 50);
        binaryCodeContainer.appendChild(binaryLine);
    }
    
    function generateBinaryString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.random() > 0.5 ? '1' : '0';
        }
        return result;
    }
    
    // Animate progress bar
    setTimeout(() => {
        progressBar.style.width = '100%';
        
        const textMessages = [
            "INITIALIZING SYSTEM",
            "SCANNING NETWORK",
            "LOADING ASSETS",
            "ESTABLISHING CONNECTION",
            "SYSTEM READY"
        ];
        
        let messageIndex = 0;
        const textInterval = setInterval(() => {
            messageIndex++;
            if (messageIndex < textMessages.length) {
                loadingText.textContent = textMessages[messageIndex];
            } else {
                clearInterval(textInterval);
            }
        }, 100);
        
        // Hide loading screen after 0.5 seconds
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            // Remove loading class from body to show main content
            document.body.classList.remove('loading');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // After loading screen is hidden, scroll to top to ensure we're at the home section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
        }, 500);
    }, 200);
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Particle background effect for entire page
    createParticleBackground();
    
    // Add scan line effect to sections for cybersecurity theme
    document.querySelectorAll('section').forEach(section => {
        // Create scan line element
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        section.style.position = 'relative';
        section.appendChild(scanLine);
        
        // Add binary background to sections
        section.classList.add('binary-bg');
    });
    
    function createParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.8';
        document.body.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;
        const maxDistance = 150;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = Math.random() > 0.5 ? 'rgba(0, 230, 118, 0.7)' : 'rgba(0, 229, 255, 0.5)';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 230, 118, ${0.2 * (1 - distance / maxDistance)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            
            connectParticles();
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        resizeCanvas();
        initParticles();
        animate();
    }
    
    // Advanced typing animation effect with cursor
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        // Create a span for the cursor
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.textContent = '|';
        cursorSpan.style.marginLeft = '2px';
        cursorSpan.style.animation = 'cursorBlink 1s infinite';
        typedTextElement.parentNode.appendChild(cursorSpan);
        
        // Add style for cursor blinking
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cursorBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        const texts = [
            'Cybersecurity Enthusiast',
            'Penetration Tester',
            'Network Security Analyst',
            'Ethical Hacker',
            'Security Researcher'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let deletingDelay = 50;
        let newTextDelay = 2000; // Delay between words
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Remove a character
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = deletingDelay;
            } else {
                // Add a character
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = Math.random() * 50 + 80; // Random typing speed for realistic effect
            }
            
            // If word is complete, start deleting after delay
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingDelay = newTextDelay;
            } 
            // If deleting is complete, move to next word
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500;
            }
            
            setTimeout(type, typingDelay);
        }
        
        // Start the typing animation with a slight delay for better UX
        setTimeout(type, 1200);
    }
    
    // Smooth scrolling with easing function
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                // Easing function for smooth scrolling
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    
    // Remove the always-present indicator under Home link
    const navMenuLinks = document.querySelectorAll('.nav-links a');
    navMenuLinks.forEach(link => {
        if (link.classList.contains('active')) {
            link.classList.remove('active');
        }
    });
    
    // No longer adding the indicator element
    
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        let currentIndex = -1;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
                currentIndex = index;
            }
        });
        
        navLinks.forEach((link, index) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Parallax effect for sections
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            const scrollSpeed = section.dataset.speed || 0.1;
            const sectionBg = section.querySelector('.section-bg');
            
            if (sectionBg) {
                sectionBg.style.transform = `translateY(${top * scrollSpeed}px)`;
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    window.addEventListener('resize', highlightActiveLink);
    
    // Initialize indicator position
    setTimeout(highlightActiveLink, 100);
    
    // Form submission with validation and animated feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add input animation effects
        const formInputs = contactForm.querySelectorAll('input:not([type="hidden"]), textarea');
        formInputs.forEach(input => {
            // Create floating label
            const label = document.createElement('label');
            label.htmlFor = input.id;
            label.textContent = input.placeholder;
            label.className = 'floating-label';
            input.parentNode.appendChild(label);
            
            // Style the label
            label.style.position = 'absolute';
            label.style.left = '20px';
            label.style.top = '15px';
            label.style.pointerEvents = 'none';
            label.style.color = 'var(--text-muted)';
            label.style.transition = 'all 0.3s ease';
            
            // Input focus and blur events
            input.addEventListener('focus', () => {
                label.style.top = '-12px';
                label.style.left = '15px';
                label.style.fontSize = '12px';
                label.style.color = 'var(--primary-color)';
                label.style.backgroundColor = 'var(--bg-light)';
                label.style.padding = '0 5px';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.top = '15px';
                    label.style.left = '20px';
                    label.style.fontSize = '16px';
                    label.style.color = 'var(--text-muted)';
                    label.style.padding = '0';
                    label.style.backgroundColor = 'transparent';
                }
            });
            
            // Trigger focus if input already has value
            if (input.value) {
                input.dispatchEvent(new Event('focus'));
            }
        });
        
        // Show loading animation when form is submitted
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - we want the form to actually submit to FormSubmit
            
            // Show loading animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // We'll let FormSubmit handle the actual submission and redirection
            // The thanks.html page will be shown after successful submission
        });
    }
    
    // Advanced scroll reveal animations with different effects
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    };
    
    // Create enhanced intersection observers with different animations
    // Modified to ensure elements stay visible when scrolling back
    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with a small delay for a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeup');
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateZ(0)"; // Force GPU acceleration
                }, entry.target.dataset.delay || 0);
                
                // Once element is animated, don't need to animate it again
                fadeUpObserver.unobserve(entry.target);
                
                // Add a permanent visibility class to ensure it stays visible
                entry.target.classList.add('always-visible');
            }
        });
    }, observerOptions);
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fadein');
                    entry.target.style.opacity = "1";
                }, entry.target.dataset.delay || 0);
                
                fadeInObserver.unobserve(entry.target);
                entry.target.classList.add('always-visible');
            }
        });
    }, observerOptions);
    
    const slideInLeftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-slideinleft');
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateZ(0)";
                }, entry.target.dataset.delay || 0);
                
                slideInLeftObserver.unobserve(entry.target);
                entry.target.classList.add('always-visible');
            }
        });
    }, observerOptions);
    
    const slideInRightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-slideinright');
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateZ(0)";
                }, entry.target.dataset.delay || 0);
                
                slideInRightObserver.unobserve(entry.target);
                entry.target.classList.add('always-visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to CSS
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-fadeup {
            animation: fadeUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        
        .animate-fadein {
            animation: fadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        
        .animate-slideinleft {
            animation: slideInLeft 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        
        .animate-slideinright {
            animation: slideInRight 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Apply different animations to different elements - with fix to prevent vanishing
    
    // Add CSS for permanent visibility
    const permanentVisibilityStyle = document.createElement('style');
    permanentVisibilityStyle.textContent = `
        .always-visible {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(permanentVisibilityStyle);
    
    // Staggered animation for skill cards and project cards
    document.querySelectorAll('.skill-card').forEach((el, index) => {
        el.style.opacity = "0";
        el.dataset.delay = index * 100; // Stagger animations by 100ms
        fadeUpObserver.observe(el);
        
        // Add cyber glow effect
        el.classList.add('cyber-glow');
        
        // Add terminal effect to skill description
        const description = el.querySelector('p');
        if (description) {
            // Create terminal window for description
            const terminalWrapper = document.createElement('div');
            terminalWrapper.className = 'terminal-body';
            terminalWrapper.style.marginTop = '15px';
            terminalWrapper.style.height = '0';
            terminalWrapper.style.overflow = 'hidden';
            terminalWrapper.style.opacity = '0';
            terminalWrapper.style.transition = 'height 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';
            
            const terminalPrompt = document.createElement('div');
            terminalPrompt.className = 'terminal-prompt';
            terminalPrompt.textContent = description.textContent;
            
            // Move the description to the terminal
            description.textContent = '';
            terminalWrapper.appendChild(terminalPrompt);
            description.appendChild(terminalWrapper);
            
            // Show terminal on hover
            el.addEventListener('mouseenter', () => {
                terminalWrapper.style.height = 'auto';
                terminalWrapper.style.opacity = '1';
            });
            
            el.addEventListener('mouseleave', () => {
                terminalWrapper.style.height = '0';
                terminalWrapper.style.opacity = '0';
            });
        }
    });
    
    // Project cards with hover and click interaction
    function setupProjectTrain() {
        const projectsContent = document.querySelector('.projects-content');
        if (projectsContent) {
            // First, remove any existing clones to prevent duplication if function runs multiple times
            const existingCards = document.querySelectorAll('.project-card');
            const originalCards = [];
            
            // Keep only the original cards (not clones)
            existingCards.forEach((card, index) => {
                if (!card.classList.contains('clone-card')) {
                    originalCards.push(card);
                } else {
                    card.remove(); // Remove existing clones
                }
            });
            
            // Calculate how many clones we need to ensure full viewport coverage
            const viewportWidth = window.innerWidth;
            const cardWidth = originalCards[0].offsetWidth;
            const cardGap = 30; // gap between cards
            const cardsPerScreen = Math.ceil((viewportWidth * 1.5) / (cardWidth + cardGap));
            const setsNeeded = Math.max(3, Math.ceil(cardsPerScreen / originalCards.length) + 1);
            
            // Create enough clones to fill the screen width completely
            for (let i = 0; i < setsNeeded; i++) {
                originalCards.forEach(card => {
                    const clone = card.cloneNode(true);
                    clone.classList.add('clone-card');
                    projectsContent.appendChild(clone);
                });
            }
            
            // Set a specific width for the container based on the cards
            setTimeout(() => {
                // Wait for DOM to update
                const cardWidth = originalCards[0].offsetWidth;
                const cardMargin = 30; // gap between cards
                const totalCards = document.querySelectorAll('.project-card').length;
                const totalWidth = (cardWidth + cardMargin) * totalCards;
                
                // Adjust container styling for edge-to-edge animation
                projectsContent.style.paddingLeft = '0';
                projectsContent.style.paddingRight = '0';
                
                // Update CSS custom property for the animation
                document.documentElement.style.setProperty('--project-train-width', `${totalWidth/2}px`);
                
                // Add interactive scrolling
                setupInteractiveScrolling(projectsContent, 'project-train-container');
            }, 100);
        }
    }
    
    // Helper function to set up interactive scrolling for any train container
    function setupInteractiveScrolling(contentElement, containerClass) {
        if (!contentElement) return;
        
        // First, remove any existing CSS animations
        contentElement.style.animation = 'none';
        
        // Variables for scrolling
        let scrollPosition = 0;
        let isPaused = false;
        let scrollDirection = 1; // 1 for right-to-left, -1 for left-to-right
        let animationId = null;
        let lastTimestamp = 0;
        
        // Add navigation indicators if needed
        const parentContainer = contentElement.closest('.' + containerClass) || 
                                contentElement.parentElement;
        
        if (parentContainer) {
            // Add left/right navigation indicators if they don't exist
            let leftIndicator = parentContainer.querySelector('.train-nav-left');
            let rightIndicator = parentContainer.querySelector('.train-nav-right');
            
            if (!leftIndicator) {
                leftIndicator = document.createElement('div');
                leftIndicator.className = 'train-nav-indicator left';
                leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
                leftIndicator.style.position = 'absolute';
                leftIndicator.style.top = '50%';
                leftIndicator.style.left = '20px';
                leftIndicator.style.transform = 'translateY(-50%)';
                leftIndicator.style.width = '40px';
                leftIndicator.style.height = '40px';
                leftIndicator.style.backgroundColor = 'rgba(0, 230, 118, 0.15)';
                leftIndicator.style.borderRadius = '50%';
                leftIndicator.style.display = 'flex';
                leftIndicator.style.alignItems = 'center';
                leftIndicator.style.justifyContent = 'center';
                leftIndicator.style.color = 'var(--primary-color, #00e676)';
                leftIndicator.style.zIndex = '10';
                leftIndicator.style.opacity = '0.7';
                leftIndicator.style.cursor = 'pointer';
                leftIndicator.style.transition = 'all 0.3s ease';
                leftIndicator.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
                parentContainer.appendChild(leftIndicator);
            }
            
            if (!rightIndicator) {
                rightIndicator = document.createElement('div');
                rightIndicator.className = 'train-nav-indicator right';
                rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
                rightIndicator.style.position = 'absolute';
                rightIndicator.style.top = '50%';
                rightIndicator.style.right = '20px';
                rightIndicator.style.transform = 'translateY(-50%)';
                rightIndicator.style.width = '40px';
                rightIndicator.style.height = '40px';
                rightIndicator.style.backgroundColor = 'rgba(0, 230, 118, 0.15)';
                rightIndicator.style.borderRadius = '50%';
                rightIndicator.style.display = 'flex';
                rightIndicator.style.alignItems = 'center';
                rightIndicator.style.justifyContent = 'center';
                rightIndicator.style.color = 'var(--primary-color, #00e676)';
                rightIndicator.style.zIndex = '10';
                rightIndicator.style.opacity = '0.7';
                rightIndicator.style.cursor = 'pointer';
                rightIndicator.style.transition = 'all 0.3s ease';
                rightIndicator.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
                parentContainer.appendChild(rightIndicator);
            }
            
            // Add click event for left indicator
            leftIndicator.addEventListener('click', function(event) {
                // Move right by 50px
                scrollPosition += 50;
                contentElement.style.transition = 'transform 0.2s ease';
                contentElement.style.transform = `translateX(${scrollPosition}px)`;
                
                // Pause automatic animation temporarily
                isPaused = true;
                setTimeout(() => {
                    if (!contentElement.matches(':hover')) {
                        isPaused = false;
                    }
                }, 300);
                
                event.stopPropagation();
            });
            
            // Add click event for right indicator
            rightIndicator.addEventListener('click', function(event) {
                // Move left by 50px
                scrollPosition -= 50;
                contentElement.style.transition = 'transform 0.2s ease';
                contentElement.style.transform = `translateX(${scrollPosition}px)`;
                
                // Pause automatic animation temporarily
                isPaused = true;
                setTimeout(() => {
                    if (!contentElement.matches(':hover')) {
                        isPaused = false;
                    }
                }, 300);
                
                event.stopPropagation();
            });
        }
        
        // On hover behavior
        contentElement.addEventListener('mouseenter', function(e) {
            // Get the center point
            const rect = contentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            
            // Auto-move slightly on hover
            if (e.clientX < centerX) {
                // Hovering on left side - move content slightly right
                scrollPosition += 50;
            } else {
                // Hovering on right side - move content slightly left
                scrollPosition -= 50;
            }
            
            contentElement.style.transition = 'transform 0.3s ease';
            contentElement.style.transform = `translateX(${scrollPosition}px)`;
            
            // Pause automatic scrolling
            isPaused = true;
        });
        
        // Handle single click for small movements
        contentElement.addEventListener('click', function(event) {
            const clickPosition = event.clientX;
            const midPoint = window.innerWidth / 2;
            
            // Small movement of 50px on click
            if (clickPosition < midPoint) {
                // Move right (items shift right)
                scrollPosition += 50;
            } else {
                // Move left (items shift left)
                scrollPosition -= 50;
            }
            
            // Apply the position with a smooth transition
            contentElement.style.transition = 'transform 0.2s ease';
            contentElement.style.transform = `translateX(${scrollPosition}px)`;
            
            // Temporary pause animation
            isPaused = true;
            setTimeout(() => {
                if (!contentElement.matches(':hover')) {
                    isPaused = false;
                }
            }, 300);
        });
        
        // Reset pause state when mouse leaves
        contentElement.addEventListener('mouseleave', function() {
            isPaused = false;
        });
        
        // Set up automatic animation with requestAnimationFrame
        function autoScroll(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const elapsed = timestamp - lastTimestamp;
            
            // Only scroll if not paused
            if (!isPaused) {
                // Calculate movement based on speed
                const moveAmount = elapsed * 0.03;
                scrollPosition -= moveAmount * scrollDirection;
                
                // Apply the position without transition for smooth animation
                contentElement.style.transition = 'none';
                contentElement.style.transform = `translateX(${scrollPosition}px)`;
            }
            
            lastTimestamp = timestamp;
            animationId = requestAnimationFrame(autoScroll);
        }
        
        // Start the automatic animation
        animationId = requestAnimationFrame(autoScroll);
    }
    
    setupProjectTrain();
    
    // Make sure all project cards are visible immediately
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('always-visible');
    });
    
    // Setup certification train with interactive scrolling
    function setupCertTrain() {
        const certsContent = document.querySelector('.certifications-content');
        if (certsContent) {
            // First, remove any existing clones to prevent duplication
            const existingCards = document.querySelectorAll('.cert-card');
            const originalCards = [];
            
            // Keep only the original cards (not clones)
            existingCards.forEach((card, index) => {
                if (!card.classList.contains('clone-cert')) {
                    originalCards.push(card);
                } else {
                    card.remove(); // Remove existing clones
                }
            });
            
            // Calculate how many clones we need to ensure full viewport coverage
            const viewportWidth = window.innerWidth;
            const cardWidth = originalCards[0].offsetWidth;
            const cardGap = 30; // gap between cards
            const cardsPerScreen = Math.ceil((viewportWidth * 1.5) / (cardWidth + cardGap));
            const setsNeeded = Math.max(3, Math.ceil(cardsPerScreen / originalCards.length) + 1);
            
            // Create enough clones to fill the screen width completely
            for (let i = 0; i < setsNeeded; i++) {
                originalCards.forEach(card => {
                    const clone = card.cloneNode(true);
                    clone.classList.add('clone-cert');
                    certsContent.appendChild(clone);
                });
            }
            
            // Set a specific width for the container based on the cards
            setTimeout(() => {
                // Wait for DOM to update
                const cardWidth = originalCards[0].offsetWidth;
                const cardMargin = 30; // gap between cards
                const totalCards = document.querySelectorAll('.cert-card').length;
                const totalWidth = (cardWidth + cardMargin) * totalCards;
                
                // Adjust container styling for edge-to-edge animation
                certsContent.style.paddingLeft = '0';
                certsContent.style.paddingRight = '0';
                
                // Update CSS custom property for the animation
                document.documentElement.style.setProperty('--cert-train-width', `${totalWidth/2}px`);
                
                // Add interactive scrolling
                setupInteractiveScrolling(certsContent, 'cert-train-container');
            }, 100);
        }
    }
    
    // Setup achievement train with interactive scrolling
    function setupAchievementTrain() {
        const achievementsContent = document.querySelector('.achievements-content');
        if (achievementsContent) {
            // First, remove any existing clones to prevent duplication
            const existingCards = document.querySelectorAll('.achievement-card');
            const originalCards = [];
            
            // Keep only the original cards (not clones)
            existingCards.forEach((card, index) => {
                if (!card.classList.contains('clone-achievement')) {
                    originalCards.push(card);
                } else {
                    card.remove(); // Remove existing clones
                }
            });
            
            // Calculate how many clones we need to ensure full viewport coverage
            const viewportWidth = window.innerWidth;
            const cardWidth = originalCards[0].offsetWidth;
            const cardGap = 30; // gap between cards
            const cardsPerScreen = Math.ceil((viewportWidth * 1.5) / (cardWidth + cardGap));
            const setsNeeded = Math.max(3, Math.ceil(cardsPerScreen / originalCards.length) + 1);
            
            // Create enough clones to fill the screen width completely
            for (let i = 0; i < setsNeeded; i++) {
                originalCards.forEach(card => {
                    const clone = card.cloneNode(true);
                    clone.classList.add('clone-achievement');
                    achievementsContent.appendChild(clone);
                });
            }
            
            // Set a specific width for the container based on the cards
            setTimeout(() => {
                // Wait for DOM to update
                const cardWidth = originalCards[0].offsetWidth;
                const cardMargin = 30; // gap between cards
                const totalCards = document.querySelectorAll('.achievement-card').length;
                const totalWidth = (cardWidth + cardMargin) * totalCards;
                
                // Adjust container styling for edge-to-edge animation
                achievementsContent.style.paddingLeft = '0';
                achievementsContent.style.paddingRight = '0';
                
                // Update CSS custom property for the animation
                document.documentElement.style.setProperty('--achievement-train-width', `${totalWidth/2}px`);
                
                // Add interactive scrolling
                setupInteractiveScrolling(achievementsContent, 'achievement-train-container');
            }, 100);
        }
    }
    
    // Cert cards are now handled by the train animation
    document.querySelectorAll('.cert-card').forEach(card => {
        // Add hover animation class
        card.classList.add('cyber-glow');
        card.classList.add('always-visible');
    });
    
    // Achievement cards are now handled by the train animation
    document.querySelectorAll('.achievement-card').forEach((card, index) => {
        // Add hover animation class
        card.classList.add('cyber-glow');
        card.classList.add('always-visible');
        
        // Set custom property for staggered floating animation
        card.style.setProperty('--card-index', index % 5); // Cycle through 5 different delays
    });
    
    document.querySelectorAll('.contact-card').forEach((el, index) => {
        el.style.opacity = "0";
        el.dataset.delay = index * 100;
        fadeInObserver.observe(el);
    });
    
    document.querySelectorAll('.section-header').forEach(el => {
        el.style.opacity = "0";
        fadeUpObserver.observe(el);
        
        // Add highlight effect to section headers
        const text = el.querySelector('h2');
        if (text) {
            text.innerHTML = text.textContent.split('').map(char => 
                `<span class="header-char">${char}</span>`
            ).join('');
        }
    });
    
    // Add staggered animation to header characters
    const headerChars = document.querySelectorAll('.header-char');
    headerChars.forEach((char, index) => {
        char.style.transition = 'color 0.3s ease';
        char.style.display = 'inline-block';
        char.addEventListener('mouseover', () => {
            char.style.color = 'var(--primary-color)';
        });
        char.addEventListener('mouseout', () => {
            char.style.color = '';
        });
    });
    
    // Header scroll effects with parallax
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        }
    });
    
    // Add digital code rain animation in background (subtle cybersecurity effect)
    const body = document.body;
    const codeRainCanvas = document.createElement('canvas');
    codeRainCanvas.id = 'codeRainCanvas';
    codeRainCanvas.style.position = 'fixed';
    codeRainCanvas.style.top = '0';
    codeRainCanvas.style.left = '0';
    codeRainCanvas.style.width = '100%';
    codeRainCanvas.style.height = '100%';
    codeRainCanvas.style.pointerEvents = 'none';
    codeRainCanvas.style.zIndex = '0';
    codeRainCanvas.style.opacity = '0.1';
    body.appendChild(codeRainCanvas);
    
    const ctx = codeRainCanvas.getContext('2d');
    
    // Matrix code rain effect
    function setupCodeRain() {
        codeRainCanvas.width = window.innerWidth;
        codeRainCanvas.height = window.innerHeight;
        
        const characters = '01'.split('');
        const columns = Math.floor(codeRainCanvas.width / 20);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, codeRainCanvas.width, codeRainCanvas.height);
            
            ctx.fillStyle = 'rgba(0, 230, 118, 0.7)';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > codeRainCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 90);
    }
    
    setupCodeRain();
    window.addEventListener('resize', setupCodeRain);
});