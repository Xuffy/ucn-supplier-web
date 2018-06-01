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
     * 转换表格中需要由字典表数据来转换的数据
     * */
    Vue.prototype.$change = (obj, code, e, isString) => {
      let data;
      if (isString) {
        data = _.findWhere(obj, {code: String(e[code].value)});
      } else {
        data = _.findWhere(obj, {code: e[code].value});
      }
      if (data) {
        return data;
      } else {
        return '';
      }
    };

    Vue.prototype.$depthClone = (data) => {
      if (!data) {
        return data;
      }
      return JSON.parse(_.clone(JSON.stringify(data)));
    }


    Vue.prototype.$filterDic = (data, transForm, dataBase) => {
      transForm ? transForm = transForm : transForm = 'transForm';
      dataBase ? dataBase = dataBase : dataBase = 'dataBase';
      _.mapObject(data, (val, k) => {
        if (_.isBoolean(val.value)) {
          val.value ? val.value = 1 : val.value = 0;
        }
        val[dataBase] = val.value;
        if (val[transForm] && !data._remark) {
          switch (val[transForm]) {
            case 'time':
              val.value = DateFormat(val.value, val.time ? val.time : 'yyyy-dd-mm')
              break;
            default:
              if (!store.state.dic.length) return;
              let label = val.name ? val.name : 'name';
              val.dic = _.findWhere(store.state.dic, {'code': val[transForm]});
              if (!val.dic || !val.dic) return;
              if (_.isString(val[dataBase])) {
                val.value = '';
                _.map(val[dataBase].split(','), (res, index) => {
                  val.value += _.findWhere(val.dic.codes, {'code': res + ''}) ? _.findWhere(val.dic.codes, {'code': res + ''})[label] : '';
                  if ((index + 1) < val[dataBase].split(',').length) val.value += ',';
                });

              } else {
                val.value = _.findWhere(val.dic.codes, {'code': val[dataBase] + ''}) ? _.findWhere(val.dic.codes, {'code': val[dataBase] + ''})[label] : '';
              }
          }
        }
      });
      return data;
    };

    Vue.prototype.$filterName = (data, transForm, dataBase) => {
      transForm ? transForm = transForm : transForm = 'transForm';
      dataBase ? dataBase = dataBase : dataBase = 'dataBase';
      _.mapObject(data, (val, k) => {
        if (val[transForm] && !data._remark) {
          switch (val[transForm]) {
            case 'time':
              val.value = val[dataBase];
              val.value = DateFormat(val[dataBase], val.time ? val.time : 'yyyy-dd-mm')
              break;
            default:
              if (!store.state.dic.length) return;
              let label = val.name ? val.name : 'name';
              if (_.isBoolean(val.value)) {
                val.dataBase ? val.dataBase = 1 : val.dataBase = 0;
              }
              val.value = val[dataBase];
              val.dic = _.findWhere(store.state.dic, {'code': val[transForm]});
              if (!val.dic || !val.dic) return;
              val.value = _.findWhere(val.dic.codes, {'code': val[dataBase] + ''}) ? _.findWhere(val.dic.codes, {'code': val[dataBase] + ''})[label] : '';

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
  }
}
