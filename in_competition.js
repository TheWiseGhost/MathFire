localStorage.setItem('in_comp_status', 'information');
const nav_info = document.getElementById('nav_info');
const nav_comp = document.getElementById('nav_comp');
const nav_leaderboard = document.getElementById('nav_leaderboard');
const main = document.getElementById('main_element');

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


async function update_info(url){
    url = url + 'competitions' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function (element) {
        div_main = document.createElement('div');
        div_main.innerHTML = `
            <div class='in_box_title'>
                Information
            </div>
            <div class='in_box_text'>
                ${element.description}
            </div>
        `

        main.appendChild(div_main);
    });
}


async function update_comp(url){
    url = url + 'competitions' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function(element) {
        element.problems.forEach((index) => {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='problem_container'>
                    <div class='problem_grid'>
                        <div class='problem_question'>
                            ${element.problems[index]}
                        </div>

                        <div class='problem_answer_area'>
                            <span style='color: #EE6C4D'>Answer: </span>
                            <input class='answer_input'>
                        </div>
                    </div>
                </div>
            `
            main.appendChild(div_main);
        });
    });
}


async function update_leaderboard(url){
    url = url + 'competitions' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function(element) {
        element.leaderboard_names.forEach((index) => {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='leaderboard_container'>
                    <div class='leaderboard_grid'>
                        <div class='leaderboard_grid_number' style='text-decoration: underline'>
                            ${index+1}
                        </div>
                        <div class='leaderboard_grid_name' style='text-decoration: underline'>
                            ${element.leaderboard_names[index]}
                        </div>
                        <div class='leaderboard_grid_score' style="text-decoration: underline">
                            ${element.leaderboard_scores[index]}
                        </div>
                    </div>
                </div>
            `
            main.appendChild(div_main);
        });
    });
}

