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
    hideMenu: false,
    paddingRight: 0
  },
  dic: '',
};

const actions = {
  setDraft({commit}, params) {
    commit(type.SETDRAFT, params);
  },
  setRecycleBin({commit}, params) {
    commit(type.SETRECYCLEBIN, params);
  },
  setLog({commit}, params) {
    commit(type.SETLOG, params);
  },
  setDic({commit}, params) {
    commit(type.DIC, params);
  }
};

const mutations = {
  [type.SETDRAFT](state, params) {
    params.show = true;
    state.quickLink.draft = params;
  },
  [type.SETRECYCLEBIN](state, params) {
    params.show = true;
    state.quickLink.recycleBin = params;
  },
  [type.SETLOG](state, params) {
    params.show = true;
    params.url = params.url || '/logs/index';
    console.log(params)
    state.quickLink.log = params;
  },
  [type.DIC](state, params) {
    state.dic = params;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
