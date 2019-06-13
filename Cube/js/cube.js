function Cube() {
    let stack = []
    this.check = e => e[0] == e[4] && e[1] == e[4] && e[2] == e[4] && e[3] == e[4] && e[5] == e[4] && e[6] == e[4] && e[7] == e[4] && e[8] == e[4] &&
        e[9] == e[13] && e[10] == e[13] && e[11] == e[13] && e[12] == e[13] && e[14] == e[13] && e[15] == e[13] && e[16] == e[13] && e[17] == e[13] &&
        e[18] == e[22] && e[19] == e[22] && e[20] == e[22] && e[21] == e[22] && e[23] == e[22] && e[24] == e[22] && e[25] == e[22] && e[26] == e[22] &&
        e[27] == e[31] && e[28] == e[31] && e[29] == e[31] && e[30] == e[31] && e[32] == e[31] && e[33] == e[31] && e[34] == e[31] && e[35] == e[31] &&
        e[36] == e[40] && e[37] == e[40] && e[38] == e[40] && e[39] == e[40] && e[41] == e[40] && e[42] == e[40] && e[43] == e[40] && e[44] == e[40] &&
        e[45] == e[49] && e[46] == e[49] && e[47] == e[49] && e[48] == e[49] && e[50] == e[49] && e[51] == e[49] && e[52] == e[49] && e[53] == e[49]
    this.push = e => {
        if (stack.includes(e)) return false
        else { stack.push(e); return true }
    }
    this.duur = n => { for (let x = 0; x < n; x++) this.check("GGGGGGGGGBBBBBBBBBWWWWWWWWWYYYYYYYYYRRRRRRRRROOOOOOOOO") }
}