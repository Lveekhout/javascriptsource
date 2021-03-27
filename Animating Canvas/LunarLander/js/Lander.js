function Lander(canvas, textarea) {
    const ctx = canvas.getContext('2d')

    let current
    let frameReq

    const gravity = 0//9.81 / 2 / 6

    let scale = 15
    let lander = new Image()
    let rotate = [-1, 0]                    // [speed, angle]
    let landerAltitude = [-gravity, 0, 30] // [acc, speed, altitude in meters]
    let landerLatitude = [0, 0, 0]       // [acc, speed, latitude in meters]
    let lunarscale

    let mainThruster = 0
    let leftThruster = 0
    let rightThruster = 0

    const draw = dtm => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height)

        const info = {
            alt: {
                acc: landerAltitude[0].toFixed(4),
                vel: landerAltitude[1].toFixed(4),
                pos: landerAltitude[2].toFixed(4)
            },
            lat: {
                acc: landerLatitude[0].toFixed(4),
                vel: landerLatitude[1].toFixed(4),
                pos: landerLatitude[2].toFixed(4)
            },
            rot: {
                acc: (rightThruster-leftThruster).toFixed(4),
                vel: rotate[0].toFixed(4),
                agl: rotate[1].toFixed(4)
            },
            impact: {
                D: prediction()[0].toFixed(4),
                t: prediction()[1].toFixed(4)
            },
            framerate: {
                milliseconds: dtm.toFixed(4)
            }
        }
        textarea.value = JSON.stringify(info, null, 2)

        {
            ctx.save()
            ctx.scale(scale, scale)
            ctx.translate(landerLatitude[2], -landerAltitude[2])
            ctx.rotate(-rotate[1])
            if (mainThruster!=0) {
                ctx.beginPath()
                ctx.ellipse(0, 0, 30 * lunarscale, 100 * lunarscale, 0, 0, Math.PI*2)
                ctx.fillStyle = "red"
                ctx.fill()
            }
            if (leftThruster!=0) {
                ctx.beginPath()
                ctx.ellipse(-150 * lunarscale, -300 * lunarscale, 50 * lunarscale, 20 * lunarscale, 0, 0, Math.PI*2)
                ctx.fillStyle = "red"
                ctx.fill()
            }
            if (rightThruster!=0) {
                ctx.beginPath()
                ctx.ellipse(150 * lunarscale, -300 * lunarscale, 50 * lunarscale, 20 * lunarscale, 0, 0, Math.PI*2)
                ctx.fillStyle = "red"
                ctx.fill()
            }
            ctx.scale(lunarscale, lunarscale)
            ctx.drawImage(lander, -lander.width / 2, -lander.height)
            ctx.restore()
        }

        ctx.restore()
    }

    const prediction = () => {
        const accAltitude = -gravity + mainThruster * Math.cos(rotate[1])
        const D = landerAltitude[1] * landerAltitude[1] - (4 * accAltitude * landerAltitude[2])
        const x1 = (-landerAltitude[1] - Math.sqrt(D)) / (2 * accAltitude)
        return [D, x1]
    }

    this.activateMainThruster = () => mainThruster = 2
    this.deactivateMainThruster = () => mainThruster = 0
    this.activateLeftThruster = () => leftThruster = .5
    this.deactivateLeftThruster = () => leftThruster = 0
    this.activateRightThruster = () => rightThruster = .5
    this.deactivateRightThruster = () => rightThruster = 0

    this.thrust = () => {
        mainThruster = 2
        leftThruster = .5
        rightThruster = .5
        setTimeout(() => rightThruster = 0, 1000)
    }

    const animate = milli => {
        const dtm = milli - current // DeltaTimeMilliseconds
        const dts = dtm / 1000      // DeltaTimeSeconds
        current = milli

        draw(dtm)

        frameReq = window.requestAnimationFrame(animate)

        rotate[1] += (rightThruster-leftThruster) * Math.pow(dts, 2) + rotate[0] * dts
        rotate[0] += 2 * (rightThruster-leftThruster) * dts

        landerAltitude[0] = -gravity + mainThruster * Math.cos(rotate[1])
        landerAltitude[2] += landerAltitude[0] * Math.pow(dts, 2) + landerAltitude[1] * dts
        landerAltitude[1] += 2 * landerAltitude[0] * dts

        const accLatitude = landerLatitude[0] - mainThruster * Math.sin(rotate[1])
        landerLatitude[2] += accLatitude * Math.pow(dts, 2) + landerLatitude[1] * dts
        landerLatitude[1] += 2 * accLatitude * dts

        if (landerAltitude[2] < 0) this.stopAnimation()
    }

    const initAnimate = milli => {
        current = milli
        frameReq = window.requestAnimationFrame(animate)
    }

    this.startAnimation = () => {
        duur = performance.now()
        frameReq = window.requestAnimationFrame(initAnimate)
    }

    this.stopAnimation = () => {
        console.log('duur = ' + (performance.now() - duur))
        window.cancelAnimationFrame(frameReq)
        document.getElementById("textarea").value = null
    }

    this.ready = () => {}

    lander.src = "images/ApolloProgram_LunarModule.gif"
    lander.onload = l => {
        lunarscale = 7.04 / lander.height
        console.log(`lunarscale: ${lunarscale}`)
        this.ready(new Event("ready"))
    }
}
