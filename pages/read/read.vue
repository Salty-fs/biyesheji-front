<template>
	<view class="contain">
		<scroll-view class="scroll" scroll-y=true>
			<view class="title">{{name}}</view>
			<view class="phare" v-for="item,index in info">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}
			</view>
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :values="items" @clickItem="onClickItem" />
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
				items: ['上一章', '下一章'],
				current: 0
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
						this.info = res.data[0].info.split('	')
						this.name = res.data[0].name
					}
				})
			},
			
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				if(this.current == 0){
					if(this.bookseq >= 2){
						this.bookseq = parseInt(this.bookseq) - 1
						this.getBookContent()
						uni.pageScrollTo({
						    scrollTop: 0,
						    duration: 100,
						});
					}
				} else {
					this.bookseq = parseInt(this.bookseq) + 1
					this.getBookContent()
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: 100,
					});
				}
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
