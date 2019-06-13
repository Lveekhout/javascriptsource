function Snowflake() {
    this.lines = []

    let factor = 0.65/(1+Math.sqrt(2))

    let triangle = (line, level) => {
        let delta = [line[1][0]-line[0][0], line[1][1]-line[0][1]]
        let midden = [line[0][0]+delta[0]/2,line[0][1]+delta[1]/2]

        this.lines.push([[midden[0]-delta[0]*factor, midden[1]-delta[1]*factor], [midden[0]+delta[1]*factor, midden[1]-delta[0]*factor]])
        this.lines.push([[midden[0]+delta[1]*factor, midden[1]-delta[0]*factor], [midden[0]+delta[0]*factor, midden[1]+delta[1]*factor]])

        if (level>0) {
            triangle([line[0],[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor]], level-1)
            triangle([[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor],[midden[0]+delta[1]*factor,midden[1]-delta[0]*factor]], level-1)
            triangle([[midden[0]+delta[1]*factor,midden[1]-delta[0]*factor],[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor]], level-1)
            triangle([[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor],line[1]], level-1)
            triangle([[midden[0]-delta[0]*factor,midden[1]-delta[1]*factor],[midden[0]+delta[0]*factor,midden[1]+delta[1]*factor]], level-1)
        }
    }
    triangle([[20, 0],[-20, 0]], 5)
}