function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// window.onload = () => {
//     sleep(3000).then(()=> console.log('wakker worden'))
//     console.log('1')
//     new Promise(
//         (resolve, reject)=> {
//             console.log('promise')
//             resolve({value: 100})
//             console.log('hier komt ie dus niet, of toch wel?')
//            // reject({melding: 'zomaar'})
//            throw new Error('Deze wordt volledig genegeerd?')
//         }
//     ).then(
//         value => console.log('then: ' + value.value),
//         reason => {
//             console.dir(reason)
//             console.log('reject: '+ reason.melding)
//             throw new Error('goed fout')
//         }
//     ).catch(
//         reason => console.log('error: ' + reason)
//     )
// }

window.onload = e => {
    const p = new Promise((resolve, reject) => {
        console.log('Promise gestart...')
        setTimeout(() => reject(1), 1000)
    }).then(result => {
        console.log(`then 1: [${result}]`)
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(2), 1000)
        })
    }).then(result => {
        console.log(`then 2: [${result}]`)
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(2), 1000)
        })
    }).then(result => {
        console.log(`then 3: [${result}]`)
    // }).catch(error => {
    //     console.log('catch')
    //     console.dir(error)
    }).finally(() => {
        console.log('finally')
    })
    // console.log('Promise object')
    // console.dir(p)
}
