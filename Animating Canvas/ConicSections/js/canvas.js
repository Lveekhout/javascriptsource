const camera = { x: 800, y: 450, scale: 30 }
const visor = { x: null, y: null, visible: false }

const draw = ms => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const view = getView()

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(camera.x, camera.y)
    ctx.scale(camera.scale, -camera.scale)
    {
        ctx.save()
        ctx.lineWidth = 1 / 100
        ctx.strokeStyle = 'gray'
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        for (let x = 1 + Math.floor(view.x1); x <= Math.floor(view.x2); x++) {
            ctx.moveTo(x, -view.y1)
            ctx.lineTo(x, -view.y2)
        }
        for (let y = 1 + Math.floor(view.y1); y <= Math.floor(view.y2); y++) {
            ctx.moveTo(view.x1, -y)
            ctx.lineTo(view.x2, -y)
        }
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(view.x1, 0)
        ctx.lineTo(view.x2, 0)
        ctx.moveTo(0, -view.y1)
        ctx.lineTo(0, -view.y2)
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2 / camera.scale
        ctx.stroke()
        ctx.restore()
    } // Layer 1 - Assenstelsel
    {
        const p = []
        for (let x = view.x1; x <= view.x2; x += 1 / camera.scale) {
            const y = Math.sqrt(Math.pow(a, 2) + Math.pow(x, 2) / b)
            p.push([x, y])
        }
        drawLinesFromPoints(p, 'purple')
    } // Layer 2 - Grafiek
    ctx.restore()

    if (visor.visible) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(visor.x, 0)
        ctx.lineTo(visor.x, canvas.height)
        ctx.moveTo(0, visor.y)
        ctx.lineTo(canvas.width, visor.y)
        ctx.strokeStyle = '#0000FF30'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
    }
}

const getView = () => {
    const canvas = document.getElementById('canvas')
    return {
        x1: -camera.x / camera.scale,
        y1: -camera.y / camera.scale,
        x2: (canvas.width - camera.x) / camera.scale,
        y2: (canvas.height - camera.y) / camera.scale
    }
}

const drawLinesFromPoints = (points, color, closed) => { // points = [[x,y], [x,y]]
    if (points.length > 0) {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(points[0][0], points[0][1])
        for (let idx = 1; idx < points.length; idx++) {
            ctx.lineTo(points[idx][0], points[idx][1])
        }
        if (closed) ctx.closePath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2  / camera.scale
        ctx.stroke()
        ctx.restore()
    }
}
