let user = localStorage.getItem('user');
const login_text = document.getElementById('login');

if (user != 'none' && user != '') {
    login_text.innerHTML = user;
}
