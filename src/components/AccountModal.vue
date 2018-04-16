<template>
  <!-- Account Modal -->
  <div class="modal fade" id="accountModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
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
            <img :src="load_avatar()" alt="User Picture" width="150" height="150">
            <button type="button" class="btn btn-primary" id="newComp" @click="createNewComposition">Create a new composition</button>
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
        <div class="modal-footer" id="update-footer">
          <div class="container">
            <button type="button" class="btn btn-secondary" id="change" data-toggle="modal" data-target="#changeEmailModal">Change Email</button>
            <button type="button" class="btn btn-secondary" id="change" data-toggle="modal" data-target="#changeUsernameModal">Change Username</button>
            <button type="button" class="btn btn-secondary" id="change" data-toggle="modal" data-target="#changePasswordModal">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable semi */
/* eslint-disable no-undef */
export default {
  name: 'account-modal',
  data () {
    return {
      username: '',
      compositions: [],
      avatarLink: ''
    }
  },
  // declare all methods here
  methods: {
    createNewComposition (event) {
      // reset composition name and list of active users
      this.$root.$emit('resetSheet', this.username)
      let oldComp = $('#compName').val()
      // remove as active user from previous composition
      if (oldComp !== 'Untitled') {
        this.$feathers.service('compositions').patch('', {
          removeName: oldComp
        })
      }
      document.getElementById('close').click()
    },
    load_avatar () {
      if (this.avatarLink) {
        return this.avatarLink
      } else {
        return 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png'
      }
    },
    loadNewCompostion (event) {
      // close current window
      // change current composition

      // update title of composition
      // udpate the list of active users
      let newComp = event.target.id
      let oldComp = $('#compName').val()

      // add as active user
      this.$feathers.service('compositions').patch('', {
        newName: newComp
      })
      // remove as active user from previous composition
      if (oldComp !== 'Untitled') {
        this.$feathers.service('compositions').patch('', {
          removeName: oldComp
        })
      }
      document.getElementById('close').click()
    },
    getComposition () {
      const val = this.$feathers.service('compositions').find({
        query: {
          $or: [
            {collaborators: {$in: [this.username]}},
            {ownerId: this.username}
          ]
        }
      })
      let that = this

      val.then(function (result) {
        that.compositions = []
        for (let i = 0; i < result.data.length; i++) {
          that.compositions.push({name: result.data[i].nameOfComposition})
        }
      })
    },
    updateList (data) {
      this.compositions.push(data.nameOfComposition)
    },
    logMe () {
      console.log('Test Log from the methods declaration')
    },
    setUsername (text) {
      this.username = text
      this.getComposition()
    },
    // function that changes the username of the user + updates backend
    async change_username (username) {
      try {
        await this.$feathers.service('users').patch(null, {
          username: username
        })
      } catch (error) {
        console.log(error)
      }
    },

    // function that changes the email of the user + updates backend
    async change_email (email) {
      try {
        await this.$feathers.service('users').patch(null, {
          email: email
        })
      } catch (error) {
        console.log(error)
      }
    },

    // function that changes the password of the user + updates backend
    async change_password (password) {
      try {
        await this.$feathers.service('users').patch(null, {
          password: password
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  // this runs once per construction of this modal
  created () {
    let that = this

    this.$root.$on('curr_username', (text) => {
      console.log('got username', text)
      that.setUsername(text)
    })
    this.$root.$on('curr_avatar', (text) => {
      this.avatarLink = text
      this.load_avatar()
      // document.getElementById('avatar_img').src = '' + this.avatarLink
    })
  },

  feathers: {
    compositions: {
      created (data) {
        // this gets called every time a composition event is created by anyone
        // (or whatever the server sends to this client (like socket.emit()))
        // Display the newly added composition if the current user is the owner

        // check to see if the user is the owner
        if (this.username === data.ownerId || data.collaborators.indexOf(this.username) !== -1) {
          this.compositions.push({name: data.nameOfComposition})
        }
      },
      patched (data) {
        // called whenever a composition has been updated, it is used to update the list of
        // compositions that the user is the owner of or a collaborator of

        // check to see if the current user is a collaborator or owner
        // check that name is not already in list of compositions
        let temp = this.compositions.some(function (item) {
          return item.name === data.nameOfComposition
        })
        if (data.ownerId === this.username) {
          if (!temp) {
            this.compositions.push({name: data.nameOfComposition})
          }
        }
        if (data.collaborators.indexOf(this.username) !== -1) {
          // check that name is not already in list
          if (!temp) {
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
  #change{
    width: 32.9%;
    height: 3em;
    white-space: normal;
  }

  #newComp{
    margin-top: 1em;
    padding: 0.5em;
    height: 3em;
  }

</style>
