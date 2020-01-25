<template>
  <div class="login">
    <h1>Login to Your Account</h1>
    <div class="">
      <form>
        <div
          v-if="loginError"
          class="error center-form">Error: {{ apiErrorMessage }}<br></div>
        <input
          ref="emailField"
          v-model="user.email"
          type="text"
          placeholder="Email"
          required><br>
        <input
          ref="passwordField"
          v-model="user.password"
          type="password"
          placeholder="Password"
          required><br>
        <button
          type="button"
          class="button button-300"
          @click="login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    loginError () {
      return this.$store.state.loginAPIError
    },
    apiErrorMessage () {
      return this.$store.state.apiErrorMessage
    }
  },
  created () {
    this.$store.commit('setLoginAPIError', false)
  },
  methods: {
    login: function () {
      this.$store.commit('setLoginAPIError', false)
      if (this.user.email && this.user.password) {
        this.$store.dispatch('login', this.user)
      }
    }
  }
}
</script>
<style>

</style>
