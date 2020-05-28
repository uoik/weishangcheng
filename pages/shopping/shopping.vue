<template>
	<view class="shop">
		<!-- 标题 -->
		<view class="title">
			<view class="iconfont icon-fanhui" @click="returnBtn"></view>
			<view class="text">购物车</view>
			<view class="edit" @click="editerBtn" v-if="!isShopNull">
				{{editBtn ? '完成' : '编辑'}}
			</view>
		</view>

		<!-- 购物车不为空 -->
		<view v-if="!isShopNull">
			<!-- 一个订单信息 -->
			<view class="order" v-for="(item, i) in shopInfo" :key='item.id'>
				<radio-group>
					<view class="uni-list-cell uni-list-cell-pd">
						<!-- 选中按钮 -->
						<view>
							<radio :checked="item.checked" @click='radioBtn(item.id, i)' color="#F40" class="radio" />
						</view>
						<!-- 订单图片信息 -->
						<view class="order_info">
							<image :src="item.url"></image>
							<view class="info">
								<view class="name">{{item.title}}</view>
								<view class="specific">{{item.specific}}</view>
								<view class="price">￥{{item.price}}</view>
							</view>
							<view class="number_box">
								<uni-number-box class="number" :value='item.number' :that='item' :keyId='item.id + "-" + i' :min="1" :max="999"
								 @change='change'></uni-number-box>
							</view>
						</view>
					</view>
				</radio-group>
			</view>
		</view>

		<!-- 空购物车 -->
		<view v-else>
			<view class="icon">
				<text class="iconfont icon-gouwuche"></text>
				<text class="text">购物车还是空的</text>
				<text class="btn" @click="indexBtn">去逛逛</text>
			</view>
		</view>

		<!-- 猜你喜欢 -->
		<like-comp :likeData='likeData'></like-comp>

		<!-- 结算模块 -->
		<view class="close" v-if="!isShopNull">
			<radio-group>
				<view class="uni-list-cell uni-list-cell-pd">
					<!-- 全选按钮 -->
					<view>
						<radio :checked="checkAll" @click='checkChange()' color="#F40" class="radio" />全选
					</view>
					<!-- 合计金额 -->
					<view class="total" v-show="!editBtn">
						合计：
						<text class="rmb">￥</text>
						<text class="integer">{{money}}.</text>
						<text class="floating">{{point}}</text>
					</view>
					<view class="collect" v-show="editBtn" @click="collectBtn">
						移入收藏
					</view>
				</view>
			</radio-group>
			<view class="btn" :class="active?'active':''" @click="paymentBtn" v-show="!editBtn">
				结算({{orderNumber}})
			</view>
			<view class="delete" v-show="editBtn" @click="deleteBtn">
				删除
			</view>
		</view>

		<!-- 弹窗 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" content="确定删除选中的商品吗？" title="删除商品" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>

		<view class="pitch" :style="delteBtn?'':'opacity: 0'">微商城：请选择需要删除的商品</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import likeComp from '@/components/likeComp/likeComp.vue'

	export default {
		data() {
			return {
				likeData: {},
				checkAll: false, // 全选按钮
				money: '0',
				point: '00',
				active: false, // 是否有选中订单
				orderNumber: 0, // 订单数量
				editBtn: false, // 是否点击了编辑按钮
				delteBtn: false // 消息提示框
			}
		},
		components: {
			uniNumberBox,
			uniPopup,
			uniPopupDialog,
			likeComp
		},
		computed: {
			...mapState('shopping', ['shopInfo', 'isShopNull'])
		},
		methods: {
			...mapMutations('shopping', ['setState']),
			// 获取猜你喜欢数据
			async getLikeData() {
				const result = await this.$api('likeData');
				this.likeData = result;
			},

			// 编辑按钮
			editerBtn() {
				this.editBtn = !this.editBtn;
			},

			// 单项选择器
			radioBtn(id, index) {
				// 状态切换
				if (this.shopInfo[index].id === id) {
					this.shopInfo[index].checked = !this.shopInfo[index].checked
				}
				// 判断是否全选
				const res = this.shopInfo.filter(order => order.checked === false);
				if (res.length == 0) {
					this.checkAll = true; // 已经全选
				} else {
					this.checkAll = false; // 未全选
				}
				this.moneyComputed() // 重新计算金额
			},

			// 商品数量输入框
			change(value, key) {
				let arr = key.split('-'); // ['id', 'index']
				let id = arr[0];
				let i = arr[1];
				if (this.shopInfo[i].id === +id) {
					this.shopInfo[i].number = +value;
				}
				this.moneyComputed(); // 重新计算金额
			},

			// 计算合计金额
			moneyComputed() {
				let money = 0;
				let length = 0;
				this.shopInfo.forEach(order => {
					// 遍历已经选中的订单
					if (order.checked) {
						money += +order.number * +order.price;
						length += +order.number;
					}
				})
				money === 0 ? this.active = false : this.active = true; // 判断是否有订单
				this.orderNumber = length; // 订单数量
				money = money.toFixed(2); // 保留两位小数并转换字符串
				let temp = money.split('.'); // 拆分成整数和浮点数
				this.money = temp[0] || '0';
				this.point = temp[1] || '00';

				if (this.shopInfo.length == 0) {
					this.checkAll = false;
				}
			},

			// 全选按钮
			checkChange() {
				if (this.shopInfo.length == 0) {
					uni.showToast({
						title: '购物车为空，请先加购',
						icon: 'none'
					})
					return;
				}
				// 判断是否已经全选
				if (this.checkAll) {
					// 全选，全部取消选中
					this.shopInfo.forEach(order => order.checked = false);
				} else {
					// 未全选，找出未选中的订单，勾上选中状态
					const res = this.shopInfo.filter(order => order.checked === false);
					res.forEach(order => order.checked = true);
				}
				this.checkAll = !this.checkAll;
				this.moneyComputed(); // 重新计算金额
			},

			// 付款按钮
			paymentBtn() {
				uni.showToast({
					title: '点击了付款',
					icon: 'none'
				})
			},

			// 将选中的订单加入收藏
			collectBtn() {
				uni.showToast({
					title: '添加收藏',
					icon: 'none'
				})
			},

			// 删除选中订单
			deleteBtn() {
				// 判断是否有选中订单
				if (this.active) {
					this.$refs.popup.open()
				} else {
					this.delteBtn = true;
					setTimeout(() => this.delteBtn = false, 2000)
				}
			},

			// 点击dialog取消按钮
			close(done) {
				done()
			},

			// 点击dialog确定删除按钮
			confirm(done) {
				// 找出所有未选中的订单
				const res = this.shopInfo.filter(order => order.checked == false);
				let payload = {
					shopInfo: res
				}
				if (res.length == 0) {
					this.editBtn = false; // 空数据，将编辑按钮设置成false
					payload.isShopNull = true; // 购物车已经为空
				}
				this.setState(payload); // 重新设置仓库状态
				// 重新计算金额
				this.moneyComputed()
				// 关闭弹窗
				done();
			},

			// 跳转首页按钮
			indexBtn(url) {
				uni.switchTab({
					url: '../index/index'
				})
			},

			// 返回按钮
			returnBtn() {
				uni.navigateBack()
			},
		},
		onLoad() {
			this.getLikeData();
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color;
	}

	// 购物车页面样式
	.shop {
		width: 100%;
		box-sizing: border-box;
		padding-top: var(--status-bar-height);
		// 条件编译，H5环境下底部需要撑开50px
		/* #ifdef H5 */
		// margin-bottom: 100rpx;
		/* #endif */

		// 标题
		.title {
			display: flex;
			position: relative;
			text-align: center;
			font-size: 30rpx;
			border-bottom: 1px solid $shallow-border;
			padding: 30rpx 0;

			.iconfont {
				position: absolute;
				left: 30rpx;
			}

			.text {
				margin: 0 auto;
			}

			.edit {
				position: absolute;
				right: 30rpx;
				font-size: 28rpx;
			}
		}

		// 购物车
		.order {
			background: $bg-white;
			position: relative;
			margin-bottom: 6rpx;

			.uni-list-cell {
				display: flex;
				align-items: center;
				padding: 30rpx;

				// 单选按钮
				.radio {
					transform: scale(0.8);
					/* #ifdef MP-WEIXIN */
					transform: scale(0.6);
					/* #endif */
					outline: none;
				}

				// 订单信息
				.order_info {
					margin-left: 10rpx;
					display: flex;

					// 图片
					image {
						border: 2rpx solid $shallow-border;
						width: 120rpx;
						height: 120rpx;
					}

					// 详细信息
					.info {
						margin-left: 30rpx;

						.name {
							font-size: 28rpx;
							padding: 0;
						}

						.specific {
							color: $shallow-font;
							padding: 6rpx 0;
							font-size: 20rpx;
						}

						.price {
							color: $stop-color;
							font-size: 24rpx;
						}
					}

					// 数量选择器
					.number_box {
						position: absolute;
						right: 0;
						bottom: 20rpx;
						transform: scale(0.7);
						/* #ifdef MP-WEIXIN */
						// transform: scale(1);
						/* #endif */
					}
				}

			}
		}

		// 空购物车样式
		.icon {
			text-align: center;
			background: $bg-white;
			padding: 30rpx 0;

			.iconfont {
				display: inline-block;
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
				line-height: 80rpx;
				color: $shallow-font;
				font-size: 50rpx;
				vertical-align: middle;
			}

			.text {
				color: gray;
				font-size: 20rpx;
				padding: 0 15rpx;
			}

			.btn {
				color: $black-font;
				font-size: 22rpx;
				border: 1rpx solid $shallow-border;
				padding: 6rpx 15rpx;
			}
		}

		// 结算模块
		.close {
			position: fixed;
			bottom: 0;
			/* #ifdef H5 */
			bottom: 50px;
			/* #endif */
			display: flex;
			background: $bg-white;
			height: 100rpx;
			line-height: 100rpx;
			box-shadow: inset 0px -15px 10px -15px $shadow-color;

			.uni-list-cell {
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				font-size: 28rpx;

				// 单选按钮
				.radio {
					transform: scale(0.8) translateY(-6rpx);
				}

				view {
					width: 150rpx;
				}

				.total {
					width: 300rpx;
					padding-left: 30rpx;

					text {
						color: $stop-color;
					}

					.rmb {
						display: inline-block;
						font-size: 20rpx;
						transform: translate(2rpx, -4rpx);
					}

					.floating {
						font-size: 20rpx;
					}
				}

				// 移入收藏
				.collect {
					background: $stop-color;
					text-align: center;
					color: $white-font;
					width: 270rpx;
				}
			}

			.btn {
				width: 250rpx;
				font-size: 28rpx;
				background: $btn-invalid;
				text-align: center;
				color: $white-font;
			}

			.btn.active {
				background: $stop-color;
			}

			.delete {
				background: $btn-delete;
				color: $white-font;
				width: 300rpx;
				font-size: 28rpx;
				text-align: center;
			}
		}

		//弹窗模块
		.pitch {
			background: $bg-white;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 20rpx;
			width: 375rpx;
			font-size: 22rpx;
			color: $black-font;
			text-align: center;
			position: fixed;
			bottom: 110rpx;
			/* #ifdef H5 */
			bottom: 210rpx;
			/* #endif */
			left: 50%;
			transform: translateX(-50%);
			transition: all .5s;
			border: 1px solid $shallow-border;
			padding: 5rpx 10rpx;
		}
	}
</style>
