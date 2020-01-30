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
      <span v-if="!quantumList">No results.</span>
      <ul >
        <li v-for="(q, index) in quantumList" :key="q._id" class="note-style">
          <span><pre>{{ q.note }}</pre></span>
          <br/>
          <div class="note-details">
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
      this.$delete(this.quantumList, index)
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

/* note page */
.note-form{
  padding-bottom: 20px;
}
.note-list{
  text-align: left;
}
textarea {
  margin: 3px 0 8px 0;
  font-size: 1.3em;
  width: 70%;
  height: 85px;
  border: solid 1px #959595;
  border-radius: 4px;
}
.note-style {
  width:90%;
  padding:5px 7px;
  margin-bottom: 12px;
  border:solid 1px #d5d5d5;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
}
.note-details {
  width: 99%;
  background-color: #eeeeee;
  margin-top: 6px;
  padding: 4px;
  border-radius: 2px;
  text-align: right;
  vertical-align: bottom;
}
.note-edit-form textarea{
  width: 95%;
  height: 500px;
  font-size: 1.0em;
}
.note-details button {
  background-color :#ffffff;
  height: 22px;
  vertical-align: middle;
  border-radius: 3px;
  border: 1px solid #124d77;
  margin: 1px;
}
/* form page */

#form-container {
  width: 280px;
  margin: 175px auto;
  padding: 60px;
  background-color:#eeeeee;
  border-radius: 4px;
  box-shadow: .5px .5px 2px;
}

.form-style {
  padding: 3px;
  border: solid 1px #d5d5d5;
  border-radius: 3px;
}
.form-input {
  padding: 5px
}
.form-error {
  color: red;
  font-size: 20px;
  margin-bottom: 20px
}
.text-basic {
  height: 35px;
  font-size: 20px;
  padding: 0 10px;
}

/* Buttons */
.acceptButton {
  background-color: #007dc1;
  border-radius: 3px;
  border: 1px solid #124d77;
  display: inline-block;
  color: #ffffff;
  font-family: arial;
  font-size: 1.3em;
  height: 35px;
  padding: 2px 24px;
  text-decoration: none;
}
.acceptButton:hover {
  background-color: #0061a7;
}
.acceptButton:active {
  position: relative;
  top: 1px;
}
.button {
  background-color: #5584c0; /* blue */
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
.button-200 {
  width: 200px;
}
.button-300 {
  width: 300px;
}
input[type=text], input[type=password], select {
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 20px;
}
::placeholder {
  color: #9e9e9e;
  font-size: 16px;
}
.error {
  color: red;
  border: 1px solid red;
  border-radius: 3px;
  width: 300px;
}
.center-form {
  lost-center: 300px;
}

.note-form button {
  margin: 2px;
}
.note-list pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
</style>
