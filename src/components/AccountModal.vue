<template>
  <!-- Account Modal -->
  <div class="modal" id="accountModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">My Account</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                    <td class="col-1"><button type="button" class="btn btn-outline-secondary">&#9851;</button></td>
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
      username: '',
      compositions: [
        {name: 'composition 1'},
        {name: 'composition 2'},
        {name: 'composition 3'},
        {name: 'composition 4'}
      ]
    }
  },
  // declare all methods here
  methods: {
    logMe () {
      console.log('Test Log from the methods declaration')
    }
  },
  // this runs once per construction of this modal
  created () {
    // TODO Create composition with text field like below.
    /* this.$services.compositions.create({
       text: 'composition 1'
       }) */
  },

  change_username () {

  },

  change_password () {

  },

  feathers: {
    compositions: {
      created (data) {
        // this gets called every time a composition event is created by anyone
        // (or whatever the server sends to this client (like socket.emit()))
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
