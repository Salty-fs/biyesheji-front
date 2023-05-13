<template>
	<view class="mine_contain">
		<view class="head">
<!-- 			<button class="btn" @tap="login"> -->
				<image
				:src = "userInfo.avatarUrl"
				class="img" 
				@tap="login"/>
			<!-- </button> -->
		</view>
		<view class="info">
			<view class="readtime">
				阅读时间          13
			</view>
			<view class="opr">
				
				<OprButton v-for='i in info' :info = "i"/>
			</view>
			<view class="opr">
				<text>关于我们</text>
				<text>免责声明</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useLoginStore } from '@/store/login'
	import OprButton from '../../component/OprButton/OprButton.vue'
	import { computed, reactive, ref } from 'vue'
	import { storeToRefs } from "pinia";

	const {userInfo, isLogin} = storeToRefs(useLoginStore());	
	
	const wxcode = () => {
		return new Promise(function(resolve, reject) {
			uni.login({
				success: (res) => {
					resolve(res.code)
				}
			})
		})
	}
	
	function request(url) {
	  return new Promise((resolve, reject) => {
	    uni.request({
	      url: url,
	      success: (res) => {
	        resolve(res.data);
	      },
	      fail: (err) => {
	        reject(err);
	      }
	    });
	  });
	}
	
	
	async function login() {
		let temp = {}
	 await uni.getUserProfile({
	    desc: '用于完善会员资料',
	    success: (res) => {
			console.log(res)
	      useLoginStore().storeLogin(res.userInfo);
	      temp.avatarUrl = res.userInfo.avatarUrl;
	      temp.nickName = res.userInfo.nickName;
	    },
	    fail: (err) => {
	      // console.log(err);
	    },
		complete: () => {
			dosomething(temp)
		}
	  });
	}
	
	const dosomething = async (temp) => {
	  let data = await wxcode();
	  let user = await request(
	    `https://api.weixin.qq.com/sns/jscode2session?appid=wx28f961d6a97890c1&secret=2853a8796917941bc1086bf35c8813d6&js_code=${data}&grant_type=authorization_code`
	  );
	  temp.uid = user.openid;
	  useLoginStore().storeLogin(temp);
	  let param = await request(`http://localhost:3000/user/${user.openid}`);
	  console.log(temp);
	  if (!param) {
	    uni.request({
	      url: 'http://localhost:3000/user/new',
	      method: 'POST',
	      data: temp,
	      success: () => {},
	    });
	  }
	};


	const info = ref([
		{name: '阅读记录', url: 'aaa'},
		{name: '清空阅读时间', url: 'aaa'},
	])
	
</script>

<style scope lang="less">
	.mine_contain{
		height: 100%;
		width: 100%;
		// background-color: aqua;
		display: flex;
		flex-direction: column;
		.head{
			min-height: 300rpx;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			// background-color: orange;
			.img{
				background-color: azure;
				height: 160rpx;
				width: 160rpx;
				border-radius: 160rpx;
				text-align: center;
			}
		}
		.info{
			flex: 4;
			.readtime{
				margin: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 200rpx;
				border: 10rpx white solid;
				border-radius: 20rpx;
				box-shadow: 0px -2px 0px 0px gray,   /*上边阴影  红色*/

                -2px 0px 0px 0px gray,   /*左边阴影  绿色*/

                2px 0px 0px 0px gray,    /*右边阴影  蓝色*/

                0px 2px 0px 0px gray;    /*下边阴影  黄色*/
				// background-color: orange;

			}
			.opr{
				margin-top: 70rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
