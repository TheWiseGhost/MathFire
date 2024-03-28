const geo = document.getElementById('geo');
const algebra = document.getElementById('algebra');
const centroid = document.getElementById('centroid');
const angle_bisector = document.getElementById('angle_bisector');
const two_pole = document.getElementById('two_pole');
const herons = document.getElementById('herons');
const x_intercept = document.getElementById('x_intercept');
const vertex = document.getElementById('vertex');
const challenge = document.getElementById('challenge');

if (geo) geo.onclick = () => { update_curr('Geometry') };
if (algebra) algebra.onclick = () => { update_curr('Algebra') };
if (centroid) centroid.onclick = () => { update_curr('Centroid') };
if (angle_bisector) angle_bisector.onclick = () => { update_curr('Angle Bisector') };
if (two_pole) two_pole.onclick = () => { update_curr('Two Pole') };
if (herons) herons.onclick = () => { update_curr("Heron's Formula") };
if (x_intercept) x_intercept.onclick = () => { update_curr('X-intercept') };
if (vertex) vertex.onclick = () => { update_curr('Vertex') };
if (challenge) challenge.onclick = () => { update_curr('Challenge Problems') };

function update_curr(clicked) {
    localStorage.setItem('current_problem_type', clicked)
}
