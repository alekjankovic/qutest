<template>
  <div class="">
    <h2 class="main-header">CryptoCurrencies Detail for {{ currency.name }}</h2>

    <ul class="currency-info">
      <li><strong> Category: </strong> {{ currency.category }} </li>
      <li><strong> Name: </strong> {{ currency.name }} </li>
      <li><strong> Symbol: </strong> {{ currency.symbol}} </li>
      <li><strong> Description: </strong> {{ currency.description}} </li>
    </ul>

    <a class="detail-back-btn" v-on:click="$router.go(-1)"> Back </a>

  </div>
</template>

<script>
export default {
  name: 'Details',
  props: {

  },
  data(){
    return {
      id: this.$route.params.id,
      currency : {}
    }
  },
  mounted(){
    this.getCurrentCurrency();
  },
  methods: {
    getCurrentCurrency(){
      this.axios({
        method: 'get',
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=' + this.id,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-CMC_PRO_API_KEY': '4feea64f-66ab-4146-8f72-02c668ed1884'
        }
      })
      .then(response => {
        this.currency = response.data.data[this.id];
      })
      .catch(error => {
        console.log(error);
      });

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only


 -->
<style scoped>
</style>
