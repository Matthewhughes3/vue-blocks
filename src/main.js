import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { db } from './firebase'

Vue.config.productionTip = false

Vue.use(VueFirestore)

Vue.mixin({
	firestore: {
		pages: db.collection('pages')
	},
	methods: {
		sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms))
		}
	}
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
