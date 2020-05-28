<template>
	<view>
		<!-- 头部信息 -->
		<view class="header">
			<view class="iconfont icon-fanhui" @click="returnBtn"></view>
			<view class="text">设置</view>
		</view>
		<!-- 每一项设置 -->
		<view class="set-list" v-for="set in settingArr" :key='set.id'>
			<view class="set-title">{{set.title}}</view>
			<view class="set-item">
				<view @click='navBtn(item.name)' class="item" v-for="item in set.list" :key='item.name'>
					<view>{{item.name}}</view>
					<view class="iconfont icon-you">
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 退出登录 -->
		<view v-if="isLogin" class="logout" @click='logoutBtn'>退出账号</view>
		<!-- 弹窗 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" content="确定要退出账号吗？" title="退出账号" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	export default {
		data() {
			return {
				settingArr: []
			};
		},
		components: {
			uniPopup,
			uniPopupDialog
		},
		computed: {
			...mapState('users', ['isLogin'])
		},
		methods: {
			...mapActions('users', ['logOut']),
			async getSetting(){
				this.settingArr = await this.$api('settingArr');
			},
			// 返回按钮
			returnBtn() {
				uni.navigateBack();
			},
			// 跳转按钮
			navBtn(name){
				uni.showToast({
					title: name,
					icon: 'none'
				})
			},
			// 退出账号
			logoutBtn(){
				this.$refs.popup.open()
			},
			// 取消
			close(done){
				done();
			},
			// 确定
			async confirm(done){
				// 退出账号并清空购物车
				await this.logOut();
				done()
				uni.navigateBack();
			}
		},
		onLoad(){
			this.getSetting();
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color;
	}
	// 头部信息
	.header {
		background: $bg-white;
		padding: 0 30rpx;
		padding-top: calc(var(--status-bar-height) + 15rpx);
		padding-bottom: 30rpx;
		/* #ifdef H5 */
		padding-top: 30rpx;
		/* #endif */
		display: flex;
		position: relative;
		text-align: center;
		font-size: 30rpx;
		border-bottom: 1px solid $shallow-border;

		.iconfont {
			font-size: 38rpx;
		}

		.text {
			margin: 0 auto;
		}
	}
	// 每一项设置
	.set-list{
		.set-title{
			padding: 26rpx 30rpx;
			font-size: 28rpx;
		}
		.set-item{
			padding: 0 30rpx;
			background: $bg-white;
			
			.item{
				position: relative;
				padding: 26rpx 0;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: $deep-font;
				border-bottom: 1px solid $shallow-border;
				text{
					position: absolute;
					right: 50rpx;
					font-size: 24rpx;
					color: $shallow-font;
				}
			}
			.item:nth-last-child(1){
				border: none
			}
		}
	}
	// 退出账号
	.logout{
		margin: 30rpx auto;
		width: 650rpx;
		background: $bg-white;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		color: $deep-font;
		text-align: center;
		font-size: 28rpx;
	}
</style>
