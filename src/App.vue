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

export default {
	async created() {
		await this.sleep(3000)
		const routes = this.pages.map(page => {
			return {
				name: page['.key'],
				path: page.path,
				component: new Vue({
					name: page['.key'],
					template: `<h1>${page.header}</h1>`
				})
			}
		})
		console.log(routes)
		this.$router.addRoutes(routes)
	}
}
</script>

<style></style>
