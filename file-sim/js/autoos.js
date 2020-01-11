//function createAutoos(a) {
//    for (i=0;i<Math.PI*2;i+=0.5+Math.random()) a.push(
//        {
//            color: 0,
//            position: i,
//            cc: 0,
//            speed: 0.01,
//            maxspeed: 0.02,
//            force: 0,
//            time: 0,
//            botsing: botsing,
//            beslis: beslis
//        })
//    for (i=0;i<a.length-1;i++) a[i].next = a[i+1]
//    a[0].color = "red"
//    a[0].cc = Math.PI*2
//    a[0].beslis = undefined
//    a[3].beslis = undefined
//    a[a.length-1].next = a[0]
//}

function createAutoos(a) {
    a.push(
        {
            color: "red",
            position: 0,
//            cc: 0,
            speed: 0.01,
            maxspeed: 0.02,
            force: 0,
            time: 0,
//            botsing: botsing,
//            beslis: beslis
        })
}