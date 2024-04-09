const url = new URL(location.href);

const APILINK = 'http://localhost:8000'//'https://mathfirebackend.onrender.com/';
localStorage.setItem('user', 'none')

let username, password;

function handleFormSubmit(url, actionUrl, formId, callback) {
    url = url + actionUrl;
    document.getElementById(formId).addEventListener("submit", function(event) {
        event.preventDefault();

        if (formId == 'registerForm') {
            username = document.getElementById('registeremail');
            password = document.getElementById('registerpass');
        } else {
            username = document.getElementById('logemail');
            password = document.getElementById('logpass');
        }

        // Send POST request to the specified action URL
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': username.value, "password": password.value})
        })
        .then(res => res.json())
        .then(data => {
            // Handle response from server
            callback(data);
        })
        .catch(error => console.error('Error:', error));
    });
}

let register_button = document.getElementById('register_button');
let login_button = document.getElementById('login_button');

login_button.onclick = () => {
    handleFormSubmit(APILINK, "/action/login", 'loginForm', function(response) {
        if (response.message == 'ok') {
            // Registration was successful, redirect to index.html
            window.location.href = "/index.html";
            let email = username.value;
            let cleanedEmail = email.replace("@gmail.com", "")
            localStorage.setItem('user', cleanedEmail);
        } else {
            // Login failed, display error message
            alert("Login failed. Please try again.");
        }

    });
};

register_button.onclick = () => {
    handleFormSubmit(APILINK, "/action/register", 'registerForm', function(response) {
        if (response.message == 'ok') {
            alert("Welcome to MathFire! Please login with your new account");
        } else {
            // Registration failed, display error message
            alert("Registration failed. Please try again.");
        }
    });
};


