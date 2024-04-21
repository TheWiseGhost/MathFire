const url = new URL(location.href);

//const APILINK = 'https://mathfirebackend.onrender.com/';
const APILINK = 'http://localhost:8000/'

const main = document.getElementById('competitions_container');

let checkbox = document.getElementById('reg-log');
localStorage.setItem('comp_status', 'active');


checkbox.onclick = () => {
    let curr = localStorage.getItem('comp_status');
    if (curr == 'active') {
        localStorage.setItem('comp_status', 'completed');
    } else {
        localStorage.setItem('comp_status', 'active');
    }
    main.innerHTML = '';
    competitions(APILINK);
    main.scrollIntoView({ behavior: 'smooth'});
}

competitions(APILINK);

async function competitions(url){
    url = url + 'competitions_search';
    const res = await fetch(url);
    const data = await res.json();
    data.forEach((element) => {
        if (element.status == localStorage.getItem('comp_status')) {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='competitions' id='${element._competitionId}'>
                    <div class='container'>
                        <div class='bg_card'>
                            <div class='comp_title'>
                                ${element.title}
                            </div>

                            <div class='comp_date'>
                                <span class='small_icons'><p class='material-symbols-outlined'>calendar_month</p></span>
                                ${element.date}
                            </div>

                            <div class='comp_description'>
                                <span class='small_icons'><p class='material-symbols-outlined'>Info</p></span>
                                ${element.info}
                            </div>

                            <div class='comp_location'>
                                <span class='small_icons'><p class='material-symbols-outlined'>Place</p></span>
                                ${element.location}
                            </div>

                            <div class='comp_time'>
                                <span class='small_icons'><p class='material-symbols-outlined'>Timer</p></span>
                                ${element.time}
                            </div>

                        </div>
                    </div>
                </div> `

            main.appendChild(div_main);
            let container = document.getElementById(`${element._competitionId}`)
            container.onclick = () => {
                let user = localStorage.getItem('user');
                if (user != 'none' && user) {
                    localStorage.setItem('competitionId', `${element._competitionId}`);
                    window.location.href = 'in_competition.html';
                } else {
                    window.alert('Please login to participate in a competition!')
                }
            }
        }
    });
  }

