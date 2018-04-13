<template>
<div class="header">
  <div class="container-fluid">
    <div class="row menu">
      <button id="profile" class="btn btn-outline-light" data-toggle="modal" data-target="#accountModal">
        <img class="logo" src="http://santetotal.com/wp-content/uploads/2014/05/default-user.png" width="50" height="50">
      </button>
      <h1 id="pageTitle">Pian.io</h1>
      <div class="header-buttons">
        <!-- <button type="button" class="btn btn-link" data-toggle="modal" data-target="#settingsModal">Settings</button> -->
        <button type="button" id="signOut" class="btn btn-outline-light">Sign Out</button>
      </div>
    </div>
  </div>
</div>
</template>

<style>
.menu {
  top: -1em;
  position: relative;
  /* border-bottom-style: solid;
  border-bottom-color: black; */
  background: url("https://www.hdwallback.net/wp-content/uploads/2017/12/Abstract-blue-blocks-background.jpg");
}

.row {
  margin-right: -4;
  margin-left: -4;
}

#pageTitle {
  color: white;
  padding: 14;
}

#profile {
  width: 10%;
  margin-right: 10%;
  border-color: none !important;
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
