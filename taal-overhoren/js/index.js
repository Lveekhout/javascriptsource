let toetsData
let currentwoord

function ToetsManager() {

}

function onMethodeSelectie(e) {
    document.getElementById("input-button").disabled = !document.getElementById("input-optie1").checked&&!document.getElementById("input-optie2").checked
}

function startenToets(e) {
    document.getElementById("methode-selectie").style.display = "none"
    document.getElementById("uitvoeren-toets").style.display = "block"

    currentwoord = 0
    document.getElementById("gevraagd-woord").innerHTML = toetsData.woorden[currentwoord].woord1
}

function volgendeWoord() {
    console.log(document.getElementById("input-antwoord").value)
    if (document.getElementById("input-antwoord").value===toetsData.woorden[currentwoord].woord2) {
        currentwoord++
        if (currentwoord==toetsData.woorden.length) {
            document.getElementById("uitvoeren-toets").style.display = "none"
            document.getElementById("toets-einde").style.display = "block"
        } else {
            document.getElementById("gevraagd-woord").innerHTML = toetsData.woorden[currentwoord].woord1
        }
    } else {
        document.getElementById("uitvoeren-toets").style.backgroundColor = "red"
    }

    document.getElementById('input-antwoord').value = ""
    document.getElementById('input-antwoord').focus()
}

function laden(e) {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.onload = r => {
        let x = r.target.result.split("\r\n")
        let words = x[0].split(";")
        toetsData = {taal1:words[0],taal2:words[1],woorden:[]}
        for (idx=1;idx<x.length;idx++) {
            if (x[idx].length>0) {
                let words = x[idx].split(";")
                toetsData.woorden.push({woord1:words[0], woord2:words[1]})
            }
        }
        document.getElementById("file-selectie").style.display = "none"
        document.getElementById("methode-selectie").style.display = "block"
        document.getElementById("input-optie1").outerHTML += " " + toetsData.taal1 + " - " + toetsData.taal2
        document.getElementById("input-optie2").outerHTML += " " + toetsData.taal2 + " - " + toetsData.taal1
    }
    reader.readAsText(file)
}