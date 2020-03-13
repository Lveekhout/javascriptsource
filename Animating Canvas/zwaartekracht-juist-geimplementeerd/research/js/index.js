let afstand = 0
let snelheid = 500
let acceleratie, duur
let start, lastUpdate

//07-02-2020 hoofdstuk 9: https://www.overleaf.com/project/5bc484ce38b3903e926ed5c0
const calcAccAndTime2 = (b, distance, speed) => {
    const t = 2*distance/(speed+b)
    const a = (speed-b)/(2*t)
    return [a, t]
}

//??-02-2020 probeerseltje met berekening top parabool enzo waarbij de eindsnelheid = altijd 0
const calcAccAndTime = (b, distance) => {
    const a = -Math.pow(b/2, 2)/distance
    return [a, -b/(2*a)]
}

const calcIntersectTime = src => {
   if (src[0]==0) { // Lineair oplossen
       if (src[1]==0) return
       else {
           const x = src[2]/-src[1]
           if (x<0) return; else return x
       }
   } else {
       const d = src[1]*src[1]-4*src[0]*src[2]
       if (d<0) return
       else {
           const x = (-src[1]-Math.sqrt(d))/(2*src[0])
           if (x<0) return (-src[1]+Math.sqrt(d))/(2*src[0]); else return x
       }
   }
}

const draw = () => {
    document.getElementById("afstand").innerHTML = afstand.toFixed(2) + " meter"
    document.getElementById("snelheid").innerHTML = snelheid.toFixed(2) + " m/s"
    document.getElementById("acceleratie").innerHTML = acceleratie.toFixed(2) + " 2m/s/s"
    document.getElementById("looptijd").innerHTML = ((new Date() - start)/1000).toFixed(2) + " seconden"
    document.getElementById("duur").innerHTML = duur.toFixed(2) + " seconden"

    const ctx = document.getElementById("canvas").getContext("2d")
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    ctx.save()
    ctx.translate(afstand, 20)
    ctx.fillRect(0,0,20,10)
    ctx.restore()
}

const update = milli => {
    const x = (milli - lastUpdate) / 1000
    afstand += acceleratie * Math.pow(x, 2) + snelheid * x
    snelheid += 2 * acceleratie * x
    lastUpdate = milli
}

const animate = milli => {
    acceleratie = calcAccAndTime2(snelheid, 1000 - afstand, 0)[0]
    duur = calcAccAndTime2(snelheid, 1000 - afstand, 0)[1]
    if (snelheid>0) window.requestAnimationFrame(animate)
    draw()
    update(milli)
}

const setInitialLastUpdate = milli => {
    window.requestAnimationFrame(animate)
    lastUpdate = milli
    start = new Date()
}

const startAnimation = () => {
    window.requestAnimationFrame(setInitialLastUpdate)
}

window.onload = () => {
    setTimeout(startAnimation, 1000)
}