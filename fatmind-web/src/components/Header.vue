<template>
  <div id="header">
    <div id="header-left" >
        <a href="/#">fatmind</a>       
    </div>
    <div id="header-right">
        <a
          href="#"
          @click.prevent="logout">logout</a>
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
#header {
  width: 100%;    
  padding-top: 5px;
}
#header-left {
  width: 48%;
  text-align: left;
  float: left;
  padding-left: 5px
}
#header-right {
  width: 48%;
  text-align: right;
  float: right;
  padding-right: 10px;
}
</style>
