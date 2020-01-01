import Vue from 'vue';
import Vuex from 'vuex';
import Page from '../views/Page';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pages: [],
    user: null,
		elements: []
  },
  getters: {
    routes: state => {
      return state.pages.map(page => {
        return {
          name: page.uid,
          path: page.path,
          component: Page,
        };
      });
    },
    route_paths: state => {
      const route_paths = state.pages.map(page => page.path);
      route_paths.push('/');
      return route_paths;
    },
  },
});

export default store;
