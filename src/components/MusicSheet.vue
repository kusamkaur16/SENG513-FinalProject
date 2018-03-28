<template>
  <div class="container">
    <!-- Main music sheet page -->
    <div class="row">
      <div class="form-check" v-for="note in radioNotes" :key="note.note">
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
    <div class="row" id="middleArea">
      <div class="col-sm-2">
        <h1>Flats, sharps, and other note things go here</h1>
      </div>
      <div class="col-sm-7">
        <div id="musicSheet">
          <div class="staffParent" v-on:click="insert">
            <div class="trebleStaff">
              <div class="measureStart">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="trebleClef" src="../assets/Treble-Clef.png">
                <div class="timeSig">44</div>
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
            </div>
            <div class="bassStaff">
              <div class="measureStart">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="bassClef" src="../assets/Bass-Clef.png">
                <div class="timeSig">44</div>
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
            </div>
          </div>
          <!-- todo remove later and make more vue like -->
          <div class="staffParent" v-on:click="insert">
            <div class="trebleStaff">
              <div class="measureClef">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="trebleClef" src="../assets/Treble-Clef.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
            </div>
            <div class="bassStaff">
              <div class="measureClef">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img class="bassClef" src="../assets/Bass-Clef.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img style="position: absolute; top: 10%; left: 5%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 30%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 55%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 10%; left: 80%; height: 80%; width: 10%" src="../assets/Quarter-Rest.svg">
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
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
        {note: 'whole note', image: images['./Whole-Note.png'], numPerMea: 1},
        {note: 'half note', image: images['./Half-Note.png'], numPerMea: 2},
        {note: 'quarter note', image: images['./Quarter-Note.png'], numPerMea: 4},
        {note: 'eighth note', image: images['./Eighth-Note.png'], numPerMea: 8},
        {note: 'sixteenth note', image: images['./Sixteenth-Note.png'], numPerMea: 16}
      ]
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
          console.log(note);
          if (selNote === note.note) {
            return note.numPerMea;
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
    position: relative;
    max-width: 16%;
  }
  .measure{
    margin-bottom: 45px;
    max-width: 28%;
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
