document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // 1. MOBILE NAVIGATION
    // ============================================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // ============================================================
    // 2. BACK TO TOP BUTTON
    // ============================================================
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ============================================================
    // 3. PROPERTY SEARCH
    // ============================================================
    const propertySearchForm = document.querySelector("#property-search-form");
    const searchMessage = document.querySelector("#search-message");

    if (propertySearchForm && searchMessage) {
        propertySearchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const location = document.querySelector("#location")?.value.trim() || "";
            const propertyType = document.querySelector("#property-type")?.value || "";
            const bedrooms = document.querySelector("#bedrooms")?.value || "";
            const bathrooms = document.querySelector("#bathrooms")?.value || "";
            const minPrice = document.querySelector("#min-price")?.value || "";
            const maxPrice = document.querySelector("#max-price")?.value || "";

            searchMessage.textContent = "Searching available properties...";

            setTimeout(() => {
                let message = "Showing properties";
                if (location) message += ` in ${location}`;
                if (propertyType) message += ` • ${propertyType}`;
                if (bedrooms) message += ` • ${bedrooms}+ bedrooms`;
                if (bathrooms) message += ` • ${bathrooms}+ bathrooms`;
                if (minPrice) message += ` • From $${Number(minPrice).toLocaleString()}`;
                if (maxPrice) message += ` • Up to $${Number(maxPrice).toLocaleString()}`;
                searchMessage.textContent = message + ".";
            }, 700);
        });
    }

    // ============================================================
    // 4. SCROLL REVEAL
    // ============================================================
    const revealElements = document.querySelectorAll(
        ".property-card, .service-card, .about-content, .sell-content, .buyer-content"
    );

    if (revealElements.length) {
        const revealStyle = document.createElement("style");
        revealStyle.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.7s ease, transform 0.7s ease;
            }
            .reveal.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(revealStyle);

        revealElements.forEach(el => el.classList.add("reveal"));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================================
    // 5. GALLERY MODAL
    // ============================================================
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("gallery-modal");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.querySelector(".modal-close");

    if (galleryItems.length && modal && modalImage) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const imageSrc = item.getAttribute("data-image");
                modalImage.src = imageSrc;
                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            });
        });

        const closeModal = () => {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            modalImage.src = "";
        };

        if (modalClose) {
            modalClose.addEventListener("click", closeModal);
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                closeModal();
            }
        });
    }

    // ============================================================
    // 6. FOOTER YEAR
    // ============================================================
    const footerYear = document.querySelector(".footer-bottom p");
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${year} Marci Metzger. All rights reserved.`;
    }

    // ============================================================
    // 7. CONSOLE LOG
    // ============================================================
    console.log("✨ Marci Metzger Real Estate · Website loaded.");

});


// ============================================================
// EMAILJS CONTACT FORM
// ============================================================

(function() {
    emailjs.init("6rVia7dC6lx4J6wmZ");
})();

function sendEmail(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;
    let formMessage = document.getElementById('form-message');

    if (name === '' || email === '' || message === '') {
        formMessage.innerHTML = '⚠️ Please fill in all required fields.';
        formMessage.className = 'form-message error';
        return;
    }

    let params = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        title: 'Real Estate Inquiry'
    };

    emailjs.send("service_hna73vw", "template_r87i9zl", params)
        .then(function(response) {
            formMessage.innerHTML = '✅ Your message has been sent successfully! Marci will get back to you soon.';
            formMessage.className = 'form-message success';
            document.getElementById('contact-form').reset();
        }, function(error) {
            formMessage.innerHTML = '❌ Failed to send message. Please try again later.';
            formMessage.className = 'form-message error';
            console.error('EmailJS Error:', error);
        });
}