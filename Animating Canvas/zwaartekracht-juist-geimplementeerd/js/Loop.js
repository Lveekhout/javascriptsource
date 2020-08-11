function Loop(canvas) {
    let display
    let iField = new Image()
    let iSvg = [new Tile(), new Tile()]
    let camera = 0
    let poshis = []

    this.vect = [0, 0]
    this.iHelicopter = new Helicopter([158, 20])

    this.drawSpeed = (canvas, acc, speed) => {
        let ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        ctx.fillText(new Date(), 10, 10)
        let factor = 25
        let _x=-canvas.width/2/factor
        ctx.beginPath()
        ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2)
        ctx.moveTo(canvas.height/2, 0); ctx.lineTo(canvas.width/2, canvas.height)
        ctx.lineWidth = 1
        ctx.strokeStyle = "#ffffff"
        ctx.stroke()
        ctx.beginPath()
        for (x=0;x<canvas.width;x++) {
            ctx.lineTo(x, canvas.height/2-(acc * Math.pow(_x, 2) + speed*_x))
            _x += 1/factor
        }
        ctx.lineWidth = 3
        ctx.strokeStyle = "red"
        ctx.stroke()
        _x=-canvas.width/2/factor
        ctx.beginPath()
        for (x=0;x<canvas.width;x++) {
            ctx.lineTo(x, canvas.height/2-(speed*_x))
            _x += 1/factor
        }
        ctx.lineWidth = 3
        ctx.strokeStyle = "yellow"
        ctx.stroke()
    }
    
    this.draw = scale => {
        let ctx = canvas.getContext("2d")
    
        ctx.drawImage(iField, 0, 0, canvas.width, canvas.height)
        iSvg[0].drawTile(canvas, Math.floor(-camera/5), 700-512)
        iSvg[1].drawTile(canvas, Math.floor(-camera), 700-256)
    
        display.innerHTML = "speed: " + Math.sqrt(Math.pow(this.iHelicopter.speed[0],2)+Math.pow(this.iHelicopter.speed[1],2))
        ctx.save()
        ctx.translate(this.iHelicopter.pos[0]*scale-camera, canvas.height - this.iHelicopter.pos[1]*scale)
        ctx.rotate(this.iHelicopter.rotation)
        // if (navigator.getGamepads()[0]) {
        //     let x = navigator.getGamepads()[0].axes[3]
        //     let s = 10/Math.pow(x+2, Math.log(10)/Math.log(2))
        //     ctx.scale(1/2/s, 1/2/s)
        // } else ctx.scale(1/2, 1/2)
        ctx.scale(this.iHelicopter.scale*scale, this.iHelicopter.scale*scale)
        ctx.save()
        ctx.filter = 'blur(3px)'
        ctx.drawImage(this.iHelicopter, -this.iHelicopter.offset[0], -this.iHelicopter.offset[1], this.iHelicopter.width, this.iHelicopter.height)
        ctx.restore()
        ctx.drawImage(this.iHelicopter, -this.iHelicopter.offset[0], -this.iHelicopter.offset[1], this.iHelicopter.width, this.iHelicopter.height)
    
        // ctx.beginPath();
        // ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
        // ctx.fillStyle = 'red';
        // ctx.fill();

        ctx.restore()

        arrow2d(canvas, [800, 700], 100, Math.PI/2)
    }

    this.update = delta => {
        this.vect = [0, 0]
        if (navigator.getGamepads()[0]) {
            this.iHelicopter.rotation = navigator.getGamepads()[0].axes[2]/2
            this.vect[0] += navigator.getGamepads()[0].axes[2]*10
            if (navigator.getGamepads()[0].buttons[6].touched) this.vect[1] += navigator.getGamepads()[0].buttons[6].value*10
    
            this.vect[1] -= 9.81/2 // Gravity
            this.iHelicopter.apply_acc(this.vect, delta/1000)
            poshis.push(this.iHelicopter.pos[0])
            if (poshis.length>=30) camera = poshis.shift()-canvas.width/2
        }
    }

    this.iHelicopter.src = "image/helicopter-256-modified.png"
    iField.src = "image/sydney.bmp"
    iSvg[0].src = "image/mountain.png"
    iSvg[1].src = "image/nature.png"

    display = document.getElementById("display")

    this.iHelicopter.pos = [8, 5]
}