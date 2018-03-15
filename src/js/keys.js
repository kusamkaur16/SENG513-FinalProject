var Tone = require('tone');
var octave = 1;
var btn;
var synth;
$(document).ready(function() {

  synth = new Tone.PolySynth(6, Tone.Synth, {
    "oscillator": {
      "partials": [0, 2, 3, 4],
    }
  }).toMaster();

  //To increase the octave of the keyboard
  $(".increaseOctave").click(function() {
    if(octave < 7) {
        octave += 1
        if(octave == 7){
            $(".increaseOctave").prop('disabled', true);
        } else if(octave > 1){
                $(".decreaseOctave").prop('disabled', false);
        }else {
            $(".increaseOctave").prop('disabled', false);
        }
    } else {
        $(".increaseOctave").prop('disabled', true);
    }
  });

  //To decrease the octave
  $(".decreaseOctave").click(function() {
    if(octave > 1) {
        octave -= 1
        if(octave == 1) {
            //disable button
            $(".decreaseOctave").prop('disabled', true);
        } else if(octave < 7) {
            $(".increaseOctave").prop('disabled', false);
        }else {
            $(".decreaseOctave").prop('disabled', false);
        }
    } else {
        $(".increaseOctave").prop('disabled', false);
        $(".decreaseOctave").prop('disabled', true);
    }
  });

  //A click on each key causes the corresponing note to play
  $(".c").click(function() {
    let note = "C" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".cs").click(function() {
      let note = "C#" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".d").click(function() {
      let note = "D" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".ds").click(function() {
      let note = "D#" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".e").click(function() {
     let note = "E" + octave;
    synth.triggerAttackRelease(note,  '0.02');
  });
  $(".f").click(function() {
      let note = "F" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".fs").click(function() {
      let note = "F#" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".g").click(function() {
      let note = "G" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".gs").click(function() {
      let note = "G#" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".a").click(function() {
      let note = "A" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".as").click(function() {
      let note = "A#" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".b").click(function() {
     let note = "B" + octave;
    synth.triggerAttackRelease(note, '0.02');
  });


  $(".c1").click(function() {
    let note = "C" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".c1s").click(function() {
      let note = "C#" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".d1").click(function() {
      let note = "D" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".d1s").click(function() {
      let note = "D#" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".e1").click(function() {
     let note = "E" + (octave + 1);
    synth.triggerAttackRelease(note,  '0.02');
  });
  $(".f1").click(function() {
      let note = "F" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".f1s").click(function() {
      let note = "F#" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".g1").click(function() {
      let note = "G" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".g1s").click(function() {
      let note = "G#" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".a1").click(function() {
      let note = "A" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".a1s").click(function() {
      let note = "A#" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });
  $(".b1").click(function() {
     let note = "B" + (octave + 1);
    synth.triggerAttackRelease(note, '0.02');
  });

});
