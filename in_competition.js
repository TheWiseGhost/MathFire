localStorage.setItem('in_comp_status', 'information');
const nav_info = document.getElementById('nav_info');
const nav_comp = document.getElementById('nav_comp');
const nav_leaderboard = document.getElementById('nav_leaderboard');

function update_nav_buttons() {
    if (localStorage.getItem('in_comp_status') == 'information') {
        nav_info.style.backgroundColor = '#FFC094';
        nav_comp.style.backgroundColor = 'white';
        nav_leaderboard.style.backgroundColor = 'white';
    } else if (localStorage.getItem('in_comp_status') == 'competition') {
        nav_comp.style.backgroundColor = '#FFC094';
        nav_info.style.backgroundColor = 'white';
        nav_leaderboard.style.backgroundColor = 'white';
    } else {
        nav_leaderboard.style.backgroundColor = '#FFC094';
        nav_comp.style.backgroundColor = 'white';
        nav_info.style.backgroundColor = 'white';
    }
}

update_nav_buttons()

nav_info.onclick = () => {
    localStorage.setItem('in_comp_status', 'information');
    update_nav_buttons();
}

nav_comp.onclick = () => {
    localStorage.setItem('in_comp_status', 'competition')
    update_nav_buttons();
}

nav_leaderboard.onclick = () => {
    localStorage.setItem('in_comp_status', 'leaderboard')
    update_nav_buttons();
}
