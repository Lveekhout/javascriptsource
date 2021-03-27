let lander

window.onload = e => {
    lander = new Lander(document.getElementById('canvas'), document.getElementById('textarea'))
    lander.ready = e => {
        lander.startAnimation()
    }
}

window.addEventListener("keydown", e => {
    switch (e.code) {
        case 'ControlRight':
            lander.activateMainThruster()
            break
        case 'ControlLeft':
            lander.activateLeftThruster()
            break
        case 'MetaLeft':
            lander.activateRightThruster()
            break
        default:
            console.log(e.code)
    }
})

window.addEventListener("keyup", e => {
    switch (e.code) {
        case 'ControlRight':
            lander.deactivateMainThruster()
            break
        case 'ControlLeft':
            lander.deactivateLeftThruster()
            break
        case 'MetaLeft':
            lander.deactivateRightThruster()
            break
    }
})
