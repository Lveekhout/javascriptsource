window.onload = event => {
    let subdiv = document.createElement('div')
    subdiv.classList.add('subdiv')
    subdiv.style.position = 'absolute'
    subdiv.style.left = 0;
    subdiv.style.right = 0;
    subdiv.style.top = 0;
    subdiv.style.bottom = 0;
//    subdiv.style.height = '100%'
    subdiv.style.backgroundColor = 'yellow'
    subdiv.innerHTML = '123'

    let div = document.createElement('div')
    div.classList.add('divs')
    document.body.appendChild(div)
    div.appendChild(subdiv)
    div.style.position = 'absolute'
    div.style.width = '100px'
    div.style.height = '132px'
//    div.style.backgroundColor = 'cyan'

    div = document.createElement('div')
    div.classList.add('divs')
    document.body.appendChild(div)
    div.appendChild(subdiv)
    div.style.position = 'absolute'
    div.style.width = '200px'
    div.style.height = '132px'
//    div.style.backgroundColor = 'red'
    div.style.left = '100px'
    console.dir(div)

    div = document.createElement('div')
    div.classList.add('divs')
    document.body.appendChild(div)
//    div.appendChild(subdiv)
    div.style.position = 'absolute'
    div.style.width = '500px'
    div.style.height = '132px'
//    div.style.backgroundColor = 'blue'
    div.style.left = '300px'
}