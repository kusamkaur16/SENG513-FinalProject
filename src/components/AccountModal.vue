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
            <img id ="image" :src="defaultImage" alt="User Picture" width="150" height="150">
            <input id="uploadPicture" accept="image/x-png,image/gif,image/jpeg" type="file">
            <label for="uploadPicture" class="btn btn-outline-primary" v-on:click="changeImage">Change Picture</label>
            <!-- <button type="file" class="btn btn-outline-primary" v-on:click="changeImage">Change Picture</button> -->
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
import picture from '../assets/tmp.png'
export default {
  name: 'account-modal',
  data () {
    return {
      compositions: [
        {name: 'composition 1'},
        {name: 'composition 2'},
        {name: 'composition 3'},
        {name: 'composition 4'}
      ],
      defaultImage: require('../assets/logo.png')
    }
  },
  methods: {
    changeImage: function () {
      var img = document.getElementById('image')
      var input = document.getElementById('uploadPicture').value
      console.log(input)
      img.src = require('../assets/tmp.png')
      this.defaultImage = picture
      // console.log(img.src)
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
  #uploadPicture {
    display: none;
  }
</style>
