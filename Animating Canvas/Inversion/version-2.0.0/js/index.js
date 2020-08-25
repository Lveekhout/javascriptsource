let object

window.onload = () => {
    // points = shape([[2,0],[0,2],[-2,0],[0,-2]], 2400)
    // points = wheel(2, 2400, 30)
    // shapes = [
    //     translate_(circle(1, 240), [2,2]),
    //     translate_(line([-1,  0], [-0.01,  0], 240),[2,2]),
    //     translate_(line([ 0, -1], [ 0, -0.01], 240),[2,2]),
    //     translate_(line([ 1,  0], [ 0.01,  0], 240),[2,2]),
    //     translate_(line([ 0,  1], [ 0,  0.01], 240),[2,2])
    // ]

    shapes = [
        line([1, 10], [1, -10], 240),
        line([2, 10], [2, -10], 240),
        translate_(circle(0.5, 240), [1.5, 0.5]),
        translate_(circle(0.5, 240), [1.5, 1.5]),
        translate_(circle(0.5, 240), [1.5, 2.5]),
        translate_(circle(0.5, 240), [1.5, 3.5]),
        translate_(circle(0.5, 240), [1.5, 4.5]),
        translate_(circle(0.5, 240), [1.5, -0.5]),
        translate_(circle(0.5, 240), [1.5, -1.5]),
        translate_(circle(0.5, 240), [1.5, -2.5]),
        translate_(circle(0.5, 240), [1.5, -3.5]),
        translate_(circle(0.5, 240), [1.5, -4.5])
    ]

    object = new Object(document.getElementById('object'))
    object.setOriginRotation([1.5, 0])
}