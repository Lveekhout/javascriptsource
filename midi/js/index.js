navigator.requestMIDIAccess()
.then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
console.log(midiAccess);

var inputs = midiAccess.inputs;
var outputs = midiAccess.outputs;
}

function onMIDIFailure() {
console.log('Could not access your MIDI devices.');
}