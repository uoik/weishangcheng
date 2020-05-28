<template>
	<!-- 猜你喜欢 -->
	<view class="like">
		<view class="like-title">
			<!-- <text class="like-left like-short"></text>
			<text class="like-left like-long"></text> -->
			<view class="decorate"></view>
			{{likeData.title}}
			<view class="decorate"></view>
			<!-- <text class="like-right like-short"></text>
			<text class="like-right like-long"></text> -->
		</view>
		<view class="like-text">
			<text>{{likeData.info}}</text>
		</view>
		<!-- 列表数据 -->
		<view class="like_list">
			<view @click='navBtn(item.id)' class="like-item" v-for="item in likeData.data" :key='item.id'>
				<image mode="aspectFit" :src="item.url"></image>
				<view class="like-name">{{item.title}}</view>
				<view class="like-price">
					<text class="like-rmb">￥</text>{{item.price}}
					<text class="like-oldPrice" v-if='item.oldPrice'><text class="like-rmb">￥</text>{{item.oldPrice}}</text>
				</view>
			</view>
		</view>
		<!-- 底线 -->
		<line-comp></line-comp>
	</view>
</template>

<script>
	import lineComp from '@/components/lineComp/lineComp.vue'

	export default {
		props: {
			likeData: {
				type: Object
			}
		},
		components: {
			lineComp
		},
		methods: {
			// 跳转详情页
			navBtn(id){
				uni.navigateTo({
					url: '../../pages/detail/detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	// 猜你喜欢
	.like {

		// 标题
		.like-title {
			text-align: center;
			color: $stop-color;
			padding: 20rpx 0 0;
			border: none;
			font-size: 26rpx;
			
			.decorate{
				&:before, &:after{
					display:block;
					content:"";
					position: absolute;
					width: 20rpx;
					height: 6px;
					background: $shallow-border;
				}
				&:before{
					top: 40rpx;
					left: -190rpx;
				}
				&:after{
					top: 40rpx;
					right: -190rpx;
				}
			}

			// 装饰
			.like-short {
				display: inline-block;
				background: #f7d680;
				width: 30rpx;
				height: 8rpx;
				border-radius: 8rpx;
			}

			.like-left.like-short {
				transform: translate(0rpx, -6rpx) rotate(-45deg);
			}

			.like-right.like-short {
				transform: translate(4rpx, -6rpx) rotate(-45deg);
			}

			.like-long {
				display: inline-block;
				background: #ff4400;
				width: 35rpx;
				height: 8rpx;
				border-radius: 8rpx;
			}

			.like-left.like-long {
				transform: translate(-10rpx, -6rpx) rotate(-45deg);
			}

			.like-right.like-long {
				transform: translate(-6rpx, -6rpx) rotate(-45deg);
			}
		}

		// 标题下方文字内容
		.like-text {
			text-align: center;
			font-size: 20rpx;
			color: $shallow-font;
			padding: 0 0 20rpx;
			text {
				position: relative;
				color: $shallow-font;
				padding: 25rpx;
				&:before, &:after{
					display:block;
					content:"";
					position: absolute;
					width: 200rpx;
					height: 1px;
					background: $shallow-border;
				}
				&:before{
					top: 40rpx;
					left: -190rpx;
				}
				&:after{
					top: 40rpx;
					right: -190rpx;
				}
			}
		}

		// 列表数据
		.like_list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			border-bottom: 1rpx solid $shallow-border;

			// 项
			.like-item {
				background: $bg-white;
				width: 370rpx;
				margin-top: 10rpx;

				// 项图片
				image {
					width: 370rpx;
					height: 370rpx;
				}

				// 项名称
				.like-name {
					font-size: 28rpx;
					padding: 15rpx 30rpx;
				}

				// 项价格
				.like-price {
					font-size: 28rpx;
					padding: 0 30rpx 20rpx;
					color: $stop-color;

					// 价格符号
					.like-rmb {
						display: inline-block;
						font-size: 20rpx;
						transform: translate(2rpx, -4rpx);
					}

					// 旧价格
					.like-oldPrice {
						font-size: 20rpx;
						color: $shallow-font;
						text-decoration: line-through;

						// 价格符号
						.like-rmb {
							transform: translateX(4rpx);
						}
					}
				}
			}
		}
	}
</style>
