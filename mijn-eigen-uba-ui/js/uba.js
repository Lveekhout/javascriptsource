window.onload = function() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState==1) {
            poms.innerHTML = "Ben effe laden...";
        }
        if (http.readyState==4) {
            if (http.status==200) {
                let pommen = JSON.parse(http.responseText);
                let ul = document.createElement("ul");
                ul.classList.add("opsomming");
                pommen.forEach((item, index) => {
                    let li = document.createElement("li");
                    ul.appendChild(li);
                    li.appendChild(document.createTextNode(item.jiraId + ": " + item.omschrijving));
                    li.setAttribute("draggable", "true");
                });
                poms.innerHTML = "";
                poms.appendChild(ul);
            }
        }
    };
    http.open("GET", "http://pc2356:9000/api/v1/poms/mock");
    http.send();
}