window.onload = () => {
    vierkant = new Vierkant(document.getElementById('vierkant'))
    parabool = new Parabool(document.getElementById('parabool'))
    parabool.onSetXPos = x => vierkant.setX(x)
}