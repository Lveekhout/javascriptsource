let tijdlijn
window.onload = event => {
    tijdlijn = new Tijdlijn(
        document.getElementById("main-canvas"),
        document.getElementById("main-input"),
        JSON.stringify(periodes),
        document.getElementById("datumoutput"),
    )
    window.requestAnimationFrame(tijdlijn.draw)
}