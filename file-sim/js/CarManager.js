function CarManager(canvas, tracklength, xbox) {
    const ctx = canvas.getContext("2d")

    let animating = true
    let zoom = 12
    let lastUpdate = 0
    let crashSituation = false
    const intervals = []

    this.cars = []

    this.addCar = car => {
        const length = this.cars.push(car)
    }

    const nextCarArray = (index) => {
        if (this.cars.length>1) {
            if (index==0) return [this.cars[this.cars.length-1], tracklength]
            else return [this.cars[index-1], 0]
        }
    }

    //////////////////////////////////////////////////////////////////////
    this.setZoom = value => zoom = value

    //////////////////////////////////////////////////////////////////////
    this.startAnimation = () => {
        animating = true
        window.requestAnimationFrame(setInitialLastUpdate)
        this.cars.forEach((car, idx) => {
            if (car.interval) intervals.push(setInterval(() => car.decide(nextCarArray(idx)), car.interval))
        })
    }

    const setInitialLastUpdate = milli => {
        lastUpdate = milli
        window.requestAnimationFrame(animate)
    }

    this.stopAnimation = () => {
        animating = false
        while (intervals.length>0) clearInterval(intervals.pop())
    }

    const animate = milli => {
        draw(milli)
        update(milli)

        if (animating) window.requestAnimationFrame(animate)
    }

    const draw = milli => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        if (navigator.getGamepads()[0]) {
            ctx.save()
            ctx.scale(1/20, 1/20)
            ctx.drawImage(xbox, 0, 0)
            ctx.restore()
        }

        drawSnelheidsmeter(ctx, canvas.clientWidth/2, canvas.clientHeight/2, zoom, -Math.PI+(Math.PI*(this.cars[0].speed/25)))

        ctx.save()
        ctx.translate(canvas.clientWidth/2, canvas.clientHeight/2)
        this.cars.forEach((car, index) => {
            const angle = (car.position*2*Math.PI)/tracklength
            ctx.save()
            ctx.rotate(-angle)
            ctx.fillStyle = car.color
            ctx.fillRect(zoom*tracklength/(2*Math.PI), -zoom, zoom, 2*zoom)
            {
                const nca = nextCarArray(index)
                if (nca&&!crashSituation) crashSituation = car.crash(nca)
            }
            {
                ctx.save()
                if (car.alpha>0) { ctx.globalAlpha = car.alpha; car.alpha -= 0.05}
                else { car.alpha = 0; ctx.globalAlpha = car.alpha }
                ctx.fillStyle = "yellow"
                ctx.fillRect(zoom*tracklength/(2*Math.PI), -zoom, zoom, 2*zoom)
                ctx.restore()
            }
            ctx.restore()
        })
        ctx.restore()

        if (crashSituation) {
            this.stopAnimation()
            throw "CRASH!!!"
        }
    }

    const update = milli => {
        const t = (milli - lastUpdate) / 1000
        lastUpdate = milli

        if (navigator.getGamepads()[0]) {
            if (navigator.getGamepads()[0].buttons[6].touched) {
                cm.cars[0].setAcceleration(-5 * navigator.getGamepads()[0].buttons[6].value)
            } else if (navigator.getGamepads()[0].buttons[7].touched) {
                cm.cars[0].setAcceleration( 5 * navigator.getGamepads()[0].buttons[7].value)
            } else {
                cm.cars[0].setAcceleration(0)
            }
        }

        this.cars.forEach(car => car.update(t))
    }

    this.getIntervals = () => {
        return intervals;
    }

    this.doAutopilot = () => {
        const car = this.cars[0]
        // car.color = 'blue'
        car.interval = base + random(variantie)
        // window.removeEventListener('keydown')
        intervals.push(setInterval(() => car.decide(nextCarArray(0)), car.interval))
    }
}
