import Vuex from 'vuex';
import Vue from 'vue'
import topic from './topic';
import login from './login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    topic,
    login
  }
})
