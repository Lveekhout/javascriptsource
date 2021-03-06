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