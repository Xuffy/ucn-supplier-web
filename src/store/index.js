import Vue from 'vue';
import Vuex from 'vuex';
import type from './types';

Vue.use(Vuex);

const state = {
  quickLink: {
    draft: {
      show: false,
      url: '',
      params: {}
    },
    recycleBin: {
      show: false,
      url: '',
      params: {}
    },
    log: false,
    show: false,
    list: [],
  },
  layout: {
    hideMenu: false,
    paddingRight: 0
  },
  /*messageBoard: {
    show: true,
    code: null
  }*/
};

const actions = {
  setDraft({ commit }, newData) {
    commit(type.SETDRAFT, newData);
  },
  setRecycleBin({ commit }, newData) {
    commit(type.SETRECYCLEBIN, newData);
  }
};

const mutations = {
  [type.SETDRAFT](state, newData) {
    state.quickLink.draft = newData;
  },
  [type.SETRECYCLEBIN](state, newData) {
    state.quickLink.recycleBin = newData;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
