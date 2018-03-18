<template>
  <div class="container">
    <!-- Main music sheet page -->
    <div class="row">
      <div class="form-check">
        <label>
          <input class="form-check-input" type="radio" name="noteOptions" id="radio1" value="option1">
          Whole note
        </label>
      </div>
      <div class="form-check">
        <label>
          <input class="form-check-input" type="radio" name="noteOptions" id="radio2" value="option2">
          Half note
        </label>
      </div>
      <div class="form-check">
        <label>
          <input class="form-check-input" type="radio" name="noteOptions" id="radio3" value="option3">
          Quarter note
        </label>
      </div>
      <div class="form-check">
        <label>
          <input class="form-check-input" type="radio" name="noteOptions" id="radio4" value="option4">
          Eighth note
        </label>
      </div>
      <div class="form-check">
        <label>
          <input class="form-check-input" type="radio" name="noteOptions" id="radio5" value="option5">
          Sixteenth note
        </label>
      </div>
    </div>
    <div class="row" id="middleArea">
      <div class="col-2">
        <h1>Flats, sharps, and other note things go here</h1>
      </div>
      <div class="col-7">
        <div id="musicSheet">
          <div class="staffParent" v-on:click="insert">
            <img class="trebleStaff" src="../assets/Music-Staff.svg" width="100%" height="80px">
            <img class="trebleClef" src="../assets/Treble-Clef.svg" width="45px" height="100px">
            <img class="bassStaff" src="../assets/Music-Staff.svg" width="100%" height="80px">
            <img class="bassClef" src="../assets/Bass-Clef.svg" width="45px" height="70px">
          </div>
          <div class="staffParent" v-on:click="insert">
            <img class="trebleStaff" src="../assets/Music-Staff.svg" width="100%" height="80px">
            <img class="trebleClef" src="../assets/Treble-Clef.svg" width="45px" height="100px">
            <img class="bassStaff" src="../assets/Music-Staff.svg" width="100%" height="80px">
            <img class="bassClef" src="../assets/Bass-Clef.svg" width="45px" height="70px">
          </div>
        </div>
      </div>
      <div class="col-3">
        <h1>Online users go here</h1>
      </div>
    </div>
    <div class="row">
      <h1>Play back buttons go here</h1>
      <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#saveModal" >Save</button>
      <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exportModal" >Export</button>
      <img id="asdf" src="../assets/Quarter-Rest.svg"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  mounted: () => { $('#loginModal').modal('show') },
  methods: {
    insert: function (e) {
      let im = $('#asdf')
      let ab = im.clone()
      ab.removeAttr('id')
      ab.css({'position': 'absolute', 'left': e.layerX, 'top': e.layerY, 'z-index': -1})
      ab.appendTo(e.currentTarget)
    }
  },
  data () {
    return {
      pics: ['Bass-Clef']
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
  .trebleStaff, .bassStaff{
    margin-bottom: 45px;
    z-index: 1;
  }

  .trebleClef{
    position: absolute;
    top: 0;
    left: 0;
  }
  .bassClef{
    position: absolute;
    top: 130px;
    left: 0;
  }
  #musicSheet{
    height: 100%;
    overflow-y: scroll;
  }
</style>
