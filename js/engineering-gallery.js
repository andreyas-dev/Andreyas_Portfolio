// js/engineering-gallery.js
// -----------------------------------------------------------------------
// Engineering Gallery — a modular, reusable, horizontally-scrolling image
// showcase for the project detail page. This is an ADDITIVE component:
// it does not alter any existing markup, styles, or data structures.
//
// Data source: proj.media.gallery (see js/portfolioData.js). Each project
// can define its own array of { src, title, caption } objects. To add,
// remove, or reorder images, simply edit that array — nothing here needs
// to change.
//
// Usage (already wired up in js/project-detail.js):
//   window.EngineeringGallery.render(proj)   -> returns an HTML string
//   window.EngineeringGallery.init()         -> attaches all interactivity
// -----------------------------------------------------------------------

(function () {
    'use strict';

    /**
     * Escapes text that gets injected into HTML attributes/content.
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /**
     * Builds the Engineering Gallery section markup for a given project.
     * Returns an empty string if the project has no gallery images, so the
     * section simply doesn't render (no empty gaps left behind).
     */
    function render(proj) {
        const items = (proj && proj.media && Array.isArray(proj.media.gallery))
            ? proj.media.gallery.filter(item => item && item.src)
            : [];

        if (!items.length) return '';

        const cardsHtml = items.map((item, idx) => `
            <figure class="gallery-card" data-gallery-index="${idx}" tabindex="0" role="button" aria-label="Open ${escapeHtml(item.title || 'image')} in fullscreen preview">
                <div class="gallery-card-img-wrap">
                    <img
                        class="gallery-card-img"
                        src="${escapeHtml(item.src)}"
                        alt="${escapeHtml(item.title || 'Engineering gallery image')}"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                    >
                    <div class="gallery-card-zoom-hint"><i data-lucide="expand"></i></div>
                </div>
                <figcaption class="gallery-card-info">
                    <h4 class="gallery-card-title">${escapeHtml(item.title || '')}</h4>
                    ${item.caption ? `<p class="gallery-card-caption">${escapeHtml(item.caption)}</p>` : ''}
                </figcaption>
            </figure>
        `).join('');

        return `
            <div class="engineering-gallery-section reveal">
                <div class="gallery-section-heading">
                    <h3 class="gallery-section-title"><i data-lucide="images"></i> Engineering Gallery</h3>
                    <p class="gallery-section-subtitle">Explore the development journey through design, implementation, testing, and the final prototype.</p>
                </div>

                <div class="gallery-scroller" id="engineering-gallery-scroller">
                    <button type="button" class="gallery-nav-btn gallery-nav-prev" aria-label="Scroll gallery left">
                        <i data-lucide="chevron-left"></i>
                    </button>

                    <div class="gallery-track" id="engineering-gallery-track">
                        ${cardsHtml}
                    </div>

                    <button type="button" class="gallery-nav-btn gallery-nav-next" aria-label="Scroll gallery right">
                        <i data-lucide="chevron-right"></i>
                    </button>
                </div>
            </div>

            <div class="gallery-lightbox" id="engineering-gallery-lightbox" aria-hidden="true" role="dialog" aria-modal="true">
                <div class="gallery-lightbox-backdrop" id="engineering-gallery-lightbox-backdrop"></div>
                <button type="button" class="gallery-lightbox-close" id="engineering-gallery-lightbox-close" aria-label="Close preview">
                    <i data-lucide="x"></i>
                </button>
                <button type="button" class="gallery-lightbox-arrow gallery-lightbox-prev" id="engineering-gallery-lightbox-prev" aria-label="Previous image">
                    <i data-lucide="chevron-left"></i>
                </button>
                <figure class="gallery-lightbox-content">
                    <img class="gallery-lightbox-img" id="engineering-gallery-lightbox-img" src="" alt="">
                    <figcaption class="gallery-lightbox-caption">
                        <h4 id="engineering-gallery-lightbox-title"></h4>
                        <p id="engineering-gallery-lightbox-desc"></p>
                    </figcaption>
                </figure>
                <button type="button" class="gallery-lightbox-arrow gallery-lightbox-next" id="engineering-gallery-lightbox-next" aria-label="Next image">
                    <i data-lucide="chevron-right"></i>
                </button>
            </div>
        `;
    }

    /**
     * Wires up all interactivity for a gallery that has just been injected
     * into the DOM: drag-to-scroll, wheel-to-scroll, arrow buttons,
     * and the fullscreen lightbox (with keyboard + click-outside support).
     * Safe to call even if no gallery is present on the page (all lookups
     * are null-checked).
     */
    function init() {
        const scroller = document.getElementById('engineering-gallery-scroller');
        const track = document.getElementById('engineering-gallery-track');
        if (!scroller || !track) return; // No gallery on this page/project

        const prevBtn = scroller.querySelector('.gallery-nav-prev');
        const nextBtn = scroller.querySelector('.gallery-nav-next');
        const cards = Array.from(track.querySelectorAll('.gallery-card'));

        // ---- Arrow navigation ------------------------------------------------
        function scrollByCard(direction) {
            const card = cards[0];
            const step = card ? card.getBoundingClientRect().width + 24 : 320;
            track.scrollBy({ left: direction * step, behavior: 'smooth' });
        }
        if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

        // ---- Mouse wheel -> horizontal scroll ---------------------------------
        track.addEventListener('wheel', (e) => {
            // Only hijack when the scroll is predominantly vertical (normal wheel)
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                track.scrollLeft += e.deltaY;
            }
        }, { passive: false });

        // ---- Mouse drag scrolling (desktop) ------------------------------------
        let isDown = false;
        let startX = 0;
        let scrollStart = 0;
        let dragMoved = false;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            dragMoved = false;
            track.classList.add('is-dragging');
            startX = e.pageX;
            scrollStart = track.scrollLeft;
            if (typeof pauseAutoScroll === 'function') pauseAutoScroll();
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('is-dragging');
            if (typeof resumeAutoScrollSoon === 'function') resumeAutoScrollSoon();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const delta = e.pageX - startX;
            if (Math.abs(delta) > 5) dragMoved = true;
            track.scrollLeft = scrollStart - delta;
        });

        // Touch swipe is native to the browser via CSS `overflow-x: auto` +
        // `scroll-snap`, so no custom JS is required for mobile.

        // ---- Auto-scroll ticker -------------------------------------------------
        // Slides continuously to the right; pauses on hover/drag/touch/focus and
        // resumes shortly after the user stops interacting. Loops back to the
        // start once it reaches the end (not a duplicated infinite strip).
        
        const AUTO_SCROLL_SPEED = 0.8; // pixels per animation frame (~19px/sec) — slower, smoother
        const RESUME_DELAY = 1000; // ms of inactivity before autoplay resumes — shorter pause after a click
        let autoScrollRAF = null;
        let autoScrollPaused = false;
        let resumeTimer = null;
        let scrollPos = track.scrollLeft; // our own tracked position, independent of DOM rounding

        function stepAutoScroll() {
            if (!autoScrollPaused) {
                const maxScroll = track.scrollWidth - track.clientWidth;

            if (maxScroll > 0) {
                scrollPos += AUTO_SCROLL_SPEED;

            if (scrollPos >= maxScroll) {
                scrollPos = 0;
            }

            track.scrollLeft = scrollPos;
        }
    }

    autoScrollRAF = requestAnimationFrame(stepAutoScroll);
}



        function pauseAutoScroll() {
            autoScrollPaused = true;
            track.classList.add('autoplay-paused');
            clearTimeout(resumeTimer);
        }

        function resumeAutoScrollSoon() {
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => {
            scrollPos = track.scrollLeft; // sync to wherever the user manually left it
            autoScrollPaused = false;
            track.classList.remove('autoplay-paused');
        }, RESUME_DELAY);
}

        // Pause while the user is actively engaging with the gallery
        scroller.addEventListener('mouseenter', pauseAutoScroll);
        scroller.addEventListener('mouseleave', resumeAutoScrollSoon);
        scroller.addEventListener('touchstart', pauseAutoScroll, { passive: true });
        scroller.addEventListener('touchend', resumeAutoScrollSoon, { passive: true });
        scroller.addEventListener('focusin', pauseAutoScroll);
        scroller.addEventListener('focusout', resumeAutoScrollSoon);
        track.addEventListener('wheel', pauseAutoScroll, { passive: true });
        track.addEventListener('wheel', resumeAutoScrollSoon, { passive: true });

        // Kick off the ticker
        autoScrollRAF = requestAnimationFrame(stepAutoScroll);

        // ---- Lightbox -----------------------------------------------------------
        const lightbox = document.getElementById('engineering-gallery-lightbox');
        const lightboxImg = document.getElementById('engineering-gallery-lightbox-img');
        const lightboxTitle = document.getElementById('engineering-gallery-lightbox-title');
        const lightboxDesc = document.getElementById('engineering-gallery-lightbox-desc');
        const lightboxClose = document.getElementById('engineering-gallery-lightbox-close');
        const lightboxBackdrop = document.getElementById('engineering-gallery-lightbox-backdrop');
        const lightboxPrev = document.getElementById('engineering-gallery-lightbox-prev');
        const lightboxNext = document.getElementById('engineering-gallery-lightbox-next');

        let currentIndex = 0;

        function openLightbox(index) {
            if (!cards[index]) return;
            currentIndex = index;
            const img = cards[index].querySelector('.gallery-card-img');
            const title = cards[index].querySelector('.gallery-card-title');
            const caption = cards[index].querySelector('.gallery-card-caption');

            lightboxImg.src = img ? img.src : '';
            lightboxImg.alt = img ? img.alt : '';
            lightboxTitle.textContent = title ? title.textContent : '';
            lightboxDesc.textContent = caption ? caption.textContent : '';

            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('gallery-lightbox-open');
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('gallery-lightbox-open');
        }

        function showNext(direction) {
            const total = cards.length;
            currentIndex = (currentIndex + direction + total) % total;
            openLightbox(currentIndex);
        }

        cards.forEach((card, idx) => {
            card.addEventListener('click', () => {
                // Ignore the click that ends a drag gesture
                if (dragMoved) { dragMoved = false; return; }
                openLightbox(idx);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                }
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', () => showNext(-1));
        if (lightboxNext) lightboxNext.addEventListener('click', () => showNext(1));

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showNext(-1);
            if (e.key === 'ArrowRight') showNext(1);
        });

        // Re-run icon replacement for the newly injected lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    window.EngineeringGallery = { render, init };
})();