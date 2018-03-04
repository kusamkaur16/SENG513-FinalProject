<template>
  <div>
    <!-- Main music sheet page -->
    <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#saveModal" >Save</button>
    <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exportModal" >Export</button>
    <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#accountModal" >My Account</button>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  mounted: () => { $('#loginModal').modal('show') }
}
</script>

<style scoped>

</style>
