<template>
	<view class="content">
		<view class="iconfont icon-zanweikaifang"></view>
		{{info}}模块暂未开放，敬请期待
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: ''
			};
		},
		onLoad({param}){
			this.info = param;
		}
	}
</script>

<style lang="scss">
.content{
	color: $deep-font;
	font-size: 30rpx;
	text-align: center;
	.iconfont{
		background: $bg-color;
		color: $white-font;
		border-radius: 60rpx;
		margin: 60rpx auto 30rpx;
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 50rpx;
	}
}
</style>
