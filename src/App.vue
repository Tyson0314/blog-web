<template>
  <div id='app'>
    <header-menus/>
    <router-view/>
    <copy-right/>
    <login-box></login-box>
  </div>
</template>

<script>
import HeaderMenus from './common/HeaderMenus.vue'
import CopyRight from './common/CopyRight.vue'
import LoginBox from "./pages/blog/LoginBox";

export default {
  name: 'App',
  components: {
    HeaderMenus,
    CopyRight,
    LoginBox
  },
  created() {
    console.log('app create')
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      console.log('before unload')
      console.log('isLogin', this.$store.state.user.isLogin)
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    })
  },
  mounted() {
    // 友盟统计添加
    const script = document.createElement("script");
    script.src =
      "https://s23.cnzz.com/z_stat.php?id=1277647101&web_id=1277647101";
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  watch: {
    $route() {
      if (window._czc) {
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = "/";
        window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      }
    }
  }
}
</script>
