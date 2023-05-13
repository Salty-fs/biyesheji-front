import {
	defineStore
} from 'pinia'
import {
	ref,reactive
} from 'vue'

export const useLoginStore = defineStore('loginStore', () => {
	const userInfo = reactive({
		avatarUrl: '../../static/logo.png',
		nickName: '',
		uid: ''
	})
	const isLogin = ref(false)
	
	
	
	// const getUserByopenid = (uid) => {
	// 	userInfo.uid = uid
	// 	new Promise(function(resolve, reject){
	// 		uni.request({
	// 			url: `http://localhost:3000/user/${uid}`,
	// 			success: (res) => {
	// 				return res
	// 			}
	// 		})
	// 	})		
	// }
	
	const storeLogin = (obj) => {
		if(obj.avatarUrl){
			userInfo.avatarUrl = obj.avatarUrl
		}
		if(obj.nickName){
			userInfo.nickName = obj.nickName
		}
		if(obj.uid){
			userInfo.uid = obj.uid
		}
	}
	
	return {
		userInfo, isLogin, storeLogin
	}
	
})