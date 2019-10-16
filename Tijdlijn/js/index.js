let tijdlijn
window.onload = event => {
    tijdlijn = new Tijdlijn(document.getElementById("main-canvas"), document.getElementById("main-input"))
    window.requestAnimationFrame(tijdlijn.draw)
}