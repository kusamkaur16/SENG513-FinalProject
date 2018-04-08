<template>
  <!-- Account Modal -->
  <div class="modal" id="accountModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">My Account</h5>
          <button type="button" id="close" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body row">
          <div class="col-4">
            <img src="../assets/logo.png" alt="User Picture" width="150" height="150">
            <button type="button" class="btn btn-outline-primary" @click="logMe">Change Picture</button>
          </div>
          <div class="col-8">
            <h5>My Compositions</h5>
            <div class="table">
              <div id="scrollComps">
                <tbody>
                  <tr v-for="comp in compositions" :key="comp.name">
                    <td class="col"><span>{{ comp.name }}</span></td>
                    <td class="col-1"><button type="button" v-bind:id="comp.name" class="btn btn-outline-secondary" @click="loadNewCompostion">&#9851;</button></td>
                  </tr>
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account-modal',
  data () {
    return {
      compositions: [
          {name: "test"}
      ],
      username: ''
    }
  },
  // declare all methods here
  methods: {
    loadNewCompostion (event) {
        //close current window
        //change current composition

        //update title of composition
        //udpate the list of active users
        let newComp = event.target.id
        let oldComp = $('#compName').val()
        console.log('clicked', newComp, oldComp)
        //add as active user
        this.$feathers.service('compositions').patch('',{
            newName: newComp
        })
        //remove as active user from previous composition
        if(oldComp !== 'Untitled'){
            this.$feathers.service('compositions').patch('',{
                removeName: oldComp
            })
        }
        document.getElementById('close').click()
    },
    getComposition () {
         console.log('Display selected composition', this.username)
         const val = this.$feathers.service('compositions').find({
             query: {
                 $or: [
                     {collaborators: {$in: [this.username]}},
                     {ownerId: this.username}
                 ]
             }
         })
         let that = this;

         val.then(function(result) {
             that.compositions = []
             for (let i = 0 ; i < result.data.length ; i++){
                 that.compositions.push({name: result.data[i].nameOfComposition})
             }
         })
         console.log('getting list of compositions')
    },
    updateList(data) {
        console.log('in data.list', data)
        this.compositions.push(data.nameOfComposition)
    },
    logMe () {
      console.log('Test Log from the methods declaration')
    },
    setUsername(text) {
      this.username = text
      this.getComposition();
    },
  },
  // this runs once per construction of this modal
  created () {
    // TODO Create composition with text field like below.
    /* this.$services.compositions.create({
       text: 'composition 1'
       }) */
       let that = this;
       this.$root.$on('msg', (text) => {
           that.setUsername(text)
       })
  },

  feathers: {
    compositions: {
      created (data) {
        // this gets called every time a composition event is created by anyone
        // (or whatever the server sends to this client (like socket.emit()))
        // Display the newly added composition if the current user is the owner
        this.compositions.push({name: data.nameOfComposition});
      },
      patched (data) {
            //check to see if the current user is a collaborator or owner
            console.log('in updated')
            //check that name is not already in list
            let temp = this.compositions.some(function(item){
                return item.name === data.nameOfComposition
            })
            if(data.ownerId === this.username){
                if(!temp) {
                    this.compositions.push({name: data.nameOfComposition})
                }
            }
            if (data.collaborators.indexOf(this.username)!== -1) {
                //check that name is not already in list
                if(!temp) {
                    this.compositions.push({name: data.nameOfComposition})
                }
            }
      }
    }
  }
}
</script>

<style scoped>
  td span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    left: 0;
    right: 0;
  }
  #scrollComps {
    height: 200px;
    overflow-y: scroll;
  }
</style>
