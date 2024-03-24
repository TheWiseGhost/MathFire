const url = new URL(location.href);

const APILINK = 'http://localhost:8000/';

let refresh_button;
let submit_button;
let result_area;

const main = document.getElementById('trainer_area');
let answer;

update(APILINK);

async function set_problem(url) {
  let p_arr = [];
  url = url + "action/getting_problems";
  const res = await fetch(url);
  const data = await res.json();
  data.forEach((problem) => {
    p_arr.push(problem._problemId);
  });
  let problemId = p_arr[Math.floor(Math.random() * p_arr.length)];
  console.log(problemId);
  return problemId;
}


async function update(url){
  let id = await set_problem(url);
  url = url + id;
  console.log(url);
  console.log("id = " + id)
  fetch(url).then(res => res.json())
  .then(function(problem) {
      console.log(problem);
      img = problem.img;
      answer = problem.answer;
      div_main = document.createElement('div');
      div_main.innerHTML = `
        <div class='trainer_area'>
            <div class='problem_type_title'>
                ${problem.problemType}
            </div>

            <div class='home_button_area'>
                 <button class='home_button'>
                    <a href='index.html'><p class='material-symbols-outlined' style='font-size: 2.4rem'>Cottage</p></a>
                 </button>
            </div>

            <div class='image_area'>
                <img class='problem_image' src="${img}">
            </div>

            <div class='problem_text_area'>
                ${problem.problem}
            </div>

            <div class='answer_area'>
                Answer:
                <input class='answer_input'>
            </div>

            <div class='submit_button_area'>
                 <a href='trainer_portal.html'>
                    <button class="blob-btn2" id='submit'>
                        Submit
                        <span class="blob-btn2__inner">
                          <span class="blob-btn2__blobs">
                            <span class="blob-btn2__blob"></span>
                            <span class="blob-btn2__blob"></span>
                            <span class="blob-btn2__blob"></span>
                            <span class="blob-btn2__blob"></span>
                          </span>
                        </span>
                    </button>
                </a>
            </div>

            <div class='refresh_button_area'>
                 <a href='trainer_portal.html'>
                    <button class="blob-btn" id='refresh'>
                        Refresh
                        <span class="blob-btn__inner">
                          <span class="blob-btn__blobs">
                            <span class="blob-btn__blob"></span>
                            <span class="blob-btn__blob"></span>
                            <span class="blob-btn__blob"></span>
                            <span class="blob-btn__blob"></span>
                          </span>
                        </span>
                    </button>
                </a>
            </div>

            <div class='result_area'>

            </div>
      `;

      main.appendChild(div_main);
      refresh_button = document.getElementById('refresh');
      refresh_button.addEventListener('click', refresh_function);
      result_area = document.getElementById('problem_text_area')

      function refresh_function() {
        main.innerHTML = ''
        update(APILINK);
      }

      submit_button = document.getElementById('submit');
      submit_button.addEventListener('click', submit_function);

      function submit_function() {
        let input_answer = document.getElementById('answer_input').value;
        if (input_answer == answer) {
          result_area.innerHTML = 'Correct!';
        } else {
          result_area.innerHTML = 'Incorrect!';
        }

      }
  });
}


