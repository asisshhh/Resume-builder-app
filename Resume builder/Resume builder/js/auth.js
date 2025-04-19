// Auth state management
const AUTH_KEY = 'resume_builder_auth';

// Check if user is logged in
function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) !== null;
}

// Get current user
function getCurrentUser() {
    const userData = localStorage.getItem(AUTH_KEY);
    return userData ? JSON.parse(userData) : null;
}

// Login function
function login(email, password) {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll use hardcoded credentials
    const users = [
        { email: 'user@example.com', password: 'password123', name: 'Demo User' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
        return true;
    }
    
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'login.html';
}

// Register function
function register(email, password, name) {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll store in localStorage
    const users = JSON.parse(localStorage.getItem('resume_builder_users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Add new user
    users.push({ email, password, name });
    localStorage.setItem('resume_builder_users', JSON.stringify(users));
    
    return { success: true };
}

// Protect routes that require authentication
function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// Initialize auth state
function initAuth() {
    // If on login page and already authenticated, redirect to dashboard
    if (window.location.pathname.includes('login.html') && isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
    
    // If on protected page and not authenticated, redirect to login
    if (window.location.pathname.includes('dashboard.html') && !isAuthenticated()) {
        window.location.href = 'login.html';
    }
} 