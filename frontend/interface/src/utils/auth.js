

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
    // !! -> It is a double negation that converts a value to a boolean. If token exists, it returns true; if not, it returns false.
}

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Returns parsed user object if exists, otherwise null
    // JSON.parse -> It converts a JSON string into a JavaScript object.
}

export const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('user'); // Remove user data from local storage
    window.location.href = '/'; // Redirect to home page
    // window.location.href -> It is used to redirect the user to a different URL.
}