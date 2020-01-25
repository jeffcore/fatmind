<template>
  <div id="header">
    <div id="header" style="width:100%; text-align:right;">
        <a href="/#">Quantum Brain </a>
        <a
          href="#"
          @click.prevent="logout">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
