<style>

.listedNote {
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
    position: absolute;
    bottom: 0px;
}

.increaseOctave {
    position: absolute;
    right: 3.75%;
    bottom: 0px;
    width: 5%;
    height: 100%;
    background-color: #84DCC6;
}

.decreaseOctave {
    position: absolute;
    left: 3.75%;
    bottom: 0px;
    width: 5%;
    height: 100%;
    background-color: #84DCC6;
}

#pianoKeys {
    height: 100%;
    width: 75%;
    position: absolute;
    left: 12.5%;
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
    width: 7.14%;
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
    background: linear-gradient(45deg, #222 0%, #555 100%);
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

@media only screen and (max-width: 480px) {
    .white {
    top: 2.5%;
    height: 65%;
    width: 10%;
    z-index: 1;
    border-left: 0.2px solid #bbb;
    border-bottom: 0.2px solid #bbb;
    border-radius: 0 0 5px 5px;
    box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset, 0 0 3px rgba(0, 0, 0, 0.2);
    background: linear-gradient(top, #eee 0%, #fff 100%);
  }

.white:active {
    border-top: 0.2px solid #777;
    border-left: 0.2px solid #999;
    border-bottom: 0.2px solid #999;
    box-shadow: 1px 0 1.5px rgba(0, 0, 0, 0.1) inset, -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
    background: linear-gradient(top, #fff 0%, #e9e9e9 100%);
  }
}
</style>

<template>

<div class="footer">
  <button class="decreaseOctave btn" v-on:click="decreaseOctave">
    &lt;
  </button>
  <div id="pianoKeys">
    <div v-for="key in keys" :key="key.note" class="key" v-bind:class="[key.note , key.color]" v-on:click="playNote">
      <span class="listedNote" v-if="key.color === 'white' && key.note.includes('1')">{{ key.note.replace('1','') + (octave + 1)}}</span>
      <span class="listedNote" v-if="key.color === 'white' && !key.note.includes('1')">{{ key.note + octave}}</span>
    </div>
  </div>
  <button class="increaseOctave btn" v-on:click="increaseOctave">
    &gt;
  </button>
</div>

</template>

<script>

import {
  synth
}
  from '../main.js'
export default {
  name: 'piano-keys',
  data () {
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
  methods: {
    // full name of keys
    fullNoteName: function (key) {
      let note = ''
      if (key.includes('1')) {
        note = key.replace('1', '')
        note += (this.octave + 1)
      } else {
        note = key + this.octave
      }
      return note
    },
    // This function plays the cooresponding note
    playNote: function (event) {
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
    increaseOctave: function () {
      if (this.octave < 7) {
        this.octave += 1
      }
    },
    // This function decreases the octave of that section of the piano
    decreaseOctave: function () {
      if (this.octave > 1) {
        this.octave -= 1
      }
    }
  }
}
</script>
