function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = e => {
        var contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

function displayContents(contents) {
    var element = document.getElementById('file-content');
    element.textContent = contents;
}

const test = () => {
    const x = new File(null, '')
}
