<template>
	<view class="content">
		<view class="search" >
			<uni-section>
				<uni-easyinput suffixIcon="search" v-model="select" placeholder="搜索" @iconClick="iconClick()"></uni-easyinput>
			</uni-section>
		</view>
		<view class="info">
			<view class="ca">
				<li style="margin-top: 30rpx;" v-for="item in catorgy" @click="selectByCa(item.info)">
					{{item.info}}
				</li>
			</view>
			<scroll-view scroll-y="true" class="book-area">
				<uni-card v-for="book in books" :title="book.name" :sub-title="book.author" :extra="book.score" :thumbnail="book.img" @click="p2detail(book.bid)">
					<text class="uni-body">{{book.info}}</text>
				</uni-card>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from 'vue';
	
	const select = ref('')
	const iconClick = () =>{
		uni.request({
			url:`http://localhost:3000/book/getBookListByName/${select.value}`,
			success: (res) => {
				books.value = res.data
				console.log(books.value)
			}
		})
	}
	const selectByCa = (ca) => {
		uni.request({
			url:`http://localhost:3000/book/getBookByCategory/${ca}`,
			success: (res) => {
				books.value = res.data
				console.log(books.value)
			}
		})
	}
	
	const catorgy = ref([{id:1,info:'玄幻'},{id:2,info:'言情'},{id:3,info:'武侠'},{id:4,info:'名著'}])
	const books = ref([])
	
	const p2detail = (id) => {
		uni.navigateTo({
			url:`/pages/detail/detail?bookid=${id}`
		})
	}
	
</script>

<style scoped>
	.content{
		height: 100%;
	}
	.search{
		width: 90%;
		margin: auto;
	}
	.info{
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.ca{
		flex: 1;
		/* background-color: aqua; */
		text-align: center;
		/* max-height: 100%; */
	}
	.book-area{
		flex: 4;
	}
</style>