let teller002 = 0

function inc001(teller) {
//    p001.innerHTML = teller001
    document.writeln(teller)
    if (teller<1000) setTimeout(() => inc001(++teller), 0)
}

function inc002() {
    document.writeln(teller002)
    if (teller002<1000) setTimeout(inc002, 0)
    teller002++
}

window.onload = e => {
//    inc001(0)
    inc002()
}