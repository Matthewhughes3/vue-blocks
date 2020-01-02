<template>
  <div>
    <h1>Edit Page</h1>
    <v-text-field v-model="page.uid" placeholder="Page Title" />
    <v-text-field v-model="page.path" placeholder="Page Link" />
    <v-btn @click="save">Save Changes</v-btn>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
	data() {
		return {
			uid: null
		}
	},
  props: {
    old_page: Object,
  },
  computed: {
    page() {
      if (this.old_page) {
        return this.old_page;
      } else {
        return {
          uid: '',
          path: '',
          data: [],
        };
      }
    },
  },
	methods: {
		async save() {
			const uid = this.page.uid
			delete this.page.uid

			if(this.old_page) {
				if(this.uid != uid) {
					await db.collection('pages').doc(this.uid).delete()
					this.uid = uid
				}
				await db.collection('pages').doc(this.uid).set(this.page)
			} else {
				await db.collection('pages').doc(uid).set(this.page)
			}
		}
	},
	created() {
		if(this.old_page) {
			this.uid = this.old_page.uid
		}
	}
};
</script>

<style></style>
