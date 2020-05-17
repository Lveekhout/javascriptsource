function Car(id, position, speed, color, interval) {
    this.id = id
    this.position = position
    this.speed = speed
    this.interval = interval
    this.alpha = 0
    this.color = color

    let acceleration = 0

    this.crash = nextCarArray => {
        const delta = nextCarArray[0].position + nextCarArray[1] - this.position
        if (delta<2) {
            console.log(this)
            console.log(nextCarArray)
        }
        return delta<2
    }

    this.getAcceleration = () => {
        return acceleration
    }

    this.setAcceleration = a => {
        if (a>5) {
            acceleration = 5
        } else if (a<-5) {
            acceleration = -5
        } else {
            acceleration = a
        }
    }

    this.update = t => {
       if(this.speed>0||acceleration>0) {
            this.position += acceleration * Math.pow(t, 2) + this.speed * t
            this.speed += 2 * acceleration * t
            if (this.speed<0) this.speed=0
       }
    }

    this.decide = nextCarArray => {
        this.alpha = 1

        const result = at(this.speed, nextCarArray[0].position + nextCarArray[1] - this.position - 3, nextCarArray[0].speed)
        if (isNaN(result[1])) {
            throw "isNaN"
        } else if (isFinite(result[1])) {
            if (result[1]<0) console.log("Negatieve tijd")
            else {
                if (isNaN(result[0])) {
                    throw "isNaN"
                } else if (isFinite(result[0])) {
                    this.setAcceleration(result[0])
                } else {
                    throw "!isFinite"
                }
            }
        } else {
            // if (newNextCarPosition - this.position > 3.01) {
            //     this.setAcceleration(5)
            //     throw "gas!!!"
            // }
        }
    }

    //07-02-2020 hoofdstuk 9: https://www.overleaf.com/project/5bc484ce38b3903e926ed5c0
    const at = (b, distance, speed) => {
        const t = 2*distance/(speed+b)
        return [(speed-b)/(2*t), t]
    }
}