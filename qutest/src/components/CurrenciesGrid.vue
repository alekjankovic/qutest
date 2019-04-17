<template>
  <main class="main-container">
    <h2 class="main-header">Crypto Grid</h2>

    <div class="data-grid">
      <div>
        Current Page - {{page}}
      </div>
      <div class="grid-container">
        <table class="crypto-grid">
        <thead>
          <tr>
            <th> Name </th>
            <th> Short Name </th>
            <th> $ Value </th>
            <th> last 24h </th>
            <th> Amount you own </th>
            <th> $ value of your coin </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in currencies"  >
            <tr v-bind:key="item.id">
              <td>
                <router-link v-bind:to="'/Details/' + item.id" v-bind:title="'Go to ' + item.name + ' details page'" exact>
                  {{ item.name }}
                </router-link>
              </td>
              <td>
                {{ item.symbol }}
              </td>
              <td>
                $ {{ item.quote.USD.price }}
              </td>
              <td v-bind:class="{ 'txt-red' : item.quote.USD.percent_change_24h < 0 , 'txt-green' : item.quote.USD.percent_change_24h > 0}">
                {{ item.quote.USD.percent_change_24h}} %
              </td>
              <td class="crypto-grid-action">
                <input type="text" v-model="item.own" v-on:keyup="item.btndis = false" v-on:keyup.enter="submitCurrency(item )">
                <button type="button" v-bind:disabled="item.btndis" v-on:click="submitCurrency(item)"  > Submit </button>
              </td>
              <td>
                <span v-if="item.total"> $ </span>
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      </div>

      <div class="grid-pagination">
        <router-link v-bind:to="'/'" v-bind:key="1" exact> 1 </router-link>
        <router-link v-for="item in 4" v-bind:to="'' + ( item + 1)" v-bind:key="item + 1" exact>{{ item + 1 }}</router-link>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: 'CurrenciesGrid',
  mounted(){
    this.getGridData();
    //this.setAutoRefresh(60000);
  },
  data(){
    return {
      currencies : [],
      page: this.$route.params.page != undefined ? this.$route.params.page : 1 ,
      resultPerPage: 2,
      autoRefreshIntervalSet : null
    }
  },
  methods: {
    getGridData: function() {
      this.$emit('show-loader');

      let limit = this.resultPerPage;
      let start = (this.page  * limit) - 1 ;
      let apiurl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=' + start + '&limit=' + limit;

      this.axios({
        method: 'get',
        url: apiurl,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-CMC_PRO_API_KEY': '4feea64f-66ab-4146-8f72-02c668ed1884'
        }
      })
      .then(response => {
        this.$emit('hide-loader');
        let wallet;

        try{
          wallet = JSON.parse(localStorage.getItem('wallet'));
        } catch(ex){
          console.error(ex);
        }

        this.currencies = response.data.data.map(function(item){
          if(wallet && wallet[item.symbol]){
            item.own = wallet[item.symbol].own;
            item.total = item.own * item.quote.USD.price;
          } else {
            item.own = null;
            item.total = null;
          }

          item.btndis = true;
          return item;
        });
      })
      .catch(error => {
        this.$emit('hide-loader');
        console.log(error);
      });
    },
    setAutoRefresh: function(timeInterval){
        this.autoRefreshIntervalSet = setInterval(() => {
          this.getGridData();
        }, timeInterval);
    },
    submitCurrency: function(item){
      item.total = item.own * item.quote.USD.price;
      let wallet;

      try{
        wallet = JSON.parse(localStorage.getItem('wallet'));
      } catch(ex){
        console.error(ex);
      }

      if(!wallet || typeof wallet !== 'object' ){
        wallet = {};
      }

      if(!wallet[item.symbol]){
        wallet[item.symbol] = {};
      }

      wallet[item.symbol].own = item.own;
      wallet[item.symbol].total = item.total;

      localStorage.setItem('wallet', JSON.stringify(wallet));
    }

  },
  beforeDestroy(){
    //in order to stop fetching data when you go to another page
    clearInterval(this.autoRefreshIntervalSet);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
