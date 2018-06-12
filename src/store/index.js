import Vue from 'vue';
import Vuex from 'vuex';
import type from './types';
import {sessionStore} from 'service/store';

Vue.use(Vuex);

const state = {
  quickLink: {
    draft: {
      show: false
    },
    recycleBin: {
      show: false
    },
    log: {
      show: false
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
    params.path = params.path || '/logs/index';
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
