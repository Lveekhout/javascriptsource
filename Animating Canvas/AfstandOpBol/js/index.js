window.onload = () => {
    object = new Object(document.getElementById('object'))
}

const fromOrigin = (n,e) => {
    return Math.acos(Math.cos(n) * Math.cos(e))
}