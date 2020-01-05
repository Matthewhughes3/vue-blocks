<template>
  <div>
    <h1>Menus</h1>
		<!--TODO: finish functionality for adding new menu-->
		<!--<v-btn @click="$router.push({name: 'edit-menu'})">New Menu</v-btn>-->
    <div v-for="menu in menus" :key="menu.uid">
			<v-btn @click="$router.push({name: 'edit-menu', params: {old_menu: menu}})">{{ menu.uid }}</v-btn>
      <br />
    </div>
		<br/>
		<v-select style="width: 20%" :items="menu_names" @change="change_default" v-model="defaults.menu"/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {db} from '../firebase'

export default {
  computed: {
    ...mapState(['menus', 'defaults']),
		menu_names() {
			return this.menus.map(menu => menu.uid)
		}
  },
	methods: {
		async change_default(value) {
			await db.collection('settings').doc('defaults').update({menu: value})
			alert('Success!')
		}
	}
};
</script>

<style></style>
