const url = new URL(location.href);

const APILINK = 'https://mathfirebackend.onrender.com/';

const main = document.getElementById('competitions_container');

let checkbox = document.getElementById('reg-log');
localStorage.setItem('comp_status', 'active');

checkbox.onclick = () => {
    let curr = localStorage.getItem('comp_status');
    if (curr == 'active') {
        localStorage.setItem('comp_status', 'completed');
        competitions(APILINK);
    } else {
        localStorage.setItem('comp_status', 'active');
        competitions(APILINK);
    }
}


function competitions(url){
    url = url + '/competitions_search';
    fetch(url).then(res => res.json())
    .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
        if (element.status == localStorage.getItem('comp_status')) {
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='competitions'>
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
                                ${element.description}
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

            main.appendChild(div_row);
        }
    });
  });
  }

