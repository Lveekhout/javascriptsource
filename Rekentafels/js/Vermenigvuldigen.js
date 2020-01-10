function Vermenigvuldigen(tafel, div) {
    this.result = []
    this.randomResult = []

    randomizeResult = () => {
        let bron = []
        this.result.forEach(v => bron.push(v))

        while (bron.length>0) {
            let idx = Math.floor(Math.random()*bron.length)
            this.randomResult.push(bron[idx])
            bron.splice(idx,1)
        }
    }

    for (let x=2;x<=tafel;x++) for (let y=2;y<=tafel;y++) this.result.push({factor1: x, factor2: y})
    randomizeResult()

    let current
    this.start = () => {
        current = 0
        div.getElementsByTagName("pre")[0].innerHTML = (current+1) + " / " + this.randomResult.length
        div.getElementsByTagName("pre")[1].innerHTML = this.randomResult[current].factor1
        div.getElementsByTagName("pre")[3].innerHTML = this.randomResult[current].factor2
    }

    this.check = () => {
        if (this.randomResult[current].factor1*this.randomResult[current].factor2!=div.getElementsByTagName("input")[0].value) {
            document.getElementById("vermenigvuldigen").style.backgroundColor = "red"
            return false
        } else {
            document.getElementById("vermenigvuldigen").style.backgroundColor = "aquamarine"
            div.getElementsByTagName("input")[0].value = ""
            return true
        }
    }

    this.volgende = () => {
        current++
        if (current<this.randomResult.length) {
            div.getElementsByTagName("pre")[0].innerHTML = (current+1) + " / " + this.randomResult.length
            div.getElementsByTagName("pre")[1].innerHTML = this.randomResult[current].factor1
            div.getElementsByTagName("pre")[3].innerHTML = this.randomResult[current].factor2
        } else {
            alert("EINDE")
        }
    }
}