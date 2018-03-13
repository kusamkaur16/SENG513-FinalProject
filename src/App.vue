<template>
  <div id="app">
    <app-header></app-header>
    <login-modal></login-modal>
    <register-modal></register-modal>
    <save-modal></save-modal>
    <export-modal></export-modal>
    <account-modal></account-modal>
    <settings-modal></settings-modal>
    <router-view/>
    <pianokeys-modal></pianokeys-modal>
  </div>
</template>

<script>
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import SaveModal from './components/SaveModal'
import ExportModal from './components/ExportModal'
import AccountModal from './components/AccountModal'
import SettingsModal from './components/SettingsModal'
import PianokeysModal from './components/PianokeysModal'

export default {
  name: 'App',
  components: {
    'settings-modal': SettingsModal,
    'account-modal': AccountModal,
    'export-modal': ExportModal,
    'save-modal': SaveModal,
    'app-header': Header,
    'login-modal': LoginModal,
    'register-modal': RegisterModal,
    'pianokeys-modal': PianokeysModal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
