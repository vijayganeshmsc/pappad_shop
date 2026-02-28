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

  // Check Login State with Supabase
  const loginBtn = document.getElementById('loginBtn');
  const profileBtn = document.getElementById('profileBtn');

  async function checkLoginState() {
    try {
      // Check if we have a session in localStorage
      const sessionStr = localStorage.getItem('supabaseSession');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (isLoggedIn && sessionStr) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileBtn) {
          profileBtn.style.display = 'inline-flex';
          // Remove existing event listener to prevent duplicates
          profileBtn.replaceWith(profileBtn.cloneNode(true));
          const newProfileBtn = document.getElementById('profileBtn');
          
          // Add logout functionality
          newProfileBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
              try {
                // Sign out from Supabase
                if (window.supabaseClient) {
                  await window.supabaseClient.auth.signOut();
                }
              } catch (error) {
                console.error('Logout error:', error);
              }
              
              // Clear localStorage
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userName');
              localStorage.removeItem('userId');
              localStorage.removeItem('supabaseSession');
              localStorage.removeItem('userData');
              
              // Update UI immediately
              checkLoginState();
            }
          });
        }
      } else {
        // User is not logged in
        if (loginBtn) {
          loginBtn.style.display = 'inline-block';
          // Add click handler to redirect to sign-in page
          loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '../login_page/SignIn/SignIn.html';
          });
        }
        if (profileBtn) profileBtn.style.display = 'none';
      }
    } catch (error) {
      console.error('Error checking login state:', error);
      // Default to logged out
      if (loginBtn) loginBtn.style.display = 'inline-block';
      if (profileBtn) profileBtn.style.display = 'none';
    }
  }

  // Run on load
  checkLoginState();

  // Listen for storage changes (in case login happens in another tab/window)
  window.addEventListener('storage', checkLoginState);
  
  // Also check login state when page becomes visible (for tab switching)
  document.addEventListener('visibilitychange', checkLoginState);

  // Cart icon click handler - redirect to shopping cart page
  const cartIconBtn = document.querySelector('.header-cart');
  if (cartIconBtn) {
    cartIconBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '../shopping_cart_page/shopping_cart.html';
    });
  }

  // Also update cart badge on page load
  updateCartBadgeOnLoad();
}

// Update cart badge on page load
function updateCartBadgeOnLoad() {}
  const CART_KEY = 'pappad_shop_cart';
  const cartData = localStorage.getItem(CART_KEY);
  const cart = cartData ? JSON.parse(cartData) : [];
  const count = cart.reduce((total, item) => total + item.qty, 0);
  
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
