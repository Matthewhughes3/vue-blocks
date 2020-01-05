import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './views/Home';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import {db, auth} from './firebase';
import {collectionData, docData} from 'rxfire/firestore';
import {authState} from 'rxfire/auth';

Vue.config.productionTip = false;

collectionData(db.collection('pages'), 'uid').subscribe(pages => {
  store.state.pages = pages;
});

collectionData(db.collection('menus'), 'uid').subscribe(menus => {
  store.state.menus = menus;
});

docData(db.collection('settings').doc('elements')).subscribe(elements => {
  store.state.elements = elements.elements;
});

docData(db.collection('settings').doc('defaults')).subscribe(async defaults => {
  store.defaults = defaults;

  const index_page = await db
    .collection('pages')
    .doc(defaults.index_page)
    .get();

  const index_route = store.state.pages.filter(page => page.path == '/')[0];

  if (index_route) {
    const index = store.state.pages.indexOf(index_route);
    store.state.pages[index].uid = index_page.id;
    store.state.pages[index].data = index_page.data().data;
  } else {
    const page = {
      uid: index_page.id,
      path: '/',
      data: index_page.data().data,
    };
    store.state.pages.push(page);
  }
});

Vue.mixin({
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
});

let app;

authState(auth).subscribe(user => {
  store.state.user = user;
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
