let points = []

const circle = (r, d) => {
    let result = []

    let step = Math.PI*2/d
    for (let idx=0;idx<d;idx++) result.push([r*Math.cos(idx*step), r*Math.sin(idx*step)])

    return result
}

const shape = (p, d) => {
    let result = []

    for (let idx=0;idx<p.length-1;idx++) {
        let step = [(p[idx+1][0] - p[idx][0]) / d * p.length, (p[idx+1][1] - p[idx][1]) / d * p.length]
        for (let i=0;i<d / p.length;i++) result.push([p[idx][0]+i*step[0], p[idx][1]+i*step[1]])
    }

    step = [(p[0][0] - p[p.length-1][0]) / d * p.length, (p[0][1] - p[p.length-1][1]) / d * p.length]
    for (let i=0;i<d / p.length;i++) result.push([p[p.length-1][0]+i*step[0], p[p.length-1][1]+i*step[1]])

    return result
}

const hexagon = (r, d) => {
    let step = Math.PI/3
    let p = []
    for (let i=0;i<6;i++) p.push([r*Math.cos(i*step), r*Math.sin(i*step)])
    return shape(p, d)
}

const translate = t => {
    return points.map(p => [p[0]+t[0], p[1]+t[1]])
}

const rotate = (t,a) => {
    let result = translate([-t[0], -t[1]])
    result = result.map(p => [p[0]*Math.cos(a)-p[1]*Math.sin(a), p[0]*Math.sin(a)+p[1]*Math.cos(a)])
    return result.map(p => [p[0]+t[0], p[1]+t[1]])
}