/* =====================================================
   PAGE VISIBILITY
===================================================== */

function handleVisibilityChange() {
    if (document.hidden) {
        document.body.classList.add("page-hidden");
    } else {
        document.body.classList.remove("page-hidden");
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange);
handleVisibilityChange();


/* =====================================================
   MOBILE NAVBAR
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.querySelector(".ul-navbar");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("show");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu" : "Buka menu"
        );
    });

    mobileMenu
        .querySelectorAll(".a-navbar")
        .forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("show");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Buka menu"
                );
            });
        });
}


/* =====================================================
   TYPING EFFECT
===================================================== */

const textElement = document.getElementById("text");

const texts = [
    "XII SATELIT",
    "TEKNIK JARINGAN",
    "ANAKNYA BU IKA"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!textElement) return;

    const currentText = texts[textIndex];

    if (!isDeleting) {

        textElement.textContent =
            currentText.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

        setTimeout(
            typeEffect,
            100
        );

    } else {

        textElement.textContent =
            currentText.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            textIndex++;

            if (textIndex >= texts.length) {
                textIndex = 0;
            }

            setTimeout(
                typeEffect,
                500
            );

            return;
        }

        setTimeout(
            typeEffect,
            50
        );
    }
}

if (textElement) {
    typeEffect();
}


/* =====================================================
   NAVBAR + SCROLL
   SATU SCROLL LISTENER SAJA
===================================================== */

const navLinks =
    document.querySelectorAll(".a-navbar");

const sections = [
    document.getElementById("beranda"),
    document.getElementById("tentang"),
    document.getElementById("anggota"),
    document.getElementById("jadwal"),
    document.getElementById("galeri"),
    document.getElementById("statistik"),
    document.getElementById("support")
].filter(Boolean);

const navbar =
    document.querySelector(".navbar");

let currentActiveSection = null;
let scrollTicking = false;


/* =====================================================
   ACTIVE NAVBAR
===================================================== */

function updateActiveNavbar() {

    const scrollPosition =
        window.scrollY + 250;

    let currentSection = "beranda";

    for (const section of sections) {

        if (
            scrollPosition >=
            section.offsetTop
        ) {
            currentSection = section.id;
        }
    }

    // Tidak perlu update DOM
    // kalau section masih sama
    if (
        currentSection ===
        currentActiveSection
    ) {
        return;
    }

    currentActiveSection =
        currentSection;

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") ===
            `#${currentSection}`
        );
    });
}


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

function updateNavbarScroll() {

    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );
}


/* =====================================================
   GLOBAL SCROLL
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (scrollTicking) {
            return;
        }

        scrollTicking = true;

        requestAnimationFrame(() => {

            updateActiveNavbar();
            updateNavbarScroll();

            scrollTicking = false;
        });

    },
    {
        passive: true
    }
);


/* Jalankan sekali saat halaman dibuka */

updateActiveNavbar();
updateNavbarScroll();


/* =====================================================
   SLIDER ANGGOTA
===================================================== */

const anggotaContainer =
    document.getElementById(
        "anggotaContainer"
    );

const prevBtn =
    document.getElementById(
        "prevBtn"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );


function getScrollAmount() {

    if (!anggotaContainer) {
        return 0;
    }

    const card =
        anggotaContainer.querySelector(
            ".anggota-card"
        );

    if (!card) {
        return 0;
    }

    const style =
        window.getComputedStyle(
            anggotaContainer
        );

    const gap =
        parseFloat(style.gap) || 0;

    return (
        card.getBoundingClientRect().width +
        gap
    );
}


function updateSliderButtons() {

    if (
        !anggotaContainer ||
        !prevBtn ||
        !nextBtn
    ) {
        return;
    }

    const maxScroll =
        anggotaContainer.scrollWidth -
        anggotaContainer.clientWidth;

    const currentScroll =
        anggotaContainer.scrollLeft;

    prevBtn.disabled =
        currentScroll <= 5;

    nextBtn.disabled =
        currentScroll >= maxScroll - 5;
}


/* NEXT */

if (
    nextBtn &&
    anggotaContainer
) {

    nextBtn.addEventListener(
        "click",
        () => {

            anggotaContainer.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });

        }
    );
}


/* PREVIOUS */

if (
    prevBtn &&
    anggotaContainer
) {

    prevBtn.addEventListener(
        "click",
        () => {

            anggotaContainer.scrollBy({
                left: -getScrollAmount(),
                behavior: "smooth"
            });

        }
    );
}


/* =====================================================
   SLIDER ANGGOTA SCROLL
===================================================== */

let anggotaScrollTicking = false;

if (anggotaContainer) {

    anggotaContainer.addEventListener(
        "scroll",
        () => {

            if (anggotaScrollTicking) {
                return;
            }

            anggotaScrollTicking = true;

            requestAnimationFrame(() => {

                updateSliderButtons();

                anggotaScrollTicking = false;
            });

        },
        {
            passive: true
        }
    );
}


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    updateSliderButtons,
    {
        passive: true
    }
);

updateSliderButtons();


/* =====================================================
   JADWAL
===================================================== */

const jadwalContainer =
    document.getElementById(
        "jadwalContainer"
    );

const jadwalIndicatorBar =
    document.getElementById(
        "jadwalIndicatorBar"
    );

let jadwalScrollTicking = false;


function updateJadwalIndicator() {

    if (
        !jadwalContainer ||
        !jadwalIndicatorBar
    ) {
        return;
    }

    const maxScroll =
        jadwalContainer.scrollWidth -
        jadwalContainer.clientWidth;

    if (maxScroll <= 0) {

        jadwalIndicatorBar.style.transform =
            "translateX(0)";

        return;
    }

    const progress =
        jadwalContainer.scrollLeft /
        maxScroll;

    const parent =
        jadwalIndicatorBar.parentElement;

    if (!parent) return;

    const maxMove =
        parent.clientWidth -
        jadwalIndicatorBar.clientWidth;

    const move =
        progress * maxMove;

    jadwalIndicatorBar.style.transform =
        `translate3d(${move}px, 0, 0)`;
}


/* =====================================================
   JADWAL SCROLL
===================================================== */

if (jadwalContainer) {

    jadwalContainer.addEventListener(
        "scroll",
        () => {

            if (jadwalScrollTicking) {
                return;
            }

            jadwalScrollTicking = true;

            requestAnimationFrame(() => {

                updateJadwalIndicator();

                jadwalScrollTicking = false;
            });

        },
        {
            passive: true
        }
    );
}


/* =====================================================
   JADWAL RESIZE
===================================================== */

window.addEventListener(
    "resize",
    updateJadwalIndicator,
    {
        passive: true
    }
);

updateJadwalIndicator();


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const button =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            if (button) {

                button.disabled = true;

                button.setAttribute(
                    "aria-busy",
                    "true"
                );
            }

        }
    );
}


/* =====================================================
   IMAGE / LIGHTBOX
===================================================== */

function openLightbox(image) {

    if (!image) return;

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }

    lightboxImage.src =
        image.currentSrc ||
        image.src;

    lightboxImage.alt =
        image.alt || "";

    lightbox.classList.add(
        "show"
    );

    document.body.classList.add(
        "lightbox-open"
    );
}


function closeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    if (!lightbox) return;

    lightbox.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "lightbox-open"
    );
}


/* =====================================================
   ESC UNTUK LIGHTBOX
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {
            closeLightbox();
        }

    }
);
