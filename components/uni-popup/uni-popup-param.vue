<template>
	<view class="uni-popup-param">
		<view class="header">
			<!-- 商品图片 -->
			<view class="img">
				<image mode="aspectFit" :src="url"></image>
			</view>
			<!-- 商品价格名称 -->
			<view>
				<view class="price">{{'￥'+price}}</view>
				<view class="name">{{name+' '+version+' '+color}}</view>
			</view>

			<!-- 取消按钮 -->
			<view class="iconfont icon-quxiao" @click="close"></view>
		</view>
		<!-- 商品规格 -->
		<view class="info">
			<scroll-view scroll-y>
				<view class="speci" v-for="(item, index) in speciData" :key='item.id'>
					<view class="t">{{item.title}}</view>
					<view class="list">
						<view @click='onClick(index, i)' :class="it.active?'active':''" v-for="(it, i) in item.data" :key='it.id'>{{it.info}}</view>
					</view>
				</view>

				<view class="number">
					<text class="t">购买数量</text>
					<uni-number-box @change='onChange' class="btn" :min="1" :max="999"></uni-number-box>
				</view>
			</scroll-view>
		</view>
		<view class="uni-param-button-box">
			<button class="uni-param-button" @click="handleClick">确定</button>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		name: 'UniPopupParam',
		inject: ['popup'],
		props: {
			name: {
				type: String,
				required: true
			},
			speciData: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				url: '', // 图片链接
				price: 0,
				version: '', // 版本
				color: '', // 颜色
				number: 1 // 数量
			}
		},
		components: {
			uniNumberBox
		},
		methods: {
			// 初始化数据
			initData() {
				let versions = [], colors = [];
				this.speciData.forEach(item => {
					if(item.title === '规格'){
						versions = item.data
					}else if(item.title === '颜色'){
						colors = item.data;
					}
				});
				versions.find(item => {
					if(item.active){
						this.version = item.info;
						this.price = item.price;
					}
				});
				colors.find(item => {
					if(item.active){
						this.url = item.url;
						this.color = item.info;
					}
				})
			},
			// 选择规格
			onClick(oneIndex, twoIndex) {
				this.$emit('selectSpeci', {
					oneIndex,
					twoIndex,
					cb: this.initData
				})
			},
			// 商品数量
			onChange(value) {
				this.number = value;
			},
			// 确定按钮
			handleClick(){
				this.$emit('confirm', {
					url: this.url,
					color: this.color,
					version: this.version,
					price: this.price,
					number: this.number,
					name: this.name
				})
				this.popup.close()
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			}
		},
		mounted() {
			// 在微信小程序中，created生命周期获取不到props属性内容
			this.initData()
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-param {
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;

		// 头部信息
		.header {
			display: flex;
			padding: 30rpx 0;
			position: relative;

			// 图片
			.img {
				width: 200rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			// 价格
			.price {
				color: $stop-color;
				padding: 10rpx 0;
			}

			// 名称
			.name {
				font-size: 20rpx;
				padding: 10rpx 0 20rpx;
			}

			// 取消按钮
			.iconfont {
				position: absolute;
				right: 12rpx;
				top: 12rpx;
			}
		}

		// 商品规格
		.info {
			height: 750rpx;
			padding: 0 30rpx;

			scroll-view {
				height: 100%;
			}

			.speci,
			.number {
				margin-top: 30rpx;
				font-size: 26rpx;

				.t {
					font-weight: bold;
				}

				.list {
					display: flex;
					flex-wrap: wrap;

					view {
						background: #efefef;
						padding: 10rpx 20rpx;
						margin: 25rpx 25rpx 0 0;
						border-radius: 30rpx;
						border: 1px solid #efefef;
					}

					.active {
						border-color: $stop-color;
						color: $stop-color;
						background: #fff4f0;
					}
				}
			}

			.number {
				display: flex;
				height: 70rpx;
				line-height: 70rpx;
				justify-content: space-between;

				.btn {
					transform: scale(.8);
				}
			}
		}

		// 底部按钮
		.uni-param-button-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			padding: 10px 15px;
		}

		.uni-param-button {
			flex: 1;
			border-radius: 50px;
			color: #fff;
			font-size: 16px;
			background: $stop-color;
		}

		.uni-param-button::after {
			border-radius: 50px;
		}
	}
</style>
