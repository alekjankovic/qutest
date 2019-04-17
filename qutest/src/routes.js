module.exports = [
    {
        path: '/',
        component: require('./components/CurrenciesGrid.vue').default //this default need to be added in newer verions
    },
    {
        path: '/1',
        redirect: '/'
    },
    {
         path: '/:page',
         component: require('./components/CurrenciesGrid.vue').default
    },
    {
        path: '/Details/:id',
        component: require('./components/Details.vue').default
    }

];
