<template>
  <div class="home">
    <Header/>
    <router-view/>
  </div>

</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'homepage',
  components: {
    Header
  }
}
</script>
<style>
</style>
