<template>
  <div class="container">
    <vue-up></vue-up>
    <!-- Main music sheet page -->
    <div class="row">
      <div v-for="note in radioNotes" :key="note.note" class="form-check">
        <label v-if="note.note === 'quarter note'">
          <input class="form-check-input" v-on:change="selChange" type="radio" name="noteOptions" :value=note.note checked="">
          <img :src=note.image width="20" height="25">
        </label>
        <label v-else>
          <input class="form-check-input" v-on:change="selChange" type="radio" name="noteOptions" :value=note.note>
          <img :src=note.image width="20" height="25">
        </label>
      </div>
      <button type="button" class="btn btn-outline-primary" v-on:click="addMeasure">Add Measure</button>
      <button type="button" class="btn btn-outline-primary" v-on:click="deleteMeasure">Delete Measure</button>
    </div>
    <div class="row">
      <div class="col-sm-9" id="middleArea">
        <div id="musicSheet">
          <div v-for="(staff, index) in reformatComp(composition.staffs)" :key="index" class="staffParent">
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
              <div v-for="measure in staff.treble.measures" :key="measure.id" class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea" v-on:click="addNoteClick($event, 'treble', measure.id)">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img v-for="note in calcNotePositions(measure.notes, 'treble')" :key="note.pos" :style=note.styleObj :src=note.imgSrc>
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
              <div class="occupy"></div>
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
              <div v-for="measure in staff.bass.measures" :key="measure.id" class="measure" v-on:mouseenter="showNoteArea" v-on:mouseleave="hideNoteArea" v-on:click="addNoteClick($event, 'bass', measure.id)">
                <img src="../assets/Music-Staff.svg" width="100%" height="80px">
                <img v-for="note in calcNotePositions(measure.notes, 'bass')" :key="note.pos" :style=note.styleObj :src=note.imgSrc>
                <img style="position: absolute; top: 0; left: 98%; height: 100%; width: 2%" src="../assets/Line.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
          <collaboration-view :comp="composition"></collaboration-view>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable no-undef */
import collaborationView from './Collaboration'

let images = importAll(require.context('../assets/', true, /^\.\//));
let selNote = 'quarter note';
// width and height of clickable note area
let w;
let h;
let lastUpdatedMeasure = {obj: null, staff: '', measID: 0};
let keyboardMarker = 0;
let numOf16InMeas = 16;

function importAll (r) {
  let obj = {};
  r.keys().forEach(function (key) {
    obj[key] = r(key)
  });
  return obj
}

let noteTopPos = (function () {
  let letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  // position of the note at top of staff
  let noteTopStart = [
    {note: 'whole note', top: -51},
    {note: 'half note', top: -80},
    {note: 'quarter note', top: -80},
    {note: 'eighth note', top: -80},
    {note: 'sixteenth note', top: -75}];
  let noteTopOffset = 12;
  function calcTopPos (start, end) {
    let topPos = [];
    for (let noteTop of noteTopStart) {
      let noteObj = {note: noteTop.note, topPos: []};
      let top = noteTop.top;
      let letterIndex = letters.indexOf(start.charAt(0));
      let octave = parseInt(start.charAt(1));
      let noteLetter = start;
      while (noteLetter !== end) {
        noteObj.topPos.push({letter: noteLetter, top: top + '%'});
        letterIndex--;
        if (letterIndex === -1) {
          letterIndex = letters.length - 1;
          octave--;
        }
        top += noteTopOffset;
        noteLetter = letters[letterIndex] + octave;
      }
      topPos.push(noteObj);
    }
    return topPos;
  }
  // treble from top G5 to C3
  // bass from top B3 to E2
  return {treble: calcTopPos('G5', 'B3'),
    bass: calcTopPos('B3', 'D2')};
})();

export default {
  components: {
    'collaboration-view': collaborationView
  },
  mounted: function () {
    // login functionality will handle whether to call login modal
    this.login()
  },
  created () {
    // This is used to get the username of the person that has just logged in
    this.$root.$on('curr_username', (text) => {
      this.username = text
    });
    this.$root.$on('compUpdate', (text) => {
      console.log('recieved a new composition', text);
      this.compositionName = text
    });
    this.$root.$on('resetSheet', (value) => {
      this.composition = this.compositionDefault
    });
    // piano press is emitted from PianoKeys component
    this.$root.$on('pianoPress', (note) => {
      this.addNoteKeyboard(note);
    });
  },
  feathers: {
    compositions: {
      patched (data) {
        // Called whenever a composition belonging to this user has been updated
        console.log('recieved this', this.username, data.active);
        if (data.active.indexOf(this.username) !== -1) {
          console.log(this.username, data.active);
          // update the composition
          this.setComposition(JSON.parse(data.composition))
        }
      }
    }
  },
  data: function () {
    return {
      username: '',
      compositionName: '',
      radioNotes: [
        {note: 'whole note', image: images['./Whole-Note.png'], durationIn16: 16, height: '80%', width: '40'},
        {note: 'half note', image: images['./Half-Note.png'], durationIn16: 8, height: '80%', width: '30'},
        {note: 'quarter note', image: images['./Quarter-Note.png'], durationIn16: 4, height: '80%', width: '25'},
        {note: 'eighth note', image: images['./Eighth-Note.png'], durationIn16: 2, height: '80%', width: '25'},
        {note: 'sixteenth note', image: images['./Sixteenth-Note.png'], durationIn16: 1, height: '80%', width: '20'},
        {note: 'whole rest', image: images['./Whole-Rest.png'], durationIn16: 16, top: '-5%', height: '80%', width: '40'},
        {note: 'half rest', image: images['./Half-Rest.png'], durationIn16: 8, top: '5%', height: '80%', width: '30'},
        {note: 'quarter rest', image: images['./Quarter-Rest.svg'], durationIn16: 4, top: '10%', height: '80%', width: '10'},
        {note: 'eighth rest', image: images['./Eighth-Rest.png'], durationIn16: 2, top: '10%', height: '80%', width: '25'},
        {note: 'sixteenth rest', image: images['./Sixteenth-Rest.png'], durationIn16: 1, top: '30%', height: '70%', width: '8'}
      ],
      // todo example composition data structure. replace with default one created programmatically
      composition: {
        id: 0,
        timeSig: '44',
        staffs: {
          treble: {
            measures: [
              {
                id: 0,
                notes: [
                  {note: 'half note', letter: 'D5', accidental: 'sharp'},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'eighth note', letter: 'G4', accidental: 'flat'},
                  {note: 'eighth note', letter: 'C5', accidental: 'flat'}
                ]
              },
              {
                id: 1,
                notes: [
                  {note: 'whole note', letter: 'F4', accidental: null}
                ]
              },
              {
                id: 2,
                notes: [
                  {note: 'quarter note', letter: 'A4', accidental: null},
                  {note: 'eighth note', letter: 'B4', accidental: 'flat'},
                  {note: 'eighth note', letter: 'C5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'D5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'E5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'F5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'G5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'A4', accidental: 'flat'},
                  {note: 'sixteenth rest', letter: null, accidental: null},
                  {note: 'sixteenth note', letter: 'A4', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'A4', accidental: 'flat'}
                ]
              },
              {
                id: 3,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              }
            ]
          },
          bass: {
            measures: [
              {
                id: 0,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              },
              {
                id: 1,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              },
              {
                id: 2,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              },
              {
                id: 3,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              }
            ]
          }
        }
      },
      compositionDefault: {
        id: 0,
        timeSig: '44',
        staffs: {
          treble: {
            measures: [
              {
                id: 0,
                notes: [
                  {note: 'half note', letter: 'D5', accidental: 'sharp'},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'eighth note', letter: 'G4', accidental: 'flat'},
                  {note: 'eighth note', letter: 'C5', accidental: 'flat'}
                ]
              },
              {
                id: 1,
                notes: [
                  {note: 'whole note', letter: 'F4', accidental: null}
                ]
              },
              {
                id: 2,
                notes: [
                  {note: 'quarter note', letter: 'A4', accidental: null},
                  {note: 'eighth note', letter: 'B4', accidental: 'flat'},
                  {note: 'eighth note', letter: 'C5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'D5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'E5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'F5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'G5', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'A4', accidental: 'flat'},
                  {note: 'sixteenth rest', letter: null, accidental: null},
                  {note: 'sixteenth note', letter: 'A4', accidental: 'flat'},
                  {note: 'sixteenth note', letter: 'A4', accidental: 'flat'}
                ]
              },
              {
                id: 3,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              }
            ]
          },
          bass: {
            measures: [
              {
                id: 0,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              },
              {
                id: 1,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              },
              {
                id: 2,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              },
              {
                id: 3,
                notes: [
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null},
                  {note: 'quarter rest', letter: null, accidental: null}
                ]
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    // Log in either using the given email/password or the token from storage
    async login () {
      let that = this;
      try {
        // Try to authenticate using the JWT from localStorage
        await this.$feathers.authenticate().then(something => {
        // fetch information about user name
          console.log('UPGRADE CONNECTION', something);
          return this.$feathers.passport.verifyJWT(something.accessToken);
        }).then(payload => {
          console.log('JWT Payload', payload);
          this.$feathers.service('users').get(payload.userId).then(result => {
            // console.log('user', result)
            this.$root.$emit('curr_username', result.username);
            that.username = result.username;
            // add user to active list
            that.$feathers.service('active').create({
              user: that.username
            });
            // This section of the code is used to fetch the music sheet that the user
            // was last active on and display it
            console.log('username', result.username);
            let sheetInfo = this.$feathers.service('compositions').find({
              query: {
                active: {$in: [result.username]}
              }
            });
            sheetInfo.then(function (result2) {
              if (result2.data[0] !== undefined) {
                that.composition = JSON.parse(result2.data[0].composition);
                // notify other components
                that.$feathers.service('compositions').patch('', {
                  newName: result2.data[0].nameOfComposition
                })
              } else {
                // if it was not active in any sheet, display the default sheet
                that.composition = that.compositionDefault;
                // reset composition name and list of active users
                that.$root.$emit('resetSheet', that.username)
              }
            })
          });
        });
        // get the username and avatar from the user and display
        this.$feathers.service('users').get(null).then(result => {
          this.$root.$emit('curr_avatar', result.avatar)
        })
      // If successful, don't open login modal
      } catch (error) {
        // If we get an error, display it
        console.log(error);
        // if this is a NotAuthenticated Error, launch the login modal
        if (error.code === 401) {
          $('#loginModal').modal('show')
        }
      }
    },
    setComposition (composition) {
      this.composition = composition;
      console.log('in set comp');
    },
    // called when a piano key is pressed
    addNoteKeyboard: function (noteKey) {
      let staff;
      // see if the noteKey in within the staff ranges
      let yPos = noteTopPos.treble[0].topPos.findIndex(x => x.letter === noteKey);
      if (yPos !== -1) {
        staff = 'treble';
      } else {
        yPos = noteTopPos.bass[0].topPos.findIndex(x => x.letter === noteKey);
        if (yPos !== -1) {
          staff = 'bass';
        } else {
          return;
        }
      }
      // attempt to put the note into the measure. If attempt failed, put note in next measure
      if (!this.insertNote(staff, lastUpdatedMeasure.measID, keyboardMarker, yPos, noteKey)) {
        // add another measure if we've reached the end of the composition
        if (lastUpdatedMeasure.measID + 1 >= this.composition.staffs[staff].measures.length) {
          this.addMeasure();
        }
        lastUpdatedMeasure.measID++;
        keyboardMarker = 0;
        this.insertNote(staff, lastUpdatedMeasure.measID, keyboardMarker, yPos, noteKey);
      }
      // setting last updated measure
      let highlightMeasure = Math.floor(lastUpdatedMeasure.measID / 3) * 3 + lastUpdatedMeasure.measID;
      // next tick here to ensure that the dom has been updated, so we can highlight properly
      this.$nextTick(function () {
        if (lastUpdatedMeasure.obj !== null) {
          $(lastUpdatedMeasure.obj).css('outline', '');
        }
        lastUpdatedMeasure.obj = $('.measure').eq(highlightMeasure);
        lastUpdatedMeasure.staff = staff;
        $(lastUpdatedMeasure.obj).css('outline', '3px solid rgba(0, 90, 255, 0.5)');
      });
      for (let n of this.radioNotes) {
        if (n.note === selNote) {
          keyboardMarker += n.durationIn16;
          break;
        }
      }
    },
    // called when measure in music sheet is clicked
    addNoteClick: function (e, staff, measureId) {
      // calculate x and y position of mouse in
      let xPos = Math.floor((e.pageX - $(e.target).offset().left) * numOf16InMeas / w);
      let yPos = Math.floor((e.pageY - $(e.target).offset().top) * noteTopPos[staff][0].topPos.length / h);
      let noteKey = noteTopPos[staff][0].topPos[yPos].letter;
      // setting last clicked measure
      if (lastUpdatedMeasure.obj !== null) {
        $(lastUpdatedMeasure.obj).css('outline', '');
      }
      lastUpdatedMeasure.obj = $(e.currentTarget);
      lastUpdatedMeasure.staff = staff;
      lastUpdatedMeasure.measID = measureId;
      $(lastUpdatedMeasure.obj).css('outline', '3px solid rgba(0, 90, 255, 0.5)');
      keyboardMarker = 0;
      this.insertNote(staff, measureId, xPos, yPos, noteKey);
    },
    // called by addNoteClick or addNoteKeyboard to insert note into composition
    insertNote: function (staff, measureId, xPos, yPos, noteKey) {
      let noteDurations = [];
      let noteToAdd;
      // see if the measure has enough room
      for (let n of this.radioNotes) {
        if (n.note === selNote) {
          noteToAdd = n;
          if (n.durationIn16 + xPos > numOf16InMeas) {
            return false;
          }
          break;
        }
      }
      // throw the measure into an array
      for (let n of this.composition.staffs[staff].measures[measureId].notes) {
        noteDurations.push(n);
        // fill in rest of duration with null
        for (let i = 1; i < this.getNote(n).durationIn16; i++) {
          noteDurations.push(null);
        }
      }
      // let's just replace any overlapping notes to the left with rests
      if (noteDurations[xPos] === null) {
        for (let i = xPos - 1; i >= 0; i--) {
          if (noteDurations[i] !== null) {
            noteDurations[i] = {note: 'sixteenth rest'};
            break;
          }
          noteDurations[i] = {note: 'sixteenth rest'};
        }
      }
      // insert the note
      if (selNote.slice(-4) === 'rest') {
        noteDurations[xPos] = {note: selNote, letter: null, accidental: null};
      } else {
        noteDurations[xPos] = {note: selNote, letter: noteKey, accidental: null};
      }
      for (let i = 1; i < noteToAdd.durationIn16; i++) {
        noteDurations[xPos + i] = null;
      }
      // replace any overlapped notes to right with rests
      for (let i = xPos + noteToAdd.durationIn16; i < numOf16InMeas; i++) {
        if (noteDurations[i] !== null) {
          break;
        }
        noteDurations[i] = {note: 'sixteenth rest'};
      }
      // reconstruct and put the measure back
      let newNotes = [];
      for (let i = 0; i < noteDurations.length; i++) {
        if (noteDurations[i] !== null) {
          newNotes.push(noteDurations[i]);
        }
      }
      this.composition.staffs[staff].measures[measureId].notes = newNotes;
      // update composition in the db
      let compName = this.compositionName.name;
      let isSaved = this.compositionName.isSaved;
      console.log('name of composition to be saved', compName, isSaved);

      this.$feathers.service('compositions').patch('', {
        newComposition: JSON.stringify(this.composition),
        nameOfComposition: compName
      });
      return true;
    },
    // shows clickable area when hovering over a measure
    showNoteArea: function (e) {
      w = $(e.currentTarget).outerWidth();
      h = $(e.currentTarget).outerHeight(true);
      let area = $('<div>');
      area.css({
        'position': 'absolute',
        'z-index': 1,
        'top': '-20%',
        'left': 0,
        'width': w,
        'height': h,
        'background-color': 'rgba(190,210,240,0.5)'
      });
      area.appendTo(e.currentTarget);
    },
    // shown note area disappears after hovering off a measure
    hideNoteArea: function (e) {
      $(e.currentTarget.lastChild).remove();
    },
    // called whenever the note radio button changes
    selChange: function () {
      selNote = $('input[name=noteOptions]:checked').val();
    },
    // add a measure after the currently selected measure
    addMeasure: function () {
      if (lastUpdatedMeasure.measID === null) {
        return;
      }
      function createMeas () {
        return {
          id: lastUpdatedMeasure.measID + 1,
          notes: (function () {
            let ret = [];
            for (let i = 0; i < 4; i++) {
              ret.push({note: 'quarter rest', letter: null, accidental: null});
            }
            return ret;
          })()
        }
      }
      let measureToAdd = createMeas();
      // increment id of all the other measures
      for (let i = this.composition.staffs.treble.measures.length - 1; i >= measureToAdd.id; --i) {
        this.composition.staffs.treble.measures[i].id++;
        this.composition.staffs.bass.measures[i].id++;
      }
      // add measure to the treble and bass staff
      this.composition.staffs.treble.measures.splice(measureToAdd.id, 0, measureToAdd);
      measureToAdd = createMeas();
      this.composition.staffs.bass.measures.splice(measureToAdd.id, 0, measureToAdd);
      // update composition in the db
      let compName = this.compositionName.name;
      let isSaved = this.compositionName.isSaved;
      console.log('name of composition to be saved', compName);
      if (isSaved) {
        this.$feathers.service('compositions').patch('', {
          newComposition: JSON.stringify(this.composition),
          nameOfComposition: compName
        })
      }
    },
    // deletes the currently selected measure
    deleteMeasure: function () {
      if (lastUpdatedMeasure.measID === null || this.composition.staffs.treble.measures.length === 1) {
        return;
      }
      this.composition.staffs.treble.measures.splice(lastUpdatedMeasure.measID, 1);
      this.composition.staffs.bass.measures.splice(lastUpdatedMeasure.measID, 1);
      // decrement id of all other measures
      for (let i = this.composition.staffs.treble.measures.length - 1; i >= lastUpdatedMeasure.measID; --i) {
        this.composition.staffs.treble.measures[i].id--;
        this.composition.staffs.bass.measures[i].id--;
      }
      if (lastUpdatedMeasure.measID === this.composition.staffs.treble.measures.length) {
        lastUpdatedMeasure.measID = null;
      }
      // update composition in the db
      let compName = this.compositionName.name;
      let isSaved = this.compositionName.isSaved;
      console.log('name of composition to be saved', compName);
      if (isSaved) {
        this.$feathers.service('compositions').patch('', {
          newComposition: JSON.stringify(this.composition),
          nameOfComposition: compName
        })
      }
    },
    // reformats the composition data object to display 'measuresPerStaff' number of measures per row
    reformatComp: function (staffs) {
      let measuresPerStaff = 3;
      let newStaff = {treble: {measures: []}, bass: {measures: []}};
      let formattedComp = [];
      for (let i = 0; i < staffs.treble.measures.length; i++) {
        newStaff.treble.measures.push(staffs.treble.measures[i]);
        newStaff.bass.measures.push(staffs.bass.measures[i]);
        if (newStaff.treble.measures.length === measuresPerStaff) {
          formattedComp.push(newStaff);
          newStaff = {treble: {measures: []}, bass: {measures: []}};
        }
      }
      if (newStaff.treble.measures.length !== 0) {
        formattedComp.push(newStaff);
      }
      return formattedComp;
    },
    // just a helper used by insertNote
    getNote: function (note) {
      for (let n of this.radioNotes) {
        if (note.note === n.note) {
          return n;
        }
      }
      return null;
    },
    // called whenever the composition data object changes to display the composition correctly
    calcNotePositions: function (notes, staff) {
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
          // find note's top position in noteTopPos
          notePosObj.styleObj.top = (function () {
            for (let noteTop of noteTopPos[staff]) {
              if (noteTop.note === noteDurations[i].compNote.note) {
                for (let topPos of noteTop.topPos) {
                  if (topPos.letter === noteDurations[i].compNote.letter) {
                    return topPos.top;
                  }
                }
              }
            }
          })();
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
    width: 16%;
  }
  .measure{
    margin-bottom: 45px;
    width: 28%;
  }
  .trebleStaff, .bassStaff{
    margin-bottom: 45px;
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
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
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
  .col-sm-3 {
    width: 20%;
  }
  .occupy{
    float: left;
    max-width: 100%;
    width: 999px;
  }
  img {
    z-index: -1;
  }
@media only screen and (max-width: 480px) {

  }
</style>
