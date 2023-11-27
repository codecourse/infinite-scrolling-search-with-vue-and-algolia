import Vue from 'vue'
import App from './App.vue'
import router from './router'
import InstantSearch from 'vue-instantsearch'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(InstantSearch)
Vue.use(VueObserveVisibility)

Vue.config.productionTip = false

require('./assets/scss/app.scss')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
