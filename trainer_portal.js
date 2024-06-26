const geo = document.getElementById('geo');
const algebra = document.getElementById('algebra');
const centroid = document.getElementById('centroid');
const angle_bisector = document.getElementById('angle_bisector');
const two_pole = document.getElementById('two_pole');
const herons = document.getElementById('herons');
const x_intercept = document.getElementById('x_intercept');
const vertex = document.getElementById('vertex');
const challenge = document.getElementById('challenge');
const mass_points = document.getElementById('mass_points');
const bases = document.getElementById('bases');
const probability = document.getElementById('probability');
const triangles = document.getElementById('triangles');
const circles = document.getElementById('circles');
const graph_theory = document.getElementById('graph_theory');
const system_equations = document.getElementById('system_equations');
const tangents = document.getElementById('tangents');
const percents = document.getElementById('percents');
const polynomials = document.getElementById('polynomials');
const angles = document.getElementById('angles');


if (geo) geo.onclick = () => { update_curr('Geometry') };
if (algebra) algebra.onclick = () => { update_curr('Algebra') };
if (centroid) centroid.onclick = () => { update_curr('Centroid') };
if (angle_bisector) angle_bisector.onclick = () => { update_curr('Angle Bisector') };
if (two_pole) two_pole.onclick = () => { update_curr('Two Pole') };
if (herons) herons.onclick = () => { update_curr("Heron's Formula") };
if (x_intercept) x_intercept.onclick = () => { update_curr('X-intercept') };
if (vertex) vertex.onclick = () => { update_curr('Vertex') };
if (challenge) challenge.onclick = () => { update_curr('Challenges') };
if (mass_points) mass_points.onclick = () => { update_curr('Mass Points') };
if (bases) bases.onclick = () => { update_curr('Bases') };
if (probability) probability.onclick = () => { update_curr('Probability') };
if (triangles) triangles.onclick = () => { update_curr('Triangles') };
if (circles) circles.onclick = () => { update_curr('Circles') };
if (graph_theory) graph_theory.onclick = () => { update_curr('Graph Theory') };
if (system_equations) system_equations.onclick = () => { update_curr('System Equations') };
if (tangents) tangents.onclick = () => { update_curr('Tangents') };
if (percents) percents.onclick = () => { update_curr('Percents') };
if (polynomials) polynomials.onclick = () => { update_curr('Polynomials') };
if (angles) angles.onclick = () => { update_curr('Angles') };

function update_curr(clicked) {
    localStorage.setItem('current_problem_type', clicked)
}
