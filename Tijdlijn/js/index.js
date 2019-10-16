let tijdlijn
window.onload = event => {
    tijdlijn = new Tijdlijn(document.getElementById("main-canvas"))
    tijdlijn.setZoom(135000000)
    window.requestAnimationFrame(tijdlijn.draw)
}