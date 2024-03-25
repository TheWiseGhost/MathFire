const geo = document.getElementById('geo');
const algebra = document.getElementById('alegbra');
const centroid = document.getElementById('centroid');
const angle_bisector = document.getElementById('angle_bisector');
const two_pole = document.getElementById('two_pole');
const herons = document.getElementById('herons');
const x_intercept = document.getElementById('x_intercept');
const inverse_functions = document.getElementById('inverse_functions');
const challenge = document.getElementById('challenge');
var current = '1212';

geo.addEventListener('click', update('Geometry'));
alegbra.addEventListener('click', update('Alegbra'));
centroid.addEventListener('click', update('Centroid'));
angle_bisector.addEventListener('click', update('Angle Bisector'));
two_pole.addEventListener('click', update('Two Pole'));
herons.addEventListener('click', update("Heron's Formula"));
x_intercept.addEventListener('click', update('X-intercept'));
inverse_functions.addEventListener('click', update('Inverse Functions'));
challenge.addEventListener('click', update('Challenge Problems'));


function update(clicked) {
    current = clicked;
}
