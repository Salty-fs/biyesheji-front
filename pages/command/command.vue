<template>
	<view>
		<uni-notice-bar single color="#2979FF" background-color="#EAF2FF" text="不吐不快" />
		<view class="uni-textarea">
			<textarea placeholder="在此输入" v-model="value" auto-height/>
		</view>
		<view class="btn">
			<button class="mini-btn" type="primary" size="mini" @click="submit()">提交</button>
			<button class="mini-btn" type="default" size="mini" @click="quit()">返回</button>
		</view>
	</view>
</template>

<script>
	import { useLoginStore } from '@/store/login'
	// import { storeToRefs } from "pinia";
	
	const { userInfo } = useLoginStore();
	export default {
		data() {
			return {
				score: 0,
				value: '',
				bid: 0
			}
		},
		methods: {
			async submit() {
				if(this.value == '') return
				await uni.request({
					url:`http://localhost:3000/command/new`,
					method: 'POST', 
					data:{
						score: this.score,
						value: this.value,
						bid: this.bid,
						uid: userInfo.uid
					}
				})
				uni.navigateBack()
			},
			quit() {
				uni.navigateBack()
			}
		},
		onLoad(option) {
			this.bid = option.bookid
			this.score = option.value
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		// background-color: #efeff4;
		min-height: 100%;
		height: auto;
		background-color: #f5f5f5;
	}
	.uni-textarea {
		margin: auto;
		width: 90%;
		font-size: 35rpx;
		// background-color: rgb(245,245,245);
	}
	.btn{
		margin: auto;
		margin-top: 100rpx;
		width: 90%;
		display: flex;
		flex-direction: row;
		.mini-btn{
			flex: 1;
		}
	}
	
</style>
