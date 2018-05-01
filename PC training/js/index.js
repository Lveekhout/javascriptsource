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

function einde() {
    blok.style.backgroundColor="azure"
    window.speechSynthesis.speak(einde)
    clearInterval(timer)
}

window.onload = () => {
    for (i=0;i<60000;i+=10000) {
        timer.push(setTimeout(starten, i))
        timer.push(setTimeout(stoppen, i+5000))
    }

    for (i=60000;i<540000;i+=120000) {
        timer.push(setTimeout(starten, i))
        timer.push(setTimeout(stoppen, i+60000))
    }

    for (i=540000;i<600000;i+=2000) {
        timer.push(setTimeout(() => blok.style.backgroundColor="green", i))
        timer.push(setTimeout(() => blok.style.backgroundColor="red", i+1000))
    }

    timer.push(setTimeout(() => window.speechSynthesis.speak(snel), 540000))
    timer.push(setTimeout(einde, 600000))

    blok.addEventListener("click", () => timer.forEach(v => clearTimeout(v)))

    starttijd = new Date()
    timer.push(setInterval(() => {
        tijd.innerHTML = getYoutubeLikeToDisplay(new Date() - starttijd)
    }, 1000))
}