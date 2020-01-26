<template>
  <div class="search">

    <div class="note-form">
        <textarea
          ref="quantumField"
          v-model="quantum.note"
          type="text"
          id="brainText" rows="8" cols="40"></textarea>
        <br/>
        <button
          class="acceptButton"
          name="button"
          @click="searchQuantum">Search</button>
        <button
          type="button"
          class="acceptButton"
          name="button"
          @click="addQuantum">Add</button>
    </div>
    <div class="note-list">
        <span v-if="!quantumList.length">No results.</span>
        <ul >
          <li v-for="(q, index) in quantumList" :key="q._id" class="noteStyle">
              <span><pre>{{ q.note }}</pre></span>
              <br/>
              <div class="noteDetails">
                <button @click="deleteQuantum(q._id, index)">Delete</button>
                <button @click="showEditModal(q._id, index, q.note)">Edit</button>
              </div>
          </li>
        </ul>
    </div>
    <modal
      v-if="showModal"
      :note="editNote"
      :qID="editID"
      @close="showModal = false"></modal>
  </div>
</template>

<script>
// @ is an alias to /src
import modal from '@/components/EditModal.vue'
import { mapState } from 'vuex'
export default {
  components: {
    modal
  },
  data () {
    return {
      quantum: {
        note: ''
      },
      editNote: '',
      editID: 0,
      showModal: false
    }
  },
  computed: mapState([
    'quantumList'
  ]),
  created () {
    this.$store.dispatch('getQuantums', this.$route.params.id)
  },
  methods: {
    addQuantum: function () {      
      if (this.quantum) {
        this.$store.dispatch('createQuantum', this.quantum)
      }
    },
    searchQuantum: function () {      
      if (this.quantum) {
        this.$store.dispatch('searchQuantum', this.quantum)
      }
    },
    deleteQuantum: function (quantumid, index) {      
      this.$delete(this.quantums, index)
      this.$store.dispatch('deleteQuantum', {id: quantumid})
    },
    showEditModal: function (quantumid, index, note) {
      this.editNote = note
      this.editID = quantumid
      this.showModal = true
    }
  }
}
</script>
<style>
.buttons div {
    lost-column: 1/1;
}
@media (min-width: 480px) {
  .buttons {
    lost-center: 480px;
  }
  .buttons div {
    lost-column: 1/2;
  }
}
.note-list pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
</style>
