function Add(...value) {
    this.toString = () => {
        return value.join(" + ")
    }
}
