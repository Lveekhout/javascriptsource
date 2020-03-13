function Car(position, speed, color) {
    this.position = position
    this.speed = speed
    this.acceleration = 0
    this.color = color

    this.goal = nextCar => {
        const delta = nextCar.position - this.position
        return delta>9 && delta <11 //Zoiets ongeveer
    }

    this.update = t => {
        this.position += this.acceleration * Math.pow(t, 2) + this.speed * t
        this.speed += 2 * this.acceleration * t
    }
}