<template>
  <!-- Login Modal -->
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
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
          <div class="form-group row justify-content-md-center">
            <!-- <label for="loginUser" class="col-sm-2 col-form-label">Username:</label> -->
            <div class="col">
              <input type="text" class="form-control" placeholder="Username" v-model="username" id="loginUser">
            </div>
          </div>
          <div class="form-group row justify-content-md-center">
            <!-- <label for="loginPass" class="col-sm-2 col-form-label">Password:</label> -->
            <div class="col">
              <input type="password" class="form-control" placeholder="Password" v-model="password" id="loginPass">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class ="col">
                <button type="button" id="login-button" class="btn btn-primary" @click="login_user()" v-bind:disabled="!completed_form" >Login</button>
              </div>
            </div>
            <div class="row justify-content-md-center">
                <button type="button" class="btn btn-link" data-dismiss="modal" data-toggle="modal" data-target="#registerModal">Don't have an account? Click here to register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-modal',

  data () {
    return {
      username: '',
      password: ''
    }
  },

  computed: {
    // function to ensure form has been filled out (used for button disable/enable)
    completed_form: function () { return this.username && this.password }
  },

  methods: {

    // function that logs in the user specified once it's called
    async login_user () {
      const getCredentials = () => {
        const user = {
          // email: "feathers@example.com",
          // password: "secret"
          username: this.username,
          password: this.password
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
/* body {
  padding-right: 0px !important;
  overflow-y: hidden !important;
} */

#loginModal .modal-dialog{
  max-width: 35em;
}

.col{
  max-width: 90%;
  /* border: 3px solid blue; */
}

#login-button{
  width: 100%;
  margin-bottom: 1em;
}
.modal-footer{
  /* border: 3px solid green; */
  overflow:auto;
}

.btn-link{
  font-size: 100%;
  white-space: normal;
  text-decoration: underline;
}

.register-link{
  border: 5px solid red;
  /* margin-right: 3em; */
  font-size: 1px;
  /* float: left; */
  /* margin-right: 0px; */

}

</style>
