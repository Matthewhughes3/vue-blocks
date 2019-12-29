<template>
  <v-app id="app">
    <div>
      <a
        v-for="page in pages"
        :key="page['.key']"
        @click="$router.push({name: page['.key']})"
        >{{ page['.key'] }}</a
      >
    </div>
    <router-view />
  </v-app>
</template>

<script>
import Vue from 'vue'
import Page from './views/Page'

export default {
	async created() {
		await this.sleep(5000)
		const routes = this.pages.map(page => {
			return {
				name: page['.key'],
				path: page.path,
				props: { header: page.header },
				component: Page
			}
		})
		console.log(routes)
		this.$router.addRoutes(routes)
	}
}
</script>

<style></style>
