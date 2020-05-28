<!-- 用户评价组件 -->
<template>
	<view class="container" @click='onClick'>
		<!-- 头部信息 -->
		<view class="header">
			<view class="title">
				用户评价
			</view>
			<view class="rate">
				{{'好评率' + tagsData.rate}}
			</view>
		</view>
		<!-- 标签信息 -->
		<view class="tags_container">
			<scroll-view scroll-x>
				<view class="tags">
					<view v-for="item in tagsData.tags" :key='item.id'>
						{{item.tag + ' ' + item.total}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 评价内容 -->
		<view class="evaluation_content">
			<scroll-view scroll-x>
				<view class="evaluation">
					<!-- 项 -->
					<view class="item" v-for="item in evaluaData" :key='item.id'>
						<!-- 头部信息 -->
						<view class="h">
							<!-- 头像 -->
							<view class="head">
								<image :src="item.head" mode=""></image>
							</view>
							<!-- 用户名评价时间 -->
							<view class="info">
								<view class="name">{{item.name}}</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<!-- 评价内容 -->
						<view class="c">
							{{item.content}}
						</view>
						<!-- 评价图片 -->
						<scroll-view scroll-x>
							<view class="imgs">
								<view class="img" v-for="url in item.imgs" :key='url'>
									<image mode="aspectFit" :src="url"></image>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tagsData: {
				type: Object,
				required: true
			},
			evaluaData: {
				type: Array,
				required: true
			}
		},
		methods: {
			onClick(){
				this.$emit('evaluate');
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: #fff;
		padding: 30rpx;

		// 头部信息
		.header {
			display: flex;
			justify-content: space-between;

			.title {
				font-size: 30rpx;
				font-weight: bold;
			}

			.rate {
				font-size: 20rpx;
				color: #8a8a8a;
			}
		}

		// 标签信息
		/* #ifdef MP-WEIXIN */
		.tags_container {
			height: 85rpx;

			scroll-view {
				height: 100%;
			}
		}

		/* #endif */
		.tags {
			margin: 20rpx 0;
			display: flex;

			view {
				white-space: nowrap;
				margin-right: 20rpx;
				background: #FFE4E1;
				border-radius: 30rpx;
				font-size: 20rpx;
				padding: 10rpx 25rpx;
			}
		}

		// 评价信息
		.evaluation {
			display: flex;
			margin-top: 10rpx;

			.item {
				/* #ifdef MP-WEIXIN */
				transform: translateY(-10rpx);
				/* #endif */
				margin-right: 20rpx;
				padding: 30rpx;
				min-width: 400rpx;
				border: 1px solid #ccc;
				border-radius: 30rpx;
			}

			.h {
				display: flex;

				.head {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px solid #e6e6e6;
					margin-right: 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.info {
					.name {
						font-size: 24rpx;
					}

					.time {
						padding-top: 6rpx;
						font-size: 20rpx;
						/* #ifdef H5 */
						transform: scale(.8) translateX(-16rpx);
						/* #endif */
						color: #ccc;
					}
				}
			}

			.c {
				margin: 20rpx 0;
				font-size: 24rpx;
				color: #8a8a8a;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.imgs {
				display: flex;

				view {
					flex-shrink: 0;
					width: 150rpx;
					height: 150rpx;
					margin-right: 10rpx;

					image {
						border-radius: 15rpx;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
