<template>
  <div class="loader-container" v-bind:class="{'loader-show': loaderState > 0}">
    <i class="fa fa-cog fa-spin" ></i>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    showLoader: Boolean
  },
  data(){
    return{
      loaderState:0
    }
  },
  watch: {
    showLoader: function(newVal, oldVal){
      if(newVal == true){
        this.loaderState++;
      } else{
        this.loaderState--;
      }
    }
  }
}

</script>

<style scoped>
.loader-container {
  position:absolute;
  width:68px;
  height: 68px;
  padding:10px;
  right:-80px;
  top:50px;
  z-index:8000;
  background-color: #efefef;
  box-shadow: -1px 4px 4px #aaa;
  border-radius: 10px 0 0 10px;
}

.loader-container.loader-show {
  right:0px;
}

.loader-container i {
  font-size:48px;
  color:#aaa;
}



</style>
