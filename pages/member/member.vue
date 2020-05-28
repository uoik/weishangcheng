<template>
	<view>
		<!-- 用户信息 -->
		<view class="userInfo">
			<!-- 背景图片 -->
			<image src="/static/user-bg.jpg" class="bg"></image>
			<!-- 用户信息 -->
			<!-- 头像 -->
			<view class="img">
				<image mode="aspectFit" :src="userInfo.head || '/static/missing-face.png'"></image>
			</view>
			<!-- 用户名及ID -->
			<view class="info" v-if="isLogin">
				<view class="name">{{userInfo.name}}</view>
				<view class="id">用户ID：{{userInfo.id}}</view>
			</view>
			<!-- 登录注册 -->
			<view class="login" v-if="!isLogin" @click='loginBtn'>登录/注册</view>
			<!-- 开通会员 -->
			<view class="member">
				<view class="text">
					<text class="iconfont icon-huiyuan"></text>
					DCloud会员
				</view>
				<view class="grant">立即开通</view>
			</view>
		</view>
		<!-- 余额优惠券 -->
		<view class="balance_discount">
			<view class="balance box">
				<view>128.8</view>
				<view class="gray">余额</view>
			</view>
			<view class="discount box">
				<view>0</view>
				<view class="gray">优惠券</view>
			</view>
			<view class="integral box">
				<view>20</view>
				<view class="gray">积分</view>
			</view>
		</view>
		<!-- 订单售后 -->
		<view class="order_after">
			<view class="box" v-for="item in orderNav" :key='item.id'>
				<view class="iconfont" :class="item.icon"></view>
				<view>{{item.name}}</view>
			</view>
		</view>
		<!-- 选项列表 -->
		<view class="options_list">
			<view class="item" v-for="item in options" :key='item.name' @click="navBtn(item.url, item.name)">
				<view class="iconfont" :class="item.icon"></view>
				<view class="name">
					<text class="tit">{{item.name}}</text>
					<text class="iconfont icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				options: [],
				orderNav: []
			};
		},
		computed: {
			...mapState('users', ['isLogin', 'userInfo'])
		},
		methods: {
			// 功能选项列表
			async getRenderData() {
				const result = await this.$api('options');
				const order = await this.$api('orderNav');
				this.orderNav = order;
				this.options = result;
			},

			// 跳转页面
			navBtn(url, param) {
				uni.navigateTo({
					url: url + '?param=' + param
				})
			},

			// 跳转登录页面
			loginBtn() {
				uni.navigateTo({
					url: '../userLogin/userLogin'
				})
			}
		},
		onLoad() {
			this.getRenderData();
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color;
	}

	// 用户信息
	.userInfo {
		margin-bottom: 20rpx;
		padding: 15rpx 30rpx;
		display: flex;
		align-items: center;
		background: $bg-white;
		color: $shallow-font;
		height: 300rpx;
		position: relative;
		overflow: hidden;
		border-radius: 0 0 375rpx 375rpx / 0 0 25rpx 25rpx;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			// 滤镜属性，高斯模糊
			filter: blur(1px);
			opacity: .7;
		}

		.img {
			z-index: 999;
			width: 120rpx;
			height: 120rpx;
			margin-right: 30rpx;
			border-radius: 50%;
			overflow: hidden;
			border: 2px solid $shallow-border;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			z-index: 999;
			font-size: 20rpx;
			color: $black-font;

			.name {
				margin-bottom: 20rpx;
			}
		}

		.login {
			z-index: 999;
			color: $black-font;
			font-size: 32rpx;
		}

		.member {
			box-sizing: border-box;
			padding: 0 35rpx;
			color: #f7d680;
			border-radius: 20rpx 20rpx 0 0;
			height: 70rpx;
			line-height: 70rpx;
			width: 700rpx;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			background: rgba(0, 0, 0, .7);
			display: flex;
			justify-content: space-between;

			.text {
				text {
					margin-right: 10rpx;
					font-size: 26rpx;
				}

				font-size: 28rpx;
			}

			.grant {
				height: 40rpx;
				padding: 0 30rpx;
				background: linear-gradient(#fff, #f7d680);
				line-height: 40rpx;
				transform: translateY(12.5rpx);
				font-size: 20rpx;
				color: $deep-font;
				border-radius: 20rpx;
			}
		}
	}

	// 余额优惠券
	.balance_discount {
		margin: 0 auto;
		width: 700rpx;
		background: $bg-white;
		display: flex;
		margin-bottom: 20rpx;
		justify-content: space-around;
		padding: 20rpx 0;

		.box {
			text-align: center;
			font-size: 28rpx;
			width: 150rpx;

			.gray {
				color: $shallow-font;
				font-size: 20rpx;
				margin-top: 3rpx;
			}
		}
	}

	// 订单售后
	.order_after {
		width: 700rpx;
		background: $bg-white;
		padding: 30rpx 0;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		margin-bottom: 20rpx;

		.box {
			text-align: center;
			font-size: 20rpx;
			color: $shallow-font;

			.iconfont {
				margin-bottom: 5rpx;
				font-size: 50rpx;
			}
		}
	}

	// 选项列表
	.options_list {
		margin: 0 auto;
		color: $deep-font;
		width: 700rpx;

		.item {
			padding-left: 30rpx;
			background: $bg-white;
			display: flex;
			align-items: center;

			.iconfont:nth-child(1) {
				font-size: 40rpx;
				margin-right: 20rpx;
				padding: 20rpx 0;
			}

			.name {
				display: flex;
				padding: 20rpx 0;
				justify-content: space-between;
				width: 100%;
				border-bottom: 1px solid $shallow-border;

				.tit {
					font-size: 24rpx;
				}

				.iconfont:nth-child(2) {
					padding-right: 20rpx;
				}
			}
		}

		.item:nth-last-child(2) {
			.name {
				border-bottom: none;
			}
		}

		.item:nth-last-child(1) {
			margin-top: 20rpx;

			.name {
				border-bottom: none;
			}
		}
	}
</style>
