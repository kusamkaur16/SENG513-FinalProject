<template>
  <!-- Register Modal -->
  <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-3">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">&larr; </button>
          </div>
          <div class="col-7">
            <h5 class="modal-title">Account Registration</h5>
          </div>
          <div class="col">
            <button type="button" id="close-register" class="close"  style="visibility:hidden;" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('email')}">
            <!-- <label for="regEmail" class="col-sm-2 col-form-label">Email:</label> -->
            <div class="content col">
              <input type="email" class="form-control" @keyup.enter="press_register()" v-model="email" placeholder="Email" id="regEmail">
              <div class="message">{{ validation.firstError('email') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('username')}">
            <!-- <label for="regUser" class="col-sm-2 col-form-label">Username:</label> -->
            <div class="col">
              <input type="text" class="form-control" @keyup.enter="press_register()" v-model="username" placeholder="Username" id="regUser">
              <div class="message">{{ validation.firstError('username') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('password')}">
            <!-- <label for="regPassword" class="col-sm-2 col-form-label">Password:</label> -->
            <div class="col">
              <input type="password" class="form-control" @keyup.enter="press_register()" v-model="password" placeholder="Password" id="regPassword">
              <div class="message">{{ validation.firstError('password') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('repeat')}">
            <!-- <label for="regConfirmPassword" class="col-sm-2 col-form-label">Confirm Password:</label> -->
            <div class="col">
              <input type="password" class="form-control" @keyup.enter="press_register()" v-model="repeat" placeholder="Confirm Password" id="regConfirmPassword">
              <div class="message">{{ validation.firstError('repeat') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('agreement')}">
            <div class="form-check">
              <div class="col-sm-2">
                <input class="form-check-input" type="checkbox" id="regCheck">
                <div class="message">{{ validation.firstError('agreement') }}</div>
              </div>
              <label for="regCheck" class="col-sm-10 form-check-label">I agree to Pian.io's Terms and Conditions and give
                them consent to take my soul and firstborn child.</label>
            </div>
          </div>
        </div>
        <div id="error-display-register">
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class ="col">
                <button type="button" id="register-button" class="btn btn-primary" v-bind:disabled="!completed_form" @click="submit">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator } from '../main.js'
export default {
  name: 'register-modal',

  data () {
    return {
      email: '',
      username: '',
      password: '',
      repeat: '',
      agreement: '',
      submitted: false
    }
  },

  computed: {
    // function to ensure form has been filled out (used for button disable/enable)
    completed_form: function () {
      return !this.validation.hasError() && this.email && this.username &&
              this.password && this.repeat
    }
  },

  validators: {
    email: function (value) {
      return Validator.value(value).required().email()
    },
    username: function (value) {
      return Validator.value(value).required().minLength(3).maxLength(12).regex('^[0-9a-zA-Z_.-]+$',
        'Invalid Username: must contain only alphanumeric characters')
    },
    password: function (value) {
      return Validator.value(value).required().minLength(6)
    },
    'repeat, password': function (repeat, password) {
      if (this.submitted || this.validation.isTouched('repeat')) {
        return Validator.value(repeat).required().match(password)
      }
    }
    // agreement: function (value) {
    //   return Validator.value(value).required()
    // }
  },

  methods: {

    press_register () {
      document.getElementById('register-button').click()
    },

    // function that validates the input and calls the register_user function
    submit () {
      this.submitted = true
      this.$validate()
        .then((success) => {
          if (success) {
            this.register_user()
          }
        })
    },

    // function that logs in the user specified once it's called
    async register_user () {
      const getCredentials = () => {
        const user = {
          /* Sample authenticated user
            email: "feathers@example.com",
            password: "secret" */
          email: this.email,
          username: this.username,
          password: this.password
        }
        // console.log(user.email)
        // console.log(user.username)
        // console.log(user.password)
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
          // If successful, show the application UI and wipe fields
          document.getElementById('close-register').click()
          this.$popup({
            message: 'Welcome ' + this.username,
            delay: 7
          })
          this.$curr_username = this.username
          this.email = this.username = this.password = this.repeat = ''
        } catch (error) {
          // If we got an error, show the login page
          console.log(error)
        }
      }

      const user = getCredentials()

      // First create the user
      try {
        document.getElementById('error-display-register').innerText = ''
        await this.$feathers.service('users').create(user)
        // If no error was thrown at this point, try and log them in
        await login(user)
      } catch (error) {
        console.log('Register Error: ' + error)
        document.getElementById('error-display-register').innerText = 'Registration Failed: ' + error.message
      }
    }
  }

}
</script>

<style lang="scss" scoped>

// input {
//   v-on:keyup.enter="press_login()";
// }

#registerModal .modal-dialog{
  max-width: 35em;
}

.col{
  max-width: 90%;
  /* border: 3px solid blue; */
}

#register-button{
  width: 100%;
  margin-bottom: 1em;
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

#error-display-register {
  color: #ff0000;
}

</style>
