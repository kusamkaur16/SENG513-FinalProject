<template>
  <!-- Login Modal -->
  <div class="modal" id="loginModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-11">
            <h5 class="modal-title">Pian.io</h5>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label for="loginUser" class="col-sm-2 col-form-label">Username:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="loginUser">
            </div>
          </div>
          <div class="form-group row">
            <label for="loginPass" class="col-sm-2 col-form-label">Password:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="loginPass">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row" id="loginRow">
              <button type="button" class="btn btn-outline-primary">Login</button>
            </div>
            <button type="button" class="btn btn-link" data-dismiss="modal" data-toggle="modal" data-target="#registerModal" >Don't have an account? Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-modal'
}
</script>

<style scoped>
#loginRow {
  float: right;
}
</style>
