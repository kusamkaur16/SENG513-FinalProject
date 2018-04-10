<template>
  <!-- Change Username Modal -->
  <div class="modal fade" id="changeUsernameModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-11">
            <h6 class="modal-title">Change Username</h6>
          </div>
          <button type="button" id="close-login" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('username')}">
            <!-- <label for="loginUser" class="col-sm-2 col-form-label">Username:</label> -->
            <div class="col">
              <input type="text" class="form-control" placeholder="Username" v-model="username" id="Username">
              <div class="message">{{ validation.firstError('username') }}</div>
            </div>
          </div>
          <div class="form-group row justify-content-md-center" :class="{error: validation.hasError('confirm')}">
            <!-- <label for="loginPass" class="col-sm-2 col-form-label">Password:</label> -->
            <div class="col">
              <input type="text" class="form-control" placeholder="Confirm Username" v-model="confirm" id="Confirm">
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
                <button type="button" id="update-button" class="btn btn-primary" v-bind:disabled="!completed_form" @click="submit">Update</button>
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
    // function that logs in the user specified once it's called
    submit () {
      this.submitted = true
      this.$validate()
        .then((success) => {
          if (success) {
            // this.register_user()
            console.log('called')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

#changeUsernameModal .modal-dialog{
  max-width: 25em;
}

.col{
  max-width: 90%;
  /* border: 3px solid blue; */
}

#update-button{
  width: 50%;
  margin-bottom: 1em;
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

</style>
