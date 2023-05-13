<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* @import '@/uni_modules/uni-scss/index.scss'; */
	uni-page-body,html,body{  
	            height: 100%;  
	}
	page {
	    display: flex;
	    flex-direction: column;
	    height: 100%;
	}
	/*每个页面公共css */
</style>
