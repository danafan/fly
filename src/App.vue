<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import resource from './api/resource.js'
	export default {
		name: 'app',
		created(){
			this.$router.replace('/index');
			// resource.testLogin({idd:1}).then(res => {
			// 	this.$router.replace('/index');
			// })
		}
	}
</script>

<style>

</style>
