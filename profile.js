const url = new URL(location.href);

//const APILINK = 'https://mathfirebackend.onrender.com/';
const APILINK = 'http://localhost:8000/'


const main = document.getElementById('profile_area');

let user = localStorage.getItem('user');


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
