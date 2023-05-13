<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots=true autoplay=true interval=3000 easing-function=easeInOutCubic
				:duration="duration">
				<swiper-item v-for="item, index in bannerList" @click="p2detail(item.bid)">
					<!-- <view class="swiper-item uni-bg-red"> -->
					<view class="swiper-item">
						<image :src="item.img" />
					</view>
				</swiper-item>
			</swiper>
			<!-- <view>{{userInfo.uid}}</view> -->
		</view>
	</view>
	<view class="list">
		<uni-notice-bar single color="#2979FF" background-color="#EAF2FF" text="高分推荐" />
		<scroll-view scroll-y="true" class="scroll-Y">
			<view @click="p2detail(item.bid)" v-for="item,index in introduceList" id="demo1" class="scroll-view-item">
				<image class="scroll-view-item-image" :src="item.img" mode="scaleToFill"></image>
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				introduceList: []
			}
		},
		onLoad() {
			this.getBannerList(),
			this.getHighScoreBookList()
		},
		methods: {
			async getBannerList() {
				uni.request({
					url:'http://localhost:3000/advertise/getAdvertise',
					success: (res) => {
						this.bannerList = res.data
					}
				})
			},
			p2detail(id) {
				uni.navigateTo({
					url:`/pages/detail/detail?bookid=${id}`
				})
			},
			getHighScoreBookList(){
				uni.request({
					url:'http://localhost:3000/book/getHighScorebooks',
					success: (res) => {
						this.introduceList = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uni-scss/index.scss';
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	.scroll-Y{
		.scroll-view-item{
			margin-left: 50rpx;
			float: left;
			width: 40%;
			height: 400rpx;
			// border: solid 1rpx #000;
			text-align: center;
			.scroll-view-item-image{
				width: 100%;
				height: 340rpx;
			}
		}
	}
	.uni-bg-red{
		background-color: red;
	}
	.uni-bg-green{
		background-color: green;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
		.uni-margin-wrap {
			width: 690rpx;
			width: 100%;
		}
		.swiper {
			height: 300rpx;
		}
		.swiper-item {
			display: block;
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;
		}
		.swiper-list {
			margin-top: 40rpx;
			margin-bottom: 0;
		}
		.uni-common-mt {
			margin-top: 60rpx;
			position: relative;
		}
		.info {
			position: absolute;
			right: 20rpx;
		}
		.uni-padding-wrap {
			width: 550rpx;
			padding: 0 100rpx;
		}
</style>
