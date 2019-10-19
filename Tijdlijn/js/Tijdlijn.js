function Tijdlijn(canvas, input, _periodes) {
    let periodes = JSON.parse(_periodes)

    let _min, _max
    periodes.forEach((v, i) => {
        v.periodes.forEach(p => {
            if (p.ingangsdatum) {
                p._ingangsdatum = new Date(p.ingangsdatum).getTime()
                if (_min) {if (p._ingangsdatum<_min) _min = p._ingangsdatum} else _min = p._ingangsdatum
                if (_max) {if (p._ingangsdatum>_max) _max = p._ingangsdatum} else _max = p._ingangsdatum
            }

            if (p.einddatum) {
                p._einddatum = new Date(p.einddatum).getTime()
                if (_max) {if (p._einddatum>_max) _max = p._einddatum} else _max = p._einddatum
            }
        })
    })
    _min=new Date((new Date(_min).getFullYear()-1).toString()).getTime()
    if (!_max) _max = new Date().getTime()
    _max=new Date((new Date(_max).getFullYear()+1).toString()).getTime()
    
    let zoom = (_max-_min)/canvas.width; input.value = zoom
    let animating = false
    let drag = 0
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
                v.periodes.forEach(p => {
                    ctx.fillStyle = v.kleur
                    if (p.einddatum) {
                        let duur = p._einddatum - p._ingangsdatum
                        ctx.fillRect(x0+(p._ingangsdatum-_min)/zoom, 50+y, duur/zoom, 16)
                    } else {
                        let x = x0+(p._ingangsdatum-_min)/zoom
                        ctx.fillRect(x, 50+y, canvas.width-x, 16)
                    }
                    ctx.fillStyle = "black"
                    ctx.fillText(p.registratiedatum + " " + v.naam + " (" + p.omschrijving + ")" , 10, 62+y)
                    y += 18
                })
                y += 5
            })
        }

        if (animating) {
            _min += 200000000
            window.requestAnimationFrame(this.draw)
        }
    }

    this.setZoom = v => {
        zoom = v
        if (!animating) window.requestAnimationFrame(this.draw)
    }

//    canvas.addEventListener("mousewheel", e => console.log("mousewheel"))
    canvas.addEventListener("mousedown", e => drag = true)
    canvas.addEventListener("mouseup", e => drag = false)
//    canvas.addEventListener("mouseleave", e => console.log("mouseleave"))
    canvas.addEventListener("mouseenter", e => drag = drag&&(e.buttons&1==1))
    canvas.addEventListener("mousemove", e => {if (drag) {_min-=e.movementX*zoom;if (!animating) window.requestAnimationFrame(this.draw)}})
    canvas.addEventListener("dblclick", e => console.log(zoom))
}