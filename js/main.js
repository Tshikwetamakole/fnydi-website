// Enhanced Navigation and Interactivity
document.addEventListener("DOMContentLoaded", function () {
  // Toggle hamburger nav
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
      hamburger.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("show")
      );
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add fade-in animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".program-content, .contact-grid, .page-header")
    .forEach((el) => {
      observer.observe(el);
    });

  // Add loading states to buttons
  document
    .querySelectorAll("button, .cta-buttons a, .hero-buttons a")
    .forEach((button) => {
      button.addEventListener("click", function () {
        if (this.type !== "submit") {
          this.style.transform = "scale(0.98)";
          setTimeout(() => {
            this.style.transform = "";
          }, 150);
        }
      });
    });

  // Navbar scroll effect
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    if (scrollTop > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });
});

// Lightbox functionality
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLightbox();
      }
    });
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Utility function to add CSS class for navbar scroll effect
const style = document.createElement("style");
style.textContent = `
  .navbar.scrolled {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .navbar {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScrollHandler = debounce(function () {}, 10);
window.addEventListener("scroll", debouncedScrollHandler);

// Tab functionality for Events & News page
function showTab(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.style.display = "none";
  });

  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }

  const activeButton = document.querySelector(
    `[onclick="showTab('${tabName}')"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// Video filtering for Classroom Rewind page
function filterVideos(category) {
  const videos = document.querySelectorAll(".video-card");

  videos.forEach((video) => {
    if (category === "all" || video.classList.contains(category)) {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  });

  const filterButtons = document.querySelectorAll(".rewind-filters button");
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    `[onclick="filterVideos('${category}')"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// Student Portal login functionality
function studentLogin(event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value;
  const password = document.getElementById("studentPass").value;
  const errorElement = document.getElementById("loginError");

  if (name && password) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("portalDashboard").style.display = "block";
    errorElement.textContent = "";
  } else {
    errorElement.textContent = "Please enter both name and password.";
  }

  return false;
}

function logoutStudent() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("portalDashboard").style.display = "none";

  document.getElementById("studentName").value = "";
  document.getElementById("studentPass").value = "";
  document.getElementById("loginError").textContent = "";
}
