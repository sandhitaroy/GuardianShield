document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    // Basic Validation
    if (!fullName || !email || !mobile || !password || !role) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, mobile, password, role })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.msg);
            window.location.href = 'login.html';  // Redirect to login page after signup
        } else {
            alert(data.msg || 'Signup failed. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please check your internet connection.');
        console.error('Signup Error:', error);
    }
});
