let user = localStorage.getItem('user');
const login_text = document.getElementById('login');

if (user != 'none') {
    login_text.innerHTML = user;
}