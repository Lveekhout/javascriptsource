// https://www.createjs.com/demos/easeljs/cache
class Tile extends Image {
    drawTile = (canvas, offset, y) => {
        let ctx = canvas.getContext("2d")
        let x = offset%this.width
        if (x>0) x -= this.width
        while (x<canvas.width) {
            ctx.drawImage(this, x, y)
            x+=this.width
        }
    }

    // // https://stackoverflow.com/questions/14121719/html5-canvas-background-image-repeat
    // drawTile = (canvas, offset, y) => {
    //     let ctx = canvas.getContext("2d")
    //     let ptrn = ctx.createPattern(this, 'repeat')
    //     ctx.fillStyle = ptrn
    //     ctx.fillRect(0, 0, canvas.width, canvas.height)
    // }
}