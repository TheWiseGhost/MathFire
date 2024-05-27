let user = localStorage.getItem('user');
const login_text = document.getElementById('login_text');
const login = document.getElementById('login');

if (user != 'none' && user) {
    login_text.innerHTML = user;
}

login.onclick = () => {
    if (user != 'none' && user) {
        window.location.href = 'profile.html';
    } else {
        window.location.href = 'login.html';
    }
}

