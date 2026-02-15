// ============================================
// Header - Navigation & Mobile Menu
// ============================================

export function initHeader() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const mobileMenuLinks = document.querySelectorAll(".header-mobile-menu-link");

  // Toggle mobile menu
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");

    if (isOpen) {
      mobileMenu.classList.remove("open");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    } else {
      mobileMenu.classList.add("open");
      menuIcon.style.display = "none";
      closeIcon.style.display = "block";
    }
  });

  // Close menu when clicking a link
  mobileMenuLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    });
  });

  // Smooth scroll for all navigation links
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
  // Smart Header Scroll Effect
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Determine scroll direction and position
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling DOWN and past 100px - Hide Header
          header.classList.add("header--hidden");
          header.classList.remove("header--visible-bg");
        } else if (currentScrollY < lastScrollY && currentScrollY > 0) {
          // Scrolling UP and not at very top - Show Header with Background
          header.classList.remove("header--hidden");
          header.classList.add("header--visible-bg");
        } else if (currentScrollY === 0) {
          // At TOP - Show Header Transparent
          header.classList.remove("header--hidden");
          header.classList.remove("header--visible-bg");
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });

      ticking = true;
    }
  });

  // Check Login State with Firebase
  const loginBtn = document.getElementById('loginBtn');
  const profileBtn = document.getElementById('profileBtn');

  function checkLoginState() {
    // Check Firebase auth state first
    if (typeof firebase !== 'undefined' && firebase.auth()) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in with Firebase
          if (loginBtn) loginBtn.style.display = 'none';
          if (profileBtn) {
            profileBtn.style.display = 'inline-flex';
            // Remove existing event listener to prevent duplicates
            profileBtn.replaceWith(profileBtn.cloneNode(true));
            const newProfileBtn = document.getElementById('profileBtn');
            // Add logout functionality
            newProfileBtn.addEventListener('click', function(e) {
              e.preventDefault();
              if (confirm('Do you want to logout?')) {
                // Sign out from Firebase
                firebase.auth().signOut()
                  .then(() => {
                    // Clear localStorage
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userData');
                    // UI will update automatically through onAuthStateChanged
                  })
                  .catch((error) => {
                    console.error('Logout error:', error);
                    // Fallback: clear localStorage and update UI
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userData');
                    checkLoginState();
                  });
              });
            });
          }
        } else {
          // User is signed out
          if (loginBtn) loginBtn.style.display = 'inline-block';
          if (profileBtn) profileBtn.style.display = 'none';
        }
      });
    } else {
      // Fallback to localStorage if Firebase is not available
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileBtn) {
          profileBtn.style.display = 'inline-flex';
          // Remove existing event listener to prevent duplicates
          profileBtn.replaceWith(profileBtn.cloneNode(true));
          const newProfileBtn = document.getElementById('profileBtn');
          // Add logout functionality
          newProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userName');
              localStorage.removeItem('userData');
              checkLoginState(); // Update UI immediately
            }
          });
        }
      } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (profileBtn) profileBtn.style.display = 'none';
      }
    }
  }

  // Initialize Firebase if available and check login state
  if (typeof firebase !== 'undefined') {
    // Wait for Firebase to be ready
    setTimeout(() => {
      checkLoginState();
    }, 100);
  } else {
    // Fallback if Firebase is not loaded
    checkLoginState();
  }

  // Listen for storage changes (in case login happens in another tab/window)
  window.addEventListener('storage', checkLoginState);
  
  // Also check login state when page becomes visible (for tab switching)
  document.addEventListener('visibilitychange', checkLoginState);
}
