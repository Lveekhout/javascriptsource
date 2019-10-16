function Tijdlijn(canvas) {
    let now// = new Date("1993-08-15 00:00:00").getTime()
    periodes.forEach((v, i) => {
        v.periodes.forEach(x => {
            let ingangsdatumtijd = new Date(x.ingangsdatum).getTime()
            if (now) {if (ingangsdatumtijd<now) now = ingangsdatumtijd}
            else now = ingangsdatumtijd
        })
    })
    console.log(new Date(now))

    let zoom = 60000
    let animating = false
    let ctx = canvas.getContext('2d')

    let x0 = 0 //canvas.width / 12
    // let y0 = canvas.height / 2

    this.draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let y = 0
        periodes.forEach((v, i) => {
            ctx.fillStyle = v.kleur;
            v.periodes.forEach(x => {
                let ingangsdatumtijd = new Date(x.ingangsdatum).getTime()
                let duur = new Date(x.einddatum).getTime() - ingangsdatumtijd
                ctx.fillRect(x0+(ingangsdatumtijd-now)/zoom, 20+y, duur/zoom, 16)
                y += 18
            })
            y += 5
        })
        if (animating) {
            now += 1000
            window.requestAnimationFrame(this.draw)
        }
    }

    this.setZoom = v => {
        zoom = v
        if (!animating) window.requestAnimationFrame(this.draw)
    }
}