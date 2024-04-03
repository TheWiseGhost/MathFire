const url = new URL(location.href);

const APILINK = 'http://localhost:8000'//'https://mathfirebackend.onrender.com/';


function handleFormSubmit(url, actionUrl, formId, callback) {
    url = url + actionUrl;
    document.getElementById(formId).addEventListener("submit", function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        // Send POST request to the specified action URL
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // assuming response is JSON
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
        // Handle response from login form submission
        console.log(response);
    });
};

register_button.onclick = () => {
    handleFormSubmit(APILINK, "/action/register", 'registerForm', function(response) {
        if (response.ok) {
            // Registration was successful, redirect to index.html
            window.location.href = "/index.html";
        } else {
            // Registration failed, display error message
            alert("Registration failed. Please try again.");
        }
    });
};

// Have to define callback functions and fullt figure out what this code even does
