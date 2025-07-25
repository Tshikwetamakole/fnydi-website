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

// Netlify Database API Functions
class NetlifyDB {
  constructor() {
    this.baseUrl = window.location.origin;
  }

  async getPost(postId) {
    try {
      const response = await fetch(`/.netlify/functions/get-post?id=${postId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch post');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  async getPosts(options = {}) {
    try {
      const params = new URLSearchParams();
      
      if (options.limit) params.append('limit', options.limit);
      if (options.offset) params.append('offset', options.offset);
      if (options.category) params.append('category', options.category);
      
      const response = await fetch(`/.netlify/functions/get-posts?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch posts');
      }
      
      return {
        posts: result.data,
        pagination: result.pagination
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Utility function to display posts in the UI
  async displayPosts(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    try {
      container.innerHTML = '<div class="loading">Loading posts...</div>';
      
      const { posts } = await this.getPosts(options);
      
      if (!posts || posts.length === 0) {
        container.innerHTML = '<div class="no-posts">No posts found.</div>';
        return;
      }

      container.innerHTML = posts.map(post => `
        <article class="post-card">
          <h3>${post.title || 'Untitled'}</h3>
          <p class="post-excerpt">${post.excerpt || post.content?.substring(0, 150) || ''}...</p>
          <div class="post-meta">
            <span class="post-date">${new Date(post.created_at).toLocaleDateString()}</span>
            ${post.category ? `<span class="post-category">${post.category}</span>` : ''}
          </div>
          <a href="#" class="read-more" data-post-id="${post.id}">Read More</a>
        </article>
      `).join('');

      // Add click handlers for read more links
      container.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', async (e) => {
          e.preventDefault();
          const postId = e.target.dataset.postId;
          await this.displaySinglePost(postId);
        });
      });

    } catch (error) {
      container.innerHTML = `<div class="error">Error loading posts: ${error.message}</div>`;
    }
  }

  async displaySinglePost(postId, containerSelector = '.post-detail') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    try {
      container.innerHTML = '<div class="loading">Loading post...</div>';
      
      const post = await this.getPost(postId);
      
      container.innerHTML = `
        <article class="post-full">
          <h1>${post.title || 'Untitled'}</h1>
          <div class="post-meta">
            <span class="post-date">${new Date(post.created_at).toLocaleDateString()}</span>
            ${post.category ? `<span class="post-category">${post.category}</span>` : ''}
            ${post.author ? `<span class="post-author">By ${post.author}</span>` : ''}
          </div>
          <div class="post-content">${post.content || ''}</div>
        </article>
      `;
    } catch (error) {
      container.innerHTML = `<div class="error">Error loading post: ${error.message}</div>`;
    }
  }
}

// Initialize NetlifyDB
window.netlifyDB = new NetlifyDB();

// Example usage when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on a page that needs posts
  const postsContainer = document.querySelector('.posts-container');
  if (postsContainer) {
    // Load posts with default options
    window.netlifyDB.displayPosts('.posts-container', { limit: 6 });
  }
});

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

// Handle Formspree response with popup
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const responseBox = document.getElementById("formResponse");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');

      // Set loading state
      const originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          responseBox.innerHTML = `
            <div style="color: green; background: #e6f9ee; padding: 1rem; border-left: 4px solid green; border-radius: 5px;">
              <strong>✓ Thank you!</strong><br>Your message was sent successfully.
            </div>`;
          responseBox.style.display = "block";
          form.reset();
        } else {
          return response.json().then(data => {
            throw new Error(data.error || "Oops! Something went wrong.");
          });
        }
      })
      .catch(error => {
        responseBox.innerHTML = `
          <div style="color: red; background: #ffe6e6; padding: 1rem; border-left: 4px solid red; border-radius: 5px;">
            <strong>⚠ Error:</strong><br>${error.message}
          </div>`;
        responseBox.style.display = "block";
      })
      .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Auto-hide after 5s
        setTimeout(() => {
          responseBox.style.display = "none";
          responseBox.innerHTML = "";
        }, 5000);
      });
    });
  }
});
