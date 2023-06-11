<template>
	<view class="contain">
		<scroll-view class="scroll" scroll-y=true>
			<view class="title">{{name}}</view>
			<view class="phare" v-for="item,index in info">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}
			</view>
			<view class="btn">
				<!-- <uni-segmented-control :values="items" @clickItem="onClickItem" /> -->
				<button type="default" size="default" @click="changeSeq(0)">上一章</button>
				<button type="default" size="default" @click="changeSeq(1)">下一章</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { useLoginStore } from '@/store/login'
	// import { storeToRefs } from "pinia";
	
	const { userInfo } = useLoginStore();
	export default {
		data() {
			return {
				bookid: 0,
				bookseq: 1,
				info: [],
				name: '',
			};
		},
		onLoad(option) {
			this.bookid = option.bookid
			// if(option.list) {
			this.bookseq = option.list
			// } else {
			// 	this.bookseq = 1
			// }
			this.getBookContent()
		},
		methods: {
			//获取内容
			getBookContent(){
				uni.request({
					url:`http://localhost:3000/chapter/getBookChapterInfo?bid=${this.bookid}&list=${this.bookseq}&uid=${userInfo.uid}`,
					success: (res) => {
						if(!res.data[0]){
							uni.showToast({
								title:'已到最后一页',
								icon: 'error'
							})
							this.bookseq = parseInt(this.bookseq) - 1
							return
						}
						this.info = res.data[0].info.split('	')
						this.name = res.data[0].name
					}
				})
			},
			
			changeSeq(state) {
				if(state == 0){
					this.bookseq = parseInt(this.bookseq) - 1
					if(this.bookseq < 1) {
						this.bookseq = 1
						uni.showToast({
							title:'已是第一页',
							icon: 'error'
						})
						// break;
						return
					}
				} else {
					this.bookseq = parseInt(this.bookseq) + 1
				}
				this.getBookContent()
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 100,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.contain{
		height: 100vh;
		width: 100%;
		background-color: bisque;
		.scroll{
			background-color: bisque;
			.title{
				margin-left: 40rpx;
				margin-top: 40rpx;
				font-size: 50rpx;
				font-weight: 500;
			}
			.phare{
				margin-inline: 40rpx;
				font-size: 35rpx;
			}
			.btn{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-top: 20rpx;
				padding-bottom: 80rpx ;
			}
		}
	}
	.uni-common-mt {
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;
	}

</style>
