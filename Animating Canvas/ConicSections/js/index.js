let a, b

window.onload = e => {
    window.requestAnimationFrame(draw)

    document.getElementById('canvas').addEventListener('mousemove', event => {
        window.requestAnimationFrame(draw)
        event.preventDefault()

        visor.x = event.offsetX
        visor.y = event.offsetY

        if (event.ctrlKey) {
            camera.x = event.offsetX
            camera.y = event.offsetY
        } else if (event.buttons === 1) {
            camera.x += event.movementX
            camera.y += event.movementY
        }
        doOutput()
    })

    document.getElementById('canvas').addEventListener('mousewheel', event => {
        window.requestAnimationFrame(draw)
        event.preventDefault()

        const scaleBefore = camera.scale

        camera.scale *= 1 - event.deltaY / 1000
        camera.scale = Math.min(Math.max(camera.scale, .1), 10000)

        camera.x = event.offsetX - ((event.offsetX - camera.x) / scaleBefore) * camera.scale
        camera.y = event.offsetY - ((event.offsetY - camera.y) / scaleBefore) * camera.scale
        doOutput()
    })

    document.getElementById('canvas').addEventListener('mouseenter', () => {
        window.requestAnimationFrame(draw)
        visor.visible = true
    })

    document.getElementById('canvas').addEventListener('mouseleave', () => {
        window.requestAnimationFrame(draw)
        visor.visible = false
    })

    document.querySelectorAll('body div input[type=range]')[0].addEventListener('input', e => {
        window.requestAnimationFrame(draw)
        a = Number(e.target.value)
        document.getElementById('p004').innerHTML = e.target.value
    })
    document.querySelectorAll('body div input[type=range]')[1].addEventListener('input', e => {
        window.requestAnimationFrame(draw)
        b = Number(e.target.value)
        document.getElementById('p005').innerHTML = e.target.value
    })

    window.addEventListener('resize', e => {
        const canvas = document.querySelector('#canvas')
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
        window.requestAnimationFrame(draw)
    })

    window.dispatchEvent(new Event('resize'))
    document.querySelectorAll('body div input[type=range]').forEach(e => e.dispatchEvent(new Event('input')))
}

const outputText = (elementId, str) => {
    document.getElementById(elementId).innerHTML = str
}

const doOutput = () => {
    const afbeelding = { x: (visor.x - camera.x) / camera.scale, y: (visor.y - camera.y) / camera.scale }
    const view = getView()
    outputText('p001', `afbeelding: (${afbeelding.x.toFixed(2)}, ${afbeelding.y.toFixed(2)})`)
    outputText('p002', `camera: (${camera.x.toFixed(2)}, ${camera.y.toFixed(2)}) - ${camera.scale.toFixed(2)}`)
    outputText('p003', `view: (${view.x1.toFixed(2)}, ${view.y1.toFixed(2)}) - (${view.x2.toFixed(2)}, ${view.y2.toFixed(2)})`)
}
