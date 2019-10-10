function haalBestanden(token, success) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = e => {
        if (e.target.readyState==4&&e.target.status==200&&success) success(JSON.parse(e.target.responseText))
    }
    xhr.open("GET", "https://ophalen-koersen.svc.prd.tkp/api/v1/beheer/aam/bestanden", true)
    xhr.setRequestHeader("Authorization", "Bearer " + token)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.send()
}

function haalBestand(token, filename, success) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = e => {
        if (e.target.readyState==4&&e.target.status==200&&success) success(e.target.response)
    }
    xhr.open("GET", "https://ophalen-koersen.svc.prd.tkp/api/v1/beheer/aam/bestanden/" + filename, true)
    xhr.setRequestHeader("Authorization", "Bearer " + token)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.send()
}