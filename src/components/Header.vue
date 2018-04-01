<template>
<div class="header">
  <div class="container">
    <div class="row menu">
      <button id="profile" class="btn btn-outline-light" data-toggle="modal" data-target="#accountModal">
        <img class="logo" src="http://santetotal.com/wp-content/uploads/2014/05/default-user.png" width="50" height="50">
      </button>
      <h1>Pian.IO</h1>
      <div class="header-buttons">
        <button type="button" class="btn btn-link" data-toggle="modal" data-target="#settingsModal">Settings</button>
        <button type="button" id="signOut" class="btn btn-link">Sign Out</button>
      </div>
    </div>
  </div>
      <span>Number: {{ buttonCounter }}</span>
      <button v-on:click="incrementCounter()">Click Me</button>
</div>
</template>

<style>
.menu {
  border-bottom-style: solid;
  border-bottom-color: black;
}
#profile {
  width:10%;
  margin-right: 10%;
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

<script>
export default {
  name: 'app-header',
  data() {
      buttonCounter: 0
  },
  methods: {
      incrementCounter: function() {
          this.buttonCounter += 1;
          console.log(this.buttonCounter);
      }
  }
}
</script>
