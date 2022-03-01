import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import routes from "./routes";

Vue.use(VueRouter);

Vue.config.productionTip = false;
const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
