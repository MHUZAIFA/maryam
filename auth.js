// Authentication module
(function() {
    'use strict';

    // Check if user is authenticated
    function isAuthenticated() {
        const authToken = localStorage.getItem('authToken');
        const authTime = localStorage.getItem('authTime');
        
        if (!authToken || !authTime) {
            return false;
        }
        
        // Check if session is still valid (24 hours)
        const currentTime = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (currentTime - parseInt(authTime) > sessionDuration) {
            // Session expired
            logout();
            return false;
        }
        
        return true;
    }

    // Logout function
    function logout() {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authTime');
            // Clear any session storage as well
            sessionStorage.clear();
            // Redirect to login page
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if there's an error
            window.location.href = 'login.html';
        }
    }

    // Protect page - redirect to login if not authenticated
    function protectPage() {
        if (!isAuthenticated()) {
            // Store the current page to redirect back after login
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage !== 'login.html') {
                sessionStorage.setItem('redirectAfterLogin', currentPage);
            }
            window.location.href = 'login.html';
        }
    }

    // Expose functions globally
    window.Auth = {
        isAuthenticated: isAuthenticated,
        logout: logout,
        protectPage: protectPage
    };
})();
