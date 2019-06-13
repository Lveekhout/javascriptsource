let timer = []
var start = new SpeechSynthesisUtterance('start')
var stop = new SpeechSynthesisUtterance('stop')
var snel = new SpeechSynthesisUtterance('snel')
var einde = new SpeechSynthesisUtterance('einde')

function starten() {
    blok.style.backgroundColor="green"
    window.speechSynthesis.speak(start)
}

function stoppen() {
    blok.style.backgroundColor="red"
    window.speechSynthesis.speak(stop)
}

function beeindigen() {
    blok.style.backgroundColor="azure"
    window.speechSynthesis.speak(einde)
    while (timer.length>0) clearTimeout(timer.pop())
}

window.onload = () => {
    starttijd = new Date()
    timer.push(setInterval(() => {
        tijd.innerHTML = getYoutubeLikeToDisplay(new Date() - starttijd)
    }, 1000))

    for (i=0;i<60000;i+=10000) {
        timer.push(setTimeout(starten, i))
        timer.push(setTimeout(stoppen, i+5000))
    }

    for (i=60000;i<420000;i+=120000) {
        timer.push(setTimeout(starten, i))
        timer.push(setTimeout(stoppen, i+60000))
    }

    for (i=420000;i<480000;i+=2000) {
        timer.push(setTimeout(() => blok.style.backgroundColor="green", i))
        timer.push(setTimeout(() => blok.style.backgroundColor="red", i+1000))
    }
    for (i=540000;i<600000;i+=2000) {
        timer.push(setTimeout(() => blok.style.backgroundColor="green", i))
        timer.push(setTimeout(() => blok.style.backgroundColor="red", i+1000))
    }

    timer.push(setTimeout(() => window.speechSynthesis.speak(snel), 420000))
    timer.push(setTimeout(() => window.speechSynthesis.speak(stop), 480000))
    timer.push(setTimeout(() => window.speechSynthesis.speak(snel), 540000))
    timer.push(setTimeout(beeindigen, 600000))

    blok.addEventListener("click", () => { while (timer.length>0) clearTimeout(timer.pop()) })
}