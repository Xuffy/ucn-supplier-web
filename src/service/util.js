import DateFormat from 'dateformat';
import {localStore, sessionStore} from 'service/store';
import database from '../database/index';
import language from '../language/index';
import router from 'service/router'
import _config from "./config";
import store from '@/store';
import {Message, MessageBox} from 'element-ui';

export default {
  install(Vue, options) {
    /**
     * 本地永久缓存
     */
    Vue.prototype.$localStore = localStore;

    /**
     * 本地会话缓存
     */
    Vue.prototype.$sessionStore = sessionStore;

    /**
     * 格式化日期
     */
    Vue.prototype.$dateFormat = DateFormat;

    /**
     * 国际化语言配置
     */
    Vue.prototype.$i = language;

    /**
     * 字段配置
     */
    Vue.prototype.$db = database;

    /**
     * 字段配置
     * @param db
     * @param data
     * @param cb
     * @returns {Array}
     */
    Vue.prototype.$getDB = (db, data, cb) => {

      let list = [];
      db = _.values(db);
      _.map(data, (value, index) => {
        let obj = {};
        _.map(db, val => {
          let dv = value[val.key]
            , cd = _.clone(val);
          if (!_.isUndefined(dv) || val._important) {
            cd.value = _.isUndefined(dv) ? '' : dv;
            obj[val.key] = cd;
          }
        });
        if (cb) obj = _.extend(obj, cb(obj, index));
        list.push(obj);
      });
      return list;
    };

    /**
     * 生成唯一标识
     * @returns {string}
     */
    Vue.prototype.$getUUID = () => {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }

    /**
     * 字节转换
     * @returns {string}
     */
    Vue.prototype.$bytesConvert = (val) => {
      if (val === 0) {
        return '0 B'
      }

      let k = 1024
        , sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        , i = Math.floor(Math.log(val) / Math.log(k));

      return (val / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }

    /**
     * table 数据过滤
     * @type {{contrast(*=, *=): *, setHighlight(*=): *, setHideSame(*=): *}}
     */
    Vue.prototype.$table = {
      contrast(data, type) {
        if (_.isEmpty(data)) return [];

        let first = data[0], keyData = {};

        _.map(data, value => {
          _.mapObject(value, (val, key) => {
            if (type === 'same' && first[key]) {
              keyData[key] = first[key].value === val.value;
            } else if (type === 'def' && first[key] && first[key].value !== val.value) {
              keyData[key] = true;
            }
          });
        });
        return keyData;
      },
      setHighlight(data) {
        let keyData = this.contrast(data, 'def')
          , len = _.values(keyData).length
          , i = 0;
        keyData = _.mapObject(keyData, (val) => {
          let z = 200 - ((255 / len) * i);
          val = `rgba(${z},255,255,1)`;
          i++;
          return val;
        });
        return _.map(data, value => {
          return _.mapObject(value, (val, key) => {
            val._highlight = keyData[key] || '';
            return val;
          });
        });
      },
      setHideSame(data) {
        let keyData = this.contrast(data, 'same');
        return _.map(data, value => {
          return _.mapObject(value, (val, key) => {
            if (keyData[key]) {
              val._hide = keyData[key];
            }
            return val;
          });
        });
      }
    };
    /**
     * 删除带有前缀下划线数据
     */
    const deleteArr = (list, fieldRemark) => {
      _.map(list, item => {
        if (item) deleteObject(item);
        if (item[fieldRemark]) deleteObject(item[fieldRemark]);
      });
    };

    const deleteObject = (list, fieldRemark, details) => {
      _.mapObject(list, (val, key) => {
        if (key.substring(0, 1) === '_') delete list[key];
        if (list[fieldRemark]) deleteObject(list[fieldRemark]);
        if (key === details) deleteArr(list[details], fieldRemark)
      });
    };

    Vue.prototype.$filterModify = (list, remark, children) => {
      let fieldRemark = remark || 'fieldRemark',
        details = children || 'details';
      if (_.isObject(list, details)) deleteObject(list, fieldRemark, details);
      if (_.isArray(list)) _.map(list, fieldRemark, details);
      return list;
    };
    /**
     * 时区转换 传入时区 如 0 8 -1
     */
    Vue.prototype.$getLocalTime = (i) => {
      if (typeof i !== 'number') return;
      const d = new Date(),
        len = d.getTime(),
        offset = d.getTimezoneOffset() * 60000,
        utcTime = len + offset;
      return new Date(utcTime + 3600000 * i);
    }

    /**
     *
     * @param arr
     * @returns {Uint8Array | any[] | Int32Array | Uint16Array | Uint32Array | Float64Array | any}
     */
    Vue.prototype.$copyArr = (arr) => {
      return arr.map((e) => {
        if (typeof e === 'object') {
          return Object.assign({}, e)
        } else {
          return e
        }
      })
    }


    /**
     * 用户行为缓存
     * @type {{set(*, *): void, get(*): *}}
     */
    Vue.prototype.$userAction = {
      set(key, value) {
        let ua = sessionStore.get('user_action') || {};
        ua[key] = value;
        sessionStore.set('user_action', ua);
      },
      get(key) {
        let ua = sessionStore.get('user_action') || {};
        return ua[key];
      }
    }


    /**
     * 转换表格中需要由字典表数据来转换的数据
     * */
    Vue.prototype.$change = (obj, code, e, isString) => {
      let data, value;

      value = e[code].value;

      data = _.findWhere(obj, {code: isString ? String(value) : value});

      return data || '';
    };

    /**
     * 深拷贝
     * @param data
     * @returns {*}
     */
    Vue.prototype.$depthClone = (data) => {
      return data ? JSON.parse(_.clone(JSON.stringify(data))) : data;
    };

    Vue.prototype.$filterDic = (data, transForm = 'transForm', dataBase = 'dataBase') => {
      _.mapObject(data, (val, k) => {
        val.dataType = typeof val.value;
        if (_.isBoolean(val.value)) {
          val.value ? val.value = 1 : val.value = 0;
        }
        val[dataBase] = val.value;
        if (val[transForm] && !data._remark && ['entryDt', 'updateDt', 'fieldDisplay'].indexOf(k) < 0) {
          switch (val[transForm]) {
            case 'time':
              val.value = DateFormat(val.value, val.time ? val.time : 'yyyy-dd-mm');
              break;
            default:
              if (!store.state.dic.length) return;
              let dic = _.findWhere(store.state.dic, {'code': val[transForm]});
              if (!dic || !dic.codes) return;
              val._option = dic.codes;
              let code = _.findWhere(val._option, {'code': val[dataBase] + ''});
              if (code) {
                val._value = code.name || code[val.name];
                val.value = code.code;
                val[dataBase] = val.value;
              }
          }
        }
      });
      return data;
    };

    /**
     * $window.open
     */
    const serialization = (params) => {
      const result = []
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          result.push(`${key}=${element}`)
        }
      }
      return result.join('&')
    };

    Vue.prototype.$windowOpen = (config) => {
      let url = `//${window.location.host}/#${config.url}`, p = {};
      if (!_.isEmpty(config.params) && !config.params.length) {
        _.mapObject(config.params, (val, key) => {
          if (url.indexOf(`{${key}}`) < 0) {
            p[key] = val;
          }
        });
      }
      url = _.template(url)(config.params || {});
      return window.open(`${url}?${serialization(p)}`, '_blank');
    };
    Vue.prototype.$mul = function(){ 
      //解决JS 精度问题 乘法
      let m = 0, 
          s2 = '',
          strArr = 1
          
      for (let i = 0; i < arguments.length; i++) {
          if (arguments[i].toString().indexOf('.') > 0) {
              m += arguments[i].toString().split(".")[1].length;
              arguments[i] = Number(arguments[i].toString().replace(".", ""));
          }

          strArr *= Number(arguments[i]);
      }

      return strArr / Math.pow(10, m);
    },
    Vue.prototype.$sub = (num1, num2) =>{  
      //解决JS 精度问题(减法)
      let baseNum, 
          baseNum1, 
          baseNum2,
          precision // 精度

      try {
          baseNum1 = num1.toString().split(".")[1].length;
      } 
      catch (e) {
          baseNum1 = 0;
      }

      try {
          baseNum2 = num2.toString().split(".")[1].length;
      } 
      catch (e) {
          baseNum2 = 0;
      }

      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
      precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;

      return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    Vue.prototype.$numDiv = (num1, num2) =>{
      //除法
      var baseNum1 = 0, baseNum2 = 0;
      var baseNum3, baseNum4;
      try {
        baseNum1 = num1.toString().split(".")[1].length;
      } catch (e) {
        baseNum1 = 0;
      }
      try {
        baseNum2 = num2.toString().split(".")[1].length;
      } catch (e) {
        baseNum2 = 0;
      }
      baseNum3 = Number(num1.toString().replace(".", ""));
      baseNum4 = Number(num2.toString().replace(".", ""));
      return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    },
    Vue.prototype.$numAdd = (num1, num2)=>{
      // 加法
      var baseNum, 
          baseNum1, 
          baseNum2;

      try {
          baseNum1 = num1.toString().split(".")[1].length;
      } 
      catch (e) {
          baseNum1 = 0;
      }

      try {
          baseNum2 = num2.toString().split(".")[1].length;
      } 
      catch (e) {
          baseNum2 = 0;
      }

      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));

      return (num1 * baseNum + num2 * baseNum) / baseNum;
    },
    // createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
    Vue.prototype.$createRandom = (num, from, to) => {
      var arr = [];
      var json = {};
      while (arr.length < num) {
        //产生单个随机数
        var ranNum = Math.floor(Math.random() * (to - from)) + from;
        //通过判断json对象的索引值是否存在 来标记 是否重复
        if (!json[ranNum]) {
        json[ranNum] = 1;
        arr.push(ranNum);
        }
      }
      return arr;
    }
  }
}
