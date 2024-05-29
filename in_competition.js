localStorage.setItem('in_comp_status', 'information');
const nav_info = document.getElementById('nav_info');
const nav_comp = document.getElementById('nav_comp');
const nav_leaderboard = document.getElementById('nav_leaderboard');
const main = document.getElementById('main_element');
const title = document.getElementById('title');
const head_title = document.getElementById('head_title')

const APILINK = 'https://mathfirebackend.onrender.com/'
//const APILINK = 'http://localhost:8000/'

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

update_nav_buttons();
update_info(APILINK);

nav_info.onclick = () => {
    localStorage.setItem('in_comp_status', 'information');
    update_nav_buttons();
    update_info(APILINK);
}

nav_comp.onclick = () => {
    localStorage.setItem('in_comp_status', 'competition')
    update_nav_buttons();
    update_comp(APILINK);
}

nav_leaderboard.onclick = () => {
    localStorage.setItem('in_comp_status', 'leaderboard')
    update_nav_buttons();
    update_leaderboard(APILINK);
}


async function update_info(url) {
    main.innerHTML = '';
    url = url + 'competition/' + localStorage.getItem('competitionId');
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
        title.innerHTML = element.title;
        head_title.innerHTML = element.title;
    });
}


async function update_comp(url){
    main.innerHTML = '';
    url = url + 'competition/' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function(element) {
        div_header = document.createElement('div');
        div_header.innerHTML = `
            <div class='in_box_title'>
                Competition
            </div>`
        main.appendChild(div_header)
        for (var i = 0; i < element.problems.length; i++) {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='problem_container'>
                    <div class='problem_grid'>
                        <div class='problem_question'>
                            ${element.problems[i]}
                        </div>

                        <div class='problem_answer_area'>
                            <span style='color: #EE6C4D'>Answer: </span>
                            <input class='answer_input' id='${i}'>
                        </div>
                    </div>
                </div>
            `
            main.appendChild(div_main);
        };
        div_bottom = document.createElement('div');
        div_bottom.innerHTML = `
            <div style='padding-left: 27rem; padding-top: 2rem'>
                <button class="blob-btn" id='submit_button' >
                    Submit Competition
                    <span class="blob-btn__inner">
                        <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span>
                            <span class="blob-btn__blob"></span>
                            <span class="blob-btn__blob"></span>
                            <span class="blob-btn__blob"></span>
                        </span>
                    </span>
                </button>
            </div>
            `
        main.appendChild(div_bottom);

        let answers = element.answers;

        submit_button = document.getElementById('submit_button');
        let answer_arr = [];
        let correct = 0;
        let my_doc;
        submit_button.onclick = () => {
            for (var i=0; i < element.max_score; i++) {
                my_doc = document.getElementById(String(i))
                answer_arr.push(my_doc.value);
            }
            console.log(answer_arr);
            for (var i=0; i < element.max_score; i++) {
                if (answer_arr[i] == answers[i]) {
                    correct += 1;
                }
            }
            localStorage.setItem('correct', correct);
            update_score(APILINK);
        }
    });
}


async function update_leaderboard(url){
    main.innerHTML = ''
    url = url + 'competition/' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function(element) {
        div_header = document.createElement('div');
        div_header.innerHTML = `
            <div class='in_box_title'>
                Leaderboard
            </div>
            <div class='leaderboard_container'>
                <div class='leaderboard_grid'>
                    <div class='leaderboard_grid_number' style='text-decoration: underline'>
                        Rank
                    </div>
                    <div class='leaderboard_grid_name' style='text-decoration: underline'>
                        Email
                    </div>
                    <div class='leaderboard_grid_score' style="text-decoration: underline">
                        Score
                    </div>
                </div>
            </div>
            `
        main.appendChild(div_header);
        for (var i = 0; i < element.leaderboard_names.length; i++) {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='leaderboard_container'>
                    <div class='leaderboard_grid'>
                        <div class='leaderboard_grid_number'>
                            ${i+1}
                        </div>
                        <div class='leaderboard_grid_name'>
                            ${element.leaderboard_names[i]}
                        </div>
                        <div class='leaderboard_grid_score'>
                            ${element.leaderboard_scores[i]}
                        </div>
                    </div>
                </div>
            `
            main.appendChild(div_main);
        };
    });
}


async function update_score(url) {
    let already_done = false;
    const competitionId = localStorage.getItem('competitionId');
    const user = localStorage.getItem('user');
    const comp_status = localStorage.getItem('comp_status');
    const first_url = url + 'competition/' + competitionId;

    fetch(first_url)
    .then(res => res.json())
    .then(element => {
        for (let i = 0; i < element.leaderboard_names.length; i++) {
            if (element.leaderboard_names[i] === user) {
                already_done = true;
                break;
            }
        }

        if (comp_status === 'active' && !already_done) {
            main.innerHTML = '';
            const upload_url = url + 'competition/upload/' + competitionId;

            const div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='in_box_title'>
                    Uploading Score...
                </div>
            `;
            main.appendChild(div_main);

            return fetch(upload_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user': user,
                    'score': localStorage.getItem('correct'),
                    'id': competitionId
                })
            });
        } else if (comp_status != 'active') {
            throw new Error("This competition has already been completed. Check the competition portal for active competitions or check the leaderboard to view this competition's results");
        } else {
            throw new Error("You've already submitted this competition");
        }
    })
    .then(res => res.json())
    .then(response => {
        if (response.message === 'ok') {
            alert("Competition submitted successfully!");
            localStorage.setItem('in_comp_status', 'leaderboard');
            update_nav_buttons();
            update_leaderboard(APILINK);
        } else {
            alert("Competition submission failed. Please try again.");
        }
    })
    .catch(error => {
        alert(error.message);
        console.error('Error:', error);
    });
}

