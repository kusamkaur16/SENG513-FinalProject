<template>
  <!-- Register Modal -->
  <div class="modal" id="registerModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-3">
            <button type="button" class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">&larr; Back to login</button>
          </div>
          <div class="col-7">
            <h5 class="modal-title">Account Registration</h5>
          </div>
          <div class="col">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
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
          <button type="button" class="btn btn-outline-primary" @click="register_user()">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register-modal',

  methods: {
    // function that logs in the user specified once it's called
    async register_user () {
      const getCredentials = () => {
        const user = {
          // email: "feathers@example.com",
          // password: "secret"
          email: document.getElementById('regEmail').value,
          username: document.getElementById('regUser').value,
          password: document.getElementById('regPassword').value
        }
        console.log(user.email)
        console.log(user.username)
        console.log(user.password)
        return user
      }
      // Log in either using the given email/password or the token from storage
      const login = async credentials => {
        try {
          if (!credentials) {
            // Try to authenticate using the JWT from localStorage
            await this.$feathers.authenticate()
          } else {
            // If we get login information, add the strategy we want to use for login
            const payload = Object.assign({ strategy: 'local' }, credentials)

            await this.$feathers.authenticate(payload)
          }

          // If successful, show the application UI
          console.log('Show main application now')
        } catch (error) {
          // If we got an error, show the login page
          console.log('ERROR: Show the login page cause this is an error')
        }
      }

      const user = getCredentials()

      // First create the user
      try {
        await this.$feathers.service('users').create(user)
      } catch (error) {
        console.log('ERROR: ' + error.message)
      }
      // If successful log them in
      await login(user)
    }
  }

}
</script>

<style scoped>

</style>
