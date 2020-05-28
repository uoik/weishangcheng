import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import * as Json from './json.js'

Vue.config.productionTip = false

App.mpType = 'app'

// 模拟数据
Vue.prototype.$api = type => {
	return new Promise((resolve, reject) => {
		resolve(Json[type]);
	})
}
// 随机产生一个ID
Vue.prototype.$random = () => {
	return Math.floor(Math.random() * 1000000);
}

const app = new Vue({
	...App,
	store
})
app.$mount()

export default Vue
