function Fraction(t, n) {
    const ggd = (t, n) => {
        if (n==0) return t
        else return ggd(n, t%n)
    }

    // const kgv = (t, n) => {
    //     return t * n / ggd(t, n)
    // }

    this.simplify = () => {
        if (Number.isInteger(t / n)) {
            return t / n
        }
        const ggd_ = ggd(t, n)
        return new Fraction(t/ggd_, n/ggd_)
    }

    this.toString = () => {
        return `(${t}/${n})`
    }

    this.eval = () => {
        if (Number.isInteger(t / n)) {
            return new Fraction(t / n, 1)
        } else if (Number.isInteger(t) && Number.isInteger(n)) {
            return this
        } else if (Number.isInteger(t) && !Number.isInteger(n)) {
            let n_ = n.eval()
            if (Number.isInteger(n_)) {
                if (Number.isInteger(t / n_)) {
                    return new Fraction(t / n_, 1)
                } else {
                    return new Fraction(t, n_)
                }
            } else {
                return new Fraction(t*n_.getN(), n_.getT())
            }
        } else if (!Number.isInteger(t) && Number.isInteger(n)) {
            let t_ = t.eval()
            if (Number.isInteger(t_)) {
                if (Number.isInteger(t_ / n)) {
                    return new Fraction(t_ / n, 1)
                } else {
                    return new Fraction(t_, n)
                }
            } else {
                return new Fraction(t_.getT(), n*t_.getN())
            }
        } else if (!Number.isInteger(t) && !Number.isInteger(n)) {
            let t_ = t.eval()
            let n_ = n.eval()
            if (Number.isInteger(t_ / n_)) {
                return new Fraction(t_ / n_, 1)
            } else if (Number.isInteger(t_) && Number.isInteger(n_)) {
                return new Fraction(t_, n_)
            } else if (Number.isInteger(t_) && !Number.isInteger(n_)) {
                return new Fraction(t_*n_.getN(), n_.getT())
            } else if (!Number.isInteger(t_) && Number.isInteger(n_)) {
                return new Fraction(t_.getT(), t_.getN()*n_)
            } else {
                return new Fraction(t_.getT()*n_.getN(), t_.getN()*n_.getT())
            }
        }
    }

    this.getT = () => {
        return t
    }

    this.getN = () => {
        return n
    }

    this.getCanvasWidth = (ctx, margin) => {
        const width = []
        if (Number.isInteger(t)) width.push(ctx.measureText(t.toString()).width)
        else width.push(t.getCanvasWidth(ctx, margin))
        if (Number.isInteger(n)) width.push(ctx.measureText(n.toString()).width)
        else width.push(n.getCanvasWidth(ctx, margin))
        return Math.max(width[0], width[1]) + margin + margin
    }

    this.toCanvas = (ctx, x, y) => {
        let dy = 0
        let h = 18
        let margin = 18

        ctx.save()
        ctx.textBaseline = 'top'
        ctx.textAlign = 'center'
        ctx.font = h + 'px Courier New'

        const width = []
        if (Number.isInteger(t)) width.push(ctx.measureText(t.toString()).width)
        else width.push(t.getCanvasWidth(ctx, margin))
        if (Number.isInteger(n)) width.push(ctx.measureText(n.toString()).width)
        else width.push(n.getCanvasWidth(ctx, margin))
        // let text = [t.toString(), n.toString()]
        // let width = [ctx.measureText(text[0]).width, ctx.measureText(text[1]).width]
        let max = Math.max(width[0], width[1])

        if (Number.isInteger(t)) {
            ctx.fillText(t.toString(), x + margin + max / 2, y + dy)
            dy += h + margin
        } else {
            let result = t.toCanvas(ctx, x + margin + (max/2) - (width[0]/2), y + dy)
            dy += result[1]
        }

        ctx.beginPath()
        ctx.moveTo(x, y + dy - margin / 2)
        ctx.lineTo(x + margin + margin + max, y + dy - margin / 2)
        ctx.stroke()

        if (Number.isInteger(n)) {
            ctx.fillText(n.toString(), x + margin + max / 2, y + dy)
            dy += h + margin
        } else {
            let result = n.toCanvas(ctx, x + margin + (max/2) - (width[1]/2), y + dy)
            dy += result[1]
        }

        // ctx.beginPath()
        // ctx.moveTo(x, y)
        // ctx.lineTo(x+max+margin+margin, y)
        // ctx.lineTo(x+max+margin+margin, y+dy)
        // ctx.lineTo(x, y+dy)
        // ctx.closePath()
        // ctx.stroke()
        ctx.restore()

        return [max + margin + margin, dy]
    }
}

Fraction.fromNumber = p => {
    const aantalDecimalen = p => {
        if (Math.floor(p) !== p) return p.toString().split(".")[1].length || 0
        return 0
    }
    const ad = aantalDecimalen(p)
    const n = Math.pow(10, ad)
    return new Fraction(Math.round(p * n), n)
}

function Wortel(v) {
    this.toString = () => {
        return `w(${v})`
    }

    this.eval = () => {
        return 8
    }
}

function Add(...value) {
    this.toString = () => {
        return value.join(" + ")
    }
}

let input = new Fraction(
    new Fraction(
        new Fraction(
            Fraction.fromNumber(1.2),
            new Fraction(
                new Fraction(64,32),
                new Fraction(
                    new Fraction(18,2),
                    3
                )
            )
        )
        ,3
    ),
    new Fraction(1,5))

// let input = new Fraction(
//     new Fraction(
//         new Fraction(
//             new Fraction(6, 5),
//             new Fraction(
//                 new Fraction(2,1),
//                 new Fraction(
//                     new Fraction(9,1),
//                     3
//                 )
//             )
//         )
//         ,3
//     ),
//     new Fraction(1,5))

// let input = new Fraction(
//     new Fraction(
//         new Fraction(
//             new Fraction(6, 5),
//             new Fraction(
//                 2,
//                 3
//             )
//         )
//         ,3
//     ),
//     new Fraction(1,5))

// let input = new Fraction(
//     new Fraction(1,5),
//     new Fraction(
//         new Fraction(557, 7919),
//         new Fraction(4, 3)
//     )
// )

window.onload = e => {
    ctx = document.getElementById('canvas').getContext('2d')
    input.toCanvas(ctx, 10, 10)
}
