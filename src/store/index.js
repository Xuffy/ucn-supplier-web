import Vue from 'vue';
import Vuex from 'vuex';
import type from './types';
import {sessionStore} from 'service/store';

Vue.use(Vuex);

const initialState = {
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
    list: []
  },
  layout: {
    hideMenu: false,
    paddingRight: 0
  },
  menuLink: {
    list: []
  },
  dic: ''
};

const actions = {
  /**
   * 设置menu 链接
   * @param commit
   * @param params  数据：{path:'',query:'',label:'',type:1}
   */
  setMenuLink({commit}, params) {
    console.log(params)
    commit(type.SETMENULINK, params);
  },
  setDraft({commit}, params) {
    console.error('setDraft 函数已更改为：setMenuLink');
    // commit(type.SETDRAFT, params);
  },
  setRecycleBin({commit}, params) {
    console.error('setRecycleBin 函数已更改为：setMenuLink');
    // commit(type.SETRECYCLEBIN, params);
  },
  setLog({commit}, params) {
    console.error('setLog 函数已更改为：setMenuLink');
    // commit(type.SETLOG, params);
  },
  setDic({commit, state}, params) {
    let dic = state.dic && Array.isArray(state.dic) ? state.dic : [];
    if (Array.isArray(params)) {
      let validCodes = params.filter(c => c.code && c.codes && Array.isArray(c.codes));
      let toAddCodes = validCodes.map(c => c.code);
      dic = dic.filter(c => !toAddCodes.includes(c.code)).concat(validCodes);
    } else if (params.code && params.codes && Array.isArray(params.codes)) {
      let existsItem = dic.filter(c => c.code === params.code)[0];
      if (existsItem) {
        existsItem.codes = params.codes;
      } else {
        dic.push(params);
      }
    }
    commit(type.DIC, dic);
  }
};

const mutations = {
  [type.SETMENULINK](state, params) {
    params = _.isObject(params) ? [params] : params;
    state.menuLink.list = _.sortBy(state.menuLink.list.concat(params), val => {
      if (val.type === 100) {// log 设置
        val.path = val.path || '/logs/index';
      }
      return val.type
    });
  },
  /*[type.SETRECYCLEBIN](state, params) {
    params.show = true;
    state.quickLink.recycleBin = params;
  },*/
  /*[type.SETDRAFT](state, params) {
    params.show = true;
    state.quickLink.draft = params;
  },
  [type.SETLOG](state, params) {
    params.show = true;
    params.path = params.path || '/logs/index';
    state.quickLink.log = params;
  },*/
  [type.DIC](state, params) {
    state.dic = params;
  }
};

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations
});
