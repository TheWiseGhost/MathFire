const url = new URL(location.href);

const APILINK = 'https://mathfirebackend.onrender.com';
//const APILINK = 'http://localhost:8000';

localStorage.setItem('user', 'none');

let username, password;
let title = document.getElementById('title');

function handleFormSubmit(url, actionUrl, formId, callback) {
    url = url + actionUrl;
    document.getElementById(formId).addEventListener("submit", function(event) {
        event.preventDefault();
        title.innerHTML = 'Processing your request...Please wait at least 1 minute';

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
        title.innerHTML = `<span>Log In </span><span>Sign Up</span>`
    });
}

let register_button = document.getElementById('register_button');
let login_button = document.getElementById('login_button');

login_button.onclick = () => {
    handleFormSubmit(APILINK, "/action/login", 'loginForm', function(response) {
        if (response.message == 'ok') {
            // Registration was successful, redirect to index.html
            window.location.href = "index.html";
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
            window.location.href = 'login.html';
        } else if (response.message == 'emailInUse') {
            alert('That email is already registered. Please login or make a new account');
        } else {
            // Registration failed, display error message
            alert("Registration failed. Please try again.");
        }
    });
};


