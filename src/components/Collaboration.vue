<template>
  <div class="collaborationWindow">
    <div class="row">
      <h6>Composition Name:</h6>
        <input type="text" id="compName" v-model="compositionName" class="form-control composition">
      </div>
    <div class="row">
      <h3>Currently active users</h3>
      <ul v-for="user in currentUsers" :key="user" class="active" v-bind:class="user">
        <li class="activeUsers"> {{ user }}</li>
      </ul>
    </div>
    <div class="row">
      <h6>Share music sheet with:</h6>
      <input type='email' id='emaiToShareWith'>
    </div>
    <div class="row">
      <button class="btn btn-outline-primary" @click="addCollaborator">Share with others</button>
    </div>
    <div class="row">
      <button class="btn btn-outline-primary" @click="saveComposition">Save</button>
      <span class="errorLog"></span>
    </div>
  </div>
</template>
<script>
/* eslint-disable semi */
/* eslint-disable no-undef */
export default {
  name: 'collaboration-view',
  props: ['comp'],
  data () {
    return {
      currentUsers: [ ],
      compositionName: 'Untitled',
      isSaved: false,
      username: ''
    }
  },
  sockets: {
    connect () {
      console.log('yay is connected')
    }
  },
  feathers: {
    active: {
      created (data) {
        let that = this
        console.log('someone just logged in')
        // check if the person is a part of the active list for the composition
        if(this.compositionName !== 'Untitled'){
        let tempVal = this.$feathers.service('compositions').find({
          query: {
            nameOfComposition: this.compositionName
          }
        })
        tempVal.then(function (returnedVal) {
          console.log('got this from query result', returnedVal)
          if (returnedVal.data[0].active.indexOf(data.user) !== -1) {
            that.updateCurrentUsers(data.user)
          }
       })
       }
     },
     removed (data) {
       // remove that user from the current list
       console.log('someone disconnected', data)
       let index = this.currentUsers.indexOf(data.user)
       if (index !== -1) {
         this.currentUsers.splice(index,1)
       }
     }
    },
    compositions: {
      created (data) {
        // Called when ever a new composition is created
        console.log('new composition created!!!')
        if (data.ownerId === this.username) {
          this.updateCurrentUsers(data.active)
        }
      },
      patched (data) {
        // Called whenever a composition is updated

        // update composition information if the current user is in the list of activeUsers
        // for the updated entry
        if (data.active.includes(this.username)) {
          // update the name of current composition
          // this is used when the user switches between compositions
          this.compositionName = data.nameOfComposition
          // emit new comp name updates to the root component
          this.$root.$emit('compUpdate', {
            name: this.compositionName,
            isSaved: this.isSaved
          })
          // Update the list of active users on that composition
          this.updateCurrentUsers(data.active)
          // set isSaved to true
          this.isSaved = true
          // make sure the entry field is disabled
          if (this.compositionName !== 'Untitled') {
            $('.composition').prop('disabled', true)
          }
        }
      }
    }
  },
  created () {
    // This is used to get the username of the person that has just logged in
    this.$root.$on('msg', (text) => {
      this.username = text
    })
    // This is used to inform the collaboration window to reset everything
    this.$root.$on('resetSheet', (value) => {
        this.currentUsers = []
        this.isSaved = false
        this.compositionName = 'Untitled'
        // reenable the field to change composition name
        $('.composition').prop('disabled', false)
    })
  },
  methods: {
    // This function is used to properly display the list of active users
    updateCurrentUsers (activeUsers) {
      let users = activeUsers

      this.currentUsers = []
      for (let i = 0; i < users.length; i++) {
        if (users[i] !== '') {
          this.currentUsers.push(users[i])
        }
      }
    },
    // This function is called whenever a user chooses to share their composition with others
    addCollaborator () {
      // check to see if composition has been saved
      if (this.compositionName === 'Untitled' || this.isSaved === false) {
        // Point it out to the user that they must save the composition first
        $('.composition').addClass('error')
      } else {
        // get the name of the user to add
        let addUser = $('#emaiToShareWith').val()

        const composition = {
          collaborators: addUser,
          nameOfComposition: this.compositionName
        }

        // update the compositions entry to include the entered user as a collaborator
        let temp = this.$feathers.service('compositions').patch('', composition)

        // Erase the entry from the input box
        $('input[type=email]').val('')
        // Make sure the error is cleared
        $('.errorLog').html('')

        temp.catch(function (error) {
          // If something failed, display the error
          $('.errorLog').html(error)
          $('.errorLog').addClass('activeUsers')
        })
      }
    },
    updateUserList: function (newUserList) {
      this.currentUsers = newUserList
    },
    // This function is called whenever a user clicks saved
    saveComposition: function () {
      // check that the name of the composition is not Untitled
      if (this.compositionName === 'Untitled') {
        // point it out
        $('.composition').addClass('error')
      } else {
        // This condition checks to see if the composition has ever been saved, i.e an entry
        // exists in the table

        // If there was an error when saving, remove it
        $('.composition').removeClass('error')

        let retrievedComposition = JSON.stringify(this.comp)
        let compositionRecord = {
          nameOfComposition: this.compositionName,
          text: retrievedComposition
        }

        // call the create service
        let temp = this.$feathers.service('compositions').create(compositionRecord)
        // disable the ability to change composition name
        $('.composition').prop('disabled', true)
        $('.errorLog').html('')
        this.isSaved = true

        // emit new comp name updates to the root component
        this.$root.$emit('compUpdate', {
          name: this.compositionName,
          isSaved: this.isSaved
        })

        temp.catch(function (error) {
          // if it failed to save the composition, display the error
          $('.composition').prop('disabled', false)
          $('.errorLog').html(error)
          $('.errorLog').addClass('activeUsers')
          this.isSaved = false
        })
      }
    }
  }
}

</script>
<style>
.activeUsers {
    size:20px;
    color: red
}
.error {
  border:2px solid red;
}
</style>
