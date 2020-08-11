let temp = []
let date

function LoopManager() {
    let canvas = document.getElementsByTagName("canvas")
    let ctx = Array.from(canvas).map(i => i.getContext("2d"))
    let startUpdate
    let prevUpdate
    let animating = false

    this.loop = new Loop(canvas[0])
    this.record = []

    this.resume = () => {
        window.requestAnimationFrame(initializePrevUpdate)
        animating = true
    }

    this.suspend = () => {
        animating = false
    }

    const initializePrevUpdate = timestamp => {
        date = new Date()
        startUpdate = prevUpdate = timestamp
        if (animate) window.requestAnimationFrame(animate)
    }

    const animate = timestamp => {
        let delta = timestamp - prevUpdate
        prevUpdate = timestamp

        this.loop.draw(10)
        this.loop.drawSpeed(canvas[1], this.loop.vect[0], this.loop.iHelicopter.speed[0])
        this.loop.drawSpeed(canvas[2], this.loop.vect[1], this.loop.iHelicopter.speed[1])

        this.loop.update(delta)
        temp.push({alt: this.loop.iHelicopter.pos[1], timestamp: timestamp, delta: delta, date: new Date().getTime()})
        if (this.loop.iHelicopter.pos[1]<=0) this.suspend()

        if (animating) window.requestAnimationFrame(animate)
        else console.log('klaar: ' + (timestamp-startUpdate) + ' - ' + (new Date().getTime() - date))

        if (this.record.length<1000) this.record.push(delta)
    }

    this.draw = () => {}
}