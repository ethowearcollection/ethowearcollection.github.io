// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // ==============================================
  // ENHANCED HAMBURGER MENU (New Version)
  // ==============================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");

  // Create mobile overlay
  const mobileOverlay = document.createElement("div");
  mobileOverlay.classList.add("mobile-overlay");
  document.body.appendChild(mobileOverlay);

  // Create mobile nav links
  const mobileNavLinks = navLinks.cloneNode(true);
  mobileNavLinks.classList.add("mobile");
  document.body.appendChild(mobileNavLinks);

  // Toggle mobile menu
  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    mobileNavLinks.classList.toggle("active");
    mobileOverlay.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (mobileNavLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  // Close mobile menu
  function closeMobileMenu() {
    hamburger.classList.remove("active");
    mobileNavLinks.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Event listeners for hamburger
  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu);
    mobileOverlay.addEventListener("click", closeMobileMenu);

    // Close menu when clicking on nav links
    const mobileLinks = mobileNavLinks.querySelectorAll(".nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  // ==============================================
  // NAVBAR SCROLL EFFECT (Enhanced)
  // ==============================================
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ==============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==============================================
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ==============================================
  // PRODUCT FILTERING (Preserved from old version)
  // ==============================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const produktCards = document.querySelectorAll(".produk-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      produktCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          // Add fade in animation
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 100);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ==============================================
  // BACK TO TOP BUTTON (Preserved)
  // ==============================================
  const backToTopBtn = document.querySelector(".back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==============================================
  // NEWSLETTER FORM (Preserved & Enhanced)
  // ==============================================
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    if (submitBtn && emailInput) {
      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        // Enhanced email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && emailRegex.test(email)) {
          // Add loading state
          submitBtn.textContent = "Memproses...";
          submitBtn.disabled = true;

          setTimeout(() => {
            alert("Terima kasih! Anda berhasil berlangganan newsletter.");
            emailInput.value = "";
            submitBtn.textContent = "Subscribe";
            submitBtn.disabled = false;
          }, 1000);
        } else {
          alert("Mohon masukkan alamat email yang valid.");
          emailInput.focus();
        }
      });
    }
  }

  // ==============================================
  // PRODUCT ACTION BUTTONS (Enhanced)
  // ==============================================
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const icon = this.querySelector("i");

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      if (icon.classList.contains("fa-heart")) {
        const isLiked = icon.style.color === "red";
        icon.style.color = isLiked ? "" : "red";
        icon.style.transform = isLiked ? "scale(1)" : "scale(1.2)";
        setTimeout(() => {
          icon.style.transform = "scale(1)";
        }, 200);
      } else if (icon.classList.contains("fa-shopping-cart")) {
        // Enhanced cart animation
        const originalColor = icon.style.color;
        icon.style.color = "var(--primary-color)";
        setTimeout(() => {
          icon.style.color = originalColor;
          alert("Produk ditambahkan ke keranjang!");
        }, 300);
      } else if (icon.classList.contains("fa-search")) {
        alert("Fitur detail produk akan segera hadir!");
      }
    });
  });
});

function showConfetti() {
  const confetti = document.createElement("div");
  confetti.innerHTML = "🎉";
  confetti.style.position = "fixed";
  confetti.style.left = Math.random() * window.innerWidth + "px";
  confetti.style.top = "-20px";
  confetti.style.fontSize = "24px";
  confetti.style.animation = "fall 3s linear forwards";
  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 3000);
}

@keyframes fall {
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}
