<style>
#listedNote {
  position: absolute;
  top: -20%;
}

.keyTitle {
  position: relative;
  bottom: -68%;
}

.footer {
  height: 20%;
  width: 100%;
  position: relative;
  bottom: 0px;
}

.increaseOctave {
  position: relative;
  /* right: -22.25%; */
  float: left;
  bottom: 0px;
  width: 25%;
  height: 100%;
  font-size: 1.5em;
  color: white;
  background-color: #3CB0FE;
}

.decreaseOctave {
  position: relative;
  /* left: 3.75%; */
  float: right;
  bottom: 0px;
  width: 25%;
  height: 100%;
  font-size: 1.5em;
  color: white;
  background-color: #3CB0FE;
}

.centerwrapper {
  margin: auto;
  width: auto;
}

#pianoKeys {
  height: 100%;
  width: 100%;
  position: absolute;
  /* left: 12.5%; */
  text-align: center;
}

.key {
  margin: 0;
  padding: 0;
  position: relative;
  float: left;
}

.white {
  top: 2.5%;
  height: 95%;
  width: 7%;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(top, #eee 0%, #fff 100%);
}

.white:active {
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset, -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(top, #fff 0%, #e9e9e9 100%);
}

.black {
  top: 2.5%;
  height: 54%;
  width: 3%;
  margin: 0 0 0 -1em;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #146ca7 0%, #555 100%);
}

.black:active {
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(left, #444 0%, #222 100%);
}

.A,
.A1,
.B,
.B1,
.E,
.E1,
.G,
.G1,
.D,
.D1 {
  margin: 0 0 0 -1.5%;
}

.key:first-child {
  border-radius: 5px 0 5px 5px;
}

.key:last-child {
  border-radius: 0 5px 5px 5px;
}

.bottomkeys {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

<template>
<div class="footer container-fluid">
  <div class="centerwrapper">
    <!-- <div class="container"> -->
    <!-- <div class="col-xs-2"> -->
    <!-- <button class="col-xs-2 decreaseOctave btn" v-on:click="decreaseOctave">
                < </button> -->
    <!-- </div> -->
    <div class="row bottomkeys">
      <div class="col-2">
        <button class="decreaseOctave btn" v-on:click="decreaseOctave">
                    <</button>
      </div>
      <div id="col8div" class="col-8">
        <div id="pianoKeys">
          <div v-for="key in keys" :key="key.note" class="key" v-bind:class="[key.note , key.color]" v-on:click="playNote">
            <span class="notename" id="listedNote" v-if="key.color === 'white' && key.note.includes('1')">{{ key.note.replace('1','') + (octave + 1)}}</span>
            <span class="notename" id="listedNote" v-if="key.color === 'white' && !key.note.includes('1')">{{ key.note + octave}}</span>
          </div>
        </div>
      </div>
      <div class="col-2">
        <button class="increaseOctave btn" v-on:click="increaseOctave">
                    >
                </button>
      </div>
    </div>
    <!-- <div class="col-xs-2"> -->
    <!-- <button class="col-xs-2 increaseOctave btn" v-on:click="increaseOctave">
                >
            </button> -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</div>
</template>

<script>
import {
  synth
}
from '../main.js'
export default {
  name: 'piano-keys',
  data() {
    return {
      octave: 4,
      keys: [{
        note: 'C',
        color: 'white',
        name: 'C' + this.octave
      }, {
        note: 'C#',
        color: 'black',
        name: 'C#' + this.octave
      }, {
        note: 'D',
        color: 'white',
        name: 'D' + this.octave
      }, {
        note: 'D#',
        color: 'black',
        name: 'D#' + this.octave
      }, {
        note: 'E',
        color: 'white',
        name: 'E' + this.octave
      }, {
        note: 'F',
        color: 'white',
        name: 'F' + this.octave
      }, {
        note: 'F#',
        color: 'black',
        name: 'F#' + this.octave
      }, {
        note: 'G',
        color: 'white',
        name: 'G' + this.octave
      }, {
        note: 'G#',
        color: 'black',
        name: 'G#' + this.octave
      }, {
        note: 'A',
        color: 'white',
        name: 'A' + this.octave
      }, {
        note: 'A#',
        color: 'black',
        name: 'A#' + this.octave
      }, {
        note: 'B',
        color: 'white',
        name: 'B#' + this.octave
      }, {
        note: 'C1',
        color: 'white',
        name: 'C' + (this.octave + 1)
      }, {
        note: 'C1#',
        color: 'black',
        name: 'C#' + (this.octave + 1)
      }, {
        note: 'D1',
        color: 'white',
        name: 'D' + (this.octave + 1)
      }, {
        note: 'D1#',
        color: 'black',
        name: 'D#' + (this.octave + 1)
      }, {
        note: 'E1',
        color: 'white',
        name: 'E' + (this.octave + 1)
      }, {
        note: 'F1',
        color: 'white',
        name: 'F' + (this.octave + 1)
      }, {
        note: 'F1#',
        color: 'black',
        name: 'F#' + (this.octave + 1)
      }, {
        note: 'G1',
        color: 'white',
        name: 'G' + (this.octave + 1)
      }, {
        note: 'G1#',
        color: 'black',
        name: 'G#' + (this.octave + 1)
      }, {
        note: 'A1',
        color: 'white',
        name: 'A' + (this.octave + 1)
      }, {
        note: 'A1#',
        color: 'black',
        name: 'A#' + (this.octave + 1)
      }, {
        note: 'B1',
        color: 'white',
        name: 'B' + (this.octave + 1)
      }]
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // var x = window.matchMedia("(max-width: 200px)");
      window.addEventListener('resize', this.myFunction);
    })
  },
  methods: {


    myFunction: function() {
      let width = document.documentElement.clientWidth;
      let whiteKeysWidth;
      let rect = document.getElementsByClassName("C")[0].getBoundingClientRect();
      let rect2;

      if (width < 768) { // If media query matches
        //document.body.style.backgroundColor = "lightgreen";
        this.keys = [{
          note: 'C',
          color: 'white',
          name: 'C' + this.octave
        }, {
          note: 'C#',
          color: 'black',
          name: 'C#' + this.octave
        }, {
          note: 'D',
          color: 'white',
          name: 'D' + this.octave
        }, {
          note: 'D#',
          color: 'black',
          name: 'D#' + this.octave
        }, {
          note: 'E',
          color: 'white',
          name: 'E' + this.octave
        }, {
          note: 'F',
          color: 'white',
          name: 'F' + this.octave
        }, {
          note: 'F#',
          color: 'black',
          name: 'F#' + this.octave
        }, {
          note: 'G',
          color: 'white',
          name: 'G' + this.octave
        }, {
          note: 'G#',
          color: 'black',
          name: 'G#' + this.octave
        }, {
          note: 'A',
          color: 'white',
          name: 'A' + this.octave
        }, {
          note: 'A#',
          color: 'black',
          name: 'A#' + this.octave
        }, {
          note: 'B',
          color: 'white',
          name: 'B#' + this.octave
        }]
        rect2 = document.getElementsByClassName("B")[0].getBoundingClientRect();
      } else {

        this.keys = [{
          note: 'C',
          color: 'white',
          name: 'C' + this.octave
        }, {
          note: 'C#',
          color: 'black',
          name: 'C#' + this.octave
        }, {
          note: 'D',
          color: 'white',
          name: 'D' + this.octave
        }, {
          note: 'D#',
          color: 'black',
          name: 'D#' + this.octave
        }, {
          note: 'E',
          color: 'white',
          name: 'E' + this.octave
        }, {
          note: 'F',
          color: 'white',
          name: 'F' + this.octave
        }, {
          note: 'F#',
          color: 'black',
          name: 'F#' + this.octave
        }, {
          note: 'G',
          color: 'white',
          name: 'G' + this.octave
        }, {
          note: 'G#',
          color: 'black',
          name: 'G#' + this.octave
        }, {
          note: 'A',
          color: 'white',
          name: 'A' + this.octave
        }, {
          note: 'A#',
          color: 'black',
          name: 'A#' + this.octave
        }, {
          note: 'B',
          color: 'white',
          name: 'B#' + this.octave
        }, {
          note: 'C1',
          color: 'white',
          name: 'C' + (this.octave + 1)
        }, {
          note: 'C1#',
          color: 'black',
          name: 'C#' + (this.octave + 1)
        }, {
          note: 'D1',
          color: 'white',
          name: 'D' + (this.octave + 1)
        }, {
          note: 'D1#',
          color: 'black',
          name: 'D#' + (this.octave + 1)
        }, {
          note: 'E1',
          color: 'white',
          name: 'E' + (this.octave + 1)
        }, {
          note: 'F1',
          color: 'white',
          name: 'F' + (this.octave + 1)
        }, {
          note: 'F1#',
          color: 'black',
          name: 'F#' + (this.octave + 1)
        }, {
          note: 'G1',
          color: 'white',
          name: 'G' + (this.octave + 1)
        }, {
          note: 'G1#',
          color: 'black',
          name: 'G#' + (this.octave + 1)
        }, {
          note: 'A1',
          color: 'white',
          name: 'A' + (this.octave + 1)
        }, {
          note: 'A1#',
          color: 'black',
          name: 'A#' + (this.octave + 1)
        }, {
          note: 'B1',
          color: 'white',
          name: 'B' + (this.octave + 1)
        }]
        rect2 = document.getElementsByClassName("B1")[0].getBoundingClientRect();
        }

        var keysDivWidth = document.getElementById("pianoKeys").offsetWidth;
        var temp =  (keysDivWidth - (rect2.right -  rect.left))/2;
        var elem = document.getElementById("pianoKeys");
    //    var notes = document.getElementsByClassName("note");

        elem.style.left = (temp) + 'px';
    //    notes.style.left = (temp) + 'px';

    },

    // full name of keys
    fullNoteName: function(key) {
      let note = ''
      if (key.includes('1')) {
        note = key.replace('1', '')
        note += (this.octave + 1)
      } else {
        note = key + this.octave
      }
    },
    // This function plays the cooresponding note
    playNote: function(event) {
      let nameOfNote = event.target.className.split(' ')
      nameOfNote = nameOfNote[1]
      let note

      if (nameOfNote.includes('1')) {
        let newOctave = this.octave + 1
        let newNote = nameOfNote.replace('1', '')
        note = newNote + newOctave
      } else {
        note = nameOfNote + this.octave
      }
      synth.triggerAttackRelease(note, '0.02')
    },
    // This function increases the octave of that section of the piano
    increaseOctave: function() {
      if (this.octave < 7) {
        this.octave += 1
      }
    },
    // This function decreases the octave of that section of the piano
    decreaseOctave: function() {
      if (this.octave > 1) {
        this.octave -= 1
      }
    }
  }

}
</script>
