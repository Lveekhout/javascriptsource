let maxFactor;
let maxProducten;
let fouten = [];
let start_tijd;
let factoren;
let current;

function berekenFactoren(product) {
    let value = [];
    let teller = 2;
    let totenmet = Math.sqrt(product);

    while (teller<=totenmet) {
        if (product%teller==0) {
            let factor1 = teller;
            let factor2 = product/teller;
            if (factor1<=maxFactor&&factor2<=maxFactor) {
                value.push({"factor1":factor1,"factor2":factor2});
            }
        }
        teller++;
    }

    return value;
}
function alleFactoren() {
    let result = [];
    for (let i=0;i<=maxProducten;i++) {
        let factoren = berekenFactoren(i);
        if (factoren.length>0) result.push({"product":i, "factoren":factoren});
    }
//                let str = ""
//                result.forEach(v => {
//                    str += v.product
//                    v.factoren.forEach(v => str += "\t" + v.factor1 + " x " + v.factor2)
//                    str += "\n"
//                })
//                console.log(str)
    return result;
};
function randomFactoren() {
    let bron = alleFactoren();
    let result = [];
    while (bron.length>0) {
        let idx = Math.floor(Math.random()*bron.length);
        result.push(bron[idx]);
        bron.splice(idx,1);
    }
    return result;
};
function toonFactoren(factoren) {
    let res = "";
    factoren.forEach((item) => {
        res += item.factor1 + " x " + item.factor2 + "<br>";
    });
    document.getElementsByTagName("body")[0].getElementsByTagName("p")[0].innerHTML = res;
}
function toonProducten() {
    let res = "";
    for (let i=1;i<=maxProducten;i++) {
        let factoren = berekenFactoren(i);
        if (factoren.length>0) {
            let substr = "";
            for (let x=0;x<factoren.length;x++) {
                substr += ", " + factoren[x].factor1 + " x " + factoren[x].factor2;
            }
            res += i + ";" + substr.substr(2) + "<br>";
        }
    }
    document.getElementsByTagName("body")[0].getElementsByTagName("p")[0].innerHTML = res;
}
function submitSommetje(el, soms) {
    let result = true;
    let forms = el.getElementsByTagName('form');
    for (let x=0;x<forms.length;x++) {
        let inputs = forms[x].getElementsByTagName('input');
        if (soms) {
            if (soms.indexOf(Number(inputs[0].value)+Number(inputs[1].value))==-1) {
                soms.push(Number(inputs[0].value)+Number(inputs[1].value));
            }
            else {
                el.style.backgroundColor = 'red';
                return false;
            }
        }
        if (inputs[0].value<2 || inputs[0].value>maxFactor || inputs[1].value<2 || inputs[1].value>maxFactor || inputs[0].value * inputs[1].value != inputs[2].value) {
            fouten.push(inputs[2].value);
            el.style.backgroundColor = 'red';
            result = false;
        } else {
            el.style.backgroundColor = 'green';
            result = result && true;
        }
    }
    return result;
}
function setMaxFactor(factor) {
    maxFactor = factor;
    maxProducten = maxFactor*maxFactor;
}
function deleteSommetjes(el) {
    el.innerHTML = "";
}
function insertSommetje(el, product, focus) {
    let row = el.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = div0001.innerHTML.replace("{product}", product);
    cell.children[0].addEventListener("transitionend", () => {});
    if (focus) cell.children[0].children[0].children[0].focus();
}

function start(el) {
    setMaxFactor(Number(tafelinput.value))
    current = 0;
    fouten = [];
    factoren = randomFactoren();
    el.style.display='none';
    but_stop.style.display='';
    rekengedeelte.style.display='';
    resultaatgedeelte.style.display='none';
    tafelinput.disabled = true

    toonSommetje();
    start_tijd = Date.now();
}
function stop(el) {
    resultaatgedeelte.children[0].innerHTML = "Duur: " + getYoutubeLikeToDisplay(Date.now()-start_tijd);
    resultaatgedeelte.children[1].innerHTML = "Aantal fouten: " + fouten.length;

    el.style.display='none';
    but_start.style.display='block';
    rekengedeelte.style.display='none';
    resultaatgedeelte.style.display='';
    tafelinput.disabled = false
}
function toonSommetje() {
    statustekst.innerHTML = (current+1) + " / " + factoren.length;
    deleteSommetjes(sommetjestabel);
    for (i=0;i<factoren[current].factoren.length;i++) {
        insertSommetje(sommetjestabel, factoren[current].product, i==0);
    }
}
function submitSommetjes(el) {
    let result = true;
    let soms = [];
    let sommetjes = el.getElementsByClassName("sommetje");
    if (sommetjes.length>0) {
        for (let i=0;i<sommetjes.length;i++) {
            result = result && submitSommetje(sommetjes[i], soms);
        }
    }
    return result;
}
function volgende() {
    if (submitSommetjes(sommetjestabel)) {
        current++;
        if (current>=factoren.length) {
            stop(but_stop);
        } else toonSommetje();
    }
}