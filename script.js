document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth AOS (Animate On Scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // 2. 3D Card Tilt Effect (Vanilla JS)
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none';
        });
    });

    // 3. OS Detection Logic (Windows/Linux focus)
    const osTitle = document.getElementById('os-title');
    const downloadContent = document.getElementById('download-content');

    const detectOS = () => {
        const userAgent = window.navigator.userAgent;
        let os = "Système inconnu";
        let isWindows = false;
        let isLinux = false;

        if (userAgent.indexOf("Win") !== -1) {
            os = "Windows OS";
            isWindows = true;
        } else if (userAgent.indexOf("Linux") !== -1) {
            os = "Linux Engine";
            isLinux = true;
        }

        osTitle.innerHTML = `VÉRIFICATION : <span class="os-detected">${os}</span>`;

        if (isWindows) {
            downloadContent.innerHTML = `
                <p style="margin-bottom: 2rem;">Le noyau Stark est 100% compatible avec votre architecture actuelle.</p>
                <a href="#" class="download-btn-large">INITIALISER LE TÉLÉCHARGEMENT</a>
                <p style="margin-top: 1rem; color: var(--text-dim); font-size: 0.9rem;">v2.8.5 - Architecture x64 - Chiffrement AES-256</p>
            `;
        } else if (isLinux) {
            downloadContent.innerHTML = `
                <p style="color: #ff5f56; margin-bottom: 2rem; font-weight: 600;">L'exécutable x86/x64 n'est pas requis pour Linux. Utilisez le Stark Core CLI ci-dessous.</p>
                
                <div class="terminal-container" style="text-align: left;">
                    <div class="terminal-header">Stark Terminal Shell</div>
                    <div class="terminal-body">
                        <p class="command-group">
                            <span class="comment"># PURGER LA MÉMOIRE CACHE (RAM)</span><br>
                            <code>sudo sync; echo 3 | sudo tee /proc/sys/vm/drop_caches</code>
                        </p>
                        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 20px 0;">
                        <p class="command-group">
                            <span class="comment"># IDENTIFICATION DES UNITÉS USB</span><br>
                            <code>lsblk</code>
                        </p>
                        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 20px 0;">
                        <p class="command-group">
                            <span class="comment"># EFFACEMENT BAS-NIVEAU (DANGER : REMOVE SDB PAR VOTRE ID)</span><br>
                            <code>sudo wipefs -a /dev/sdb</code>
                        </p>
                        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 20px 0;">
                        <p class="command-group">
                            <span class="comment"># FORMATAGE ABSOLU (FAT32)</span><br>
                            <code>sudo mkfs.fat -F 32 /dev/sdb1</code>
                        </p>
                    </div>
                </div>
                <a href="docs.html" class="btn-primary" style="margin-top: 3rem; display: inline-block;">CONSULTER LES LOGS DE DOC</a>
            `;
        } else {
            downloadContent.innerHTML = `
                <p>Système hybride détecté. Stark supporte Windows et Linux nativement.</p>
                <a href="docs.html" class="btn-secondary">LIRE LES SPÉCIFICATIONS</a>
            `;
        }
    };

    if (osTitle && downloadContent) {
        setTimeout(detectOS, 1500); // Fake delay for tech feel
    }

    // 4. Hero Visual Counter & Optimization Animation
    const ramBar = document.querySelector('.progress');
    const ramPercentText = document.querySelector('.ram-percent');
    const optimizeBtn = document.querySelector('.btn-optimize');

    if (optimizeBtn && ramBar) {
        optimizeBtn.addEventListener('click', () => {
            optimizeBtn.innerText = "ACCÈS KERNEL...";
            optimizeBtn.style.background = "#fff";
            optimizeBtn.style.color = "#000";

            // Animation values
            let currentRAM = 85;
            const interval = setInterval(() => {
                if (currentRAM > 12) {
                    currentRAM -= 2;
                    ramBar.style.width = `${currentRAM}%`;
                    ramPercentText.innerText = `${currentRAM}%`;
                } else {
                    clearInterval(interval);
                    optimizeBtn.innerText = "SYSTÈME OPTIMISÉ";
                    optimizeBtn.style.background = "#27c93f";
                    optimizeBtn.style.boxShadow = "0 0 30px rgba(39, 201, 63, 0.4)";
                }
            }, 30);
        });
    }

    // 5. Smooth Scroll for all anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Navigation Shine Effect on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            nav.style.padding = '1.2rem 0';
            nav.style.background = 'rgba(5, 5, 8, 0.9)';
        } else {
            nav.style.padding = '2rem 0';
            nav.style.background = 'rgba(5, 5, 8, 0.7)';
        }
    });

    // 7. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

});
