window.onload = event => {
    var c = document.getElementById("myCanvas")
    var ctx = c.getContext("2d")

    console.dir(event)

    c.width  = window.innerWidth
    c.height = window.innerHeight

    var grd = ctx.createRadialGradient(75,50,5,90,60,100)
    grd.addColorStop(0,"red")
    grd.addColorStop(1,"white")

    ctx.fillStyle = grd
    ctx.fillRect(10,10,150,80)

    ctx.moveTo(0,0)
    ctx.lineTo(100, 100)
    ctx.stroke()

//    ctx.beginPath()
//    canvas_arrow(ctx, 0,0, 100,100)
//    ctx.stroke()
}

function canvas_arrow(context, fromx, fromy, tox, toy){
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}