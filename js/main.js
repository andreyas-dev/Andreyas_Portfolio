// main.js - Core functionality

document.addEventListener('DOMContentLoaded', () => {
    // 0. Render central portfolio data directly to components
    if (typeof renderPortfolioData === 'function') {
        renderPortfolioData();
    }

    // 1. Interactive Engineering Preloader
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderPercent = document.getElementById('preloader-percent');
    const preloaderStatusText = document.getElementById('preloader-status-text');

    if (preloader) {
        let progress = 0;
        const statusSteps = [
            { threshold: 0, text: "INITIALIZING SYSTEM ARCHITECTURE..." },
            { threshold: 25, text: "CALIBRATING MECHATRONICS ENGINE..." },
            { threshold: 55, text: "LOADING CONTROL & ROS2 STACKS..." },
            { threshold: 85, text: "FINALIZING HIGH-TECH PORTFOLIO..." },
            { threshold: 100, text: "SYSTEM OPERATIONAL" }
        ];

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 16) + 12;
            if (progress > 100) progress = 100;

            if (preloaderBar) preloaderBar.style.width = progress + '%';
            if (preloaderPercent) preloaderPercent.textContent = progress + '%';

            if (preloaderStatusText) {
                const currentStatus = statusSteps.filter(step => progress >= step.threshold).pop();
                if (currentStatus) {
                    preloaderStatusText.textContent = currentStatus.text;
                }
            }

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.style.display = 'none', 300);
                }, 80);
            }
        }, 20);
    }

    // 2. Render Projects (From projects.js)
    if (typeof renderProjects === 'function') {
        renderProjects();
    }

    // 2.2 Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // 2.5 Carousel Logic
    const track = document.getElementById('projects-track');
    if (track) {
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: 370, behavior: 'smooth' });
            });
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -370, behavior: 'smooth' });
            });
        }
        
        // Drag to scroll
        let isDown = false;
        let startX;
        let scrollLeft;
        
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });
        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2.5; // Fast scroll
            track.scrollLeft = scrollLeft - walk;
        });
    }

    // 3. Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 4. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches && cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            // Slight delay on follower for smooth trailing effect
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            
            // Smooth follower animation via requestAnimationFrame for performance
            requestAnimationFrame(() => {
                cursorFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            });
        });

        // Hover effects on links/buttons
        const interactables = document.querySelectorAll('a, button, input, textarea');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
                cursorFollower.style.background = 'rgba(0, 243, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
                cursorFollower.style.background = 'transparent';
            });
        });
    }

    // 5. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollBar = document.getElementById('scroll-bar');
        if (scrollBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollBar.style.width = scrolled + '%';
        }
    });

    // 6. Scroll Reveal Animation using Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            // Stop observing once revealed
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 7. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                
                const updateCount = () => {
                    const inc = target / 20; // Speed adjustment
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 16);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 8. Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Limit the movement
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });
        
        btn.addEventListener('mouseleave', (e) => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 9. 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Max rotation in degrees
                const maxRotate = 8;
                
                const rotateX = ((y - centerY) / centerY) * -maxRotate;
                const rotateY = ((x - centerX) / centerX) * maxRotate;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

// 9.5. Contact Form Transmission Handler with Validation
    // 9.5. Contact Form Transmission Handler with Validation
const contactForm = document.getElementById('contact-form');

// 1. Guard check: ensures the event listener is attached EXACTLY ONCE
if (contactForm && !contactForm.dataset.initialized) {
    contactForm.dataset.initialized = "true";

    contactForm.addEventListener('submit', function (e) {
        // Stop default form submission completely
        e.preventDefault();
        e.stopImmediatePropagation(); 

        // 2. Prevent rapid double clicks / concurrent requests
        if (contactForm.dataset.submitting === "true") {
            return;
        }

        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const titleInput = contactForm.querySelector('input[name="title"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusMsg = document.getElementById('form-status');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            if (statusMsg) {
                statusMsg.className = 'form-status-msg error';
                statusMsg.textContent = '⚡ VALIDATION ERROR // Please complete all fields before sending transmission.';
                statusMsg.style.display = 'block';
            }
            return;
        }

        if (!emailRegex.test(emailInput.value.trim())) {
            if (statusMsg) {
                statusMsg.className = 'form-status-msg error';
                statusMsg.textContent = '⚡ INVALID EMAIL // Please provide a valid email format (e.g. name@domain.com).';
                statusMsg.style.display = 'block';
            }
            return;
        }

        // Set state to SUBMITTING to lock the form down
        contactForm.dataset.submitting = "true";
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING...';

        if (statusMsg) {
            statusMsg.style.display = 'none';
        }

        const templateParams = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            title: titleInput ? titleInput.value.trim() : 'Portfolio Inquiry',
            message: messageInput.value.trim()
        };

        // Execute EmailJS send
        emailjs.send('service_3r69xg6', 'template_bcurnwe', templateParams)
            .then(() => {
                if (statusMsg) {
                    statusMsg.className = 'form-status-msg success';
                    statusMsg.innerHTML = '✓ TRANSMISSION SUCCESSFUL // Thank you! Your message has been received.';
                    statusMsg.style.display = 'block';
                }

                contactForm.reset();

                setTimeout(() => {
                    if (statusMsg) statusMsg.style.display = 'none';
                }, 6000);
            })
            .catch((error) => {
                console.error('EmailJS Error Details:', error);
                if (statusMsg) {
                    statusMsg.className = 'form-status-msg error';
                    statusMsg.textContent = '⚡ TRANSMISSION FAILED // Unable to reach server. Try again.';
                    statusMsg.style.display = 'block';
                }
            })
            .finally(() => {
                contactForm.dataset.submitting = "false";
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText; // <-- ADD THIS LINE
            });
    });
}
    // 11. Background Canvas Animation (Advanced Mechatronics & Control Engineering Theme)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, nodes, pulses, scanLineY = 0;
        let mouse = { x: -1000, y: -1000, active: false };

        function updatePointer(x, y) {
            mouse.x = x;
            mouse.y = y;
            mouse.active = true;
        }

        window.addEventListener('mousemove', (e) => {
            updatePointer(e.clientX, e.clientY);
        });

        window.addEventListener('mouseleave', () => {
            mouse.active = false;
        });

        // Touch support for mobile and tablet screens
        window.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                updatePointer(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length > 0) {
                updatePointer(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            mouse.active = false;
        }, { passive: true });

        window.addEventListener('touchcancel', () => {
            mouse.active = false;
        }, { passive: true });

        function getDist(n1, n2) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function createPulse() {
            if (!nodes || nodes.length < 2) return;
            const fromIdx = Math.floor(Math.random() * nodes.length);
            let toIdx = Math.floor(Math.random() * nodes.length);
            let attempts = 0;
            const maxConnectDist = width < 768 ? 110 : 150;
            while (toIdx === fromIdx || (getDist(nodes[fromIdx], nodes[toIdx]) > maxConnectDist && attempts < 10)) {
                toIdx = Math.floor(Math.random() * nodes.length);
                attempts++;
            }
            if (getDist(nodes[fromIdx], nodes[toIdx]) <= maxConnectDist) {
                pulses.push({
                    from: nodes[fromIdx],
                    to: nodes[toIdx],
                    progress: 0,
                    speed: 0.018 + Math.random() * 0.022
                });
            }
        }

        function initCanvas() {
            width = canvas.width = window.innerWidth || document.documentElement.clientWidth;
            height = canvas.height = window.innerHeight || document.documentElement.clientHeight;
            nodes = [];
            pulses = [];

            const isSmallDevice = width < 768;
            const density = isSmallDevice 
                ? Math.min(Math.floor((width * height) / 20000), 50)
                : Math.min(Math.floor((width * height) / 16000), 110);
            
            for (let i = 0; i < density; i++) {
                const rand = Math.random();
                const type = rand < 0.15 ? 'sensor' : (rand < 0.3 ? 'cross' : 'dot');
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.65,
                    vy: (Math.random() - 0.5) * 0.65,
                    radius: type === 'sensor' ? 2.5 : 1.2,
                    type: type,
                    pulseVal: Math.random() * Math.PI * 2
                });
            }

            const initialPulses = isSmallDevice ? 6 : 12;
            for (let i = 0; i < initialPulses; i++) {
                createPulse();
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // 1. Engineering Radar / Scan Beam Sweep
            scanLineY += 1.8;
            if (scanLineY > height) scanLineY = 0;

            const scanGrad = ctx.createLinearGradient(0, scanLineY - 20, 0, scanLineY + 20);
            scanGrad.addColorStop(0, 'rgba(0, 243, 255, 0)');
            scanGrad.addColorStop(0.5, 'rgba(0, 243, 255, 0.07)');
            scanGrad.addColorStop(1, 'rgba(0, 243, 255, 0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanLineY - 20, width, 40);

            // 2. Mouse Proximity HUD Sensor Reticle
            if (mouse.active) {
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 55, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0, 243, 255, 0.09)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.moveTo(mouse.x - 7, mouse.y);
                ctx.lineTo(mouse.x + 7, mouse.y);
                ctx.moveTo(mouse.x, mouse.y - 7);
                ctx.lineTo(mouse.x, mouse.y + 7);
                ctx.strokeStyle = 'rgba(0, 243, 255, 0.28)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // 3. Render Nodes & Circuit Connections
            for (let i = 0; i < nodes.length; i++) {
                let p = nodes[i];

                p.x += p.vx;
                p.y += p.vy;
                p.pulseVal += 0.02;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                if (mouse.active) {
                    const mdx = mouse.x - p.x;
                    const mdy = mouse.y - p.y;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < 110 && mdist > 5) {
                        const force = (110 - mdist) / 110 * 0.12;
                        p.x += (mdx / mdist) * force;
                        p.y += (mdy / mdist) * force;
                    }
                }

                const isNearScan = Math.abs(p.y - scanLineY) < 25;
                const nodeAlpha = isNearScan ? 0.9 : 0.45;

                ctx.fillStyle = `rgba(0, 243, 255, ${nodeAlpha})`;
                ctx.strokeStyle = `rgba(0, 243, 255, ${nodeAlpha * 0.85})`;

                if (p.type === 'sensor') {
                    const size = 3 + Math.sin(p.pulseVal) * 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y - size);
                    ctx.lineTo(p.x + size, p.y);
                    ctx.lineTo(p.x, p.y + size);
                    ctx.lineTo(p.x - size, p.y);
                    ctx.closePath();
                    ctx.fill();
                } else if (p.type === 'cross') {
                    const len = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x - len, p.y);
                    ctx.lineTo(p.x + len, p.y);
                    ctx.moveTo(p.x, p.y - len);
                    ctx.lineTo(p.x, p.y + len);
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                }

                for (let j = i + 1; j < nodes.length; j++) {
                    let p2 = nodes[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        let alpha = (1 - dist / 130) * 0.16;
                        if (isNearScan) alpha *= 1.8;

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // 4. Render Data Signal Pulses Travelling Across Traces
            for (let i = pulses.length - 1; i >= 0; i--) {
                const pulse = pulses[i];
                pulse.progress += pulse.speed;

                if (pulse.progress >= 1) {
                    pulses.splice(i, 1);
                    createPulse();
                    continue;
                }

                const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
                const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

                ctx.beginPath();
                ctx.arc(px, py, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 243, 255, 0.95)';
                ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
                ctx.shadowBlur = 5;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            if (pulses.length < 10) {
                createPulse();
            }

            requestAnimationFrame(animateCanvas);
        }

        initCanvas();
        animateCanvas();

        let resizeTimeout;
        const handleDeviceResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initCanvas, 150);
        };

        window.addEventListener('resize', handleDeviceResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(initCanvas, 200);
        });
    }
});

// Function to dynamically render all central portfolio data onto DOM elements
function renderPortfolioData() {
    if (!window.portfolioData) return;
    const data = window.portfolioData;
    const mediaHelper = window.PortfolioMediaHelper || {
        sanitizeLink: url => (!url || url === '#' || url.trim() === '') ? '#' : url
    };

    // 0. Section Visibility Toggles
    if (data.sectionToggles) {
        Object.entries(data.sectionToggles).forEach(([sectionId, isVisible]) => {
            const secEl = document.getElementById(sectionId);
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (secEl) {
                secEl.style.display = isVisible ? '' : 'none';
            }
            if (navLink) {
                navLink.style.display = isVisible ? '' : 'none';
            }
        });
    }

    // 1. Personal & Social Info
    const p = data.personal;

    if (p) {
        // Preloader
        const preloaderBrand = document.querySelector('.preloader-brand');
        if (preloaderBrand && p.brandName) preloaderBrand.textContent = p.brandName;
        const preloaderSubtext = document.querySelector('.preloader-subtext');
        if (preloaderSubtext && p.brandSubtext) preloaderSubtext.textContent = p.brandSubtext;
        const preloaderLogoImg = document.querySelector('.preloader-logo-img');
        if (preloaderLogoImg && p.logoImg) {
            preloaderLogoImg.src = p.logoImg;
            if (p.brandName) preloaderLogoImg.alt = `${p.brandName} Tech Logo`;
        }

        // Header / Navigation Logos & Text
        const brandLogoImgs = document.querySelectorAll('.brand-logo-img, .brand-logo-img-sm');
        brandLogoImgs.forEach(img => {
            if (p.logoImg) img.src = p.logoImg;
            if (p.brandName) img.alt = `${p.brandName} Tech Logo`;
        });
        const logoTexts = document.querySelectorAll('.logo-text');
        logoTexts.forEach(el => {
            if (p.brandName) el.textContent = p.brandName;
        });

        // Resume / CV buttons
        const resumeBtns = document.querySelectorAll('.btn-nav-resume, .btn-hero-resume');
        const sanitizedResumeUrl = mediaHelper.sanitizeLink(p.resumeUrl);
        resumeBtns.forEach(btn => {
            if (sanitizedResumeUrl && sanitizedResumeUrl !== '#') {
                btn.href = sanitizedResumeUrl;
                btn.target = "_blank";
                btn.rel = "noopener noreferrer";
            }
        });

        // Hero Section
        const glitchText = document.querySelector('.glitch-text');
        if (glitchText && p.fullName) {
            glitchText.textContent = p.fullName;
            glitchText.setAttribute('data-text', p.fullName);
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && p.title) {
            heroSubtitle.textContent = p.title;
        }

        const heroSpecialties = document.querySelector('.hero-specialties');
        if (heroSpecialties && p.specialties && p.specialties.length > 0) {
            heroSpecialties.innerHTML = p.specialties.map((item, idx) => `
                <span class="specialty-item"><i data-lucide="${item.icon}"></i> ${item.label}</span>
                ${idx < p.specialties.length - 1 ? '<span class="specialty-divider">&bull;</span>' : ''}
            `).join('');
        }

        const heroTagline = document.querySelector('.hero-tagline');
        if (heroTagline && p.tagline) {
            heroTagline.textContent = p.tagline;
        }

        // Profile Image & Location Status Badge
        const profileImg = document.querySelector('.profile-img');
        if (profileImg && p.profileImg) {
            profileImg.src = p.profileImg;
            if (p.brandName && p.title) profileImg.alt = `${p.brandName} - ${p.title}`;
        }

        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge && p.statusText && p.locationShort) {
            statusBadge.innerHTML = `
                <span class="pulse-dot"></span>
                <span class="status-text">
                    <span>${p.statusText}</span>
                    <span class="badge-dot">&bull;</span>
                    <span class="location-info"><i data-lucide="map-pin"></i> ${p.locationShort}</span>
                </span>
            `;
        }

        // Hero Social Links
        if (p.socials) {
            const githubLinks = document.querySelectorAll('a[aria-label="GitHub"]');
            githubLinks.forEach(a => { if (p.socials.github) a.href = mediaHelper.sanitizeLink(p.socials.github); });

            const linkedinLinks = document.querySelectorAll('a[aria-label="LinkedIn"]');
            linkedinLinks.forEach(a => { if (p.socials.linkedin) a.href = mediaHelper.sanitizeLink(p.socials.linkedin); });

            const whatsappLinks = document.querySelectorAll('a[aria-label="WhatsApp"]');
            whatsappLinks.forEach(a => { if (p.socials.whatsapp) a.href = mediaHelper.sanitizeLink(p.socials.whatsapp); });

            const emailLinks = document.querySelectorAll('a[aria-label="Email"], a[href^="mailto:"]');
            emailLinks.forEach(a => { if (p.socials.email) a.href = mediaHelper.sanitizeLink(p.socials.email); });
        }

        // Hero Stats Grid
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid && p.stats && p.stats.length > 0) {
            const svgIcons = {
                github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="18" height="18" fill="currentColor"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>`,
                linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>`,
                certificate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor"><path d="M256 0c-17.7 0-32 14.3-32 32V66.7C160.3 80.6 112 136.2 112 201.1c0 68.4 51.5 125 117.8 133.5l-19.3 115.8c-2.4 14.4 7.3 27.6 21.7 27.6h47.7c14.4 0 24.1-13.2 21.7-27.6l-19.3-115.8C348.5 326.1 400 269.5 400 201.1c0-68.4-48.3-120.5-112-134.4V32c0-17.7-14.3-32-32-32z"/></svg>`,
                briefcase: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor"><path d="M184 48c0-26.5 21.5-48 48-48h48c26.5 0 48 21.5 48 48v48h-144V48zM64 128C28.7 128 0 156.7 0 192v256c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H64z"/></svg>`
            };

            statsGrid.innerHTML = p.stats.map(st => `
                <a href="${mediaHelper.sanitizeLink(st.link)}" ${st.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="stat-item tilt-card magnetic">
                    <div class="stat-num-container"><h3 class="counter" data-target="${st.count}">0</h3>${st.suffix ? `<span class="text-accent">${st.suffix}</span>` : ''}</div>
                    <p>${svgIcons[st.icon] || ''} ${st.label}</p>
                </a>
            `).join('');
        }
    }

    // 2. About Section
    if (data.about) {
        const aboutText = document.querySelector('.about-text');
        if (aboutText && data.about.paragraphs) {
            aboutText.innerHTML = data.about.paragraphs.map(para => `<p>${para}</p>`).join('');
        }

        const aboutHighlights = document.querySelector('.about-highlights ul');
        if (aboutHighlights && data.about.highlights) {
            aboutHighlights.innerHTML = data.about.highlights.map(item => `
                <li><i data-lucide="${item.icon}" class="text-accent"></i> ${item.text}</li>
            `).join('');
        }
    }

    // 3. Skills Section
    if (data.skills && Array.isArray(data.skills)) {
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = data.skills.map(sk => `
                <div class="skill-category reveal tilt-card">
                    <div class="skill-header">
                        <i data-lucide="${sk.icon}"></i>
                        <h3>${sk.category}</h3>
                    </div>
                    <div class="skill-tags">
                        ${sk.tags.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    // 4. Engineering Process Section
    if (data.process && Array.isArray(data.process)) {
        const processTimeline = document.querySelector('.process-timeline');
        if (processTimeline) {
            processTimeline.innerHTML = data.process.map(pr => `
                <div class="process-step tilt-card">
                    <div class="step-icon"><i data-lucide="${pr.icon}"></i></div>
                    <h4>${pr.title}</h4>
                    <p>${pr.description}</p>
                </div>
            `).join('');
        }
    }

    // 5. Experience Section
    if (data.experience && Array.isArray(data.experience)) {
        const expTimeline = document.querySelector('#experience .timeline');
        if (expTimeline) {
            expTimeline.innerHTML = data.experience.map(exp => `
                <div class="timeline-item tilt-card">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-info">
                            <h4>${exp.title}</h4>
                            <h5>${exp.organization} <span>| ${exp.period}</span></h5>
                            <p>${exp.description}</p>
                        </div>
                        ${exp.docLink && exp.docLink !== '#' ? `<a href="${mediaHelper.sanitizeLink(exp.docLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic">${exp.docLabel || 'VIEW DOCUMENT'} <i data-lucide="external-link"></i></a>` : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    // 6. Education Section
    if (data.education && Array.isArray(data.education)) {
        const eduTimeline = document.querySelector('#education .timeline');
        if (eduTimeline) {
            eduTimeline.innerHTML = data.education.map(edu => `
                <div class="timeline-item tilt-card">
                    <div class="timeline-dot"></div>
                    <h4>${edu.degree}</h4>
                    <h5>${edu.institution} <span>| ${edu.period}</span></h5>
                    <p>${edu.description}</p>
                </div>
            `).join('');
        }
    }

    // 7. Credentials & Awards Section
    if (data.credentials) {
        const credGrid = document.querySelector('.credentials-grid');
        if (credGrid) {
            const certs = data.credentials.certifications || [];
            const awards = data.credentials.awards || [];

            credGrid.innerHTML = `
                <div class="credential-column reveal">
                    <h3 class="subsection-title"><i data-lucide="file-badge"></i> Certifications</h3>
                    ${certs.map(c => `
                        <div class="credential-card tilt-card">
                            <h4>${c.title}</h4>
                            <p>${c.description}</p>
                            ${c.link && c.link !== '#' ? `<a href="${mediaHelper.sanitizeLink(c.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic mt-2">${c.linkLabel || 'View Certificate'} <i data-lucide="external-link"></i></a>` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="credential-column reveal">
                    <h3 class="subsection-title"><i data-lucide="award"></i> Awards & Leadership</h3>
                    ${awards.map(a => `
                        <div class="credential-card tilt-card">
                            <h4>${a.title}</h4>
                            <p>${a.description}</p>
                            ${a.link && a.link !== '#' ? `<a href="${mediaHelper.sanitizeLink(a.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic mt-2">${a.linkLabel || 'View Details'} <i data-lucide="external-link"></i></a>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // 8. Research Interests Section
    if (data.research && Array.isArray(data.research)) {
        const researchGrid = document.querySelector('.research-grid');
        if (researchGrid) {
            researchGrid.innerHTML = data.research.map(r => `
                <div class="research-card reveal tilt-card">
                    <div class="research-icon"><i data-lucide="${r.icon}"></i></div>
                    <div class="research-content">
                        <h3>${r.title}</h3>
                        <p>${r.description}</p>
                        ${r.link && r.link !== '#' ? `<a href="${mediaHelper.sanitizeLink(r.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic mt-2">${r.linkLabel || 'View Details'}</a>` : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    // 9. Contact Details
    if (data.personal) {
        const contactMethods = document.querySelector('.contact-methods');
        if (contactMethods) {
            const emailHref = `mailto:${data.personal.email}`;
            const whatsappHref = mediaHelper.sanitizeLink(data.personal.whatsapp || `https://wa.me/${data.personal.phone.replace(/[^0-9]/g, '')}`);
            const mapHref = mediaHelper.sanitizeLink(data.personal.socials?.locationMap || `https://maps.google.com/?q=${encodeURIComponent(data.personal.location)}`);

            contactMethods.innerHTML = `
                <a href="${emailHref}" class="contact-method magnetic tilt-card">
                    <i data-lucide="mail"></i> ${data.personal.email}
                </a>
                <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer" class="contact-method magnetic tilt-card">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor" style="color: var(--accent-primary);"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg> ${data.personal.phone}
                </a>
                <a href="${mapHref}" target="_blank" rel="noopener noreferrer" class="contact-method magnetic tilt-card">
                    <i data-lucide="map-pin"></i> ${data.personal.location}
                </a>
            `;
        }
    }

    // 10. Footer Copyright
    const copyrightText = document.querySelector('.copyright-text');
    if (copyrightText && data.personal) {
        copyrightText.innerHTML = `&copy; <span id="year">${new Date().getFullYear()}</span> All rights reserved by ${data.personal.brandName || data.personal.fullName}`;
    }
}

