window.onload = () => {
    addEventListener("input", () => {
        for (x=0;x<10000;x++) for (y=0;y<1000;y++) {}
        if (/^nota:(\d{9})$/.test(input001.value)) para001.innerHTML = input001.value.match(/^nota:(\d{9})$/)[1]
        else para001.innerHTML = "<i>ongeldige invoer</i>"
    })
}