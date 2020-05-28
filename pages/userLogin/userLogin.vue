<template>
	<view class="container">
		<!-- 返回按钮 -->
		<view class="return-btn iconfont icon-iconfontjiantou-copy" @click="returnBtn"></view>
		<!-- 右上角装饰 -->
		<view class="right-decorate"></view>
		<!-- 主内容 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">欢迎回来！</view>
			<!-- 文本框内容 -->
			<view class="input-content">
				<!-- 账号 -->
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" :value="mobile" placeholder="请输入手机号码" maxlength="11" data-key="mobile" @input="inputChange" />
				</view>
				<!-- 密码 -->
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="mobile" value="" placeholder="8-18位不含特殊字符的数字、字母组合" placeholder-class="input-empty" maxlength="20"
					 password data-key="password" @input="inputChange" @confirm="loginBtn" />
				</view>
				<button class="login-btn" @click="loginBtn" :disabled="logining">登录</button>
			</view>
		</view>
		<!-- 忘记密码 -->
		<view class="forget-paw" @click='forgetBtn'>忘记密码?</view>
		<!-- 注册账号 -->
		<view class="register-user">
			还没有账号?
			<text @click="registBtn">马上注册</text>
		</view>
		<!-- 左下角装饰 -->
		<view class="left-decorate"></view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				logining: false
			}
		},
		methods: {
			// 
			...mapActions('users', ['login']),
			// 返回上一级
			returnBtn() {
				uni.navigateBack()
			},
			// 输入账号密码
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			// 验证登录
			async loginBtn() {
				this.logining = true;
				const {
					mobile,
					password
				} = this;

				// 数据验证模块（发送请求验证账号密码）
				// const sendData = {
				// 	mobile,
				// 	password
				// };

				// 模拟验证
				const result = await this.$api('userInfo');
				if (result.mobile === mobile && result.password === password) {
					const msg = await this.login(result);
					uni.navigateBack();
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}else {
					uni.showToast({
						title: '账号或密码错误',
						icon: 'none'
					})
				}
			},
			// 忘记密码按钮
			forgetBtn() {
				uni.showToast({
					title: '点击忘记密码',
					icon: 'none'
				})
			},
			// 注册按钮
			registBtn() {
				uni.showToast({
					title: '点击注册',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang='scss'>
	/* 容器 */
	.container {
		padding: 240rpx 30rpx 0;
		position: relative;
		overflow: hidden;
		height: calc(100vh - 240rpx);

		/* 返回按钮 */
		.return-btn {
			position: absolute;
			/* 计算状态栏的高度 */
			padding-top: var(--status-bar-height);
			top: 40rpx;
			font-size: 40rpx;
		}

		/* 右上角装饰 */
		.right-decorate {
			position: absolute;
			top: 80rpx;
			right: 20rpx;
			z-index: 95;

			&:before,
			&:after {
				display: block;
				content: "";
				width: 400rpx;
				height: 80rpx;
				background: #b4f3e2;
			}

			&:before {
				transform: rotate(50deg);
				border-radius: 0 50px 0 0;
			}

			&:after {
				position: absolute;
				right: -198rpx;
				top: 0;
				transform: rotate(-50deg);
				border-radius: 50px 0 0 0;
			}
		}

		/* 主内容 */
		.wrapper {
			position: relative;
			z-index: 90;
			background: #fff;
			padding-bottom: 40rpx;

			.left-top-sign {
				font-size: 120rpx;
				color: #f8f8f8;
				position: relative;
				left: -35rpx;
			}

			/* 欢迎语 */
			.welcome {
				position: relative;
				left: 50rpx;
				top: -90rpx;
				font-size: 46rpx;
				color: #555;
				text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
			}

			/* 文本框内容 */
			.input-content {
				text-align: left;

				/* 账号密码文本框 */
				.input-item {
					width: 630rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					padding: 0 30rpx;
					background: #f8f6fc;
					height: 120rpx;
					border-radius: 4px;
					margin-bottom: 40rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.tit {
						height: 50rpx;
						line-height: 56rpx;
						font-size: 26rpx;
						color: #606266;
					}

					input {
						height: 60rpx;
						font-size: 30rpx;
						color: #303133;
						width: 100%;
					}
				}

				/* 登录按钮 */
				.login-btn {
					width: 690rpx;
					height: 76rpx;
					line-height: 76rpx;
					border-radius: 50px;
					background: $stop-color;
					color: #fff;
					font-size: 32rpx;
				}
			}
		}

		/* 忘记密码 */
		.forget-paw {
			font-size: 26rpx;
			color: #4399fc;
			text-align: center;
		}

		/* 注册账号 */
		.register-user {
			position: absolute;
			left: 50%;
			bottom: 50rpx;
			transform: translateX(-50%);
			font-size: 26rpx;
			color: #606266;
			z-index: 999;

			text {
				color: #4399fc;
				margin-left: 10rpx;
			}
		}

		/* 左下角装饰 */
		.left-decorate {
			position: absolute;
			bottom: -335rpx;
			left: -280rpx;
			border: 100rpx solid #d0d1fd;
			border-radius: 50%;
			padding: 180rpx;
		}
	}
</style>
