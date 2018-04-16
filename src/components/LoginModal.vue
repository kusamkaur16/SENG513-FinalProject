<template>
  <!-- Login Modal -->
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header" id="modal-header-bg">
          <div class="col-11">
            <h5 class="modal-title" id="modal-title">Pian.io</h5>
          </div>
          <button type="button" id="close-login" class="close" style="visibility:hidden;" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row justify-content-md-center">
            <!-- <label for="loginUser" class="col-sm-2 col-form-label">Username:</label> -->
            <div class="col">
              <input type="text" class="form-control" @keyup.enter="press_login()" placeholder="Username" v-model="username" id="loginUser">
            </div>
          </div>
          <div class="form-group row justify-content-md-center">
            <!-- <label for="loginPass" class="col-sm-2 col-form-label">Password:</label> -->
            <div class="col">
              <input type="password" class="form-control" @keyup.enter="press_login()" placeholder="Password" v-model="password" id="loginPass">
            </div>
          </div>
        </div>
        <div id="error-display-login">
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

// var input = document.getElementById('loginPass')
// input.addEventListener('keyup', function (event) {
//   event.preventDefault()
//   if (event.keyCode === 13) {
//     document.getElementById('login-button').click()
//   }
// })

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

    press_login () {
      document.getElementById('login-button').click()
    },

    // function that logs in the user specified once it's called
    async login_user () {
      document.getElementById('error-display-login').innerText = ''
      const user = this.getCredentials()
      // wait to get the results of the login function
      try {
        await this.login(user)
      } catch (error) {
        // if Not Authenticated error --> display error message
        if (error.code === 401) {
          document.getElementById('error-display-login').innerText = 'Login Failed: Invalid username or password'
        }
      }
    },
    getCredentials () {
      const user = {
        // email: "feathers@example.com",
        // password: "secret"
        username: this.username,
        password: this.password
      }
      // DEBUG: Username and Password
      // console.log('username: ' + user.username)
      // console.log('password: ' + user.password)
      return user
    },
    // Log in either using the given email/password or the token from storage
    async login (credentials) {
      try {
        // if the function is not being called from the button press
        if (!credentials) {
          // Try to authenticate using the JWT from localStorage
          await this.$feathers.authenticate()
        } else {
          // If we get login information, add the strategy we want to use for login
          const payload = Object.assign({ strategy: 'local' }, credentials)
          await this.$feathers.authenticate(payload)
        }

        // If successful, show the application UI and wipe the fields
        document.getElementById('close-login').click()

        // this.$root.$emit('curr_avatar', this.username)
        this.$popup({
          message: 'Welcome ' + this.username,
          delay: 7
        })

        this.$root.$emit('curr_username', this.username)
        this.$root.$emit('resetSheet', this.username)
        // add to list of active users
        this.$feathers.service('active').create({
          user: this.username
        })
        this.emit_avatar()

        this.username = this.password = ''
      } catch (error) {
        // If we get an error, display it
        console.log(error)
        // if this is a NotAuthenticated Error, display an error message
        if (error.code === 401) {
          // don't handle this exception, rethrow for login-button-press to handle
          throw error
        }
      }
    },

    async emit_avatar () {
      await this.$feathers.service('users').get(null).then(result => {
        this.$root.$emit('curr_avatar', result.avatar)
        console.log('user', result)
      })
      // gets user instance from server using find
      // await this.$feathers.service('users').find({
      //   query: {
      //     username: this.username
      //   }
      // }).then(result => {
      //   console.log('user', result)
      //   this.$root.$emit('curr_avatar', result.data[0].avatar)
      //   console.log(result.data[0].avatar)
      // })
    }

  }
}
</script>

<style scoped>

#loginModal .modal-dialog{
  max-width: 35em;
}

#modal-title{
  /* color: white; */
  font-size: 200%;
}

#modal-header-bg{
  /* background-color: black; */
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
#error-display-login {
  color: #ff0000;
  /* border: 5px solid green; */
}

.modal-header-primary {
  color:#fff;
  padding:9px 15px;
  border-bottom:1px solid #eee;
  background-color: #428bca;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

</style>
