const geo = document.getElementById('geo');
const algebra = document.getElementById('alegbra');
const centroid = document.getElementById('centroid');
const angle_bisector = document.getElementById('angle_bisector');
const two_pole = document.getElementById('two_pole');
const herons = document.getElementById('herons');
const x_intercept = document.getElementById('x_intercept');
const inverse_functions = document.getElementById('inverse_functions');
const challenge = document.getElementById('challenge');
var current = 'my_null';

geo.addEventListener('click', () => {update_curr('Geometry')});
alegbra.addEventListener('click', () => {update_curr('Alegbra')});
centroid.addEventListener('click', () => {update_curr('Centroid')});
angle_bisector.addEventListener('click', () => {update_curr('Angle Bisector')});
two_pole.addEventListener('click', () => {update_curr('Two Pole')});
herons.addEventListener('click', () => {update_curr("Heron's Formula")});
x_intercept.addEventListener('click', () => {update_curr('X-intercept')});
inverse_functions.addEventListener('click', () => {update_curr('Inverse Functions')});
challenge.addEventListener('click', () => {update_curr('Challenge Problems')});


function update_curr(clicked) {
    current = clicked;
}
