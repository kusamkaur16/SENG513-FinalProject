var Tone = require('tone');

var btn = document.getElementById('btn');
var synth;

btn.addEventListener('click', function() {
  synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease('C5', '2n');
});
