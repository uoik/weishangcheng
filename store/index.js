import Vue from 'vue'
import Vuex from 'vuex'
import users from './users.js'
import shopping from './shopping.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		users,
		shopping
	}
})