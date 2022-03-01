<template>
  <header class="header-navigation" ref="header" id="header">
    <nav>
      <div class="logo"><a href="/">大彬的博客</a></div>
      <!--移动端时显示菜单按钮-->
      <h2 ref="mnavh" v-bind:class="isShowNav?'open':''" @click="handleClick" id="mnavh"><span class="navicon"></span>
      </h2>
      <ul ref="startlist" id="starlist" :style="isShowNav?'display: block':''">
        <router-link tag="li" :to="'/index'" :itemIndex="1" :key="1">
          <div @click="handleClick">网站首页</div>
        </router-link>
        <router-link tag="li" :to="'/blogs/category/0'" :itemIndex="2" :key="2" @click="handleClick">
          <div @click="handleClick">文章</div>
        </router-link>
        <router-link tag="li" :to="'/comments/0'" v-show="isLogin" @click="handleClick">
          <div @click="handleClick">留言</div>
        </router-link>
        <router-link tag="li" :to="'/edit'" v-show="isLogin" @click="handleClick">
          <div @click="handleClick">写文章</div>
        </router-link>
        <router-link tag="li" :to="'/about'" @click="handleClick">
          <div @click="handleClick">关于我</div>
        </router-link>
      </ul>
      <el-dropdown class="userInfoAvatar">
        <span class="el-dropdown-link">
          <el-badge class="item" :hidden="!isLogin">
            <img src="../assets/img/avatar.png" v-if="getAvatar == null">
            <img v-bind:src="getAvatar" v-if="getAvatar != null">
          </el-badge>
        </span>
        <el-dropdown-menu slot="dropdown" v-show="isLogin">
          <el-dropdown-item @click.native="login" v-show="!isLogin">登录</el-dropdown-item>
          <el-dropdown-item @click.native="goPersonalCenter" v-show="isLogin">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout" v-show="isLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </nav>
  </header>
</template>
<script>
  import {SET_LOGIN_STATE, SET_SHOW_LOGIN, SET_USER_INFO} from "../store/mutations_type";
  import {delCookie, getCookie} from "../utils/cookieUtils";
  import {deleteUserAccessToken} from "../api/user";

  export default {
    name: 'HeaderMenus',
    components: {},
    created() {
      if (this.isLogin && this.$store.state.user.userInfo.avatarUrl != null) {
        this.avatarUrl = this.$store.state.user.userInfo.avatarUrl
      }
    },
    mounted() {
      window.addEventListener('scroll', this.throttle(this.handleScroll, 200))
    },
    destroyed() {
      window.removeEventListener('scroll', this.throttle(this.handleScroll, 200))
    },
    data() {
      return {
        switchHandle: false,
        isShowNav: false,
        isLogin: this.$store.state.user.isLogin,
        userInfo: this.$store.state.user.userInfo,
      }
    },
    computed: {
      getAvatar() {
        return this.$store.state.user.userInfo.avatarUrl
      }
    },
    methods: {
      login() {
        this.$store.commit(SET_SHOW_LOGIN, true)
      },
      logout: function () {
        console.log('logout')
        let userInfo = {};
        this.$store.commit(SET_USER_INFO, userInfo)
        this.$store.commit(SET_LOGIN_STATE, false)
        deleteUserAccessToken(getCookie("token"));
        delCookie("token");
        let url = window.parent.location.href;
        let haveToken = url.indexOf("?token")
        if (haveToken != -1) {
          let list = url.split("?token");
          this.isLogin = false;
          window.location.href = list[0]
        } else {
          window.location.reload()
        }
      },
      goPersonalCenter: function() {
        this.$router.push('/personal')
      },
      handleScroll() {
        if (document.documentElement.scrollTop > 70) {
          if (!this.switchHandle) {
            this.switchHandle = true
            this.$refs.header.style.top = '-60px'
          }
        } else {
          if (this.switchHandle) {
            this.switchHandle = false
            this.$refs.header.style.top = '0px'
          }
        }
      },
      handleClick() {
        this.isShowNav = !this.isShowNav
      },
      throttle(func, delay) {
        let timer = null
        let startTime = Date.now()
        return function () {
          let curTime = Date.now()
          let remaining = delay - (curTime - startTime)
          const context = this
          const args = arguments
          clearTimeout(timer)
          if (remaining <= 0) {
            func.apply(context, args)
            startTime = Date.now()
          } else {
            timer = setTimeout(func, remaining)
          }
        }
      }
    }
  }
</script>

<style scoped>
  #starlist {
    float: left;
    margin-left: 50px;
    overflow: hidden;
    max-width: 1500px;
  }

  #starlist li {
    float: left;
    display: block;
    font-size: 16px;
    padding: 0 18px;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
  }

  #starlist li:hover {
    /*background: #4AF2A1;*/
    /*color:#ADFFD5;*/
    transition: .3s;
    font-weight: bolder;
    color: #00A7EB;
  }

  .router-link-active {
    /*background: #4AF2A1;*/
    /*color: #ADFFD5*/
    /*color: #f56c6c;*/
    color: #00A7EB;
  }

  .me-write-info {
    line-height: 60px;
    font-size: 18px;
    font-weight: 600;
  }

  .userInfoAvatar {
    position: absolute;
    right: 170px;
  }

  .userInfoAvatar img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
</style>
