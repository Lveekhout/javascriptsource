const AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext()
const oscillator = [audioContext.createOscillator(), audioContext.createOscillator()]

window.onload = () => {
    oscillator[0].type = 'sine';
    oscillator[0].frequency.setValueAtTime(30, audioContext.currentTime)
    oscillator[0].connect(audioContext.destination)
    oscillator[0].start()

    oscillator[1].type = 'triangle';
    oscillator[1].frequency.setValueAtTime(110, audioContext.currentTime)
    oscillator[1].connect(audioContext.destination)
    oscillator[1].start()
}

const setFreq = freq => oscillator[0].frequency.setValueAtTime(freq, audioContext.currentTime)