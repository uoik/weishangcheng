<!-- 详情页商品导航栏 -->
<template>
	<view class="goods-nav">
		<!-- 图标部分 -->
		<view class="goods-icon-list">
			<!-- 每一项图标 -->
			<view class="goods-icon-item" v-for="(item, i) in icon_list" :key='item.id'>
				<!-- 图标信息 -->
				<view class="iconfont" :class="item.icon" @click='clickIcon(item.text, i)'></view>
				<!-- 图标文字 -->
				<text>{{item.text}}</text>
				<!-- 购物车角标 -->
				<view class="goods-corner" v-if="item.number" :class="item.number > 0 ? 'show':''">
				<text>{{item.number}}</text>
				</view>
			</view>
		</view>
		<!-- 加入购物车 -->
		<view class='goods-btn' @click='buttonClick'>
			{{goodsBtn}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 图标列表
			"icon_list": {
				type: Array,
				default: () => [{
					id: 1,
					text: '客服',
					icon: 'icon-kefu'
				}, {
					id: 2,
					text: '喜欢',
					icon: 'icon-xihuan1',
					iconActive: 'icon-xihuan4-copy'
				}, {
					id: 3,
					text: '购物车',
					icon: 'icon-gouwuche'
				}]
			},
			// 加入购物车按钮
			goodsBtn: {
				type: String,
				default: '加入购物车'
			}
		},
		methods:{
			// 点击图标触发
			clickIcon(val, i){
				this.$emit('handleIcon', {
					value: val,
					index: i
				});
			},
			buttonClick(){
				this.$emit('handClick');
			}
		}
	}
</script>

<style lang="scss">
	// 商品导航栏样式
	.goods-nav {
		width: 750rpx;
		position: fixed;
		bottom: 0;
		background: $bg-white;
		height: 100rpx;
		display: flex;
		// 图标列表样式
		.goods-icon-list {
			border-top: 1px solid $shallow-border;
			font-size: 22rpx;
			color: $deep-font;
			display: flex;
			justify-content: space-around;
			width: 400rpx;
			// 图标项
			.goods-icon-item {
				position: relative;
				width: 100rpx;
				text-align: center;
				
				view {
					height: 50rpx;
					line-height: 60rpx;
					font-size: 38rpx;
					margin-bottom: 5rpx;
				}
				// 购物车图标
				.icon-gouwuche {
					font-size: 28rpx;
				}
				// 购物车角标
				.goods-corner{
					position: absolute;
					top: 4rpx;
					right: 16rpx;
					border-radius: 50%;
					height: 0rpx;
					width: 30rpx;
					font-size: 16rpx;
					line-height: 30rpx;
					color: $white-font;
					background: $stop-color;
					// 条件编译：H5中字体最小为12px，通过设置缩放缩小字体
					/* #ifdef H5 */
					text{
						display: inline-block;
						transform: scale(.7);
					}
					/* #endif */
				}
				.goods-corner.show{
					height: 30rpx;
				}
			}
		}
		// 加入购物车按钮
		.goods-btn {
			background: $stop-color;
			text-align: center;
			line-height: 100rpx;
			width: 350rpx;
			font-size: 28rpx;
			color: $white-font;
		}
	}
</style>
