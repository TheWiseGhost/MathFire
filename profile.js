const url = new URL(location.href);

const APILINK = 'https://mathfirebackend.onrender.com/';
//const APILINK = 'http://localhost:8000/'


const main = document.getElementById('stats_area');

let user = localStorage.getItem('user');
let username = document.getElementById('username');
username.innerHTML = user;


async function update_stats(url){
    url = url + 'competitions_search';
    const res = await fetch(url);
    const data = await res.json();
    data.forEach((element) => {
        if (element.status == 'completed') {
            for (var i = 0; i < element.leaderboard_names.length; i++) {
                if (user == element.leaderboard_names[i]) {
                    div_main = document.createElement('div');
                    div_main.innerHTML = `
                        <div class='stats_container'>
                            <div class='stats_grid'>
                                <div class='stats_grid_title'>
                                    ${element.title}
                                </div>
                                <div class='stats_grid_rank'>
                                    ${i+1}
                                </div>
                            </div>
                        </div>
                    `
                    main.appendChild(div_main);
                };
            };
        };
    });
}

update_stats(APILINK);
