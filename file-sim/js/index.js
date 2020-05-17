const initial = 10
const base = 300
const variantie = 100
let cm

window.onload = () => {
    let xbox = new Image()
    xbox.onload = e => {
        cm = new CarManager(document.getElementById('canvas001'), 200, xbox)
        // cm.addCar(new Car(0, 50, 10, "red"))
        // cm.addCar(new Car(1,  0, 10, "blue", base + random(variantie)))
        cm.addCar(new Car(0, 190, initial, "red"))
        for (let i=180,p=1; i>=0; i-=10,p++) cm.addCar(new Car(p, i, initial, "blue", base + random(variantie)))
        cm.startAnimation()

        addEventListener("keydown", e => {
            switch(e.keyCode) {
                case 17:
                    cm.cars[0].setAcceleration(-5)
                    break;
                case 39:
                    cm.cars[0].setAcceleration(2)
              }
        })
        
        window.addEventListener("keyup", e => {
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
    const a = (speed-b)/(2*t)
    return [a, t]
}

var trial = function() {
    for (var i=0; i<arguments.length; i++) console.log(arguments[i]);
}