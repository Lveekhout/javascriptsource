function getGitAccountHistory(pagenumber) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://git/profile/history?page=" + pagenumber, true);
    xhr.setRequestHeader("Connection", "close");
    xhr.setRequestHeader("Cookie", "remember_user_token=BAhbB1sGaSVJIiIkMmEkMTAkdDJ2c3ZMdzkwRzFZOThLTWVUQVdaLgY6BkVU--d65de79779299167fc7054bc94682af534618d74; _gitlab_session=ac8583b528b130376aa209c5a8815db8");
    xhr.onreadystatechange = () => {
        if (xhr.readyState==4) {
            console.log(xhr.status + " " + xhr.statusText);
            console.log(xhr.response);
        }
    }
    xhr.send();
}