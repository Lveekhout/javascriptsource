function trimTrailingZeros(n) {
    let x = n.split(".")
    if (x.length==2) {
        let last = x[1].length-1
        while (last>4&&x[1].charAt(last)==="0") last--
        return x[0] + "." + x[1].substr(0,last+1)
    } else if (x.length==1) return n
    else throw new Error("Illegaal nummertje: " + n)
}