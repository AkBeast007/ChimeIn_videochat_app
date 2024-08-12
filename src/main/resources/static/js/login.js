function handleLogin(event) {
    event.preventDefault();

    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        email: email,
        password: password
    };

    fetch('https://chimein-videochat-app.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            // Check for specific error status
            if (response.status === 401) {
                alert('Email or password is incorrect');
            } else {
                alert('An error occurred: ' + response.statusText);
            }
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        localStorage.setItem('connectedUser', JSON.stringify(response));
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('POST request error', error);
        alert('An unexpected error occurred. Please try again later.');
    });
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLogin);
