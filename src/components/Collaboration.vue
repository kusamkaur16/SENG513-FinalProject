<template>
    <div class="collaborationWindow">
            <div class="row">
                <h6>Composition Name:</h6>
                    <input type="text" v-model="compositionName" class="form-control composition">
            </div>
            <div class="row">
                <h3>Currently active users</h3>
                <div v-for="user in currentUsers" :key="user" class="active" v-bind:class="user">
                    <div class="activeUsers"> {{ user }}</div>
                </div>
            </div>
            <div class="row">
                <h5>Share music sheet with:</h5>
                <input type='email' id='emaiToShareWith'></input>
            </div>
            <div class="row">
                <button class="btn btn-outline-primary" @click="addCollaborator">Share with others</button>
            </div>
            <div class="row">
                <button class="btn btn-outline-primary" @click="saveComposition">Save</button>
                <button class="btn btn-outline-primary" @click="exportComposition">Export</button>
                <span class="errorLog">Try</span>
            </div>
    </div>
</template>
<script>
import musicSheet from './MusicSheet'

export default {
  name: 'collaboration-view',
  data () {
      return {
          currentUsers: [
              'Bob',
              'Billy',
              'Joe'
          ],
          compositionName: 'Untitled'
      }
  },
  methods: {
      addCollaborator() {
          let addUser  = $('#emaiToShareWith').val()

          const composition = {
              collaborators: addUser,
              compositionName: this.compositionName
          }
          try {
              this.$feathers.service('compositions').patch('5ac563d7154708d2e4582f9e',composition)

              $('input[type=email]').val('')
          } catch(error) {
              console.log('Register Error: ' + error)
               $('.errorLog').text('There was an error')
          }

      },
      updateUserList: function(newUserList) {
          this.currentUsers = newUserList
      },
      saveComposition: function() {
          //check that the name of the composition is not Untitled
          if (this.compositionName === 'Untitled'){
              // Point it out
              $(".composition").addClass('error')
          } else {
              $(".composition").removeClass('error')
              //call the create service
              let retrievedComposition = JSON.stringify(musicSheet.data().composition);

              let compositionRecord = {
                  compositionName: this.compositionName,
                  text: retrievedComposition
              }
              try {
                  this.$feathers.service('compositions').create(compositionRecord)
              } catch(err) {
                  console.log(err)
                  $('.errorLog').text('There was an error')
              }
          }

      },
      exportComposition: function() {
          //check that the name of the composition is not Untitled
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
