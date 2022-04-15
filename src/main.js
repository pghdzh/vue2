import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import carousel from '@/components/Carousel'
import pagination from '@/components/Pagination'
import "@/mock/serve";
import "swiper/css/swiper.css";
Vue.component(TypeNav.name, TypeNav)
Vue.component(carousel.name, carousel)
Vue.component(pagination.name, pagination)

import * as API from '@/api';


import { Button, Notification, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)

Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import '@/plugins/valadiate'

import VueLazyload from 'vue-lazyload'
import erha from '@/assets/images/1.gif'
Vue.use(VueLazyload, {
  loading: erha,
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
