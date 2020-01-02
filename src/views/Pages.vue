<template>
  <div>
    <h1>Pages</h1>
		<v-btn @click="$router.push({name: 'edit-page'})">New Page</v-btn>
		<br/>
		<br/>
		<div v-for="page in unique_pages" :key="page.uid">
			<v-btn @click="$router.push({name: 'edit-page', params: {old_page: page}})">{{ page.uid }}</v-btn>
			<br/>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['unique_pages'])
	}
};
</script>

<style></style>
