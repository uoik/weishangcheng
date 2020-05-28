<template>
	<view class="home">
		<view class="header">
			<!-- 搜索框 -->
			<uni-search-bar cancelButton='none' class="search" bgColor='#ffffff' :radius="100" @confirm="search"></uni-search-bar>
			<!-- 首页轮播图 -->
			<uni-swiper-dot class="swiper-dot" :info="swipers" :current="current" mode="default" :dotsStyles='swiperStyle'>
				<swiper autoplay circular @change="change">
					<swiper-item @click='detailBtn(swiper.id)' v-for="swiper in swipers" :key='swiper.id'>
						<image :src="swiper.url"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		
		<!-- 导航栏 -->
		<view class="nav">
			<view @click="navBtn(nav.text)" v-for="nav in navs" class="nav_item" :key='nav.id'>
				<view class='iconfont' :class="nav.icon"></view>
				<text>{{nav.text}}</text>
			</view>
		</view>

		<!-- 推荐商品 -->
		<view class="hot-goods">
			<view class="title">推 荐 商 品</view>
			<view class="goods_list">
				<view class="goods_item" @click='detailBtn(good.id)' v-for="good in goods" :key='good.id'>
					<view class="img">
						<image mode='aspectFit' :src="good.url"></image>
					</view>
					<view class="detail">
						<view class="i_title">{{good.title}}</view>
						<view class="i_detail">{{good.detail}}</view>
						<view class="i_price">
							<text>{{good.price}}元起</text>
							<text v-if="good.oldPrice">{{good.oldPrice}}元</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		data() {
			return {
				swipers: [], // 轮播图数据
				current: 0, // 轮播图索引
				swiperStyle: {
					selectedBackgroundColor: '#FFF'
				}, // 指示点样式
				navs: [],
				goods: []
			}
		},
		components: {
			uniSearchBar,
			uniSwiperDot
		},
		onLoad() {
			this.getSwipers();
			this.getNavs();
			this.getGoods();
		},
		methods: {
			// 请求轮播图数据
			async getSwipers() {
				// 请求...
				const result = await this.$api('swipers');
				this.swipers = result;
				return true;
			},

			// 请求导航栏数据
			async getNavs() {
				const result = await this.$api('navs');
				this.navs = result;
				return true;
			},

			// 请求推荐商品数据
			async getGoods() {
				const result = await this.$api('goods');
				this.goods = result;
				return true;
			},
			
			// 搜索框
			search(value){
				console.log(value);
			},
			
			// 轮播图指示点索引
			change(e){
				this.current = e.detail.current;
			},

			// 页面未开发完成
			navBtn(param) {
				uni.navigateTo({
					url: '../nolink/nolink?param=' + param
				})
			},

			// 跳转详情页
			detailBtn(id) {
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		background: $bg-color;
		
		// 头部样式
		.header{
			box-sizing: border-box;
			padding: 0 20rpx;
			margin-bottom: 60rpx;
			/* #ifdef MP-WEIXIN */
			margin-bottom: 20rpx;
			/* #endif */
			border-radius: 0 0 375rpx 375rpx / 0 0 30rpx 30rpx;
			background: $stop-color;
			position: relative;
			
			// 搜索框样式
			.search{
				background: none;
				padding-top: var(--status-bar-height);
				transform: translateY(30rpx);
				// 条件编译：微信小程序需要深入内部修改组件样式
				/* #ifdef MP-WEIXIN */
				.uni-searchbar{
					background: none;
					padding-top: calc(var(--status-bar-height) + 20rpx);
					padding-bottom: 20rpx;
				}
				/* #endif */
				// 条件编译：除了H5外，其它端需要向上撑开48rpx
				/* #ifdef H5 */
				padding-top: 20rpx;
				/* #endif */
			}
			
			// 轮播图样式
			.swiper-dot{
				transform: translateY(40rpx);
				swiper {
					border-radius: 20rpx;
					overflow: hidden;
					width: 710rpx;
					height: 320rpx;
				
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		// 导航栏样式
		.nav {
			display: flex;
			background: $bg-white;
			margin: 0 20rpx;
			padding-bottom: 15rpx;
			border-radius: 20rpx;

			.nav_item {
				text-align: center;
				width: 20%;
				margin: 30rpx auto 0;

				view {
					margin: auto;
					width: 80rpx;
					height: 80rpx;
					background: $stop-color;
					line-height: 80rpx;
					border-radius: 20rpx;
					color: $white-font;
					font-size: 50rpx;
				}

				text {
					font-size: 20rpx;
				}
			}
		}

		// 推荐商品
		.hot-goods {
			margin-top: 15rpx;
			padding: 0 20rpx;
			.title {
				border-radius: 20rpx;
				color: $stop-color;
				background: $bg-white;
				height: 40px;
				text-align: center;
				line-height: 40px;
			}

			.goods_list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.goods_item {
					border-radius: 20rpx;
					background: $bg-white;
					box-sizing: border-box;
					margin-top: 15rpx;
					width: 350rpx;
					text-align: center;
				}

				.img {
					height: 400rpx;

					image {
						width: 100%;
						height: 100%;
						margin: 0 auto;
						display: block;
					}
				}

				.detail {
					padding: 0 20rpx 30rpx;

					.i_title {
						font-size: 28rpx;
					}

					.i_detail {
						font-size: 20rpx;
						color: $shallow-font;
						margin: 10rpx 0;
					}

					.i_price {
						font-size: 28rpx;
						color: $stop-color;

						text:nth-child(2) {
							color: $shallow-font;
							text-decoration: line-through;
							font-size: 26rpx;
							margin-left: 15rpx;
						}
					}
				}
			}
		}
	}
</style>
