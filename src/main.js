import Vue from 'vue'
import App from './App.vue'
import moment from 'moment';

Vue.config.productionTip = false

Vue.filter('uppercase', function(value) {
  if (!value) {
    return ''
  } else {
    return value.toUpperCase();
  }
})

Vue.filter('prettyTime', function(timeStamp) {
  if (!timeStamp) {
    return ''
  } else {
    return moment(timeStamp).format('LLL');
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
