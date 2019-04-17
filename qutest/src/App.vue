<template>
  <div id="app">
    <div class="main-container">
      <header class="main-header">
        <h1>Crypto Currencies best website</h1>
      </header>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      loaderState: 0

    }
  },
  components: {
  },
  methods: {
    showLoader(){
      this.loaderState++;
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/sass/default.scss';
</style>
