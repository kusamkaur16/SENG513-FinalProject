<template>
  <!-- Change password Modal -->
  <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-11">
            <h6 class="modal-title">Change Password</h6>
          </div>
          <button type="button" id="close-pword-update" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('password')}">
            <div class="col">
              <input type="password" class="form-control" placeholder="Old password" @keyup.enter="press_update()" v-model="old_password" id="OldPassword">
              <div class="message">{{ validation.firstError('password') }}</div>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('password')}">
            <!-- <label for="loginUser" class="col-sm-2 col-form-label">password:</label> -->
            <div class="col">
              <input type="password" class="form-control" placeholder="New password" @keyup.enter="press_update()" v-model="password" id="NewPassword">
              <div class="message">{{ validation.firstError('password') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('confirm')}">
            <!-- <label for="loginPass" class="col-sm-2 col-form-label">Password:</label> -->
            <div class="col">
              <input type="text" class="form-control" placeholder="Confirm password" @keyup.enter="press_update()" v-model="confirm" id="ConfirmPassword">
              <div class="message">{{ validation.firstError('confirm') }}</div>
            </div>
          </div>
        </div>
        <div id="error-display-cp">
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class ="col">
                <button type="button" id="update-pword-button" class="btn btn-primary" v-bind:disabled="!completed_form" @click="submit">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { Validator } from '../main.js'
export default {
  name: 'change-password-modal',
  data () {
    return {
      username: '',
      old_password: '',
      password: '',
      confirm: '',
      submitted: false
    }
  },

  created () {
    // This is used to get the username of the person that has just logged in
    this.$root.$on('curr_username', (text) => {
      this.username = text
    })
    // this.$root.$on('curr_avatar', (text) => {
    //   this.username = text
    // })
  },

  computed: {
    // function to ensure form has been filled out (used for button disable/enable)
    completed_form: function () {
      return !this.validation.hasError() && this.old_password && this.password && this.confirm
    }
  },

  validators: {
    password: function (value) {
      return Validator.value(value).required().minLength(6)
    },
    'confirm, password': function (confirm, password) {
      if (this.submitted || this.validation.isTouched('confirm')) {
        return Validator.value(confirm).required().match(password)
      }
    }
  },

  methods: {

    press_update () {
      document.getElementById('update-pword-button').click()
    },
    // function that logs in the user specified once it's called
    submit () {
      this.submitted = true
      this.$validate()
        .then((success) => {
          if (success) {
            this.change_password(this.password)
          }
        })
    },

    // function that changes the password of the user + updates backend
    async change_password (password) {
      try {
        // try {
        //   // attempt to authenticate user
        //   const user = this.getCredentials()
        //   await this.authenticate(user)
        //   console.log('authenticated')
        // } catch (error) {
        //   if (error.code === 401) {
        //     throw new Error('Incorrect Password')
        //   }
        // }
        await this.$feathers.service('users').patch(null, {
          password: password
        })

        // gets user instance from server using find
        console.log(this.old_password)
        await this.$feathers.service('users').find({
          query: {
            password: this.old_password
          }
        }).then(result => {
          console.log('user', result)
        })

        // if successful, close modal and notify user
        $('#changePasswordModal').modal('hide')
        this.$popup({
          message: 'Password Updated',
          delay: 7
        })
        document.getElementById('error-display-cp').innerText = ''
        this.password = ''
        this.confirm = ''
      } catch (error) {
        // console.log(error)
        document.getElementById('error-display-cp').innerText = 'Failed: ' + error.message
      }
    },

    getCredentials () {
      const user = {
        // email: "feathers@example.com",
        // password: "secret"
        username: this.username, // get this somehow
        password: this.password // change to OLD password
      }
      // DEBUG: Username and Password
      console.log('username: ' + user.username)
      console.log('password: ' + user.password)
      return user
    },

    // Log in either using the given email/password or the token from storage
    async authenticate (credentials) {
      try {
        // if the function is not being called from the button press
        if (!credentials) {
          // Throw an error
          throw new Error('Credentials required in order to perform this operation!')
        } else {
          // If we get login information, add the strategy we want to use for login
          const payload = Object.assign({ strategy: 'local' }, credentials)
          await this.$feathers.authenticate(payload)
          console.log('authenticated for real')
        }
      } catch (error) {
        // If we get an error, display it
        console.log(error)
        // if this is a NotAuthenticated Error, display an error message
        if (error.code === 401) {
          // don't handle this exception, rethrow for login-button-press to handle
          throw error
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#changePasswordModal .modal-dialog{
  max-width: 25em;
  position: absolute;
  top: 50px;
  right: 100px;
  bottom: 0;
  left: 0;
  z-index: 10040;
  overflow: auto;
  overflow-y: auto;
}

.col{
  max-width: 90%;
  /* border: 3px solid blue; */
}

update-pword-button{
  width: 50%;
  // margin-bottom: 1em;
}
.modal-footer{
  /* border: 3px solid green; */
  overflow:auto;
}

.form-group {
  // logic for handling CSS for validation errors in realtime
  &.error {
    color: #ff0000;

    input {
      border-color: #ff0000;
    }

    input:focus{
      box-shadow: 0 0 5px #ff0000;
    }

    ::placeholder{
      color: #ff0000;
    }
  }
}

#error-display-cp {
  color: #ff0000;
}

</style>
