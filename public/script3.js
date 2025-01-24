document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic Validation
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);  // Store user role for later use
            localStorage.setItem('fullName', data.fullName); // Store full name of the user

            alert(`Welcome, ${data.fullName}!`);
            window.location.href = 'dashboard.html';  // Redirect to dashboard after login
        } else {
            alert(data.msg || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        alert('An error occurred. Please check your internet connection.');
        console.error('Login Error:', error);
    }
});
