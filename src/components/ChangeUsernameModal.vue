<template>
  <!-- Change Username Modal -->
  <div class="modal fade" id="changeUsernameModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-11">
            <h6 class="modal-title">Change Username</h6>
          </div>
          <button type="button" id="close-uname-update" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('username')}">
            <!-- <label for="loginUser" class="col-sm-2 col-form-label">Username:</label> -->
            <div class="col">
              <input type="text" class="form-control" placeholder="New Username" @keyup.enter="press_update()" v-model="username" id="NewUsername">
              <div class="message">{{ validation.firstError('username') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('confirm')}">
            <!-- <label for="loginPass" class="col-sm-2 col-form-label">Password:</label> -->
            <div class="col">
              <input type="text" class="form-control" placeholder="Confirm Username" @keyup.enter="press_update()" v-model="confirm" id="ConfirmUsername">
              <div class="message">{{ validation.firstError('confirm') }}</div>
            </div>
          </div>
        </div>
        <div id="error-display-cu">
        </div>
        <div class="modal-footer">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class ="col">
                <button type="button" id="update-uname-button" class="btn btn-primary" v-bind:disabled="!completed_form" @click="submit">Update</button>
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
  name: 'change-username-modal',
  data () {
    return {
      username: '',
      confirm: '',
      submitted: false
    }
  },

  computed: {
    // function to ensure form has been filled out (used for button disable/enable)
    completed_form: function () {
      return !this.validation.hasError() && this.username && this.confirm
    }
  },

  validators: {
    username: function (value) {
      return Validator.value(value).required().minLength(3).maxLength(12).regex('^[0-9a-zA-Z_.-]+$',
        'Invalid Username: must contain only alphanumeric characters')
    },
    'confirm, username': function (confirm, username) {
      if (this.submitted || this.validation.isTouched('confirm')) {
        return Validator.value(confirm).required().match(username)
      }
    }
  },

  methods: {

    press_update () {
      document.getElementById('update-uname-button').click()
    },
    // function that logs in the user specified once it's called
    submit () {
      this.submitted = true
      this.$validate()
        .then((success) => {
          if (success) {
            this.change_username(this.username)
          }
        })
    },

    // function that changes the username of the user + updates backend
    async change_username (username) {
      try {
        await this.$feathers.service('users').patch(null, {
          username: username
        })

        // if successful, stop displaying errors
        $('#changeUsernameModal').modal('hide')
        this.$popup({
          message: 'Username Updated',
          delay: 7
        })
        console.log('curr_username: ' + this.$curr_username)
        this.$curr_username = this.username
        document.getElementById('error-display-cu').innerText = ''
        this.username = ''
        this.confirm = ''
      } catch (error) {
        // console.log(error)
        document.getElementById('error-display-cu').innerText = 'Failed: ' + error.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#changeUsernameModal .modal-dialog{
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

#update-uname-button{
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

#error-display-cu {
  color: #ff0000;
}

</style>
