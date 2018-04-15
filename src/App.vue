<template>
  <div id="app">
    <app-header></app-header>
    <login-modal></login-modal>
    <register-modal></register-modal>
    <save-modal></save-modal>
    <export-modal></export-modal>
    <account-modal></account-modal>
    <change-username-modal></change-username-modal>
    <change-email-modal></change-email-modal>
    <change-password-modal></change-password-modal>
    <settings-modal></settings-modal>
    <router-view/>
    <piano-keys></piano-keys>
  </div>
</template>

<script>
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import SaveModal from './components/SaveModal'
import ExportModal from './components/ExportModal'
import AccountModal from './components/AccountModal'
import ChangeUsernameModal from './components/ChangeUsernameModal'
import ChangeEmailModal from './components/ChangeEmailModal'
import ChangePasswordModal from './components/ChangePasswordModal'
import SettingsModal from './components/SettingsModal'
import PianoKeys from './components/PianoKeys'

export default {
  name: 'App',
  components: {
    'settings-modal': SettingsModal,
    'account-modal': AccountModal,
    'change-username-modal': ChangeUsernameModal,
    'change-email-modal': ChangeEmailModal,
    'change-password-modal': ChangePasswordModal,
    'export-modal': ExportModal,
    'save-modal': SaveModal,
    'app-header': Header,
    'login-modal': LoginModal,
    'register-modal': RegisterModal,
    'piano-keys': PianoKeys
  },

  feathers: {
    users: {
      // created (user) {
      //   console.log('Created user')
      //   document.body.style.overflow = 'initial'
      //   // this gets called every time a user is created by anyone
      //   // (or whatever the server sends to this client (like socket.emit()))
      // }
    }
  }
}
</script>

<style>
body {
  /* Disables scroll bar */
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e5a;
  margin-top: 30px;
}
</style>
