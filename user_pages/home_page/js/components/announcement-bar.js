// ============================================
// Announcement Bar - Close Functionality
// ============================================

export function initAnnouncementBar() {
    const announcementBar = document.getElementById('announcementBar');
    const closeBtn = document.getElementById('announcementClose');

    closeBtn.addEventListener('click', () => {
        announcementBar.classList.add('hidden');
    });
}
