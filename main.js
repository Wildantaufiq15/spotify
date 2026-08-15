/**
 * Willy & Marry - Wedding Website JavaScript
 * Handles: Countdown Timer, Scroll Animations, RSVP Modal,
 *          Lightbox Gallery, Bottom Nav Progress, Button Interactions
 */

// ============================================
// 0. LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    if (!loadingScreen) return;

    const duration = 5000; // 5 seconds
    const startTime = Date.now();
    const messages = ['Loading...', 'Preparing your invitation...', 'Almost ready...', 'Welcome!'];

    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        const remaining = Math.max(duration - elapsed, 0);

        if (loadingBar) loadingBar.style.width = progress + '%';

        // Update text based on progress
        const msgIndex = Math.floor(progress / 25);
        if (loadingText) loadingText.textContent = messages[Math.min(msgIndex, messages.length - 1)];

        if (elapsed < duration) {
            requestAnimationFrame(updateProgress);
        } else {
            // Done loading
            if (loadingText) loadingText.textContent = 'Welcome!';
            setTimeout(function() {
                loadingScreen.classList.add('fade-out');
                // Ensure loading screen is gone before showing preopening
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                    // Show preopening screen
                    const preopening = document.getElementById('preopening-screen');
                    if (preopening) {
                        preopening.classList.remove('hidden');
                        preopening.style.display = 'flex';
                    }
                    // Auto-click open if guest name in URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const guestName = urlParams.get('to');
                    if (guestName) {
                        setTimeout(function() {
                            const openBtn = document.getElementById('open-invitation');
                            if (openBtn) openBtn.click();
                        }, 300);
                    }
                }, 600);
            }, 200);
        }
    }

    requestAnimationFrame(updateProgress);
}

// ============================================
// 1. PRE-OPENING SPLASH SCREEN
// ============================================
function initPreopeningScreen() {
    const openBtn = document.getElementById('open-invitation');
    if (!openBtn) return;

    openBtn.addEventListener('click', function () {
        var preopening = document.getElementById('preopening-screen');
        var mainContent = document.querySelector('main');

        if (preopening) {
            preopening.classList.add('closing');
        }

        // Play music when invitation is opened
        playMusic();

        // Show main content as splash fades out
        if (mainContent) {
            mainContent.classList.remove('hidden-during-splash');
            mainContent.classList.add('visible-after-splash');
        }

        // Remove splash after animation
        setTimeout(function () {
            if (preopening) {
                preopening.classList.add('hidden');
            }
        }, 800);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 0. LOADING SCREEN
    // ============================================
    initLoadingScreen();

    // ============================================
    // 1. PRE-OPENING SCREEN
    // ============================================
    initPreopeningScreen();

    // ============================================
    // 2. COUNTDOWN TIMER
    // ============================================
    initCountdown();

    // ============================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ============================================
    initScrollReveal();

    // ============================================
    // 3. RSVP MODAL
    // ============================================
    initRSVPCallback();

    // ============================================
    // 3b. GUEST MESSAGE FORM
    // ============================================
    initGuestMessage();

    // ============================================
    // 4. LIGHTBOX GALLERY
    // ============================================
    initLightbox();

    // ============================================
    // 4b. VIDEO LIGHTBOX
    // ============================================
    initVideoLightbox();

    // ============================================
    // 5. BOTTOM NAV PROGRESS
    // ============================================
    initBottomNavProgress();

    // ============================================
    // 6. FOLLOW BUTTONS
    // ============================================
    initFollowButtons();

    // ============================================
    // 7. LOCATION BUTTONS
    // ============================================
    initLocationButtons();

    // ============================================
    // 8. SPLASH PLAYER INTERACTION
    // ============================================
    initSplashPlayer();

    // ============================================
    // 9. VOLUME TOGGLE BUTTON
    // ============================================
    initVolumeToggle();

    // ============================================
    // 10. MUSIC PLAYER
    // ============================================
    initMusicPlayer();

});


// ============================================
// 1. COUNTDOWN TIMER
// ============================================
function initCountdown() {
    // Set target date: Saturday, 20 June 2026
    const targetDate = new Date('2026-06-20T08:00:00').getTime();

    // Get all countdown boxes
    const daysBox = document.querySelector('#countdown .grid > div:nth-child(1)');
    const hrsBox = document.querySelector('#countdown .grid > div:nth-child(2)');
    const minsBox = document.querySelector('#countdown .grid > div:nth-child(3)');
    const secsBox = document.querySelector('#countdown .grid > div:nth-child(4)');

    const daysEl = daysBox ? daysBox.querySelector('.font-countdown-num') : null;
    const hrsEl = hrsBox ? hrsBox.querySelector('.font-countdown-num') : null;
    const minsEl = minsBox ? minsBox.querySelector('.font-countdown-num') : null;
    const secsEl = secsBox ? secsBox.querySelector('.font-countdown-num') : null;

    if (!daysEl || !hrsEl || !minsEl || !secsEl) return;

    let prevValues = { days: -1, hrs: -1, mins: -1, secs: -1 };

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.textContent = '0';
            hrsEl.textContent = '0';
            minsEl.textContent = '0';
            secsEl.textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        // Animate flip on change
        if (prevValues.secs !== secs) {
            triggerFlip(secsBox);
            prevValues.secs = secs;
        }
        if (prevValues.mins !== mins) {
            triggerFlip(minsBox);
            prevValues.mins = mins;
        }
        if (prevValues.hrs !== hrs) {
            triggerFlip(hrsBox);
            prevValues.hrs = hrs;
        }
        if (prevValues.days !== days) {
            triggerFlip(daysBox);
            prevValues.days = days;
        }

        daysEl.textContent = days;
        hrsEl.textContent = String(hrs).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function triggerFlip(box) {
    if (!box) return;
    box.classList.add('flip');
    setTimeout(function () {
        box.classList.remove('flip');
    }, 300);
}


// ============================================
// 2. SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    // Add reveal class to all sections and major divs
    const sections = document.querySelectorAll('section');
    const miniDividers = document.querySelectorAll('.mini-player-divider');
    const revealTargets = document.querySelectorAll('#countdown, #splash, #favourite-couple, #groom, #bride, #timeline, #rsvp, #story, #gallery, #closing');

    revealTargets.forEach(function (el) {
        el.classList.add('reveal');
    });

    miniDividers.forEach(function (el) {
        el.classList.add('reveal');
    });

    // Track items inside sections
    const storyTracks = document.querySelectorAll('#story .flex.flex-col.gap-4 > div');
    const timelineCards = document.querySelectorAll('#timeline .grid > div');
    const galleryItems = document.querySelectorAll('#gallery .grid > div');

    storyTracks.forEach(function (el, i) {
        el.classList.add('reveal', 'reveal-delay-' + ((i % 4) + 1));
    });

    timelineCards.forEach(function (el, i) {
        el.classList.add('reveal', 'reveal-delay-' + ((i % 4) + 1));
    });

    galleryItems.forEach(function (el, i) {
        el.classList.add('reveal', 'reveal-delay-' + ((i % 4) + 1));
    });

    // Intersection Observer for scroll reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
}


// ============================================
// 3. RSVP MODAL
// ============================================
function initRSVPCallback() {
    // Find RSVP buttons
    const rsvpButtons = document.querySelectorAll('button');

    rsvpButtons.forEach(function (btn) {
        if (btn.textContent.trim().includes('Konfirmasi Kehadiran')) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openRSVPCallback();
            });
        }
    });

    // Create and inject modal
    injectRSVPCallback();
}

function injectRSVPCallback() {
    const modalHTML = `
    <!-- RSVP Modal -->
    <div id="rsvp-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rsvp-modal-title">
        <div class="modal-content">
            <div class="modal-header">
                <button id="rsvp-modal-close" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.1);border:none;color:white;width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">&times;</button>
                <div style="padding-top:8px;">
                    <div style="width:48px;height:48px;background:rgba(76,244,121,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">
                        <span class="material-symbols-outlined" style="font-size:24px;color:#4cf479;">favorite</span>
                    </div>
                    <h2 id="rsvp-modal-title" style="font-size:20px;font-weight:700;color:#fff;margin:0 0 4px;">Konfirmasi Kehadiran</h2>
                    <p style="font-size:13px;color:#c7c6c6;margin:0;">Merupakan suatu kehormatan bagi kami</p>
                </div>
            </div>
            <div class="modal-body">
                <form id="rsvp-form">
                    <div style="margin-bottom:16px;">
                        <label for="rsvp-name" style="display:block;font-size:12px;font-weight:600;color:#c7c6c6;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.1em;">Nama Lengkap</label>
                        <input type="text" id="rsvp-name" name="name" placeholder="Masukkan nama Anda" required
                            style="width:100%;padding:12px 16px;background:#2a2a2a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label for="rsvp-attendance" style="display:block;font-size:12px;font-weight:600;color:#c7c6c6;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.1em;">Konfirmasi Kehadiran</label>
                        <select id="rsvp-attendance" name="attendance" required
                            style="width:100%;padding:12px 16px;background:#2a2a2a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;cursor:pointer;">
                            <option value="" disabled selected>Pilih konfirmasi</option>
                            <option value="hadir">Ya, saya akan hadir</option>
                            <option value="tidak-hadir">Maaf, saya tidak bisa hadir</option>
                        </select>
                    </div>
                    <div style="margin-bottom:16px;">
                        <label for="rsvp-guests" style="display:block;font-size:12px;font-weight:600;color:#c7c6c6;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.1em;">Jumlah Tamu (Opsional)</label>
                        <select id="rsvp-guests" name="guests"
                            style="width:100%;padding:12px 16px;background:#2a2a2a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;cursor:pointer;">
                            <option value="1" selected>1 Orang</option>
                            <option value="2">2 Orang</option>
                            <option value="3">3 Orang</option>
                            <option value="4">4 Orang</option>
                        </select>
                    </div>
                    <div style="margin-bottom:20px;">
                        <label for="rsvp-message" style="display:block;font-size:12px;font-weight:600;color:#c7c6c6;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.1em;">Pesan untuk Willy &amp; Marry (Opsional)</label>
                        <textarea id="rsvp-message" name="message" rows="3" placeholder="Tulis ucapan atau doa terbaik Anda..."
                            style="width:100%;padding:12px 16px;background:#2a2a2a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:14px;outline:none;resize:none;box-sizing:border-box;font-family:inherit;"></textarea>
                    </div>
                    <button type="submit" id="rsvp-submit"
                        style="width:100%;padding:14px;background:#4cf479;color:#003913;font-weight:700;font-size:16px;border:none;border-radius:9999px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s;">
                        <span class="material-symbols-outlined" style="font-size:20px;">check_circle</span>
                        Kirim Konfirmasi
                    </button>
                </form>
                <div id="rsvp-success" style="display:none;text-align:center;padding:24px 0;">
                    <div style="width:64px;height:64px;background:rgba(76,244,121,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <span class="material-symbols-outlined" style="font-size:32px;color:#4cf479;">check_circle</span>
                    </div>
                    <h3 style="font-size:18px;font-weight:700;color:#fff;margin:0 0 8px;">Terima Kasih!</h3>
                    <p style="font-size:14px;color:#c7c6c6;margin:0;">Konfirmasi Anda telah tercatat. Sampai jumpa di hari bahagia!</p>
                </div>
            </div>
        </div>
    </div>
    `;

    // Insert modal before body end or at end of body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.getElementById('rsvp-modal-close');
    const form = document.getElementById('rsvp-form');
    const successMsg = document.getElementById('rsvp-success');

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeRSVPCallback);
    }

    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeRSVPCallback();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeRSVPCallback();
        }
    });

    // Form submit
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitRSVPCallback();
        });
    }
}

function openRSVPCallback() {
    const modal = document.getElementById('rsvp-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reset form state
        const form = document.getElementById('rsvp-form');
        const successMsg = document.getElementById('rsvp-success');
        if (form) form.style.display = 'block';
        if (successMsg) successMsg.style.display = 'none';
        // Focus first input
        setTimeout(function () {
            const nameInput = document.getElementById('rsvp-name');
            if (nameInput) nameInput.focus();
        }, 300);
    }
}

function closeRSVPCallback() {
    const modal = document.getElementById('rsvp-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function submitRSVPCallback() {
    const name = document.getElementById('rsvp-name').value.trim();
    const attendance = document.getElementById('rsvp-attendance').value;
    const guests = document.getElementById('rsvp-guests').value;
    const message = document.getElementById('rsvp-message').value.trim();

    if (!name || !attendance) {
        alert('Mohon isi nama dan konfirmasi kehadiran.');
        return;
    }

    // Log data (can be sent to server)
    const rsvpData = {
        name: name,
        attendance: attendance,
        guests: guests,
        message: message,
        timestamp: new Date().toISOString()
    };

    console.log('RSVP Submitted:', rsvpData);

    // Show success message
    const form = document.getElementById('rsvp-form');
    const successMsg = document.getElementById('rsvp-success');
    const submitBtn = document.getElementById('rsvp-submit');

    if (form) form.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';

    // Close after delay
    setTimeout(function () {
        closeRSVPCallback();
    }, 3000);
}

// ============================================
// 3b. GUEST MESSAGE FORM
// ============================================
function initGuestMessage() {
    const form = document.getElementById('guest-message-form');
    const messagesList = document.getElementById('messages-list');
    if (!form || !messagesList) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('msg-name');
        const textInput = document.getElementById('msg-text');
        if (!nameInput || !textInput) return;

        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        if (!name || !text) return;

        addGuestMessage(name, text);

        // Reset form
        nameInput.value = '';
        textInput.value = '';
    });
}

function addGuestMessage(name, text) {
    const messagesList = document.getElementById('messages-list');
    if (!messagesList) return;

    // Generate initials (max 2 chars)
    var initials = name.split(' ')
        .map(function(w) { return w.charAt(0).toUpperCase(); })
        .slice(0, 2)
        .join('');

    // Random "ago" text for realistic feel
    var agoOptions = ['Baru saja', '1 menit yang lalu', '5 menit yang lalu'];
    var ago = agoOptions[Math.floor(Math.random() * agoOptions.length)];

    var messageHTML = '\
        <div class="glass-panel rounded-[20px] p-4 text-left" style="animation: messageSlideIn 0.4s ease;">\
            <div class="flex items-center gap-3 mb-2">\
                <div class="w-10 h-10 rounded-full bg-[#3d3d3d] flex items-center justify-center overflow-hidden flex-shrink-0">\
                    <span class="font-bold text-[13px] text-white/80 select-none">' + initials + '</span>\
                </div>\
                <div>\
                    <p class="text-white font-bold text-sm">' + name + '</p>\
                    <p class="text-secondary text-xs">' + ago + '</p>\
                </div>\
            </div>\
            <p class="text-secondary text-sm leading-relaxed">' + text + '</p>\
        </div>\
    ';

    messagesList.insertAdjacentHTML('afterbegin', messageHTML);
}
function initLightbox() {
    const galleryImages = document.querySelectorAll('#gallery .grid img');
    if (galleryImages.length === 0) return;

    // Create lightbox
    const lightboxHTML = `
    <div id="lightbox" class="lightbox-overlay" role="dialog" aria-modal="true">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-nav prev" aria-label="Previous">&#8249;</button>
        <button class="lightbox-nav next" aria-label="Next">&#8250;</button>
        <img id="lightbox-img" class="lightbox-image" src="" alt="">
        <div class="lightbox-counter"><span id="lightbox-current">1</span> / <span id="lightbox-total">${galleryImages.length}</span></div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.lightbox-nav.prev') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.lightbox-nav.next') : null;
    const currentEl = document.getElementById('lightbox-current');

    let currentIndex = 0;
    const images = [];

    galleryImages.forEach(function (img, index) {
        images.push(img.src);
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        if (lightboxImg) lightboxImg.src = images[currentIndex];
        if (currentEl) currentEl.textContent = currentIndex + 1;
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    function updateLightbox() {
        if (lightboxImg) lightboxImg.src = images[currentIndex];
        if (currentEl) currentEl.textContent = currentIndex + 1;
    }

    // Event listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}


// ============================================
// 4. VIDEO LIGHTBOX (YouTube)
// ============================================
function initVideoLightbox() {
    const videoThumb = document.getElementById('video-thumbnail');
    const lightbox = document.getElementById('video-lightbox');
    const iframe = document.getElementById('video-lightbox-iframe');
    const closeBtn = document.getElementById('video-lightbox-close');

    if (!videoThumb || !lightbox || !iframe) return;

    function openVideo() {
        iframe.src = 'https://www.youtube.com/embed/eUrrNBn2agM?autoplay=1&rel=0';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideo() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Stop video by removing src
        setTimeout(function() {
            iframe.src = '';
        }, 300);
    }

    videoThumb.addEventListener('click', openVideo);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideo);
    }

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeVideo();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeVideo();
        }
    });
}


// ============================================
// 5. BOTTOM NAV PROGRESS
// ============================================
function initBottomNavProgress() {
    const bottomNav = document.querySelector('.fixed.bottom-4');
    if (!bottomNav) return;

    // Find progress bar inside bottom nav
    const progressContainer = bottomNav.querySelector('.h-\\[2px\\]');
    if (!progressContainer) return;

    let progressFill = progressContainer.querySelector('.bottom-nav-progress-fill');

    // Create progress fill if not exists
    if (!progressFill) {
        progressFill = document.createElement('div');
        progressFill.className = 'bottom-nav-progress-fill';
        progressFill.style.width = '0%';
        progressContainer.appendChild(progressFill);
    }

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        progressFill.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}


// ============================================
// 6. FOLLOW BUTTONS
// ============================================
function initFollowButtons() {
    const followBtns = document.querySelectorAll('#groom button, #bride button');

    followBtns.forEach(function (btn) {
        if (btn.textContent.trim().toLowerCase() === 'follow') {
            btn.addEventListener('click', function () {
                if (btn.textContent.trim().toLowerCase() === 'follow') {
                    btn.textContent = 'Following';
                    btn.style.background = '#4cf479';
                    btn.style.color = '#003913';
                    btn.style.borderColor = '#4cf479';
                } else {
                    btn.textContent = 'Follow';
                    btn.style.background = 'rgba(255,255,255,0.1)';
                    btn.style.color = 'white';
                    btn.style.borderColor = 'rgba(255,255,255,0.2)';
                }
            });
        }
    });
}


// ============================================
// 7. LOCATION BUTTONS
// ============================================
function initLocationButtons() {
    const locationBtns = document.querySelectorAll('#timeline button');

    locationBtns.forEach(function (btn) {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon && icon.textContent.trim() === 'map') {
            btn.addEventListener('click', function () {
                // Get the address from the sibling p element
                const parent = btn.closest('.absolute.inset-0.p-5');
                if (!parent) return;

                const addressEl = parent.querySelector('.line-clamp-2');
                if (!addressEl) return;

                const address = addressEl.textContent.trim();
                const encodedAddress = encodeURIComponent(address);
                // Open Google Maps search in new tab
                window.open('https://www.google.com/maps/search/?api=1&query=' + encodedAddress, '_blank');
            });
        }
    });
}


// ============================================
// 8. SPLASH PLAYER INTERACTION
// ============================================
function initSplashPlayer() {
    const splashSection = document.getElementById('splash');
    if (!splashSection) return;

    // Play/pause button
    const playBtn = splashSection.querySelector('.w-16.h-16');
    if (playBtn) {
        let isPlaying = false;
        playBtn.style.cursor = 'pointer';
        playBtn.addEventListener('click', function () {
            isPlaying = !isPlaying;
            const icon = playBtn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isPlaying ? 'pause' : 'play_arrow';
            }
        });
    }
}


// ============================================
// 9. VOLUME TOGGLE BUTTON
// ============================================
function initVolumeToggle() {
    const volumeBtn = document.querySelector('#gallery .absolute.top-0');
    if (volumeBtn) {
        volumeBtn.addEventListener('click', function () {
            const icon = volumeBtn.querySelector('.material-symbols-outlined');
            if (icon) {
                if (icon.textContent.trim() === 'volume_up') {
                    icon.textContent = 'volume_off';
                } else {
                    icon.textContent = 'volume_up';
                }
            }
        });
    }
}


// ============================================
// 10. MUSIC PLAYER
// ============================================
function playMusic() {
    var audio = document.getElementById('bg-music');
    if (audio) {
        audio.play().catch(function () {
            console.log('Autoplay blocked, user interaction required');
        });
    }
}

function initMusicPlayer() {
    var audio = document.getElementById('bg-music');
    var playPauseBtn = document.getElementById('btn-playpause');
    var iconPlaypause = document.getElementById('icon-playpause');
    var progressBar = document.getElementById('music-progress');
    var progressFill = document.getElementById('music-progress-fill');
    var splashPlayBtn = document.querySelector('#splash .w-16.h-16');

    if (!audio) return;

    audio.addEventListener('timeupdate', function () {
        updateProgress();
    });

    audio.addEventListener('ended', function () {
        audio.currentTime = 0;
        audio.play();
    });

    function updateProgress() {
        if (audio.duration) {
            var percent = (audio.currentTime / audio.duration) * 100;
            if (progressFill) {
                progressFill.style.width = percent + '%';
            }
        }
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function (e) {
            e.preventDefault();
            togglePlayPause();
        });
    }

    if (splashPlayBtn) {
        splashPlayBtn.style.cursor = 'pointer';
        splashPlayBtn.addEventListener('click', function () {
            togglePlayPause();
        });
    }

    if (progressBar) {
        progressBar.addEventListener('click', function (e) {
            var rect = progressBar.getBoundingClientRect();
            var percent = (e.clientX - rect.left) / rect.width;
            if (audio.duration) {
                audio.currentTime = percent * audio.duration;
            }
        });
    }

    audio.addEventListener('play', function () {
        if (iconPlaypause) {
            iconPlaypause.textContent = 'pause';
        }
        var splashIcon = splashPlayBtn ? splashPlayBtn.querySelector('.material-symbols-outlined') : null;
        if (splashIcon) {
            splashIcon.textContent = 'pause';
        }
    });

    audio.addEventListener('pause', function () {
        if (iconPlaypause) {
            iconPlaypause.textContent = 'play_arrow';
        }
        var splashIcon = splashPlayBtn ? splashPlayBtn.querySelector('.material-symbols-outlined') : null;
        if (splashIcon) {
            splashIcon.textContent = 'play_arrow';
        }
    });
}
