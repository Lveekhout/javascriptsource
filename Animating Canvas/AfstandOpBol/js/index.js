window.onload = () => {
    // object = new Object(document.getElementById('object'))
    render3D = new Render3D(document.getElementById('object'))
}

const distanceFromOrigin = (n, e) => {
    return Math.acos(Math.cos(n) * Math.cos(e))
}

const arc2coord = d => {
    return [Math.sin(d), Math.cos(d)]
}

const coord2arc = (c) => {
    if (c[0]<0) return 2*Math.PI-Math.acos(c[1])
    else return Math.acos(c[1])
}
