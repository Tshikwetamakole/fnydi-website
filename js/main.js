
// Lightbox for Gallery
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = img.src;
  lightbox.style.display = "flex";
}

// Tab Switcher (Events & News)
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
}

// Student Login (Basic)
function studentLogin(event) {
  event.preventDefault();
  const name = document.getElementById("studentName").value;
  const pass = document.getElementById("studentPass").value;
  if (name && pass === "fnydi2025") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("portalDashboard").style.display = "block";
    document.getElementById("loginError").textContent = "";
  } else {
    document.getElementById("loginError").textContent = "Invalid credentials.";
  }
}

function logoutStudent() {
  document.getElementById("portalDashboard").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}

// Filter Videos on Classroom Rewind Page
function filterVideos(category) {
  const videos = document.querySelectorAll(".video-card");
  videos.forEach(video => {
    if (category === "all" || video.classList.contains(category)) {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  });
}
