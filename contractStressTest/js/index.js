let running=true

window.onload = e => {
    for (x=0;x<14;x++) {
        let user = new User()
        document.getElementById("container").appendChild(user.element)
        user.request()
    }
    h001.innerHTML = "Running!"
}