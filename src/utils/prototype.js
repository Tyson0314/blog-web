import constantsUtils from './Constants'

export default {
  install(Vue, options) {
    Vue.prototype.$Code = constantsUtils.Code
  }
}
