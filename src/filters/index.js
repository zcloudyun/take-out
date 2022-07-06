// 过滤器
import Vue from 'vue'
//格式化日期
import moment from 'moment'
// 自定义过滤器
Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(formatStr)
})