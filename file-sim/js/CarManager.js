function CarManager(canvas, tracklength) {
    const ctx = canvas.getContext("2d")

    let animating = true
    let zoom = 10
    let lastUpdate = 0

    this.cars = []

    this.addCar = car => {
        this.cars.push(car)
    }

    this.startAnimation = () => {
        animating = true
        lastUpdate = new Date()
        window.requestAnimationFrame(setInitialLastUpdate)
    }

    this.stopAnimation = () => animating = false

    this.setZoom = value => zoom = value

    const setInitialLastUpdate = milli => {
        lastUpdate = milli
        window.requestAnimationFrame(animate)
    }

    const animate = milli => {
        draw(milli)
        update(milli)

        if (animating) window.requestAnimationFrame(animate)
    }

    const draw = milli => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        ctx.save()
        ctx.translate(canvas.clientWidth/2, canvas.clientHeight/2)
        this.cars.forEach((car, index) => {
            const angle = (car.position*2*Math.PI)/tracklength
            ctx.save()
            ctx.rotate(-angle)
            ctx.fillStyle = car.color
            ctx.fillRect(zoom*tracklength/(2*Math.PI), -zoom, zoom, 2*zoom)
            // {
            //     let idx
            //     if (index==0) idx = this.cars.length-1; else idx = index-1
            //     if (car.goal(this.cars[idx])) ctx.fillRect(zoom*tracklength/(2*Math.PI)-zoom*2, -zoom, zoom, 2*zoom)
            // }
            {
                ctx.save()
                if (car.alpha>0) {
                    ctx.globalAlpha = car.alpha
                    car.alpha -= 0.05
                } else {
                    car.alpha = 0
                    ctx.globalAlpha = car.alpha
                }
                ctx.fillStyle = "yellow"
                ctx.fillRect(zoom*tracklength/(2*Math.PI), -zoom, zoom, 2*zoom)
                ctx.restore()
            }
            ctx.restore()
        })
        ctx.restore()
    }

    const update = milli => {
        const t = (milli - lastUpdate) / 1000
        lastUpdate = milli
        this.cars.forEach(car => car.update(t))
    }
}