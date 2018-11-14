window.onload = () => {
    cirkeloppervlak = new Cirkeloppervlak(document.getElementById('cirkeloppervlak'))
    stage1.oninput(stage1.value)
    straal.oninput(straal.value)
}

let checkStage = () => {
    if (stage1.value==stage1.max) stage2.disabled = false
    else stage2.disabled = true

    if (stage2.value==stage2.max) stage1.disabled = false
    else stage1.disabled = true
}