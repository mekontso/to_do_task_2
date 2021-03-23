import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import vueMeta from 'vue-meta'

Vue.use(vueMeta)

Vue.config.productionTip = false

new Vue({

  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
