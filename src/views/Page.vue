<template>
	<div>
		<h1 v-if="header">{{ header }}</h1>
	</div>
</template>

<script>
	export default {
		props: {
			header: String
		}
	}
</script>

<style>
	
</style>

