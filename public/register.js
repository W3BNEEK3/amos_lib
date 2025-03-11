document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    // Clear previous errors
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = ''; 

    let isValid = true; 

    // Username validation
    const username = document.getElementById('username').value;
    if (username.length < 3 || username.length > 15) {
      document.getElementById('usernameError').textContent = 'Username must be 3-15 characters long.';
      isValid = false;
    } 

    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    } 

    // Password validation
    const password = document.getElementById('password').value;
    if (password.length < 6) {
      document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
      isValid = false;
    } 

    if (isValid) {
      // Send data to the server
      fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Registration successful!');
          } else {
            alert(data.message);
          }
        })
        .catch(err => console.error('Error:', err));
    }
    });