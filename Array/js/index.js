window.onload = () => {
    p1.innerHTML = ['PPI','STAP','AEGPPI','SPN','BBF','SFB','ACY'].findIndex(e => e=="AEGPPI")
    
    let object = {"naam":"Laurens","adres":"JFL47"}
    let element = "naam"
    p2.innerHTML = object[element]
}