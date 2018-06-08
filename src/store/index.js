import Vue from 'vue';
import Vuex from 'vuex';
import type from './types';
import {sessionStore} from 'service/store';

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
    log: {
      show: false,
      url: '',
      params: {}
    },
    show: false,
    list: [],
  },
  layout: {
    hideMenu: !!(sessionStore.get('user_action') || {}).hideMenu,
    paddingRight: 0
  },
  dic: '',
};

const actions = {
  setDraft({commit}, newData) {
    commit(type.SETDRAFT, newData);
  },
  setRecycleBin({commit}, newData) {
    commit(type.SETRECYCLEBIN, newData);
  },
  setLog({commit}, newData) {
    commit(type.SETLOG, newData);
  },
  setDic({commit}, newData) {
    commit(type.DIC, newData);
  }
};

const mutations = {
  [type.SETDRAFT](state, newData) {
    newData.show = true;
    state.quickLink.draft = newData;
  },
  [type.SETRECYCLEBIN](state, newData) {
    newData.show = true;
    state.quickLink.recycleBin = newData;
  },
  [type.SETLOG](state, newData) {
    newData.show = true;
    state.quickLink.log = newData;
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
