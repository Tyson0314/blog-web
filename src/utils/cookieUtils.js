/**
 * CookieUtil常用的一些工具类
 */

export function setCookie(name, value, days) {

  var date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = name + '=' + value + ';expires=' + date;
}

export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else
    return null
}

export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
