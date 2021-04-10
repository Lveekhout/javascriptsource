let json = []

window.onload = () => {
    object = new Object(document.getElementById('object'))
    textareaInput(document.getElementById("textarea001").value)
}

const textareaInput = j => {
    try {
        json = JSON.parse(j)
        object.paint()
        document.getElementById("textarea001").style.borderColor = "green"
    } catch (err) {
        document.getElementById("textarea001").style.borderColor = "red"
    }
}

const ontbind = (v, rc) => {
    const x = (v[0] * rc[1] * rc[1] + v[1] * rc[0] * rc[1]) / (Math.pow(rc[0], 2) + Math.pow(rc[1], 2))
    if (x == 0) {
        return [0, v[1], v[0] - x, 0]
    } else {
        const y = rc[0] * x / rc[1]
        return [x, y, v[0] - x, v[1] - y]
    }
}
