// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Ensure the script runs after everything is loaded
window.addEventListener('load', () => {
    
    // Glow Card Effect - Mouse Tracking
    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 3D Profile Interactivity
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            profileContainer.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profileContainer.addEventListener('mouseleave', () => {
            profileContainer.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    }

    // Project Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-v2');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.setAttribute('data-lucide', 'sun');
        lucide.createIcons();
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Update icon
        themeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        lucide.createIcons();
    });

    // GSAP Animations
    const tl = gsap.timeline();

    // Reset initial states to avoid flash and ensure visibility
    gsap.set(['nav', '.profile-container', '.hero-tagline', '.bento-item'], { opacity: 0, y: 30 });

    tl.to('nav', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out'
    })
    .to('.profile-container', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.6')
    .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 0.5
    }, '-=0.3')
    .to('.bento-item', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.5');

    // Refresh ScrollTrigger to ensure correct positions
    ScrollTrigger.refresh();
});
