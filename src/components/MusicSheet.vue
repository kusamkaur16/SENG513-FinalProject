<template>
  <div class="container">
    <!-- Main music sheet page -->
    <div class="row">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="noteOptions" id="radio1" value="option1">
        <label class="form-check-label" for="radio1">Whole note</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="noteOptions" id="radio2" value="option2">
        <label class="form-check-label" for="radio2">Half note</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="noteOptions" id="radio3" value="option3">
        <label class="form-check-label" for="radio3">Quarter note</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="noteOptions" id="radio4" value="option4">
        <label class="form-check-label" for="radio4">Eighth note</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="noteOptions" id="radio5" value="option4">
        <label class="form-check-label" for="radio5">Sixteenth note</label>
      </div>
    </div>
    <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#saveModal" >Save</button>
    <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exportModal" >Export</button>
    <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#accountModal" >My Account</button>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  mounted: () => { $('#loginModal').modal('show') }
}
</script>

<style scoped>

</style>
