let tijdlijn
window.onload = event => {
    tijdlijn = new Tijdlijn(document.getElementById("main-canvas"))
    tijdlijn.setZoom(60000)
    window.requestAnimationFrame(tijdlijn.draw)
}