localStorage.setItem('in_comp_status', 'information');
const nav_info = document.getElementById('nav_info');
const nav_comp = document.getElementById('nav_comp');
const nav_leaderboard = document.getElementById('nav_leaderboard');
const main = document.getElementById('main_element');

const APILINK = 'https://mathfirebackend.onrender.com/'

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


async function update_info(url) {
    main.innerHTML = '';
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
    main.innerHTML = '';
    url = url + 'competitions' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function(element) {
        element.problems.forEach((index) => {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='in_box_title'>
                    Competition
                </div>
                <div class='problem_container'>
                    <div class='problem_grid'>
                        <div class='problem_question'>
                            ${element.problems[index]}
                        </div>

                        <div class='problem_answer_area'>
                            <span style='color: #EE6C4D'>Answer: </span>
                            <input class='answer_input' id='${index}'>
                        </div>
                    </div>
                </div>
            `
            main.appendChild(div_main);
        });
        div_bottom = document.createElement('div');
        div_bottom.innerHTML = `
            <div style='padding-left: 27rem; padding-top: 2rem'>
                <button class="blob-btn" id='submit_button>
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

        answers = element.answers;

        submit_button = document.getElementById('submit_button');
        let answer_arr = [];
        let correct = 0;
        submit_button.onclick = () => {
            for (var i=0; i < element.max_score; i++) {
                answer_arr.push(document.getElementById(String(i)).value);
            }
            for (var i=0; i < element.max_score; i++) {
                if (answer_arr[i] == element.answer[i]) {
                    correct += 1;
                }
            }
            localStorage.setItem('correct', correct);
            update_score();
        }
    });
}


async function update_leaderboard(url){
    main.innerHTML = ''
    url = url + 'competitions/' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(function(element) {
        element.leaderboard_names.forEach((index) => {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='in_box_title'>
                    Leaderboard
                </div>
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


async function update_score(url) {
    main.innerHTML = ''
    url = url + 'competitions' + '/upload/' + localStorage.getItem('competitionId');
    fetch(url)
    .then(res => res.json())
    .then(() => {
        div_main = document.createElement('div');
        div_main.innerHTML = `
            <div class='in_box_title'>
                Uploading Score...
            </div>
        `
        main.appendChild(div_main);
    });

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user': localStorage.getItem('user') , "score": localStorage.getItem('correct'), "id": localStorage.getItem('competitionId')})
    })
    .then(res => res.json())
    .then(response => {
        if (response.message == 'ok') {
            alert("Competition submitted successfully!");
        } else {
            // Registration failed, display error message
            alert("Competition submission failed. Please try again.");
        }
    })
    .catch(error => console.error('Error:', error));
}

