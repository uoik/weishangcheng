<template>
	<view>
		<view class="goodsDetail">
			<!-- 轮播图 -->
			<uni-swiper-dot :info="dateilInfo.imgSrc" :current="current" mode="nav">
				<swiper autoplay circular @change="change">
					<swiper-item v-for="(item, i) in dateilInfo.imgSrc" :key='item.src'>
						<image mode="aspectFit" :src="item.src"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<!-- 详情信息 -->
			<view class="goodsInfo">
				<view class="tit">{{dateilInfo.name}}</view>
				<view class="info">
					<text>
						「{{dateilInfo.info}}」
					</text>
					<text>
						{{dateilInfo.describe}}
					</text>
				</view>
				<view class="price">
					<text><text class="symbol">￥</text>{{dateilInfo.price}}</text>
					<text><text class="symbol">￥</text>{{dateilInfo.oldPrice}}</text>
				</view>
			</view>
		</view>
		
		<!-- 用户评价 -->
		<view class="user_evaluation">
			<userEvaluation @evaluate='evaluateBtn' :tagsData='tagsData' :evaluaData='evaluaData'></userEvaluation>
		</view>
		
		<!-- 商品配置选项 -->
		<view class="params">
			<uni-popup ref="popup" type="param">
				<!-- 自定义组件 -->
				<uni-popup-param @confirm='confirm' @selectSpeci='selectSpeci' :speciData='dateilInfo.speciData' :name='dateilInfo.name'></uni-popup-param>
			</uni-popup>
		</view>

		<!-- 商品导航 -->
		<view class="goodsNav">
			<goods-nav :icon_list='iconList' @handleIcon='onClick' @handClick='buttonClick'></goods-nav>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	
	import goodsNav from '@/components/goodsNavComp/goodsNavComp.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupParam from '@/components/uni-popup/uni-popup-param.vue'
	import userEvaluation from '@/components/userEvaluationComp/userEvaluationComp.vue'
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	
	export default {
		data() {
			return {
				// 商品详情数据
				dateilInfo: [],
				// 标签数据
				tagsData: {},
				// 用户评价
				evaluaData: [],
				// 底部导航状态
				iconList: [{
					id: 1,
					text: '客服',
					icon: 'icon-kefu'
				}, {
					id: 2,
					text: '喜欢',
					icon: 'icon-xihuan1'
				}, {
					id: 3,
					text: '购物车',
					icon: 'icon-gouwuche',
					number: 0
				}],
				current: 0
			}
		},
		computed: {
			...mapGetters('shopping', ['getShopNumber'])
		},
		methods: {
			...mapActions('shopping', ['addShopInfo']),
			async getdata() {
				// 根据ID请求商品详情数据
				this.dateilInfo = await this.$api('dateilInfo');
				// 标签数据
				this.tagsData = await this.$api('tagsData');
				// 用户评价
				this.evaluaData = await this.$api('evaluaData');
				return true;
			},
			
			// 轮播图指示点索引
			change(e){
				this.current = e.detail.current;
			},

			// 底部导航事件
			onClick(e) {
				// 判断点击了那个按钮
				if(e.value == '客服'){
					// 跳转页面
					uni.navigateTo({
						url: '../nolink/nolink?param=' + e.value
					})
				}else if(e.value == '喜欢'){
					// 判断是否选中状态
					let active = 'icon-xihuan4-copy';
					let notActive = 'icon-xihuan1';
					if(this.iconList[e.index].icon.includes(active)){
						this.iconList[e.index].icon = notActive
					}else {
						this.iconList[e.index].icon = active
					}
				}else if(e.value == '购物车'){
					// 跳转页面
					uni.switchTab({
						url: '../shopping/shopping'
					})
				}
			},
			// 映射购物车数量
			mapShopNumber(){
				this.iconList[2].number = this.getShopNumber;
			},
			// 加入购物车按钮
			buttonClick() {
				this.$refs.popup.open()
			},
			// 选择规格回调
			selectSpeci({oneIndex, twoIndex, cb}){
				this.dateilInfo.speciData[oneIndex].data.forEach((item, i) => {
					if(twoIndex === i){
						item.active = true
					}else {
						item.active = false
					}
				});
				cb();
			},
			// 确定加入购物车回调
			async confirm(params){
				let {url, color, number, price, version, name} = params;
				let result = {
					id: this.$random(),
					checked: false,
					url,
					title: name,
					specific: color +' '+ version,
					price,
					number
				}
				await this.addShopInfo(result);
				this.mapShopNumber(); // 添加一个商品后重新映射购物车数量
			},
			// 跳转评价页面
			evaluateBtn(){
				uni.navigateTo({
					url: '../evaluate/evaluate'
				})
			}
		},
		components: {
			goodsNav,
			uniPopup,
			uniPopupParam,
			userEvaluation,
			uniSwiperDot
		},
		onLoad(id) {
			console.log(id)
			this.getdata();
			this.mapShopNumber();
		}
	}
</script>

<style lang="scss">
	page{
		background: $bg-color;
		margin-bottom: 100rpx;
	}
	.goodsDetail {
		background: $bg-white;
		margin-bottom: 20rpx;
		// 轮播图样式
		swiper {
			width: 750rpx;
			height: 600rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		// 商品信息
		.goodsInfo {
			border-top: 1px solid $shallow-border;
			padding: 30rpx;

			.tit {
				color: $deep-font;
				font-size: 35rpx;
				padding: 10rpx 0;
			}

			.info {
				padding: 10rpx 0;
				font-size: 24rpx;
				color: $shallow-font;

				text:nth-child(1) {
					color: $stop-color;
				}
			}

			.price {
				padding: 10rpx 0;
				color: $stop-color;
				font-size: 46rpx;

				.symbol {
					font-size: 26rpx;
				}

				text:nth-child(2) {
					margin-left: 10rpx;
					font-size: 26rpx;
					color: $shallow-font;
					text-decoration: line-through;
				}
			}
		}
		
		// 商品参数选择
		.params{
			.param_info{
				height: 300rpx;
				background: $bg-white;
			}
		}
	}
</style>
