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
  console.log(document.getElementById('btn'));



  document.body.addEventListener('keypress', function(e) {
    //    console.log('key code is ', e.keyCode);
    if (e.keyCode == 97) { //'a' key
      synth.triggerAttackRelease('C4', '0.02');
    }
    if (e.keyCode == 119) { //'w' key
      synth.triggerAttackRelease('C#4', '0.02');
    }
    if (e.keyCode == 115) { //'s' key
      synth.triggerAttackRelease('D4', '0.02');
    }
    if (e.keyCode == 101) { //'e' key
      synth.triggerAttackRelease('D#4', '0.02');
    }
    if (e.keyCode == 100) { //'d' key
      synth.triggerAttackRelease('E4', '0.02');
    }
    if (e.keyCode == 102) { //'f' key
      synth.triggerAttackRelease('F4', '0.02');
    }
    if (e.keyCode == 114) { //'r' key
      synth.triggerAttackRelease('F#4', '0.02');
    }
    if (e.keyCode == 103) { //'g' key
      synth.triggerAttackRelease('G4', '0.02');
    }
    if (e.keyCode == 116) { //'t' key
      synth.triggerAttackRelease('G#4', '0.02');
    }
    if (e.keyCode == 104) { //'h' key
      synth.triggerAttackRelease('A4', '0.02');
    }
    if (e.keyCode == 121) { //'y' key
      synth.triggerAttackRelease('A#4', '0.02');
    }
    if (e.keyCode == 106) { //'j' key
      synth.triggerAttackRelease('B4', '0.02');
    }
  });

  $(".c").click(function() {
    synth.triggerAttackRelease('C4', '0.02');
  });
  $(".cs").click(function() {
    synth.triggerAttackRelease('C#4', '0.02');
  });
  $(".d").click(function() {
    synth.triggerAttackRelease('D4', '0.02');
  });
  $(".ds").click(function() {
    synth.triggerAttackRelease('D#4', '0.02');
  });
  $(".e").click(function() {
    synth.triggerAttackRelease('E4', '0.02');
  });
  $(".f").click(function() {
    synth.triggerAttackRelease('F4', '0.02');
  });
  $(".fs").click(function() {
    synth.triggerAttackRelease('F#4', '0.02');
  });
  $(".g").click(function() {
    synth.triggerAttackRelease('G4', '0.02');
  });
  $(".gs").click(function() {
    synth.triggerAttackRelease('G#4', '0.02');
  });
  $(".a").click(function() {
    synth.triggerAttackRelease('A4', '0.02');
  });
  $(".as").click(function() {
    synth.triggerAttackRelease('A#4', '0.02');
  });
  $(".b").click(function() {
    synth.triggerAttackRelease('B4', '0.02');
  });

  $(".c1").click(function() {
    synth.triggerAttackRelease('C4', '0.02');
  });
  $(".c1s").click(function() {
    synth.triggerAttackRelease('C#4', '0.02');
  });
  $(".d1").click(function() {
    synth.triggerAttackRelease('D4', '0.02');
  });
  $(".d1s").click(function() {
    synth.triggerAttackRelease('D#4', '0.02');
  });
  $(".e1").click(function() {
    synth.triggerAttackRelease('E4', '0.02');
  });
  $(".f1").click(function() {
    synth.triggerAttackRelease('F4', '0.02');
  });
  $(".f1s").click(function() {
    synth.triggerAttackRelease('F#4', '0.02');
  });
  $(".g1").click(function() {
    synth.triggerAttackRelease('G4', '0.02');
  });
  $(".g1s").click(function() {
    synth.triggerAttackRelease('G#4', '0.02');
  });
  $(".a1").click(function() {
    synth.triggerAttackRelease('A4', '0.02');
  });
  $(".a1s").click(function() {
    synth.triggerAttackRelease('A#4', '0.02');
  });
  $(".b").click(function() {
    synth.triggerAttackRelease('B4', '0.02');
  });

});

// sound = function() {
//     this.element = $("<div>", {
// 			"class" : "Keyboard",
// 		}).appendTo("#Content");
//     var piano = new Keyboard(this.element.get(0), 48, 4);
//     //append to div
//     $( "#Keyboard" ).append( piano );
//
//   //synth.triggerAttackRelease('C5', '2n');
// }
