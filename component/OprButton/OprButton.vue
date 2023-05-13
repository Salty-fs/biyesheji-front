<template>
	<view >
		<text>{{props.info.name}}</text>
		<text>></text>
	</view>
</template>

<script setup lang="ts">
	interface infoItem {
		name?: String,
		url?: String
	}
	const props = defineProps<{
		info: infoItem
	}>()
</script>

<style>
</style>