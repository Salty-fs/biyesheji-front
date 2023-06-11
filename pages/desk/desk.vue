<template>
	<view class="list">
		<uni-notice-bar single color="#2979FF" background-color="#EAF2FF" text="我的书架" />
		<scroll-view scroll-y="true" class="scroll-Y">
			<view @click="p2read(item.bid, item.list)" @longpress="isCollect(item.bid, index)" v-for="item,index in bookList" id="demo1" class="scroll-view-item">
				<image class="scroll-view-item-image" :src="item.img" mode="scaleToFill"></image>
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { useLoginStore } from '@/store/login'
	const { userInfo } = useLoginStore();
	
	export default {
		data() {
			return {
				bookList: []
			};
		},
		onShow() {
			this.getCollectList()
		},
		methods: {
			//获取收藏
			getCollectList(){
				uni.request({
					url:`http://localhost:3000/list/getCollectionListById/${userInfo.uid}`,
					success: (res) => {
						this.bookList = res.data
					}
				})
			},
			
			//阅读跳转
			p2read(id, list){
				uni.navigateTo({
					url:`/pages/read/read?bookid=${id}&list=${list}`
				})
			},
			
			isCollect(bid,index) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定移除该书',
					success: (res) => {
						if (res.confirm) {
							that.decollect(bid,index)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			
			decollect(bid,index){
				let that = this
				uni.request({
					method: 'POST',
					url:'http://localhost:3000/list/decollect',
					data: {
						bid: bid,
						uid: userInfo.uid
					},
					success: () => {
						// this.isCollect = false
						// that.$delete(that.bookList, index)
						that.bookList.splice(index,1)
					}
				})
			},
		},
		
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';

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
			margin-left: 17rpx;
			float: left;
			width: 30%;
			height: 340rpx;
			// border: solid 1rpx #000;
			text-align: center;
			.scroll-view-item-image{
				width: 100%;
				height: 280rpx;
			}
		}
	}
</style>
