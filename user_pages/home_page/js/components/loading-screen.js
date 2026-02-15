// ============================================
// Loading Screen
// ============================================

export function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    // Function to hide loading screen
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            // Remove from DOM after animation completes
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Hide loading screen after 2 seconds
    setTimeout(hideLoadingScreen, 2000);

    // Fallback: Force hide after 5 seconds in case of issues
    setTimeout(hideLoadingScreen, 5000);

    // Allow manual close on click or keypress
    document.addEventListener('click', hideLoadingScreen, { once: true });
    document.addEventListener('keydown', hideLoadingScreen, { once: true });
}
