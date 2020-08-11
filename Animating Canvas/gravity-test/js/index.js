let startTimeStamp
let prevTimeStamp
let temp = []
let pos = 0
let speed = 0
let date

const resume = () => {
    window.requestAnimationFrame(initialize)
}

const initialize = timestamp => {
    window.requestAnimationFrame(animate)
    prevTimeStamp = startTimeStamp = timestamp
    date = new Date().getTime()
}

const animate = timestamp => {
    let delta = (timestamp - prevTimeStamp)/1000
    let absolute = (timestamp - startTimeStamp)/1000
    prevTimeStamp = timestamp

    pos += 9.81/2 * Math.pow(delta, 2) + speed * delta
    speed += 9.81 * delta
    temp.push({
        start: startTimeStamp,
        timestamp: window.performance.now(),
        absolute: {
            timestamp: absolute,
            pos: 9.81/2 * Math.pow(absolute, 2),
            speed: 9.81 * absolute
        },
        delta: {
            timestamp: delta,
            pos: pos,
            speed: speed
        }
    })
    if (9.81/2 * Math.pow(absolute, 2)<=100) window.requestAnimationFrame(animate)
    else console.log('klaar: ' + (timestamp-startTimeStamp) + ' - ' + (new Date().getTime() - date))
}

window.onload = () => {
}