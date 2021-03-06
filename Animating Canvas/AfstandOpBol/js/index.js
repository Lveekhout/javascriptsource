let duratie = []

window.onload = () => {
    // object = new Object(document.getElementById('object'))
    render3D = new Render3D(document.getElementById('object'))
}

const distanceFromOrigin = (n, e) => {
    return Math.acos(Math.cos(n) * Math.cos(e))
}

const arc2coord = d => {
    return [Math.sin(d), Math.cos(d)]
}

const coord2arc = (c) => {
    if (c[0]<0) return 2*Math.PI-Math.acos(c[1])
    else return Math.acos(c[1])
}

const allDarts = () => {
    let result = []
    for (let d=2;d<=170;d++) result.push({waarde:d,values:darts(d)})
    return result
}

const darts = x => {
    let values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25]
    let result = []

    for (let r1=0;r1<values.length&&values[r1]*2<=x;r1++) {
        if (values[r1]*2==x) result.push(["D"+values[r1]])
        else {
            for (let r2=0;r2<values.length&&values[r1]*2+values[r2]<=x;r2++) {
                if (values[r1]*2+values[r2]==x) result.push([values[r2].toString(), "D"+values[r1]])
                else {
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]+values[r3]<=x;r3++) {
                        if (values[r1]*2+values[r2]+values[r3]==x) result.push([values[r3].toString(), values[r2].toString(), "D"+values[r1]])
                    }
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]+values[r3]*2<=x;r3++) {
                        if (values[r1]*2+values[r2]+values[r3]*2==x) result.push(["D"+values[r3], values[r2].toString(), "D"+values[r1]])
                    }
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]+values[r3]*3<=x;r3++) {
                        if (values[r1]*2+values[r2]+values[r3]*3==x) result.push(["T"+values[r3], values[r2].toString(), "D"+values[r1]])
                    }
                }
            }
            for (let r2=0;r2<values.length&&values[r1]*2+values[r2]*2<=x;r2++) {
                if (values[r1]*2+values[r2]*2==x) result.push(["D"+values[r2], "D"+values[r1]])
                else {
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]*2+values[r3]<=x;r3++) {
                        if (values[r1]*2+values[r2]*2+values[r3]==x) result.push([values[r3].toString(), "D"+values[r2], "D"+values[r1]])
                    }
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]*2+values[r3]*2<=x;r3++) {
                        if (values[r1]*2+values[r2]*2+values[r3]*2==x) result.push(["D"+values[r3], "D"+values[r2], "D"+values[r1]])
                    }
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]*2+values[r3]*3<=x;r3++) {
                        if (values[r1]*2+values[r2]*2+values[r3]*3==x) result.push(["T"+values[r3], "D"+values[r2], "D"+values[r1]])
                    }
                }
            }
            for (let r2=0;r2<values.length-1&&values[r1]*2+values[r2]*3<=x;r2++) {
                if (values[r1]*2+values[r2]*3==x) result.push(["T"+values[r2], "D"+values[r1]])
                else {
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]*3+values[r3]<=x;r3++) {
                        if (values[r1]*2+values[r2]*3+values[r3]==x) result.push([values[r3].toString(), "T"+values[r2], "D"+values[r1]])
                    }
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]*3+values[r3]*2<=x;r3++) {
                        if (values[r1]*2+values[r2]*3+values[r3]*2==x) result.push(["D"+values[r3], "T"+values[r2], "D"+values[r1]])
                    }
                    for (let r3=0;r3<values.length-1&&values[r1]*2+values[r2]*3+values[r3]*3<=x;r3++) {
                        if (values[r1]*2+values[r2]*3+values[r3]*3==x) result.push(["T"+values[r3], "T"+values[r2], "D"+values[r1]])
                    }
                }
            }
        }
    }
    return result
}