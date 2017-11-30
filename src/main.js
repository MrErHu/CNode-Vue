import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueIconFont from 'vue-icon-font'

import 'mint-ui/lib/style.css'

Vue.use(VueIconFont);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
