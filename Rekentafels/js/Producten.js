function Producten(tafel) {
    let randomizedProducten = () => {
        let result = []
        for (let x=2;x<=tafel;x++) for (let y=x;y<=tafel;y++) {
            let gevonden = result.find(v => v.product == x*y)
            if (gevonden) gevonden.factoren.push([x,y])
            else result.push({"product":x*y,"factoren":[[x,y]]})
        }
        return result.sort((a,b) => Math.floor(Math.random()*3)-1)
    }

    this.tafel = tafel
    this.producten = randomizedProducten()
}