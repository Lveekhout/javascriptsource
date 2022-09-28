function Wortel(v) {
    this.toString = () => {
        return `w(${v})`
    }

    this.toLatex = () => {
        return `\\sqrt\{${v.toLatex()}\}`
    }

    this.eval = () => {
        return Fraction.fromNumber(v)
    }
}
