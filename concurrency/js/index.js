let teller002 = 0

function inc001(teller) {
//    p001.innerHTML = teller001
    document.writeln(`<span style="color:blue">${teller}</span>`)
    if (teller<1000) setTimeout(() => inc001(++teller), 0)
}

function inc002() {
    document.writeln(`<span style="color:red">${teller002}</span>`)
    if (teller002<1000) setTimeout(inc002, 0)
    teller002++
}

window.onload = e => {
    inc001(0)
    inc002()
}
