function ImageManager() {
    images = []
    this.addImage = (variable, src) => {
        images.push([variable, src])
    }

    this.load = callback => {
        let count = images.length
        images.forEach(element => {
            // eval(element[0] + " = new Image()")
            eval(element[0] + ".src = '" + element[1] + "'")
            eval(element[0] + ".onload=event => {count--; if (count==0) callback()}")
        });
    }
}