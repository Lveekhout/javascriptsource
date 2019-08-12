let overrideDatum
let elementStatements_bsb
let elementStatements_bsd
let currentfile

let statement = "insert into pas_basisgegeven_depot_fondsen values (null, '{NavPrice}', to_date('{NavDate}', 'yyyy-mm-dd'), null, {BSB}, '{PrrCode}', {BSD}, '{Type}');"
let mapping = [
    ["DivBndVv",    "S40",       "P1798", "pas_beleggingsfondsen"],
    ["DivEq3Vv",    "S41",       "P1798", "pas_beleggingsfondsen"],
    ["LiMaVv",      "S42",       "P1798", "pas_beleggingsfondsen"],
    ["WXEqBVv",     "S43",       "P1798", "pas_beleggingsfondsen"],
    ["VgReInsVv",   "S44",       "P1798", "pas_beleggingsfondsen"],
    ["WrdXComVz",   "S45",       "P1798", "pas_beleggingsfondsen"],
    ["EmuCoBndBVz", "S46",       "P1798", "pas_beleggingsfondsen"],
    ["EMDVz",       "S47",       "P1798", "pas_beleggingsfondsen"],
    ["WrdHiYVz",    "S48",       "P1798", "pas_beleggingsfondsen"],
    ["EurCreVz",    "S49",       "P1798", "pas_beleggingsfondsen"],
    ["AbsVz",       "S50",       "P1798", "pas_beleggingsfondsen"],
    ["MMEVV",       "S51",       "P1798", "pas_beleggingsfondsen"],
    ["WefiXEqVz",   "BLP01",     "P1798", "pas_beleggingsfondsen"],
    ["VastgoedFd",  "BLP02",     "P1798", "pas_beleggingsfondsen"],
    ["WrdXComVz",   "BLP03",     "P1798", "pas_beleggingsfondsen"],
    ["EmuCoBndBVz", "BLP04",     "P1798", "pas_beleggingsfondsen"],
    ["EMDVz",       "BLP05",     "P1798", "pas_beleggingsfondsen"],
    ["WrdHiYVz",    "BLP06",     "P1798", "pas_beleggingsfondsen"],
    ["EurCreVz",    "BLP07",     "P1798", "pas_beleggingsfondsen"],
    ["AbsVz",       "BLP08",     "P1798", "pas_beleggingsfondsen"],
    ["MMEVV",       "BLP09",     "P1798", "pas_beleggingsfondsen"],
    ["EquityVz",    "BLP10",     "P1798", "pas_beleggingsfondsen"],
    ["RntVz",       "BLP11",     "P1798", "pas_beleggingsfondsen"],
    ["MixVz",       "BLP12",     "P1798", "pas_beleggingsfondsen"],
    ["DepVz",       "BLP13",     "P1798", "pas_beleggingsfondsen"],
    ["DivBndVv",    "BCKTBLP-1", "P1843", "pas_depots"],
    ["DivEqVv",     "BCKTBLP-2", "P1843", "pas_depots"],
    ["LiMaVv",      "BCKTBLP-3", "P1843", "pas_depots"],
    ["OptasCMF1Vv", "BLP16",     "P1843", "pas_depots"],
    ["OptasCMF2Vv", "BLP17",     "P1843", "pas_depots"],
    ["OptasCMF3Vv", "BLP18",     "P1843", "pas_depots"],
    ["OptasCMF4Vv", "BLP19",     "P1843", "pas_depots"],
    ["OptasCMF5Vv", "BLP20",     "P1843", "pas_depots"],
]

function trimTrailingZeros(n) {
    let x = n.split(".")
    if (x.length==2) {
        let last = x[1].length-1
        while (last>4&&x[1].charAt(last)==="0") last--
        return x[0] + "." + x[1].substr(0,last+1)
    } else if (x.length==1) return n
    else throw new Error("Illegaal nummertje: " + n)
}

function handleOnInput() {
    if (currentfile) handleFile(currentfile)
}

function handleOnChange(e) {
    currentfile = e.target.files[0]
    handleFile(currentfile)
}

function handleFile(file) {
    overrideDatum = document.getElementById("overrideDatum").value
    elementStatements_bsb.innerHTML = ""
    elementStatements_bsd.innerHTML = ""
    
    let reader = new FileReader()
    reader.onload = c => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(c.target.result, "text/xml")
        let canonicalFormat = xmlDoc.getElementsByTagName("CanonicalFormat")[0]
        let portfolioNAV = canonicalFormat.getElementsByTagName("PortfolioNAV")[0]
        for (x=0;x<portfolioNAV.children.length;x++) {
            let code = portfolioNAV.children[x].getAttribute("FundCode")
            let maps = mapping.filter(e => e[0]===code)
            maps.forEach(map => {
                let _statement = statement
                let navPrice = portfolioNAV.children[x].getElementsByTagName("NAV")[0].getAttribute("NavPrice")
                let navDate = portfolioNAV.children[x].getElementsByTagName("NAV")[0].getAttribute("NavDate")
                _statement = _statement.replace("{NavPrice}", trimTrailingZeros(navPrice))
                _statement = _statement.replace("{NavDate}", overrideDatum ? overrideDatum : navDate)
                _statement = _statement.replace("{PrrCode}", map[2])
                if (map[3] === "pas_beleggingsfondsen") {
                    _statement = _statement.replace("{BSB}", "(select id from " + map[3] + " where code_beleggingsfonds='" + map[1] + "')")
                    _statement = _statement.replace("{BSD}", "null")
                    _statement = _statement.replace("{Type}", "BSB")
                    elementStatements_bsb.innerHTML += "<br>" + _statement
                } else {
                    _statement = _statement.replace("{BSB}", "null")
                    _statement = _statement.replace("{BSD}", "(select id from " + map[3] + " where code_depot='" + map[1] + "')")
                    _statement = _statement.replace("{Type}", "BSD")
                    elementStatements_bsd.innerHTML += "<br>" + _statement
                }
            })
        }
    }
    reader.readAsText(file)
}

window.onload = () => {
    elementStatements_bsb = document.getElementById("statements_bsb")
    elementStatements_bsd = document.getElementById("statements_bsd")
}