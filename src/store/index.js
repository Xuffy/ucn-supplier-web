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
  dic: {

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
  },
  setDic({ commit }, newData) {
    commit(type.DIC, newData);
  }
};

const mutations = {
  [type.SETDRAFT](state, newData) {
    state.quickLink.draft = newData;
  },
  [type.SETRECYCLEBIN](state, newData) {
    state.quickLink.recycleBin = newData;
  },
  [type.DIC](state, newData) {
    state.dic = newData;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
