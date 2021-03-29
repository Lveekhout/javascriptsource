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
            lander.manualOverrideLeftThruster()
            break
        case 'MetaLeft':
            lander.manualOverrideRightThruster()
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
            lander.manualStopLeftThruster()
            break
        case 'MetaLeft':
            lander.manualStopRightThruster()
            break
    }
})
