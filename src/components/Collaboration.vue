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
          currentUsers: [ ],
          compositionName: 'Untitled',
          isSaved: false
      }
  },
  sockets: {
      connect() {
          console.log("yay is connected")
      }
  },
  feathers: {
    active: {
        created(data) {
            const value = this.$feathers.service('compositions').find({
              query: {
                  nameOfComposition : this.compositionName
              }
          });
            console.log('returned value', value)
            let listOfCollabs = value.collaborators
            if(this.isSaved === true && listOfCollabs.includes(data.user)){
                //Check to see if the user shares the same
                this.currentUsers.push(data.user)

            }
        }
    }
  },
  methods: {
      addCollaborator() {
          //check to see if composition has been saved
          if (this.compositionName === 'Untitled'){
              // Point it out
              $(".composition").addClass('error')
          } else {
              let addUser  = $('#emaiToShareWith').val()

              const composition = {
                  collaborators: addUser,
                  compositionName: this.compositionName
              }

              let temp = this.$feathers.service('compositions').patch('', composition)
              $('input[type=email]').val('')
              $('.errorLog').html('')
              temp.catch(function(error) {
                  $('.errorLog').html(error);
                  $('.errorLog').addClass('activeUsers')
              })
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

              let temp = this.$feathers.service('compositions').create(compositionRecord)
              //Disable the ability to change composition name
              $(".composition").prop('disabled', true)
              $('.errorLog').html('')
              this.isSaved = true
              temp.catch(function(error) {
                  $(".composition").prop('disabled', false);
                  $('.errorLog').html(error);
                  $('.errorLog').addClass('activeUsers')
                  this.isSaved = false
              })
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
