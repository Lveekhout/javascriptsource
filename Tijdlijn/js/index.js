window.onload = event => {
    let start = new Date().getTime()
    let canvas = document.getElementById("main-canvas")
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    periodes.forEach((v, i) => {
        ctx.fillStyle = v.kleur;
        v.periodes.forEach(v => {
            let duur = new Date(v.einddatum).getTime() - new Date(v.ingangsdatum).getTime()
            console.log(duur)
        })
        ctx.fillRect(20, 20 + i*18, 120, 16)
    })

    console.log("duur: " + (new Date().getTime()-start))
}