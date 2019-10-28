function Tijdlijn(canvas, input, _periodes, datumoutput) {
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
    let pointerX

//    let x0 = canvas.width / 12
//    let y0 = canvas.height / 2

    let ctx = canvas.getContext('2d')
    this.draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "black"
        ctx.fillRect(0, 30, canvas.width, 1)

        ctx.font = "9pt Verdana"

        {
            let textPos
            let year = new Date(_min).getFullYear()
            let _year = new Date((year).toString()).getTime()
            while (_year<_min+canvas.width*zoom) {
                if (textPos==undefined||(_year-_min)/zoom>textPos) {
                    textPos = (_year-_min)/zoom + ctx.measureText(year).width
                    ctx.save()
                    ctx.fillStyle = "#dddddd"
                    ctx.fillRect((_year-_min)/zoom, 31, 1, canvas.height-31)
                    ctx.restore()
                    ctx.fillRect((_year-_min)/zoom, 30, 1, -10)
                    ctx.fillText(year, (_year-_min)/zoom, 12)
                    if (zoom<400000000)
                        for (let i=2;i<=12;i++) {
                            let _month = new Date(year.toString() + "-" + i.toString()).getTime()
                            ctx.fillRect((_month-_min)/zoom, 30, 1, -5)
                        }
                }
                _year = new Date((++year).toString()).getTime()
            }
        }

        {
            let y = 50
            periodes.forEach((v, i) => {
                if (v.margin_top) y += v.margin_top
                v.periodes.forEach(p => {
                    let x = (p._ingangsdatum-_min)/zoom
                    if (x<canvas.width) {
                        ctx.fillStyle = v.kleur
                        if (p.einddatum) {
                            let duur = p._einddatum - p._ingangsdatum
                            ctx.fillRect(x, y, duur/zoom, 16)
                        } else {
                            if (x+25<canvas.width) {
                                ctx.fillRect(x, y, canvas.width-x-25, 16)
                                ctx.beginPath()
                                ctx.moveTo(canvas.width, y+8)
                                ctx.lineTo(canvas.width-25, y+16)
                                ctx.lineTo(canvas.width-25, y)
                                ctx.fill()
                            } else {
                                ctx.beginPath()
                                ctx.moveTo(x+25, y+8)
                                ctx.lineTo(x, y+16)
                                ctx.lineTo(x, y)
                                ctx.fill()
                            }
                        }
                    }
                    ctx.fillStyle = "black"
                    ctx.fillText(v.naam + " (" + p.label + ")" , 10, 12+y)
                    y += 16
                })
                y += 8
            })
        }
        
        {
            if (pointerX) {
                ctx.beginPath()
                ctx.moveTo(pointerX, 0)
                ctx.lineTo(pointerX, canvas.height)
                ctx.strokeStyle = "#2B42E3"
                ctx.stroke()
            }
        }

        if (animating) { _min += 100000000; window.requestAnimationFrame(this.draw) }
    }

    this.setZoom = v => {
        zoom = v
        if (!animating) window.requestAnimationFrame(this.draw)
    }

    canvas.addEventListener("mousewheel", e => {
        e.preventDefault()
        let _zoom = zoom
        zoom += e.deltaY*200000
        if (zoom<1) zoom = _zoom
        input.value = zoom
        _min = (_min+e.layerX*_zoom)-e.layerX*zoom
        if (!animating) window.requestAnimationFrame(this.draw)
    })
    canvas.addEventListener("mousedown", e => drag = e.buttons&1==1)
    canvas.addEventListener("mouseup", e => drag = e.buttons&1==1)
    canvas.addEventListener("mouseleave", e => {
        pointerX=undefined
        datumoutput.value = ""
        if (!animating) window.requestAnimationFrame(this.draw)
    })
    canvas.addEventListener("mouseenter", e => drag = drag&&(e.buttons&1==1))
    canvas.addEventListener("mousemove", e => {
        datumoutput.value = new Date(_min+e.layerX*zoom).toString()
        pointerX = e.layerX
        if (drag) _min-=e.movementX*zoom
        if (!animating) window.requestAnimationFrame(this.draw)
    })
    canvas.addEventListener("dblclick", e => console.log(new Date(_min+e.layerX*zoom)))
}