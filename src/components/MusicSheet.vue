<template>
  <div class="container">
    <!-- Main music sheet page -->
    <div class="row">
      <div v-for="note in radioNotes" :key="note.note" class="form-check">
        <label v-if="note.note === 'quarter note'">
          <input class="form-check-input" v-on:change="selChange" type="radio" name="noteOptions" :value=note.note checked="">
          <img :src=note.image width="50" height="50">
        </label>
        <label v-else>
          <input class="form-check-input" v-on:change="selChange" type="radio" name="noteOptions" :value=note.note>
          <img :src=note.image width="50" height="50">
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-2">
        <h1>Flats, sharps, and other note things go here</h1>
      </div>
      <div class="col-sm-7" id="middleArea">
        <div id="musicSheet">
          <div v-for="(staff, index) in composition.staffs" :key="index" class="staffParent" v-on:click="insert">
            <div class="trebleStaff">
              <div v-if="index === 0" class="measureStart">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="trebleClef" src="../assets/Treble-Clef.png">
                <div class="timeSig">{{composition.timeSig}}</div>
              </div>
              <div v-else class="measureClef">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="trebleClef" src="../assets/Treble-Clef.png">
              </div>
              <div v-for="measure in staff.treble.measures" :key="measure.id" class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img v-for="note in calcNotePositions(measure.notes)" :key="note.pos" :style=note.styleObj :src=note.imgSrc>
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
                <!--{{index}} : {{measure.id}}
                -->
              </div>
            </div>
            <div class="bassStaff">
              <div v-if="index === 0" class="measureStart">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="bassClef" src="../assets/Bass-Clef.png">
                <div class="timeSig">{{composition.timeSig}}</div>
              </div>
              <div v-else class="measureClef">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="bassClef" src="../assets/Bass-Clef.png">
              </div>
              <div v-for="measure in staff.bass.measures" :key="measure.id" class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
                <!--{{index}} : {{measure.id}}
                -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <h1>Online users go here</h1>
      </div>
    </div>
    <div class="row">
      <h1>Play back buttons go here</h1>
      <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#saveModal" >Save</button>
      <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exportModal" >Export</button>
      <div id="debug-ele">used for debug</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable no-undef */

let images = importAll(require.context('../assets/', true, /^\.\//));
let selNote = 'quarter note';
let notesAdded;
function importAll (r) {
  let obj = {};
  r.keys().forEach(function (key) {
    obj[key] = r(key)
  });
  return obj
}
// todo resize music sheet vertically?
/*
let a = 0;
$(window).resize(function () {
  $('body').prepend('<div>' + $(window).width() + '</div>')
  $('.trebleStaff').height(a++)
  $('.staffImg').height($(window).height() * 200 / 1280)
});
*/

export default {
  mounted: () => { $('#loginModal').modal('show') },
  data: function () {
    return {
      radioNotes: [
        // todo adjust the height and widths 12.5% for notes
        {note: 'whole note', image: images['./Whole-Note.png'], durationIn16: 16, height: '80%', width: '40'},
        {note: 'half note', image: images['./Half-Note.png'], durationIn16: 8, height: '80%', width: '30'},
        {note: 'quarter note', image: images['./Quarter-Note.png'], durationIn16: 4, height: '80%', width: '25'},
        {note: 'eighth note', image: images['./Eighth-Note.png'], durationIn16: 2, height: '80%', width: '25'},
        {note: 'sixteenth note', image: images['./Sixteenth-Note.png'], durationIn16: 1, height: '80%', width: '20'},
        {note: 'quarter rest', image: images['./Quarter-Rest.svg'], durationIn16: 4, top: '10%', height: '80%', width: '10'}
      ],
      // todo example composition data structure. replace with default one created programmatically
      // todo and figure out what note structure to use
      composition: {
        id: 0,
        timeSig: '44',
        staffs: [
          {
            treble: {
              measures: [
                {
                  id: 0,
                  notes: [
                    {note: 'half note', accidental: 'sharp'},
                    {note: 'quarter rest', accidental: 'flat'},
                    {note: 'eighth note', accidental: 'flat'},
                    {note: 'eighth note', accidental: 'flat'}
                  ]
                },
                {
                  id: 1,
                  notes: [
                    {note: 'whole note', accidental: null}
                  ]
                },
                {
                  id: 2,
                  notes: [
                    {note: 'quarter note', accidental: null},
                    {note: 'eighth note', accidental: 'flat'},
                    {note: 'eighth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'},
                    {note: 'sixteenth note', accidental: 'flat'}
                  ]
                }
              ]
            },
            bass: {
              measures: [
                {
                  id: 0,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                },
                {
                  id: 1,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                },
                {
                  id: 2,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                }
              ]
            }
          },
          {
            treble: {
              measures: [
                {
                  id: 3,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                },
                {
                  id: 4,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                },
                {
                  id: 5,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                }
              ]
            },
            bass: {
              measures: [
                {
                  id: 3,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                },
                {
                  id: 4,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                },
                {
                  id: 5,
                  notes: [
                    {note: 'quarter rest', accidental: null},
                    {note: 'quarter rest', accidental: null}
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    insert: function (e) {
      let note = $('<img src=' + images['./Quarter-Rest.svg'] + '>');
      // note.attr('src', images['./Whole-Rest.svg'])
      note.css({'position': 'absolute', 'left': e.layerX, 'top': e.layerY, 'z-index': -1});
      note.appendTo(e.currentTarget);
      $('#debug-ele').text(e.layerX)
    },
    showNoteArea: function (e) {
      // todo show different areas for each note
      let notes = this.radioNotes;
      let numOfNotes = (function () {
        for (let note of notes) {
          if (selNote === note.note) {
            return 16 / note.durationIn16;
          }
        }
        return 4;
      })();
      notesAdded = numOfNotes;
      let w = $(e.currentTarget).width() / numOfNotes;
      let h = $(e.currentTarget).outerHeight(true);

      for (let i = 0; i < numOfNotes; i++) {
        let area = $('<div>');
        area.css({
          'position': 'absolute',
          'top': 0,
          'left': w * i,
          'width': w,
          'height': h,
          'background-color': 'rgba(' + Math.floor(i * w) + ',0,0,0.5)'
        });
        area.appendTo(e.currentTarget);
        console.log(notesAdded);
      }
      // console.log($(e.currentTarget).outerHeight(true))
    },
    hideNoteArea: function (e) {
      for (let i = notesAdded; i > 0; i--) {
        $(e.currentTarget.lastChild).remove();
      }
      console.log('here');
    },
    selChange: function (e) {
      selNote = $('input[name=noteOptions]:checked').val();
      console.log(selNote);
      // todo remove later used to check calcNotePosition function
      // this.calcNotePositions(this.composition.staffs[0].treble.measures[0].notes)
    },
    getNote: function (note) {
      for (let n of this.radioNotes) {
        if (note.note === n.note) {
          return n;
        }
      }
      return null;
    },
    calcNotePositions: function (notes) {
      // throw notes into an array equal in size to a measure's total duration in sixteenth notes
      let noteDurations = [];
      let notePositions = [];
      for (let note of notes) {
        let noteObj = {
          dataFromRadio: this.getNote(note),
          compNote: note
        };
        noteDurations.push(noteObj);
        // fill in rest of duration with null
        for (let i = 1; i < noteObj.dataFromRadio.durationIn16; i++) {
          noteDurations.push(null);
        }
      }
      // iterate through noteDurations and figure out positions
      let leftOffset = 5;
      let sixteenthNoteOffset = 6.25;
      for (let i = 0; i < noteDurations.length; i++) {
        if (noteDurations[i] === null) {
          continue;
        }
        // create object for html
        let notePosObj = {
          pos: i,
          styleObj: {
            position: 'absolute',
            top: '',
            left: leftOffset + sixteenthNoteOffset * i - noteDurations[i].dataFromRadio.width * 0.5 + '%',
            height: noteDurations[i].dataFromRadio.height,
            width: noteDurations[i].dataFromRadio.width + '%'
          },
          imgSrc: noteDurations[i].dataFromRadio.image
        };
        if (noteDurations[i].compNote.note.slice(-4) === 'rest') {
          notePosObj.styleObj.top = noteDurations[i].dataFromRadio.top;
          notePositions.push(notePosObj);
        } else {
          // todo position based on note letter
          notePosObj.styleObj.top = '0%';
          notePositions.push(notePosObj);
        }
      }
      return notePositions;
    }
  }
}

</script>

<style scoped>
  #middleArea{
    height: 400px;
  }
  .staffParent{
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 5px;
  }
  .measureStart, .measureClef, .measure{
    position: relative;
    float: left;
  }
  .measureStart, .measureClef{
    max-width: 16%;
  }
  .measure{
    margin-bottom: 45px;
    width: 28%;
  }
  .trebleStaff, .bassStaff{
    margin-bottom: 45px;
    z-index: 1;
  }
  .trebleClef{
    position: absolute;
    top: 0;
    left: 0;
    width: 55%;
    height: 125%;
  }
  .bassClef{
    position: absolute;
    top: 0;
    left: 0;
    width: 55%;
    height: 100%;
  }
  #musicSheet{
    height: 100%;
    overflow-y: scroll;
  }
  .timeSig{
    position: absolute;
    top: -5px;
    left: calc(100% - 40px);
    font-size: 40px;
    writing-mode: vertical-rl;
    text-orientation: upright;
    color: #000000;
    font-family: fantasy;
  }
</style>
