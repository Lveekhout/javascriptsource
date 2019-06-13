function logout(xhr, token) {
    xhr.open("GET", "https://topdesk7tst.intra.tkppensioen.nl/tas/api/logout", false)
    xhr.setRequestHeader("Authorization", "TOKEN id=\"" + token + "\"")
    xhr.send()
    if (xhr.status!=200) throw new Error("Fout bij: GET https://topdesk7tst.intra.tkppensioen.nl/tas/api/logout")
    console.log(xhr.responseText)
}

window.onload = () => {
    buttonStart.addEventListener("click", () => {
        let token
        try {
            var xhr = new XMLHttpRequest()
            xhr.open("GET", "https://topdesk7tst.intra.tkppensioen.nl/tas/api/login/operator", false)
            xhr.setRequestHeader("Authorization", "Basic " + btoa(inputTopDeskUsername.value + ":" + inputTopDeskPassword.value))
            xhr.send()
            if (xhr.status!=200) throw new Error("Fout bij: GET https://topdesk7tst.intra.tkppensioen.nl/tas/api/login/operator")
            token = xhr.responseText
            console.log(token)

            xhr.open("GET", "https://jira.intra.tkppensioen.nl/rest/api/latest/issue/" + inputWIB.value, false)
            xhr.setRequestHeader("Authorization", "Basic " + btoa(inputJiraUsername.value + ":" + inputJiraPassword.value))
            xhr.setRequestHeader("Accept", "application/json")
            xhr.send()
            if (xhr.status!=200) throw new Error("Fout bij: GET https://jira.intra.tkppensioen.nl/rest/api/latest/issue/" + inputWIB.value)
            let issue = JSON.parse(xhr.response)

            xhr.open("GET", "https://topdesk7tst.intra.tkppensioen.nl/tas/api/applicableChangeTemplates", false)
            xhr.setRequestHeader("Authorization", "TOKEN id=\"" + token + "\"")
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send()
            if (xhr.status!=200) throw new Error("Fout bij: GET https://topdesk7tst.intra.tkppensioen.nl/tas/api/applicableChangeTemplates")
            let template = JSON.parse(xhr.responseText).results.find(o => o.briefDescription === "Release naar productie").number
            console.log(template)

            xhr.open("POST", "https://topdesk7tst.intra.tkppensioen.nl/tas/api/operatorChanges", false)
            xhr.setRequestHeader("Authorization", "TOKEN id=\"" + token + "\"")
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify({"requester":{"id":"f3dde0f6-1dcd-5182-a67c-1dde4dfe365a"},"briefDescription":issue.fields.summary,"template":{"number":template}}))
            if (xhr.status!=201) throw new Error("Fout bij: POST https://topdesk7tst.intra.tkppensioen.nl/tas/api/operatorChanges")
            let nummer = JSON.parse(xhr.responseText).number
            let link = "https://topdesk7tst.intra.tkppensioen.nl/tas/secure/contained/newchange?unid=" + JSON.parse(xhr.responseText).id.split("-").join("")

            xhr.open("PATCH", "https://topdesk7tst.intra.tkppensioen.nl/tas/api/operatorChanges/" + nummer, false)
            xhr.setRequestHeader("Authorization", "TOKEN id=\"" + token + "\"")
            xhr.setRequestHeader("Content-Type", "application/json-patch+json")
            let request = "Details installatie:\n- " + issue.fields.description + "\n\n"
            request += "Jira melding\n- https://jira.intra.tkppensioen.nl/browse/" + issue.key + "\n\n"
            request += "Tijdelijke database (lees)rechten gewenst\n- Nee\n\n"
            request += "Is er een code review uitgevoerd?\n"
            if (issue.fields.issuelinks.length>0) issue.fields.issuelinks.forEach(v => request += "- https://jira.intra.tkppensioen.nl/browse/" + v.outwardIssue.key + "\n")
            else request += "- Nee\n"
            request += "\n"
            request += "Risico/impact analyse - Kan de installatie binnen kantoortijd?\n- gering\n\n"
            request += "Testbeschrijving, testrapport of acceptatietest goedkeuring door FB\n"
            if (issue.fields.issuelinks.length>0) issue.fields.issuelinks.forEach(v => request += "- https://jira.intra.tkppensioen.nl/browse/" + v.outwardIssue.key + "\n")
            else request += "- Geen\n"
            request += "\n"
            request += "Action notes; de uit te voeren werkzaamheden\n- In de oplevering aanwezig Bij Java oplevering: Gebruik XLDeploy\n\nRollback/fallback scenario\n- Geen optie\n\nContactgegevens verantwoordelijke\n- Oscar Robert (POP) en/of functioneelbeheer: Judith Smilde en Ronald Groenhof\n\nVertrouwelijkheid\nEr zijn waar van toepassing maatregelen getroffen om het risico te beperken op openbaarmaking of onderschepping (in leesbare vorm) van informatie, software en diensten.\n- Ja\n\nIntegriteit\nEr zijn maatregelen getroffen om de juistheid en volledigheid van informatie, software en diensten te waarborgen.\n- Ja\n\nBeschikbaarheid\nEr is/wordt binnen de technische implementatie en uitrol rekening gehouden met de beschikbaarheid van informatie, software en essenti\u00EBle diensten wanneer dit vereist is.\n- Ja"
            xhr.send(JSON.stringify([{"op":"add","path":"/requests","value":request}]))

            logout(xhr, token)
            token = undefined

            xhr.open("PUT", "https://jira.intra.tkppensioen.nl/rest/api/latest/issue/" + inputWIB.value, false)
            xhr.setRequestHeader("Authorization", "Basic " + btoa(inputJiraUsername.value + ":" + inputJiraPassword.value))
            xhr.setRequestHeader("Accept", "application/json")
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify({fields:{description:"{color:red}{noformat}"+link+"{noformat}{color}\n\n"+issue.fields.description}}))
            if (xhr.status!=204) throw new Error("Fout bij: PUT https://jira.intra.tkppensioen.nl/rest/api/latest/issue/" + inputWIB.value)
            console.dir(xhr)

            alert("Klaar!!!")
        } catch (err) {
            alert(err.message)
            if (token) logout(xhr, token)
            throw err
        }
    })
}
