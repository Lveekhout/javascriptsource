function Vierkant(canvas) {
    this.ctx = canvas.getContext('2d')
    this.ctx.font = "10pt Verdana"
    this.ctx.fillStyle = "black"
    this.ctx.fillText(new Date(), 5, 15)

    this.ctx.fillStyle = "white"
    this.ctx.fillRect(20,20,150,1);
//    this.ctx.strokeStyle = "red"
//    this.ctx.lineWidth = 0
//    this.ctx.strokeRect(20,20,150,100);
    this.ctx.stroke();
}