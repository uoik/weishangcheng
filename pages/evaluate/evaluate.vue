<template>
	<view>
		<!-- 头部信息 -->
		<view class="header">
			<view class="iconfont icon-fanhui left" @click='returnBtn'></view>
			<view class="title">商品评价</view>
			<view class="iconfont icon-gouwuche right" @click='shoppingBtn'></view>
		</view>
		<!-- 评价标签 -->
		<view class="tags-container">
			<view class="rate">
				<view>用户评价（{{tagsData.total}}）</view>
				<view><text>{{tagsData.rate}}</text> 满意</view>
			</view>
			<view class="tags">
				<view class="tag" v-for="item in tagsData.tags" :key='item.id'>
					{{item.tag + ' ' + item.total}}
				</view>
			</view>
		</view>
		<!-- 用户评价内容 -->
		<view class="container">
			<view class="item" v-for="item in contentData" :key='item.id'>
				<!-- 头像 -->
				<view class="head">
					<image :src="item.head"></image>
				</view>
				<!-- 内容 -->
				<view class="content">
					<!-- 名称 -->
					<view class="name">
						<view>{{item.name}}</view>
						<view class="iconfont icon-xiaolian2"><text>超爱</text></view>
					</view>
					<!-- 评价文字 -->
					<view class="text">{{item.content}}</view>
					<!-- 图片 -->
					<view class="imgs">
						<view class="img" v-for="url in item.imgs" :key='url'>
							<image mode="aspectFit" :src="url"></image>
						</view>
					</view>
					<!-- 时间 -->
					<view class="time">
						<view>{{item.time}}</view>
						<view class="icon">
							<view class="zan">
								<text>{{item.zan}}</text>
								<text class="iconfont icon-zan active"></text>
							</view>
							<view class="pinglun">
								<text>{{item.pinglun}}</text>
								<text class="iconfont icon-pinglun-copy"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagsData: {}, // 总数量和标签
				contentData: [] // 评论数据
			};
		},
		methods: {
			async getData() {
				this.contentData = await this.$api('evaluaData');
				this.tagsData = await this.$api('tagsData');
			},
			// 返回按钮
			returnBtn() {
				uni.navigateBack()
			},
			// 跳转购物车页面
			shoppingBtn() {
				uni.switchTab({
					url: '../shopping/shopping'
				})
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style lang="scss">
	page {
		background: $bg-color;
	}
	// 头部信息
	.header {
		display: flex;
		position: relative;
		padding: var(--status-bar-height) 20rpx 30rpx;
		/* #ifdef H5 */
		padding-top: 30rpx;
		/* #endif */
		text-align: center;
		font-size: 30rpx;
		line-height: 45rpx;
		border-bottom: 1px solid $shallow-border;
		.left {
			position: absolute;
			left: 20rpx;
		}
		.title {
			margin: 0 auto;
		}
		.right {
			position: absolute;
			right: 20rpx;
		}
	}
	// 评价标签
	.tags-container {
		background: $bg-white;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: $deep-font;
		.rate {
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid $shallow-border;

			text {
				margin-right: 6rpx;
				color: $stop-color;
			}
		}
		.tags {
			padding: 20rpx 0 5rpx;
			display: flex;
			flex-wrap: wrap;
			font-size: 24rpx;
			.tag {
				border-radius: 10rpx;
				padding: 8rpx 30rpx;
				background: $menu-color;
				margin: 0 15rpx 15rpx 0;
			}
			.active {
				background: $menu-color-active;
				color: $white-font;
			}
		}
	}
	// 用户评价内容
	.container {
		margin-top: 20rpx;
		background: $bg-white;
		// 每一项
		.item {
			padding: 20rpx;
			display: flex;
			border-bottom: 1rpx solid $shallow-border;
			// 头像
			.head {
				margin-right: 20rpx;
				flex-shrink: 0;
				width: 80rpx;
				height: 80rpx;
				image {
					border-radius: 10rpx;
					width: 100%;
					height: 100%;
				}
			}
			// 内容
			.content {
				font-size: 26rpx;
				// 名称
				.name {
					font-size: 30rpx;
					display: flex;
					justify-content: space-between;
					padding-bottom: 10rpx;
					color: $name-font;
					line-height: 56rpx;
					.iconfont {
						font-size: 40rpx;
						color: $iconfont;
						text {
							display: inline-block;
							transform: translateY(-6rpx);
							margin-left: 10rpx;
							font-size: 24rpx;
						}
					}
				}
				// 评价文字
				.text {
					margin-bottom: 20rpx;
				}
				// 图片
				.imgs {
					display: flex;
					flex-wrap: wrap;
					.img {
						margin: 0 10rpx 10rpx 0;
						width: 190rpx;
						height: 190rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				// 时间
				.time {
					display: flex;
					justify-content: space-between;
					padding: 10rpx 0;
					color: $shallow-font;
					.icon {
						display: flex;
						.zan,
						.pinglun {
							text {
								padding: 0 4rpx;
							}
						}
						.zan {
							margin-right: 10rpx;

							.iconfont {
								font-size: 30rpx;
							}

							.active {
								color: $stop-color;
							}
						}
						.pinglun {
							.iconfont {
								font-size: 30rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
