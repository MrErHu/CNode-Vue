import {TAB, MUTATION_TYPES} from '../constant'

const topic = {
  namespaced: true,
  state: {
    limit: 20,
    mdrender: false
  },
  mutations: {
    [MUTATION_TYPES.CHANGE_TAB]: function (state, tab) {
      state.tab = tab;
    }
  },
  actions: {

  },
  getters: {

  }
};

export default topic;
