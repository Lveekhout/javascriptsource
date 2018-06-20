var xhr = new XMLHttpRequest()
function getJiraSync(url) {
    xhr.open("OPTIONS", url, false)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Authorization", "Basic cGFydHlzY2VuZTpwcw==")
    xhr.send()
    xhr.open("GET", url, false)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("Authorization", "Basic cGFydHlzY2VuZTpwcw==")
    xhr.send()
    return JSON.parse(xhr.responseText)
}
function selectChange() {
    table.getElementsByTagName("tbody")[0].innerHTML = ""
    let issues = getJiraSync("https://jira.intra.tkppensioen.nl/rest/agile/1.0/board/3373/sprint/" + select.value + "/issue").issues
    issues.sort((a,b) => {
        if (a.fields.epic)
            if (b.fields.epic) return a.fields.epic.id-b.fields.epic.id
            else return -1
        else
            if (b.fields.epic) return 1
            else return 0
    })
    issues.forEach(v => {
        let epic = ""
        if (v.fields.epic) epic = v.fields.epic.key
        table.getElementsByTagName("tbody")[0].innerHTML += "<tr onclick=\"rowClick('" + v.key + "')\"><td>" + v.key + "</td><td>" + v.fields.summary + "</td><td>" + epic + "</td><td>" + v.fields.reporter.displayName + "</td><td>" + v.fields.assignee.displayName + "</td><td>" + v.fields.status.statusCategory.name + "</td></tr>"
    })
}
function rowClick(key) {
    let issue = getJiraSync("https://jira.intra.tkppensioen.nl/rest/agile/latest/issue/" + key)
    console.dir(issue)
}
window.onload = () => {
    try {
        let sprints = getJiraSync("https://jira.intra.tkppensioen.nl/rest/agile/latest/board/3373/sprint?state=active,future")
        sprints.values.forEach(v => {
            let option = document.createElement("option")
            option.setAttribute("value", v.id)
            option.text = v.name
            document.getElementById("select").add(option)
        })
        selectChange()
    } catch (err) {
        alert(err.message)
        throw err
    }
}