<template>
  <!-- Save Modal -->
  <div class="modal" id="saveModal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col-11">
            <h5 class="modal-title">Save</h5>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="saveName" class="col-form-label">Name your composition:</label>
            <input type="text" class="form-control" id="saveName">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Save</button>
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'save-modal'
}
</script>

<style scoped>

</style>
