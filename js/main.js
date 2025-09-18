// Enhanced Navigation and Interactivity
document.addEventListener("DOMContentLoaded", function () {
  // Toggle hamburger nav
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) hamburger.focus();
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile menu when clicking outside or pressing Escape
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.blur();
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

  // Enhanced fade-in animation with staggered effect
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add("fade-in");
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation with enhanced selectors
  document
    .querySelectorAll(".program-content, .contact-grid, .page-header, .program-card, .partner-logos, .cta-buttons")
    .forEach((el) => {
      observer.observe(el);
    });

  // Enhanced loading states and button interactions
  document
    .querySelectorAll("button, .cta-buttons a, .hero-buttons a, .btn-primary, .btn-secondary")
    .forEach((button) => {
      // Add ripple effect on click
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);
        
        // Scale effect for non-submit buttons
        if (this.type !== "submit" && !this.href) {
          this.style.transform = "scale(0.95)";
          setTimeout(() => {
            this.style.transform = "";
          }, 150);
        }
      });
      
      // Enhanced hover effects
      button.addEventListener("mouseenter", function() {
        this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    });

  // Enhanced navbar scroll effect with parallax
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");
  let ticking = false;

  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
      navbar.style.opacity = "0.95";
    } else {
      navbar.style.transform = "translateY(0)";
      navbar.style.opacity = "1";
    }

    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
      navbar.style.background = "rgba(106, 76, 147, 0.98)";
      navbar.style.backdropFilter = "blur(15px)";
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.background = "rgba(106, 76, 147, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
});

/**
 * Opens a lightbox to display a larger version of an image.
 * @param {HTMLImageElement} img - The image element that was clicked.
 */
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightboxImg.src = img.src || (img.dataset && img.dataset.src) || '';
    lightboxImg.alt = img.alt || img.getAttribute('alt') || img.title || 'Enlarged image';
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

/**
 * Closes the lightbox and restores scrolling to the body.
 */
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Enhanced CSS for navbar scroll effect and loading states
const style = document.createElement("style");
style.textContent = `
  .navbar.scrolled {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .navbar {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Loading spinner */
  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #ffffff;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Enhanced form loading state */
  .form-loading {
    opacity: 0.7;
    pointer-events: none;
  }

  .form-loading button {
    position: relative;
  }

  .form-loading button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 */
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

/**
 * A class to interact with the Netlify Database API.
 */
class NetlifyDB {
  /**
   * Initializes the NetlifyDB class.
   */
  constructor() {
    this.baseUrl = window.location.origin;
  }

  /**
   * Fetches a single post by its ID.
   * @param {string} postId - The ID of the post to fetch.
   * @returns {Promise<Object>} A promise that resolves to the post data.
   */
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

  /**
   * Fetches a list of posts with optional filtering and pagination.
   * @param {Object} [options={}] - The options for fetching posts.
   * @param {number} [options.limit] - The maximum number of posts to return.
   * @param {number} [options.offset] - The number of posts to skip.
   * @param {string} [options.category] - The category to filter posts by.
   * @returns {Promise<{posts: Array<Object>, pagination: Object}>} A promise that resolves to an object containing the posts and pagination info.
   */
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

  /**
   * Displays a list of posts in the UI.
   * @param {string} containerSelector - The CSS selector for the container element.
   * @param {Object} [options={}] - The options for fetching posts.
   */
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

  /**
   * Displays a single post in the UI.
   * @param {string} postId - The ID of the post to display.
   * @param {string} [containerSelector='.post-detail'] - The CSS selector for the container element.
   */
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

/**
 * Shows the specified tab and hides the others.
 * @param {string} tabName - The ID of the tab content to display.
 */
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

/**
 * Filters videos on the Classroom Rewind page based on the selected category.
 * @param {string} category - The category to filter by. Use 'all' to show all videos.
 */
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

/**
 * Handles the student login form submission.
 * @param {Event} event - The form submission event.
 * @returns {boolean} Returns false to prevent the default form submission.
 */
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

/**
 * Logs the student out and returns to the login screen.
 */
function logoutStudent() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("portalDashboard").style.display = "none";

  document.getElementById("studentName").value = "";
  document.getElementById("studentPass").value = "";
  document.getElementById("loginError").textContent = "";
}

// Enhanced Formspree response with loading states and better UX
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const responseBox = document.getElementById("formResponse");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');

      // Enhanced loading state
      const originalText = submitButton.textContent;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
      submitButton.disabled = true;
      form.classList.add('form-loading');

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          responseBox.className = 'form-response-success';
          responseBox.innerHTML = `<strong>✓ Thank you!</strong><br>Your message was sent successfully. We'll get back to you soon!`;
          responseBox.style.display = "block";
          form.reset();
          
          // Add success animation
          responseBox.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          return response.json().then(data => {
            throw new Error(data.error || "Oops! Something went wrong.");
          });
        }
      })
      .catch(error => {
        responseBox.className = 'form-response-error';
        responseBox.innerHTML = `⚠ <strong>Error:</strong> ${error.message}<br><small>Please try again or contact us directly.</small>`;
        responseBox.style.display = "block";
        responseBox.style.animation = 'fadeIn 0.5s ease-out';
      })
      .finally(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        form.classList.remove('form-loading');

        // Auto-hide after 7s
        setTimeout(() => {
          responseBox.style.opacity = '0';
          setTimeout(() => {
            responseBox.style.display = "none";
            responseBox.innerHTML = "";
            responseBox.style.opacity = '1';
          }, 300);
        }, 7000);
      });
    });
  }
});
