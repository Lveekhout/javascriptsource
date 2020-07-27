let object

window.onload = () => {
    points = shape([[2,0],[0,2],[-2,0],[0,-2]], 2400)
    // points = wheel(2, 2400, 30)
    shapes = [
        circle(2, 240),
        line([-2,  0], [-0.1,  0], 240),
        line([ 0, -2], [ 0, -0.1], 240),
        line([ 2,  0], [ 0.1,  0], 240),
        line([ 0,  2], [ 0,  0.1], 240)
    ]
    object = new Object(document.getElementById('object'))
}