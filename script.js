(function(){

    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');

    function applyTheme(theme){
        root.setAttribute('data-theme', theme);
        localStorage.setItem('borders-theme', theme);
        if(themeToggle){
            themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        }
    }

    function initTheme(){
        const saved = localStorage.getItem('borders-theme');
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(saved || (prefersLight ? 'light' : 'dark'));
    }

    function toggleTheme(){
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
    }

    function applyLanguage(lang){
        document.querySelectorAll('[data-pt]').forEach(function(el){
            if(el.dataset.enText === undefined){
                el.dataset.enText = el.textContent;
            }
            el.textContent = lang === 'pt' ? el.getAttribute('data-pt') : el.dataset.enText;
        });

        root.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        localStorage.setItem('borders-lang', lang);

        if(langToggle){
            langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
            langToggle.setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para português');
        }
    }

    function initLanguage(){
        const saved = localStorage.getItem('borders-lang') || 'en';
        applyLanguage(saved);
    }

    function toggleLanguage(){
        const current = localStorage.getItem('borders-lang') || 'en';
        applyLanguage(current === 'pt' ? 'en' : 'pt');
    }

    function initReveal(){
        const itemSelectors = '.intro-grid > .card, .page-grid > .page-card, .analysis-grid > .analysis-box, .stats-section > .stat-box';
        const blockSelectors = '.content-card, .quote-box, .conclusion-card, .highlight-image, .highlight-text, .section-title';

        document.querySelectorAll(itemSelectors).forEach(function(el, index){
            el.classList.add('reveal');
            el.style.transitionDelay = (index % 4) * 0.12 + 's';
        });

        document.querySelectorAll(blockSelectors).forEach(function(el){
            el.classList.add('reveal');
        });

        const observer = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('.reveal').forEach(function(el){
            observer.observe(el);
        });
    }

    if(themeToggle){
        themeToggle.addEventListener('click', toggleTheme);
    }

    if(langToggle){
        langToggle.addEventListener('click', toggleLanguage);
    }

    initTheme();
    initLanguage();
    initReveal();

})();
