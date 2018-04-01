function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

window.onload = () => {
    sleep(3000).then(()=>document.writeln("wakker worden"))
    document.writeln("1")
    new Promise(
        (resolve, reject)=> {
            document.writeln("promise")
            resolve({value: 100})
//            reject({melding: "zomaar"})
//            throw new Error("er is iets fout gegaan")
        }
    ).then(
        value => document.writeln("then: " + value.value),
        reason => {
            console.dir(reason)
            document.writeln("reject: "+ reason.message)
            throw new Error("goed fout")
        }
    ).catch(
        reason => document.writeln("error: " + reason)
    )
}