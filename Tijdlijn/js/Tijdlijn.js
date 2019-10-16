function Tijdlijn(canvas, input) {
    let _min, _max
    periodes.forEach((v, i) => {
        v.periodes.forEach(x => {
            let _ingangsdatumtijd = new Date(x.ingangsdatum).getTime()
            if (_min) {if (_ingangsdatumtijd<_min) _min = _ingangsdatumtijd}
            else _min = _ingangsdatumtijd

            let _einddatumtijd = new Date(x.einddatum).getTime()
            if (_einddatumtijd) {
                if (_max) {if (_einddatumtijd>_max) _max = _einddatumtijd}
                else _max = _einddatumtijd
            }
        })
    })
    if (!_max) _max = new Date().getTime()

    let zoom = (_max-_min)/canvas.width
    input.value = zoom
    let animating = false
    let ctx = canvas.getContext('2d')

    let x0 = 0 //canvas.width / 12
    // let y0 = canvas.height / 2

    this.draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "black"
        ctx.fillRect(0, 30, canvas.width, 1)

        ctx.font = "9pt Verdana"

        {
            let year = new Date(_min).getFullYear()
            let _year = new Date((year).toString()).getTime()
            while (_year<_min+canvas.width*zoom) {
                ctx.fillRect((_year-_min)/zoom, 30, 1, -10)
                ctx.fillText(year, (_year-_min)/zoom, 12)
                if (zoom<400000000)
                    for (let i=2;i<=12;i++) {
                        let _month = new Date(year.toString() + "-" + i.toString()).getTime()
                        ctx.fillRect((_month-_min)/zoom, 30, 1, -5)
                    }
                _year = new Date((++year).toString()).getTime()
            }
        }

        {
            let y = 0
            periodes.forEach((v, i) => {
                ctx.fillStyle = v.kleur
                v.periodes.forEach(x => {
                    let _ingangsdatumtijd = new Date(x.ingangsdatum).getTime()
                    if (x.einddatum) {
                        let duur = new Date(x.einddatum).getTime() - _ingangsdatumtijd
                        ctx.fillRect(x0+(_ingangsdatumtijd-_min)/zoom, 50+y, duur/zoom, 16)
                    } else {
                        let x = x0+(_ingangsdatumtijd-_min)/zoom
                        ctx.fillRect(x, 50+y, canvas.width-x, 16)
                    }
                    y += 18
                })
                y += 5
            })
        }

        if (animating) {
            _min += 100000000
            window.requestAnimationFrame(this.draw)
        }
    }

    this.setZoom = v => {
        zoom = v
        if (!animating) window.requestAnimationFrame(this.draw)
    }
    canvas.addEventListener("click", e => console.log(zoom))
}