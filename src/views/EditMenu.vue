<template>
  <div>
    <h1>Edit Menu</h1>
    <v-text-field
      v-if="menu.edit_title"
      @focusout="$set(menu, 'edit_title', false)"
      label="Menu Name"
      v-model="menu.uid"
    />
    <h2 v-else @click="$set(menu, 'edit_title', true)">{{ menu.uid }}</h2>

    <div v-for="page in menu.pages" :key="page.name">
      <v-row v-if="page.edit" style="width: 20%">
        <v-col>
          <v-text-field v-model="page.name" label="Page Name" />
        </v-col>
        <v-col>
          <v-text-field v-model="page.path" label="Page Path" />
        </v-col>
        <v-col>
          <v-btn @click="$set(page, 'edit', false)">Submit</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="remove_page(page)">Cancel</v-btn>
        </v-col>
      </v-row>
      <span
        v-else
        @mouseover="$set(page, 'delete', true)"
        @mouseleave="$set(page, 'delete', false)"
        @click="$set(page, 'edit', true)"
        >{{ page.name }}: {{ page.path }}
        <span
          class="close"
          v-if="page.delete"
          @click="
            page.new = true;
            remove_page(page);
          "
          >X</span
        ><br
      /></span>
    </div>
    <v-btn @click="menu.pages.push({edit: true, new: true})">+</v-btn>
    <br />
    <v-btn @click="submit">Save Changes</v-btn>
  </div>
</template>

<script>
import {db} from '../firebase';

export default {
  props: {
    old_menu: Object,
  },
  computed: {
    menu() {
      if (this.old_menu) {
        return this.old_menu;
      } else {
        return {
          pages: [
            {
              name: '',
              path: '',
              edit: true,
            },
          ],
          uid: 'New Menu',
        };
      }
    },
  },
  methods: {
    remove_page(page) {
      if (page.new) {
        const index = this.menu.pages.indexOf(page);
        this.menu.pages.splice(index, 1);
      } else {
        this.$set(page, 'edit', false);
      }
    },
    async submit() {
      const uid = this.menu.uid;
      delete this.menu.uid;

      for (const page of this.menu.pages) {
        delete page.delete;
        delete page.edit;
        delete page.new;
      }

      await db
        .collection('menus')
        .doc(uid)
        .set(this.menu);
      alert('Success!');
    },
  },
};
</script>

<style></style>
