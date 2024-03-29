const url = new URL(location.href);

const APILINK = 'http://localhost:8000/';


// For backend update; could just re-initalize in function but oh well
let refresh_button;
let submit_button;
let result_area;

const main = document.getElementById('trainer_area');
let answer;
let problem_type = localStorage.getItem('current_problem_type')


if (problem_type == 'Challenge Problems') {
    update(APILINK)
}


if (problem_type == 'Geometry') {
    function main_load() {
        let possible = ['gCentroid', 'gAngle Bisector', 'gTwo Pole', "gHeron's Formula"];
        let rand_num = Math.round(Math.random() * 3);
        problem_type = possible[rand_num]
        if (problem_type == 'gCentroid') {
            function load() {
                function reroll(xa, xb, xc, ya, yb, yc) {
                    var nxa, nxb, nxc, nya, nyb, nyc;
                    nxa = xa;
                    nxb = xb;
                    nxc = xc;
                    nya = ya;
                    nyb = yb;
                    nyc = yc;
                    var should_reroll = true;
                    var failed = false;

                    while (should_reroll == true){
                        failed = false;
                        if (nxa == nxb == nxc) {
                            nxa = Math.round(Math.random() * 19) + 1;
                            nxb = Math.round(Math.random() * 19) + 1;
                            nxc = Math.round(Math.random() * 19) + 1;
                            failed = true;
                        }
                        if (nya == nyb == nyc) {
                            nya = Math.round(Math.random() * 19) + 1;
                            nyb = Math.round(Math.random() * 19) + 1;
                            nyc = Math.round(Math.random() * 19) + 1;
                            failed = true
                        }
                        should_reroll = failed;
                    }

                    var return_arr = [nxa, nya, nxb, nyb, nxc, nyc];
                    return return_arr;
                }


                function get_answer(xa, xb, xc, ya, yb, yc) {
                    var x_coord = (xa+xb+xc) / 3;
                    var y_coord = (ya+yb+yc) / 3;

                    var return_arr = [x_coord, y_coord];
                    return return_arr;
                }


                function make_coordinate(x, y) {
                    var coordinate = "(" + x + "," + y + ")";
                    return coordinate;
                }


                function centroid_func() {
                    var x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c;
                    x_coord_a = Math.round(Math.random() * 19) + 1;
                    x_coord_b = Math.round(Math.random() * 19) + 1;
                    x_coord_c = Math.round(Math.random() * 19) + 1;
                    y_coord_a = Math.round(Math.random() * 19) + 1;
                    y_coord_b = Math.round(Math.random() * 19) + 1;
                    y_coord_c = Math.round(Math.random() * 19) + 1;

                    var new_coords = reroll(x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c);

                    x_coord_a = new_coords[0];
                    x_coord_b = new_coords[2];
                    x_coord_c = new_coords[4];
                    y_coord_a = new_coords[1];
                    y_coord_b = new_coords[3];
                    y_coord_c = new_coords[5];

                    var answer_arr = get_answer(x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c);
                    var answerx = +answer_arr[0].toFixed(2);
                    var answery = +answer_arr[1].toFixed(2);


                    var answer = make_coordinate(answerx, answery);

                    var return_arr = [answer, x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c];
                    return return_arr;
                }


                var centroid = centroid_func();
                var answer = centroid[0];

                var coord_a, coord_b, coord_c;
                coord_a = make_coordinate(centroid[1], centroid[4]);
                coord_b = make_coordinate(centroid[2], centroid[5]);
                coord_c = make_coordinate(centroid[3], centroid[6]);

                let question = "Coordinate A = " + coord_a + ", Coordinate B = " + coord_b + ", and Coordinate C = " + coord_c;


                function check_answer() {
                    var input = document.getElementById('answer_input').value;
                    if (input == answer) {
                        return true;
                    } else {
                        return false;
                    }
                }

                let img = 'Centroid.png';
                let div_main = document.createElement('div');
                div_main.innerHTML = `
                    <div class='trainer_area' id='trainer_area'>
                        <div class='problem_type_title'>
                            Geometry
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
                            ${question}
                        </div>

                        <div class='answer_area'>
                            Answer:
                            <input class='answer_input' id='answer_input'>
                        </div>

                        <div class='submit_button_area'>
                            <a href='#'>
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
                            <a href='#'>
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

                        <div class='result_area' id='result_area'>

                        </div>
                    </div>
                `;

                main.appendChild(div_main);

                let result_area = document.getElementById('result_area');

                document.getElementById('submit').onclick = function () {
                    var correct = check_answer();
                    if (correct == true) {
                        result_area.textContent = "Correct!";
                    } else {
                        result_area.textContent = "Incorrect";
                    }
                }

                document.getElementById('refresh').onclick = function () {
                    main.innerHTML = '';
                    main_load();
                }

            }
            load();
        }


        if (problem_type == 'gAngle Bisector') {
            function load() {
                function angleb_func() {
                    var side_a, side_b, side_c;
                    side_a = Math.round(Math.random() * 14) + 1;
                    side_b = Math.round(Math.random() * 14) + 1;
                    side_c = Math.round(Math.random() * 14) + 1;

                    var answer = side_c * side_a / side_b;
                    answer = +answer.toFixed(2);

                    var should_reroll = true;
                    var failed = false;
                    while (should_reroll == true) {
                        failed = false;
                        if (side_a >= side_b + side_c + answer) {
                            side_a = Math.round(Math.random() * 14) + 1;
                            side_b = Math.round(Math.random() * 14) + 1;
                            side_c = Math.round(Math.random() * 14) + 1;
                            answer = side_c * side_a / side_b;
                            answer = +answer.toFixed(2);
                            failed = true;
                        }
                        if (side_b >= side_a + side_c + answer) {
                            side_a = Math.round(Math.random() * 14) + 1;
                            side_b = Math.round(Math.random() * 14) + 1;
                            side_c = Math.round(Math.random() * 14) + 1;
                            answer = side_c * side_a / side_b;
                            answer = +answer.toFixed(2);
                            failed = true;
                        }
                        if (side_c + answer >= side_b + side_a) {
                            side_a = Math.round(Math.random() * 14) + 1;
                            side_b = Math.round(Math.random() * 14) + 1;
                            side_c = Math.round(Math.random() * 14) + 1;
                            answer = side_c * side_a / side_b;
                            answer = +answer.toFixed(2);
                            failed = true;
                        }
                        should_reroll = failed;
                    }

                    var return_arr = [answer, side_a, side_b, side_c];
                    return return_arr;
                }


                var angleb_arr = angleb_func();
                var answer = angleb_arr[0];

                let question = "Side AC = " + angleb_arr[1] + " and Side AB = " + angleb_arr[2] + " and Side BD = " + angleb_arr[3]


                function check_answer() {
                    var input = document.getElementById('answer_input').value;
                    if (input == answer) {
                        return true;
                    } else {
                        return false;
                    }
                }


                let img = 'Angle_Bisector.png';
                let div_main = document.createElement('div');
                div_main.innerHTML = `
                    <div class='trainer_area' id='trainer_area'>
                        <div class='problem_type_title'>
                            Geometry
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
                            ${question}
                        </div>

                        <div class='answer_area'>
                            Answer:
                            <input class='answer_input' id='answer_input'>
                        </div>

                        <div class='submit_button_area'>
                            <a href='#'>
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
                            <a href='#'>
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

                        <div class='result_area' id='result_area'>

                        </div>
                    </div>
                `;

                main.appendChild(div_main);

                let result_area = document.getElementById('result_area');

                document.getElementById('submit').onclick = function () {
                    var correct = check_answer();
                    if (correct == true) {
                        result_area.textContent = "Correct!";
                    } else {
                        result_area.textContent = "Incorrect";
                    }
                }

                document.getElementById('refresh').onclick = function () {
                    main.innerHTML = '';
                    main_load();
                }
            }

            load();
        }



        if (problem_type == 'gTwo Pole') {
            function load() {
                function two_pole_problem() {
                    let pole_a, pole_b, top_answer, bottom_answer, answer, return_arr;
                    pole_a = Math.round(Math.random() * 19) + 1;
                    pole_b = Math.round(Math.random() * 19) + 1;

                    top_answer = pole_a * pole_b;
                    bottom_answer = pole_a + pole_b;
                    answer = (pole_a * pole_b) / (pole_a + pole_b);

                    return_arr = [pole_a, pole_b, top_answer, bottom_answer, answer];
                    return return_arr;
                }

                let poles = two_pole_problem();
                answer = poles[2].toString() + "/" + poles[3].toString();
                let alt_answer = poles[4].toString();

                let question = "Pole A = " + poles[0] + " and " + "Pole B = " + poles[1];

                function check_answer() {
                    let input = document.getElementById('answer_input').value;
                    if (input == answer) {
                        return true;
                    } else if (input == alt_answer) {
                        return true;
                    } else {
                        return false;
                    }
                }

                let img = 'Two_Pole.png';
                let div_main = document.createElement('div');
                div_main.innerHTML = `
                    <div class='trainer_area' id='trainer_area'>
                        <div class='problem_type_title'>
                            Geometry
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
                            ${question}
                        </div>

                        <div class='answer_area'>
                            Answer:
                            <input class='answer_input' id='answer_input'>
                        </div>

                        <div class='submit_button_area'>
                            <a href='#'>
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
                            <a href='#'>
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

                        <div class='result_area' id='result_area'>

                        </div>
                    </div>
                `;

                main.appendChild(div_main);

                let result_area = document.getElementById('result_area');

                document.getElementById('submit').onclick = function () {
                    var correct = check_answer();
                    if (correct == true) {
                        result_area.textContent = "Correct!";
                    } else {
                        result_area.textContent = "Incorrect";
                    }
                }

                document.getElementById('refresh').onclick = function () {
                    main.innerHTML = '';
                    main_load();
                }
            }

            load();
        }


        if (problem_type == "gHeron's Formula") {
            function load() {
                function reroll(a, b, c) {
                    var should_reroll = true;
                    var failed = false;
                    var new_a, new_b, new_c;
                    new_a = a;
                    new_b = b;
                    new_c = c;
                    while (should_reroll == true) {
                        failed = false;
                        if (new_a >= new_b + new_c) {
                            new_a = Math.round(Math.random() * 9) + 1;
                            new_b = Math.round(Math.random() * 9) + 1;
                            new_c = Math.round(Math.random() * 9) + 1;
                            failed = true;
                        }
                        if (new_b >= new_a + new_c) {
                            new_a = Math.round(Math.random() * 9) + 1;
                            new_b = Math.round(Math.random() * 9) + 1;
                            new_c = Math.round(Math.random() * 9) + 1;
                            failed = true;
                        }
                        if (new_c >= new_b + new_a) {
                            new_a = Math.round(Math.random() * 9) + 1;
                            new_b = Math.round(Math.random() * 9) + 1;
                            new_c = Math.round(Math.random() * 9) + 1;
                            failed = true;
                        }
                        should_reroll = failed;
                    }
                    var return_arr = [new_a, new_b, new_c];
                    return return_arr;
                }

                function simplify(num) {
                    var simplified_num = 1;
                    var new_num;
                    var possible_squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961];
                    var cut_index;
                    for (var x = 0; x < 30; x++) {
                        if ((num % possible_squares[30-x]) == 0) {break;}
                        cut_index = 30 - x - 1;
                    }
                    new_num = num / possible_squares[cut_index];
                    simplified_num = cut_index + 1;
                    var return_arr = [simplified_num, new_num];
                    return return_arr;
                }

                function herons() {
                    var side_a, side_b, side_c, side_arr, semi_perimeter, unsimplified_answer, answer_arr, answer;
                    side_a = Math.round(Math.random() * 9) + 1;
                    side_b = Math.round(Math.random() * 9) + 1;
                    side_c = Math.round(Math.random() * 9) + 1;

                    side_arr = reroll(side_a, side_b, side_c);
                    side_a = side_arr[0];
                    side_b = side_arr[1];
                    side_c = side_arr[2];


                    semi_perimeter = (1/2)*(side_a + side_b + side_c);
                    unsimplified_answer = semi_perimeter * (semi_perimeter - side_a) * (semi_perimeter - side_b) * (semi_perimeter - side_c);

                    answer_arr = simplify(unsimplified_answer);
                    if (answer_arr[1] == 1) {
                        answer = answer_arr[0];
                    } else if (answer_arr[0] == 1){
                        answer = "sqrt(" + answer_arr[1] + ")";
                    }
                    else {
                        answer = answer_arr[0] + "sqrt(" + answer_arr[1] + ")";
                    }

                    var return_arr = [side_a, side_b, side_c, answer];
                    return return_arr;
                }


                var herons_arr = herons();
                var answer = herons_arr[3];

                let question = "Side A = " + herons_arr[0] + ", Side B = " + herons_arr[1] + ", Side C = " + herons_arr[2]

                function check_answer() {
                    var input = document.getElementById('answer_input').value;
                    if (input == answer) {
                        return true;
                    } else {
                        return false;
                    }
                }


                let img = 'Herons.png';
                let div_main = document.createElement('div');
                div_main.innerHTML = `
                    <div class='trainer_area' id='trainer_area'>
                        <div class='problem_type_title'>
                            Geometry
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
                            ${question}
                        </div>

                        <div class='answer_area'>
                            Answer:
                            <input class='answer_input' id='answer_input'>
                        </div>

                        <div class='submit_button_area'>
                            <a href='#'>
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
                            <a href='#'>
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

                        <div class='result_area' id='result_area'>

                        </div>
                    </div>
                `;

                main.appendChild(div_main);

                let result_area = document.getElementById('result_area');

                document.getElementById('submit').onclick = function () {
                    var correct = check_answer();
                    if (correct == true) {
                        result_area.textContent = "Correct!";
                    } else {
                        result_area.textContent = "Incorrect";
                    }
                }

                document.getElementById('refresh').onclick = function () {
                    main.innerHTML = '';
                    main_load();
                }
            }

            load();
        }
    }
    main_load();
}




if (problem_type == 'Centroid') {
    function load() {
        function reroll(xa, xb, xc, ya, yb, yc) {
            var nxa, nxb, nxc, nya, nyb, nyc;
            nxa = xa;
            nxb = xb;
            nxc = xc;
            nya = ya;
            nyb = yb;
            nyc = yc;
            var should_reroll = true;
            var failed = false;

            while (should_reroll == true){
                failed = false;
                if (nxa == nxb == nxc) {
                    nxa = Math.round(Math.random() * 19) + 1;
                    nxb = Math.round(Math.random() * 19) + 1;
                    nxc = Math.round(Math.random() * 19) + 1;
                    failed = true;
                }
                if (nya == nyb == nyc) {
                    nya = Math.round(Math.random() * 19) + 1;
                    nyb = Math.round(Math.random() * 19) + 1;
                    nyc = Math.round(Math.random() * 19) + 1;
                    failed = true
                }
                should_reroll = failed;
            }

            var return_arr = [nxa, nya, nxb, nyb, nxc, nyc];
            return return_arr;
        }


        function get_answer(xa, xb, xc, ya, yb, yc) {
            var x_coord = (xa+xb+xc) / 3;
            var y_coord = (ya+yb+yc) / 3;

            var return_arr = [x_coord, y_coord];
            return return_arr;
        }


        function make_coordinate(x, y) {
            var coordinate = "(" + x + "," + y + ")";
            return coordinate;
        }


        function centroid_func() {
            var x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c;
            x_coord_a = Math.round(Math.random() * 19) + 1;
            x_coord_b = Math.round(Math.random() * 19) + 1;
            x_coord_c = Math.round(Math.random() * 19) + 1;
            y_coord_a = Math.round(Math.random() * 19) + 1;
            y_coord_b = Math.round(Math.random() * 19) + 1;
            y_coord_c = Math.round(Math.random() * 19) + 1;

            var new_coords = reroll(x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c);

            x_coord_a = new_coords[0];
            x_coord_b = new_coords[2];
            x_coord_c = new_coords[4];
            y_coord_a = new_coords[1];
            y_coord_b = new_coords[3];
            y_coord_c = new_coords[5];

            var answer_arr = get_answer(x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c);
            var answerx = +answer_arr[0].toFixed(2);
            var answery = +answer_arr[1].toFixed(2);


            var answer = make_coordinate(answerx, answery);

            var return_arr = [answer, x_coord_a, x_coord_b, x_coord_c, y_coord_a, y_coord_b, y_coord_c];
            return return_arr;
        }


        var centroid = centroid_func();
        var answer = centroid[0];

        var coord_a, coord_b, coord_c;
        coord_a = make_coordinate(centroid[1], centroid[4]);
        coord_b = make_coordinate(centroid[2], centroid[5]);
        coord_c = make_coordinate(centroid[3], centroid[6]);

        let question = "Coordinate A = " + coord_a + ", Coordinate B = " + coord_b + ", and Coordinate C = " + coord_c;


        function check_answer() {
            var input = document.getElementById('answer_input').value;
            if (input == answer) {
                return true;
            } else {
                return false;
            }
        }

        let img = 'Centroid.png';
        let div_main = document.createElement('div');
        div_main.innerHTML = `
            <div class='trainer_area' id='trainer_area'>
                <div class='problem_type_title'>
                    ${problem_type}
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
                    ${question}
                </div>

                <div class='answer_area'>
                    Answer:
                    <input class='answer_input' id='answer_input'>
                </div>

                <div class='submit_button_area'>
                    <a href='#'>
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
                    <a href='#'>
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

                <div class='result_area' id='result_area'>

                </div>
            </div>
        `;

        main.appendChild(div_main);

        let result_area = document.getElementById('result_area');

        document.getElementById('submit').onclick = function () {
            var correct = check_answer();
            if (correct == true) {
                result_area.textContent = "Correct!";
            } else {
                result_area.textContent = "Incorrect";
            }
        }

        document.getElementById('refresh').onclick = function () {
            main.innerHTML = '';
            load();
        }

    }
    load();
}


if (problem_type == 'Angle Bisector') {
    function load() {
        function angleb_func() {
            var side_a, side_b, side_c;
            side_a = Math.round(Math.random() * 14) + 1;
            side_b = Math.round(Math.random() * 14) + 1;
            side_c = Math.round(Math.random() * 14) + 1;

            var answer = side_c * side_a / side_b;
            answer = +answer.toFixed(2);

            var should_reroll = true;
            var failed = false;
            while (should_reroll == true) {
                failed = false;
                if (side_a >= side_b + side_c + answer) {
                    side_a = Math.round(Math.random() * 14) + 1;
                    side_b = Math.round(Math.random() * 14) + 1;
                    side_c = Math.round(Math.random() * 14) + 1;
                    answer = side_c * side_a / side_b;
                    answer = +answer.toFixed(2);
                    failed = true;
                }
                if (side_b >= side_a + side_c + answer) {
                    side_a = Math.round(Math.random() * 14) + 1;
                    side_b = Math.round(Math.random() * 14) + 1;
                    side_c = Math.round(Math.random() * 14) + 1;
                    answer = side_c * side_a / side_b;
                    answer = +answer.toFixed(2);
                    failed = true;
                }
                if (side_c + answer >= side_b + side_a) {
                    side_a = Math.round(Math.random() * 14) + 1;
                    side_b = Math.round(Math.random() * 14) + 1;
                    side_c = Math.round(Math.random() * 14) + 1;
                    answer = side_c * side_a / side_b;
                    answer = +answer.toFixed(2);
                    failed = true;
                }
                should_reroll = failed;
            }

            var return_arr = [answer, side_a, side_b, side_c];
            return return_arr;
        }


        var angleb_arr = angleb_func();
        var answer = angleb_arr[0];

        let question = "Side AC = " + angleb_arr[1] + " and Side AB = " + angleb_arr[2] + " and Side BD = " + angleb_arr[3]


        function check_answer() {
            var input = document.getElementById('answer_input').value;
            if (input == answer) {
                return true;
            } else {
                return false;
            }
        }


        let img = 'Angle_Bisector.png';
        let div_main = document.createElement('div');
        div_main.innerHTML = `
            <div class='trainer_area' id='trainer_area'>
                <div class='problem_type_title'>
                    ${problem_type}
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
                    ${question}
                </div>

                <div class='answer_area'>
                    Answer:
                    <input class='answer_input' id='answer_input'>
                </div>

                <div class='submit_button_area'>
                    <a href='#'>
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
                    <a href='#'>
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

                <div class='result_area' id='result_area'>

                </div>
            </div>
        `;

        main.appendChild(div_main);

        let result_area = document.getElementById('result_area');

        document.getElementById('submit').onclick = function () {
            var correct = check_answer();
            if (correct == true) {
                result_area.textContent = "Correct!";
            } else {
                result_area.textContent = "Incorrect";
            }
        }

        document.getElementById('refresh').onclick = function () {
            main.innerHTML = '';
            load();
        }
    }

    load();
}



if (problem_type == 'Two Pole') {
    function load() {
        function two_pole_problem() {
            let pole_a, pole_b, top_answer, bottom_answer, answer, return_arr;
            pole_a = Math.round(Math.random() * 19) + 1;
            pole_b = Math.round(Math.random() * 19) + 1;

            top_answer = pole_a * pole_b;
            bottom_answer = pole_a + pole_b;
            answer = (pole_a * pole_b) / (pole_a + pole_b);

            return_arr = [pole_a, pole_b, top_answer, bottom_answer, answer];
            return return_arr;
        }

        let poles = two_pole_problem();
        answer = poles[2].toString() + "/" + poles[3].toString();
        let alt_answer = poles[4].toString();

        let question = "Pole A = " + poles[0] + " and " + "Pole B = " + poles[1];

        function check_answer() {
            let input = document.getElementById('answer_input').value;
            if (input == answer) {
                return true;
            } else if (input == alt_answer) {
                return true;
            } else {
                return false;
            }
        }

        let img = 'Two_Pole.png';
        let div_main = document.createElement('div');
        div_main.innerHTML = `
            <div class='trainer_area' id='trainer_area'>
                <div class='problem_type_title'>
                    ${problem_type}
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
                    ${question}
                </div>

                <div class='answer_area'>
                    Answer:
                    <input class='answer_input' id='answer_input'>
                </div>

                <div class='submit_button_area'>
                    <a href='#'>
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
                    <a href='#'>
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

                <div class='result_area' id='result_area'>

                </div>
            </div>
        `;

        main.appendChild(div_main);

        let result_area = document.getElementById('result_area');

        document.getElementById('submit').onclick = function () {
            var correct = check_answer();
            if (correct == true) {
                result_area.textContent = "Correct!";
            } else {
                result_area.textContent = "Incorrect";
            }
        }

        document.getElementById('refresh').onclick = function () {
            main.innerHTML = '';
            load();
        }
    }

    load();
}


if (problem_type == "Heron's Formula") {
    function load() {
        function reroll(a, b, c) {
            var should_reroll = true;
            var failed = false;
            var new_a, new_b, new_c;
            new_a = a;
            new_b = b;
            new_c = c;
            while (should_reroll == true) {
                failed = false;
                if (new_a >= new_b + new_c) {
                    new_a = Math.round(Math.random() * 9) + 1;
                    new_b = Math.round(Math.random() * 9) + 1;
                    new_c = Math.round(Math.random() * 9) + 1;
                    failed = true;
                }
                if (new_b >= new_a + new_c) {
                    new_a = Math.round(Math.random() * 9) + 1;
                    new_b = Math.round(Math.random() * 9) + 1;
                    new_c = Math.round(Math.random() * 9) + 1;
                    failed = true;
                }
                if (new_c >= new_b + new_a) {
                    new_a = Math.round(Math.random() * 9) + 1;
                    new_b = Math.round(Math.random() * 9) + 1;
                    new_c = Math.round(Math.random() * 9) + 1;
                    failed = true;
                }
                should_reroll = failed;
            }
            var return_arr = [new_a, new_b, new_c];
            return return_arr;
        }

        function simplify(num) {
            var simplified_num = 1;
            var new_num;
            var possible_squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961];
            var cut_index;
            for (var x = 0; x < 30; x++) {
                if ((num % possible_squares[30-x]) == 0) {break;}
                cut_index = 30 - x - 1;
            }
            new_num = num / possible_squares[cut_index];
            simplified_num = cut_index + 1;
            var return_arr = [simplified_num, new_num];
            return return_arr;
        }

        function herons() {
            var side_a, side_b, side_c, side_arr, semi_perimeter, unsimplified_answer, answer_arr, answer;
            side_a = Math.round(Math.random() * 9) + 1;
            side_b = Math.round(Math.random() * 9) + 1;
            side_c = Math.round(Math.random() * 9) + 1;

            side_arr = reroll(side_a, side_b, side_c);
            side_a = side_arr[0];
            side_b = side_arr[1];
            side_c = side_arr[2];


            semi_perimeter = (1/2)*(side_a + side_b + side_c);
            unsimplified_answer = semi_perimeter * (semi_perimeter - side_a) * (semi_perimeter - side_b) * (semi_perimeter - side_c);

            answer_arr = simplify(unsimplified_answer);
            if (answer_arr[1] == 1) {
                answer = answer_arr[0];
            } else if (answer_arr[0] == 1){
                answer = "sqrt(" + answer_arr[1] + ")";
            }
            else {
                answer = answer_arr[0] + "sqrt(" + answer_arr[1] + ")";
            }

            var return_arr = [side_a, side_b, side_c, answer];
            return return_arr;
        }


        var herons_arr = herons();
        var answer = herons_arr[3];

        let question = "Side A = " + herons_arr[0] + ", Side B = " + herons_arr[1] + ", Side C = " + herons_arr[2]

        function check_answer() {
            var input = document.getElementById('answer_input').value;
            if (input == answer) {
                return true;
            } else {
                return false;
            }
        }


        let img = 'Herons.png';
        let div_main = document.createElement('div');
        div_main.innerHTML = `
            <div class='trainer_area' id='trainer_area'>
                <div class='problem_type_title'>
                    ${problem_type}
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
                    ${question}
                </div>

                <div class='answer_area'>
                    Answer:
                    <input class='answer_input' id='answer_input'>
                </div>

                <div class='submit_button_area'>
                    <a href='#'>
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
                    <a href='#'>
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

                <div class='result_area' id='result_area'>

                </div>
            </div>
        `;

        main.appendChild(div_main);

        let result_area = document.getElementById('result_area');

        document.getElementById('submit').onclick = function () {
            var correct = check_answer();
            if (correct == true) {
                result_area.textContent = "Correct!";
            } else {
                result_area.textContent = "Incorrect";
            }
        }

        document.getElementById('refresh').onclick = function () {
            main.innerHTML = '';
            load();
        }
    }

    load();
}



// Code for backend needed in challenge problems
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

async function update(url) {
    let id = await set_problem(url);
    url = url + "challenges/" + id;
    console.log(url);
    console.log("id = " + id)
    fetch(url)
        .then(res => res.json())
        .then(function (problem) {
            console.log(problem);
            img = problem.img;
            answer = problem.answer;
            div_main = document.createElement('div');
            div_main.innerHTML = `
                <div class='trainer_area' id='trainer_area'>
                    <div class='problem_type_title'>
                        ${problem_type}
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
                        <input class='answer_input' id='answer_input'>
                    </div>

                    <div class='submit_button_area'>
                        <a href='#'>
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
                        <a href='#'>
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

                    <div class='result_area' id='result_area'>

                    </div>
                </div>
            `;

            main.appendChild(div_main);
            refresh_button = document.getElementById('refresh');
            refresh_button.addEventListener('click', refresh_function);
            result_area = document.getElementById('result_area')

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

