// Init AOS (scroll animation)
AOS.init({
  duration: 1000,
  once: true,
  offset: 80,
});

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show back to top
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });

  // Back to top click
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Product action buttons
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const icon = btn.querySelector("i");

      if (icon.classList.contains("fa-heart")) {
        icon.style.color = icon.style.color === "red" ? "" : "red";
      } else if (icon.classList.contains("fa-shopping-cart")) {
        alert("Produk ditambahkan ke keranjang!");
      } else if (icon.classList.contains("fa-search")) {
        alert("Detail produk segera hadir!");
      }
    });
  });

  // Newsletter subscribe with confetti
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector("input[type=email]");
    const submitBtn = newsletterForm.querySelector("button");

    submitBtn.addEventListener("click", e => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

      if (emailRegex.test(email)) {
        alert("Terima kasih telah berlangganan!");
        emailInput.value = "";
        showConfetti();
      } else {
        alert("Masukkan email valid.");
      }
    });
  }

  // Confetti animation
  function showConfetti() {
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement("div");
      confetti.innerHTML = "🎉";
      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.top = "-20px";
      confetti.style.fontSize = "20px";
      confetti.style.animation = "fall 3s linear forwards";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }
});
