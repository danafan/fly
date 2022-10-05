import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './plugin.js'

Vue.prototype.isPrice = /^(([0-9]+)|([0-9]+\.[0-9]{0,2}))$/;	//正数且最多两位小数

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
