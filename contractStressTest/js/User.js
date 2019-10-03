function User() {
    let dvdId = dvdIds[Math.floor(randomDvd()*dvdIds.length)]
    this.element = document.createElement("p")
    this.element.innerHTML = JSON.stringify({dvdId: dvdId})
    // getDienstverband(dvdId, this.element)

    let verwerk = e => {
        let x = JSON.parse(this.element.innerHTML)
        if (e.currentTarget.readyState==0) {
            x["readyState"] = "UNSET"
            console.log("UNSET")
        }
        if (e.currentTarget.readyState==1) {
            x["readyState"] = "OPENED"
            x["start"] = new Date().getTime()
        }
        if (e.currentTarget.readyState==2) {
            x["readyState"] = "HEADERS_RECEIVED"
            console.log("HEADERS_RECEIVED")
        }
        if (e.currentTarget.readyState==3) {
            x["readyState"] = "LOADING"
            x["loading"] = new Date().getTime()
        }
        if (e.currentTarget.readyState==4) {
            x["readyState"] = "DONE(" + e.currentTarget.status + " " + e.currentTarget.statusText + " - " + e.currentTarget.response.length + ")"
            x["end"] = new Date().getTime()
            x["duur"] = x["end"] - x["start"]
            if (running) {
                let slaap = Math.floor(random()*3000)
                setTimeout(() => {
                    dvdId = dvdIds[Math.floor(randomDvd()*dvdIds.length)]
                    this.element.innerHTML = JSON.stringify({dvdId: dvdId})
                    this.request()
                }, slaap)
                x["slaap"] = slaap
            }
        }
        this.element.innerHTML = JSON.stringify(x)
    }

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = verwerk
    this.request = () => {
        xhr.open("GET", "http://localhost:9080/api/v1/dienstverband/" + dvdId + "/contracten/WGC/aggregatedView", true)
        // xhr.open("GET", "http://localhost:9s080/api/v1/performance/WGC/" + dvdId, true)
        xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJzY3J1bV9hZnRlcnBhcnR5IiwibmFtZSI6IlNjcnVtIFNjaGVybSBBZnRlcnBhcnR5IiwiZGVwdCI6IklDVCBPbnR3aWtrZWxpbmciLCJ0aXRsZSI6IlNjcnVtIFNjaGVybSIsInBhc3Bvb3J0X2ZvbmRzdG9lZ2FuZyI6WyJBQ1kiLCJBRUdCTFAiLCJBRUdQUEkiLCJCQkYiLCJCUEwiLCJDQU0iLCJDRVZBIiwiQ0dMIiwiREUiLCJETkIiLCJEVEwiLCJHQVMiLCJHRS1QIiwiSFdMIiwiS1BOIiwiS1BOTyIsIktQTlEiLCJLUkkiLCJNQVJTIiwiTU5UIiwiT0JGIiwiT0ZFRCIsIlBPQk8iLCJQUEIiLCJQUEkiLCJSQ0UiLCJTRkFHRiIsIlNGQiIsIlNGQkxPRU0iLCJTRkRIWiIsIlNGRlNJIiwiU0ZGU0wiLCJTRlJDRSIsIlNGU0JEIiwiU0ZUQyIsIlNGVklTIiwiU0ZaVFciLCJTTlBGIiwiU05UIiwiU09PQiIsIlNQSU4iLCJTUE4iLCJTUFciLCJTVEFQIiwiU1ZHIiwiVEVYIiwiVEtQIiwiVE5UIiwiVE5URVhQIiwiVE5UTyIsIlVXViIsIlZWUiIsIlpUVyIsIlpWSUoiXSwiYXV0b3Jpc2F0aWVfZnVuY3RpZXMiOlsiRnVuY3Rpb25lZWwgQmVoZWVyIiwiUmVnaXN0cmVyZW4gQmVsZWdnaW5nc3Zvb3JrZXVyIiwiQmVoZWVyIEFjdHVhcmllbGViZXJla2VuaW5nZW4iLCJCZWhlZXIgSUNUIiwiUmFhZHBsZWdlbiBFWlAiLCJCZWhlZXIgRVpQIEJPIiwiQmVoZWVyIEVaUCBXR0EiLCJCZWhlZXIgRVpQIEcmTiIsIkFkcmVzc2VuZXhwb3J0IiwiUmVnaXN0cmVyZW4gY29tbXVuaWNhdGllcHJvZmllbCIsIlJlZ2lzdHJlcmVuIGNvbW11bmljYXRpZXByb2ZpZWwgd2Vya2dldmVycyIsIkJlaGVlciBEb2N1bWVudGVuIiwiQmVoZWVyIEFDRCIsIlN0YXJ0ZGF0dW0gcHJvZHVjdHZyYWFnIiwiQmVoZWVyIEluY2Fzc28iLCJPcHZyYWdlbiBSYXBwb3J0YWdlcyBBY3R1YXJpYWF0IiwiUGVyc29vbnNpZ25hbGVyaW5nIEJpanpvbmRlciBCZWhlZXIiLCJQZXJzb29uc2lnbmFsZXJpbmcgUGVuc2lvZW5jbGFpbSIsIkRJUyBPcHNsYWFuIERvY3VtZW50IiwiRElTIFZlcnBsYWF0cyBEb2N1bWVudCBQZW5zaW9lbm51bW1lciIsIkRJUyBLb3BpZSBDZW50cmFhbCBBZmRydWtrZW4iLCJESVMgVG9ldm9lZ2VuIFVpdGdhYW5kZSBEb2N1bWVudGVuIiwiRElTIFRvbmVuIEFsbGUgVWl0Z2FhbmRlIERvY3VtZW50ZW4iLCJWZXJ3ZXJrZW4gS2xlaW5lIFBlbnNpb2VuZW4gRkEiLCJCYXNpc3JlZ2lzdGVyb25kZXJ3aWpzX2ludm9lciIsIkJhc2lzcmVnaXN0ZXJvbmRlcndpanNfZHVvX3ZlcndlcmtpbmciXSwiY2xpZW50X2lwIjoiMTcyLjIxLjEzMS4xMjIiLCJlbnYiOiJkZXYiLCJpc3MiOiJ0a3BhdXRoIiwiZXhwIjoxNTY5OTU2MDgyfQ.CA0PLUXz5qVRFYmptLJBJDwpfxCHAse4WLiQjxZW2Jk7KQJ2w6KlSMiD7T08ULdx636JYp0DB6wpMM4JJN6BvUNRFAUoiMTVwFj0psTCyFxKU3lZKS8POzGyWKDGpLaf0ioHW88_m8wZGD9KdtQ8bxN-zuzTscMoC3xawAPeSvzML-o5E-M6xxZllYkYMWrCesnPkddf6rZ_xwWFUdVEz7ZfIWQz9poimxp90vRBNluep4thmES-iAHjBsueCLBwKY5SlsDKU4AidJ7dqw8DOrHvDTOTeypNJ_rjyk1ptEVXNjVePTfW_APjVq_o4qqnHmKkCjH07axwbVW-3ZhVVg")
        xhr.send()
    }
}