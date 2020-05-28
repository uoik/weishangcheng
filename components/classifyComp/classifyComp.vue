<!-- 分类模块组件 -->
<template>
	<view class="classify-content">
		<view class="classify-title">
			<text>—</text>{{datas.title}}<text>—</text>
		</view>
		<view class="classify-list">
			<view @click='onClick(i.id)' class="classify-item" v-for="i in datas.data" :key='i.id'>
				<view class="classify-img">
					<image mode="aspectFit" :src='i.url'></image>
				</view>
				<view class="classify-name">{{i.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['datas'],
		methods: {
			onClick(id){
				this.$emit('onClick', id);
			}
		}
	}
</script>

<style lang="scss">
	// 分类模块样式
	.classify-content {
		margin: 0 auto;
		padding: 30rpx 0 0;
		// 模块标题文字样式
		.classify-title {
			text-align: center;
			font-size: 30rpx;
			text {
				margin: 0 20rpx;
				color: $shallow-font;
			}
		}
		// 模块列表
		.classify-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			// 列表项
			.classify-item {
				width: 150rpx;
				text-align: center;
				padding: 15rpx 0;
				// 项图片
				.classify-img {
					height: 180rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				// 项名称
				.classify-name {
					font-size: 20rpx;
				}
			}
		}
	}
</style>
