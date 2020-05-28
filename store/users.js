// 模拟请求数据
import * as Json from '../json.js'
import store from './index.js'

async function api(type) {
	return new Promise((resolve, reject) => {
		resolve(Json[type]);
	})
}

export default {
	namespaced: true,
	state: {
		isLogin: false, // 是否登录
		userInfo: {} // 用户信息
	},
	mutations: {
		/**
		 * 更新仓库状态
		 * @param {Object} state 仓库状态
		 * @param {Object} payload 挂载信息对象
		 */
		setState(state, payload) {
			if (typeof payload !== 'object') {
				return;
			}
			for (const key in payload) {
				state[key] = payload[key]
			}
		}
	},
	actions: {
		/**
		 * 登录账号
		 * @param {Object} context 仓库上下文
		 * @param {Object} userInfo 用户信息
		 */
		async login(context, userInfo) {
			// 1、发送请求
			// 2、根据响应判断账号密码是否正确

			context.commit('setState', {userInfo, isLogin: true}); // 将账号信息保存到仓库
			// 设置本地缓存
			uni.setStorage({
				key: 'userInfo',
				data: userInfo
			})
			// 3、登录成功后获取账号数据（如购物车数据）
			const result = await api('shopInfo');
			store.dispatch('shopping/addShopInfo', result)
			return '登录成功'
		},
		/**
		 * 退出登录
		 * @param {Object} context
		 */
		async logOut(context){
			context.commit('setState', {userInfo: {}, isLogin: false});
			// 删除本地缓存
			uni.removeStorage({
				key: 'userInfo'
			})
			// 清空购物车
			store.dispatch('shopping/rmShopInfo')
			return '退出成功'
		}
	}
}
