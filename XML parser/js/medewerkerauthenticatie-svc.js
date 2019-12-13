function haalToken(success) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = e => {
        if (e.target.readyState==4&&e.target.status==200&&success) success(JSON.parse(e.target.response).token)
    }
    xhr.open("GET", "https://medewerkerauthenticatie.svc.prd.tkp/api/v1/medewerkers/ikzelf", true)
    xhr.setRequestHeader("Authorization", "Basic c2NydW1fYWZ0ZXJwYXJ0eTpUS1BwZW5zaW9lbjIwMjA=")
    xhr.send()
}