<template>
	<uni-card :title="basicinfo.name" :sub-title="basicinfo.author" :extra="basicinfo.score" :thumbnail="basicinfo.img" @click="onClick">
		<text class="uni-body">{{basicinfo.info}}</text>
		<view slot="actions" class="card-actions">
			<view class="card-actions-item" @click="allCollect()">
				<uni-icons type="heart" size="18" :color= "!isCollect ? '#999999' : '#ff0000'"></uni-icons>
				<text class="card-actions-item-text">收藏</text>
			</view>
			<view class="card-actions-item" @click="p2read(bookid, seq)">
				<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text">阅读</text>
			</view>
		</view>		
	</uni-card>
	<uni-section title="目录" type="line">
		<template v-slot:right>
			更多
		</template>
		<uni-group mode="card">
			<view v-for="item in mulvList">{{item.name}}</view>
		</uni-group>
	</uni-section>
	<uni-section title="书评" type="line" >
		<text class="command">轻触评论</text>
		<view class="command">
			<uni-rate :touchable="false" :value="5" @change="onChange" />
		</view>
	</uni-section>
	<view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
			@scrolltolower="lower" @scroll="scroll">
			<uni-card v-for="item in pinglunList" :title="item.name" :isFull="true" :sub-title="item.time" :extra="item.score" :thumbnail="item.avator">
				<text class="uni-body">{{item.command}}</text>
			</uni-card>
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
				mulvList: [],
				pinglunList: [],
				basicinfo: {},
				isCollect: false,
				seq:0
			}
		},
		onLoad(option) {
			this.bookid = option.bookid
			this.getMulv()
			this.getPinglun(),
			this.getBookBasic(),
			this.iscollect()
		},
		methods: {
			onChange(e){
				uni.navigateTo({
					url:`/pages/command/command?bookid=${this.bookid}&value=${e.value}`
				})
			},
			
			//目录获取
			getMulv(){
				uni.request({
					url:`http://localhost:3000/chapter/getBookChapterMuLvById/${this.bookid}`,
					success: (res) => {
						this.mulvList = res.data
					}
				})
			},
			
			//评论获取
			getPinglun(){
				uni.request({
					url:`http://localhost:3000/command/getBookCommandById/${this.bookid}`,
					success: (res) => {
						this.pinglunList = res.data
					}
				})
			},
			
			//书籍详情
			getBookBasic(){
				uni.request({
					url:`http://localhost:3000/book/getBookById/${this.bookid}`,
					success: (res) => {
						this.basicinfo = res.data
					}
				})
			},
			
			//收藏
			collect(){
				uni.request({
					method: 'POST',
					url:'http://localhost:3000/list/collect',
					data: {
						bid: this.bookid,
						uid: userInfo.uid
					},
					success: () => {
						this.isCollect = true
					}
				})
			},
			
			//取消收藏
			decollect(){
				uni.request({
					method: 'POST',
					url:'http://localhost:3000/list/decollect',
					data: {
						bid: this.bookid,
						uid: userInfo.uid
					},
					success: () => {
						this.isCollect = false
					}
				})
				
				console.log(this.isCollect)
			},
			
			//是否收藏
			iscollect(){
				uni.request({
					method: 'POST',
					url:'http://localhost:3000/list/iscollect',
					data: {
						bid: this.bookid,
						uid: userInfo.uid
					},
					success: (res) => {
						// console.log(res.data)
						if(res.data[0].count == 0) {
							this.seq = 1
							this.isCollect = false 
						}else {
							this.isCollect = true
							this.seq = res.data[0].list
						}
					}
				})
			},
		
			//判断收藏
			allCollect(){
				if(!this.isCollect){
					this.collect()
				}
				if(this.isCollect) {
					this.decollect()
				}
			},
			
			p2read(id, list){
				uni.navigateTo({
					url:`/pages/read/read?bookid=${id}&list=${list}`
				})
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uni-scss/index.scss';
	.card-actions{
		display: flex;
		flex-direction: row;
		.card-actions-item {
			text-align: center;
			flex: 1;
		}
	}
	.command{
		display: flex; justify-content: center; align-items: center;
	}
</style>