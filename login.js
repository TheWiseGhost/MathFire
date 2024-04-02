const url = new URL(location.href);

const APILINK = 'https://mathfirebackend.onrender.com/';

const indicator = document.getElementById('reg-log');

indicator.onclick = () => { update_curr() };

function update_curr() {
    if (indicator.checked) {
        localStorage.setItem('current_login_type', 'login');
    } else {
        localStorage.setItem('current_login_type', 'register');
    }
}


function handleFormSubmit(url, actionUrl, formId, callback) {
    let url = url + actionUrl;
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

// Usage:
handleFormSubmit(APILINK, "/action/login", function(responseData) {
    // Handle response from login form submission
    console.log(responseData);
});

handleFormSubmit(APILINK, "/action/register", function(responseData) {
    // Handle response from register form submission
    console.log(responseData);
});

// Have to define callback functions and fullt figure out what this code even does
