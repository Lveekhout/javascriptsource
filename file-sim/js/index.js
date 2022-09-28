const initial = 10
const base = 600
const variantie = 300
let cm

window.onload = () => {
    let xbox = new Image()
    xbox.onload = e => {
        cm = new CarManager(document.getElementById('canvas001'), 200, xbox)
        cm.addCar(new Car(0, 50, 0, "red"))
        cm.addCar(new Car(1,  0, 0, "blue", base + random(variantie)))
        // cm.addCar(new Car(0, 190, initial, "red"))
        // for (let i=180,p=1; i>=0; i-=10,p++) cm.addCar(new Car(p, i, initial, "blue", base + random(variantie)))
        cm.startAnimation()

        addEventListener("keydown", e => {
            switch(e.code) {
                case 'ArrowLeft':
                    console.log('keyDown: ' + e.code)
                    e.preventDefault()
                    cm.cars[0].setAcceleration(-5)
                    break;
                case 'ArrowRight':
                    e.preventDefault()
                    cm.cars[0].setAcceleration(2)
              }
        })
        
        window.addEventListener("keyup", e => {
            console.log('keyUp: ' + e.code)
            cm.cars[0].setAcceleration(0)
        })
        
        window.addEventListener("gamepadconnected", null)
        
        window.addEventListener("gamepaddisconnected", null)
    }
    xbox.src = "./images/360-controller-clipart-9.png"
}

//TODO: Niet vergeten weg te halen
const at = (b, distance, speed) => {
    const t = 2*distance/(speed+b)
    const a = (speed-b)/(2*t) // (speed^2-b^2)/4*distance
    return [a, t]
}

//TODO: Niet vergeten weg te halen
// bx =  b’x + c’
// bx - b’x = c’
// (b-b’)x = c’
// x = c’ / (b-b’)
const bots = (b, b_, c_) => {
    const t = c_ / (b-b_)
    return ({ duration: t, distance: b*t })
}

var trial = function () {
    for (var i = 0; i < arguments.length; i++) console.log(arguments[i]);
}

const rimpel = () => {
    cm.cars[0].speed -= 1
    cm.doAutopilot()
}
