// ============================================
// Loading Screen
// ============================================

export function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');

        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}
