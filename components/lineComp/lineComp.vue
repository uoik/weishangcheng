<!-- 底线模块组件 -->
<template>
	<view class="line">
		<text>我是有底线的</text>
	</view>
</template>

<script>
</script>

<style lang="scss">
	// .line {
	// 	text-align: center;
	// 	font-size: 20rpx;
	// 	color:$shallow-font;
	// 	padding: 0 0 20rpx;

	// 	text {
	// 		color: gray;
	// 		padding: 25rpx;
	// 	}

	// 	font-size: 26rpx;
	// 	margin-top: 30rpx;
	// 	padding-bottom: 30rpx;
	// }
	.line{
		text-align: center;
		font-size: 20rpx;
		color: $shallow-font;
		padding: 30rpx 0;
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
</style>
