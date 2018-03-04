<template>
  <!-- Settings Modal -->
  <div class="modal" id="settingsModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Settings</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <h5>Time Signature:</h5>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="timeSigOptions" id="radio24" value="option1">
              <label class="form-check-label" for="radio24">2/4</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="timeSigOptions" id="radio34" value="option2">
              <label class="form-check-label" for="radio34">3/4</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="timeSigOptions" id="radio44" value="option3">
              <label class="form-check-label" for="radio44">4/4</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="timeSigOptions" id="radio54" value="option4">
              <label class="form-check-label" for="radio54">5/4</label>
            </div>
          </div>
          <h5>Key Signature:</h5>
          <div class="row">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio1" value="option1">
              <label class="form-check-label" for="radio1">Key Sig 1</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio2" value="option2">
              <label class="form-check-label" for="radio2">Key Sig 2</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio3" value="option3">
              <label class="form-check-label" for="radio3">Key Sig 3</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio4" value="option4">
              <label class="form-check-label" for="radio4">Key Sig 4</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio5" value="option5">
              <label class="form-check-label" for="radio5">Key Sig 5</label>
            </div>
          </div>
          <div class="row">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio6" value="option6">
              <label class="form-check-label" for="radio6">Key Sig 6</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio7" value="option7">
              <label class="form-check-label" for="radio7">Key Sig 7</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio8" value="option8">
              <label class="form-check-label" for="radio8">Key Sig 8</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio9" value="option9">
              <label class="form-check-label" for="radio9">Key Sig 9</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio10" value="option10">
              <label class="form-check-label" for="radio10">Key Sig 10</label>
            </div>
          </div>
          <div class="row">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio11" value="option11">
              <label class="form-check-label" for="radio11">Key Sig 11</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio12" value="option12">
              <label class="form-check-label" for="radio12">Key Sig 12</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio13" value="option13">
              <label class="form-check-label" for="radio13">Key Sig 13</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio14" value="option14">
              <label class="form-check-label" for="radio14">Key Sig 14</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="keySigOptions" id="radio15" value="option15">
              <label class="form-check-label" for="radio15">Key Sig 15</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings-modal'
}
</script>

<style scoped>

</style>
