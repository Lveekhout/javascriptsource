window.onload = () => {
    vierkant = new Vierkant(document.getElementById('vierkant'))
    parabool = new Parabool(document.getElementById('parabool'))
    parabool.setOnSetXPos(x => vierkant.setX(x))
}