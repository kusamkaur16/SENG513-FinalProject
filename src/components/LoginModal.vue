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
          <button type="button" class="btn btn-outline-primary" @click="login_user()">Login</button>
          <button type="button" class="btn btn-outline-primary" data-dismiss="modal" data-toggle="modal" data-target="#registerModal" >Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-modal',

  methods: {
    // function that logs in the user specified once it's called
    async login_user () {
      const getCredentials = () => {
        const user = {
          // email: "feathers@example.com",
          // password: "secret"
          username: document.getElementById('loginUser').value,
          password: document.getElementById('loginPass').value
        }
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

      // wait to get the results of the login function
      await login(user)
    }
  }
}
</script>

<style scoped>

</style>
