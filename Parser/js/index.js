function Parser(input, output) {
    if (!(input instanceof HTMLInputElement&&output instanceof HTMLTextAreaElement)) {
        document.write("Geen textarea's")
        let error = new Error("Geen textarea's")
        console.dir(error)
        throw error
    }
    this.input = input
    this.output = output

    console.log(this.input.value)
}

window.onload = () => {
    let parser = new Parser(input, output)
}