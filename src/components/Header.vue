<template>
<div class="header">
  <div class="container-fluid">
    <div class="row menu">
      <button id="profile" class="btn btn-outline-light" data-toggle="modal" data-target="#accountModal">
        <img class="logo" id= "avatar_img" :src="load_avatar()" width="50" height="50">
        <h5 id="welcomeMessage">Welcome {{ username }}!</h5>
      </button>
      <h1 id="pageTitle">Pian.io</h1>
      <div class="header-buttons">
        <!-- <button type="button" class="btn btn-link" data-toggle="modal" data-target="#settingsModal">Settings</button> -->
        <!-- <button type="button" id="signOut" class="btn btn-outline-light">Sign Out</button> -->
        <button type="button" id="signOut" class="btn btn-outline-light" @click="logout_user()">Sign Out</button>

      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  /* eslint-disable no-undef */
  name: 'header-modal',

  data () {
    return {
      username: this.$parent._data.username,
      avatarLink: ''
    }
  },

  created () {
    this.$root.$on('curr_avatar', (text) => {
      this.avatarLink = text
      document.getElementById('avatar_img').src = '' + this.avatarLink
    })

    this.$root.$on('curr_username', (text) => {
      this.username = text
    })
  },

  computed: {
    completed_form: function () {
      return !this.validation.hasError() && this.username && this.confirm
    }
  },

  methods: {
    async logout_user () {
      // log the user out and reopen the login modal
      await this.$feathers.logout()
      this.$curr_username = this.username = '' // reset the username property to empty
      $('#loginModal').modal('show')
    },

    load_avatar () {
      if (this.avatarLink) {
        return this.avatarLink
      } else {
        return 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png'
      }
    }
  }
}

</script>

<style>
.welcomeMessage {

}
.menu {
  top: -1em;
  position: relative;
  /* border-bottom-style: solid;
  border-bottom-color: black; */
  background-image: url("../assets/blueheaderbg.png");
}

.row {
  margin-right: -4;
  margin-left: -4;
}

#pageTitle {
  color: white;
  padding: 20;
}

#profile {
  width: 10%;
  margin-right: 10%;
  border-color: transparent !important;
}

#welcomeMessage {
    color:white;
    position:relative;
}

#signOut {
  left: 31%;
  top: 20%;
  position: relative;
}

.header-buttons {
  float: right;
  width: 20%;
  padding: 10px;
}

h1 {
  width: 60%;
}

</style>
