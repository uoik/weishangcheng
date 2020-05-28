<template>
	<view class="container">
		<view class="header">
			<view class="iconfont icon-fanhui" @click="returnBtn"></view>
			<view class="text">商品分类</view>
		</view>
		<view class="classify">
			<!-- 左侧分类栏 -->
			<scroll-view class="left" scroll-y show-scrollbar>
				<view :class="active===item.id?'active':''" v-for="item in chunks" :key='item.id' @click="switchBtn(item.id)">
					{{item.name}}
				</view>
			</scroll-view>

			<!-- 右侧内容区 -->
			<scroll-view class="right" scroll-y show-scrollbar v-if="chunks.length !== 0" :scroll-top='scrollTop'
			 scroll-with-animation @scroll='asideScroll'>
				<classify-comp @onClick='detailBtn' :class='"ele-" + item.id' v-for="item in chunks" :key='item.id' :datas='item.chunk'>
				</classify-comp>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import classifyComp from '../../components/classifyComp/classifyComp.vue'
	export default {
		data() {
			return {
				chunks: [], // 分类数据
				active: '', // 当前选中标签
				eleInfo: [], // 右侧元素几何信息，初始化计算一次
				scrollTop: 0,
				sizeCalcState: false, // 是否计算过元素几何
			};
		},
		components: {
			classifyComp
		},
		methods: {
			// 得到分类页面数据
			async getChunks() {
				const result = await this.$api('chunks');
				this.chunks = result;
				this.active = this.chunks[0].id; // 第一项为选中状态
				return true;
			},

			// 切换active
			switchBtn(id) {
				this.active = id;
				if (!this.sizeCalcState) { // 判断是否计算过元素几何
					this.calcSize();
				}
				this.eleInfo.forEach(i => {
					if (i.id === id) {
						this.scrollTop = i.top
					}
				})
			},

			// 右侧滚动事件
			asideScroll(e) {
				if (!this.sizeCalcState) { // 判断是否计算过元素几何
					this.calcSize();
				}
				let scrollTop = Math.ceil(e.detail.scrollTop);
				let tabs = this.eleInfo.filter(item => item.top <= scrollTop).reverse();
				if (tabs.length > 0) {
					this.active = tabs[0].id;
				}
			},

			// 获取每个chunk的几何信息
			calcSize() {
				let that = this;
				let h = 0;
				this.chunks.forEach(item => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.ele-' + item.id).boundingClientRect(rect => {
						let height = Math.ceil(rect.height);
						that.eleInfo.push({
							id: item.id,
							top: h,
							height: height
						})
						h += height;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			
			// 返回按钮
			returnBtn(){
				uni.navigateBack();
			},
			
			// 跳转页面
			detailBtn(id){
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			}
		},
		onLoad() {
			this.getChunks();
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.container{
		height: 100%;
	}
	.header{
		position: relative;
		height: calc(var(--status-bar-height) + 100rpx);
		display: flex;
		box-sizing: border-box;
		font-size: 30rpx;
		padding-top: calc(var(--status-bar-height) + 30rpx);
		border-bottom: 1rpx solid $shallow-border;
		.iconfont{
			position: absolute;
			left: 30rpx;
		}
		.text{
			margin: 0 auto;
		}
	}
	.classify {
		position: relative;
		display: flex;
		height: calc(100% - var(--status-bar-height) - 100rpx);
		// padding-top: var(--status-bar-height);
		// 左侧
		.left {
			width: 150rpx;
			height: 100%;
			border-right: 1px solid $shallow-border;
			font-size: 20rpx;
			box-sizing: border-box;
			view {
				padding: 25rpx;
				text-align: center;
			}

			.active {
				color: $stop-color;
				border-left: 2px solid $stop-color;
			}
		}

		// 右侧
		.right {
			width: 600rpx;
			height: 100%;
			padding: 0 50rpx;
			box-sizing: border-box;
		}
	}
</style>
