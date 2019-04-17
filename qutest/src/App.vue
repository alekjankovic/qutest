<template>
  <div id="app">
    <div class="main-container">
      <header class="main-header">
        <h1>Crypto Currencies best website</h1>
      </header>
      {{ showLoader}}
      <router-view :key="$route.fullPath" v-on:show-loader="showLoader = true" v-on:hide-loader="showLoader = false" ></router-view>
      <Loader v-bind:showLoader="showLoader"></Loader>
    </div>
  </div>
</template>

<script>

import Loader from './components/Loader.vue'


export default {
  name: 'app',
  data(){
    return {
      showLoader: false,
    }
  },
  components: {
    Loader
  }
}
</script>

<style lang="scss">
@import 'src/assets/sass/default.scss';
</style>
