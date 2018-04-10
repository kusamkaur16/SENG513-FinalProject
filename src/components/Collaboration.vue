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
                <input type='email' id='emaiToShareWith'></input>
            </div>
            <div class="row">
                <button class="btn btn-outline-primary" @click="addCollaborator">Share with others</button>
            </div>
            <div class="row">
                <button class="btn btn-outline-primary" @click="saveComposition">Save</button>
                <button class="btn btn-outline-primary" @click="exportComposition">Export</button>
                <span class="errorLog"></span>
            </div>
    </div>
</template>
<script>
import musicSheet from './MusicSheet'
export default {
  name: 'collaboration-view',
  props: ['composition'],
  data () {
      return {
          currentUsers: [ ],
          compositionName: 'Untitled',
          isSaved: false,
          username: ''
      }
  },
  sockets: {
      connect() {
          console.log("yay is connected")
      }
  },
  feathers: {
    compositions: {
        created(data) {
            //Called when ever a new composition is created
            console.log('new composition created!!!')
            if(data.ownerId === this.username) {
              this.updateCurrentUsers(data.active)
            }
        },
        patched(data) {
            //Called whenever a composition is updated

            //update composition information if the current user is in the list of activeUsers
            //for the updated entry
            if (data.active.includes(this.username)) {
                //update the name of current composition
                //this is used when the user switches between compositions
                this.compositionName = data.nameOfComposition
                this.$root.$emit('compUpdate', this.compositionName)
                //Update the list of active users on that composition
                this.updateCurrentUsers(data.active)
                //set isSaved to true
                this.isSaved = true;
                console.log(musicSheet);
                //TODO: fix the update composition functionality, currently broken
                musicSheet.methods.setComposition(data.composition)
                //musicSheet.data().composition = JSON.parse(data.composition)
            }
        }
    }
  },
  created() {
      //This is used to get the username of the person that has just logged in
      this.$root.$on('msg', (text) => {
          this.username = text
    })
  },
  methods: {
      //This function is used to properly display the list of active users
      updateCurrentUsers(activeUsers) {
          let users = activeUsers.split(',');
          this.currentUsers = []
          for (let i = 0; i < users.length ; i++){
              if(users[i] !== ""){
                  this.currentUsers.push(users[i]);
              }
          }
      },
      //This function is called whenever a user chooses to share their composition with others
      addCollaborator() {
          //check to see if composition has been saved
          if (this.compositionName === 'Untitled' || this.isSaved === false){
              // Point it out to the user that they must save the composition first
              $(".composition").addClass('error')
          } else {
              //get the name of the user to add
              let addUser  = $('#emaiToShareWith').val()

              const composition = {
                  collaborators: addUser,
                  nameOfComposition: this.compositionName
              }

              //update the compositions entry to include the entered user as a collaborator
              let temp = this.$feathers.service('compositions').patch('', composition)

              //Erase the entry from the input box
              $('input[type=email]').val('')
              //Make sure the error is cleared
              $('.errorLog').html('')

              temp.catch(function(error) {
                  //If something failed, display the error
                  $('.errorLog').html(error);
                  $('.errorLog').addClass('activeUsers')
              })
          }
      },
      updateUserList: function(newUserList) {
          this.currentUsers = newUserList
      },
      //This function is called whenever a user clicks saved
      saveComposition: function() {
          //check that the name of the composition is not Untitled
          if (this.compositionName === 'Untitled'){
              // Point it out
              $(".composition").addClass('error')
          } else {
              //This condition checks to see if the composition has ever been saved, i.e an entry
              //exists in the table

              //If there was an error when saving, remove it
              $(".composition").removeClass('error')

              //TODO check why this is not getting the latest music sheet data
              let retrievedComposition = JSON.stringify(musicSheet.data().composition);
              let compositionRecord = {
                  nameOfComposition: this.compositionName,
                  text: retrievedComposition
              }

              //call the create service
              let temp = this.$feathers.service('compositions').create(compositionRecord)
              //Disable the ability to change composition name
              $(".composition").prop('disabled', true)
              $('.errorLog').html('')
              this.isSaved = true
              this.$root.$emit('compUpdate', this.compositionName)

              temp.catch(function(error) {
                  //If it failed to save the composition, display the error
                  $(".composition").prop('disabled', false);
                  $('.errorLog').html(error);
                  $('.errorLog').addClass('activeUsers')
                  this.isSaved = false
              })
          }
      },
      exportComposition: function() {
          //TODO SOMEONE FINSIH ME PLEASE
          //check that the name of the composition is not Untitled
          console.log('compositions', this.composition)
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
