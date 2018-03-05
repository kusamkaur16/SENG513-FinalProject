<template>
  <!-- Register Modal -->
  <div class="modal" id="registerModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="container">
            <div class="row">
              <div id="backButton">
                <button type="button" class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">&larr; Back to login</button>
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="row">
              <h5 class="modal-title">Account Registration</h5>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label for="regEmail" class="col-sm-2 col-form-label">Email:</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="regEmail">
            </div>
          </div>
          <div class="form-group row">
            <label for="regUser" class="col-sm-2 col-form-label">Username:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="regUser">
            </div>
          </div>
          <div class="form-group row">
            <label for="regPassword" class="col-sm-2 col-form-label">Password:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="regPassword">
            </div>
          </div>
          <div class="form-group row">
            <label for="regConfirmPassword" class="col-sm-2 col-form-label">Confirm Password:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="regConfirmPassword">
            </div>
          </div>
          <div class="form-group row">
            <div class="form-check">
              <div class="col-sm-2">
                <input class="form-check-input" type="checkbox" id="regCheck">
              </div>
              <label for="regCheck" class="col-sm-10 form-check-label">I agree to Pian.io's Terms and Conditions and give them consent to take my soul and firstborn child.</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register-modal'
}
</script>

<style scoped>
.modal-title {
  width: 100%;
}
#backButton {
  float: left;
}
</style>
