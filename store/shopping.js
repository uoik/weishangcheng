export default {
	namespaced: true,
	state: {
		// 购物信息
		shopInfo: [],
		isShopNull: true
	},
	getters: {
		/**
		 * 判断购物车是否为空
		 * @param {Object} state
		 */
		isShopNull(state) {
			return state.shopInfo.length != 0;
		},
		/**
		 * 得到购物车商品总数量
		 * @param {Object} state
		 */
		getShopNumber(state) {
			let num = 0;
			state.shopInfo.forEach(order => num += +order.number)
			return num;
		}
	},
	mutations: {
		/**
		 * 更新仓库状态
		 * @param {Object} state 仓库状态
		 * @param {Object} payload 挂载对象
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
		 * 添加商品到购物车
		 * @param {Object} context
		 * @param {Object} param 商品对象/商品数组
		 */
		async addShopInfo(context, param) {
			const shops = context.state.shopInfo;
			let shopInfo = [];
			// 判断类型 数组=多个商品 对象=单个商品
			if (Array.isArray(param)) {
				const res = diff(shops, param, true);
				if (res) {
					shopInfo = res;
				}
			} else {
				// 判断是否有同样规格的商品在购物车中
				const res = diff(shops, param, false);
				if (res) {
					shopInfo = res;
				}
			}

			if (shopInfo.length != 0) {
				const payload = {
					shopInfo: [...shops, ...shopInfo]
				}
				// 判断购物车状态
				if (context.state.isShopNull) {
					payload.isShopNull = false;
				}
				context.commit('setState', payload);
			}

			/**
			 * 对比函数，判断需要添加的商品是否已存在。
			 * @param {Object} shops 仓库数据
			 * @param {Object} param 商品数据
			 * @param {Boolean} isArr 是否为数组
			 */
			function diff(shops, params, isArr = false) {
				if (isArr) {
					// 循环判断是否存在。存在则直接增加数量。
					const res = [];
					params.forEach(param => {
						shops.forEach(shop => {
							if (shop.title == param.title && shop.specific == param.specific) {
								shop.number += +param.number
							} else {
								res.push(param);
							}
						})
					});
					return res;
				} else {
					const res = shops.find(shop => shop.title == param.title && shop.specific == param.specific)
					if (res) {
						res.number += +param.number
					} else {
						return [params]
					}
				}
			}
		},
		/**
		 * 清空购物车
		 * @param {Object} context
		 */
		async rmShopInfo(context){
			context.commit('setState', {shopInfo: [], isShopNull: true})
		}
	}
}
