<template>
    <div>
      <article>
        <left-side :sideInitDataParam="sideInitData"></left-side>
        <article-list :blogResult="blogResult" ></article-list>
      </article>
    </div>
</template>

<script>
import HeaderMenus from 'common/HeaderMenus'
import LeftSide from '../../common/LeftSide'
import ArticleList from '../../common/ArticleList'
import CopyRight from 'common/CopyRight'
import { getCookie, setCookie, delCookie } from "@/utils/cookieUtils";
import { authVerify } from "@/api/user";
import {SET_LOGIN_STATE, SET_USER_INFO} from "../../store/mutations_type";
import Constants from "../../utils/Constants";
import axios from 'axios'

export default {
  name: 'Index',
  components: {
    HeaderMenus,
    LeftSide,
    ArticleList,
    CopyRight,
  },
  data () {
    return {
      msg: 'Welcome!',
      currentTabComponent: 'ArticleList',
      currentLeftComponent: 'LeftSide',
      newScrollPosition: 0,
      lastScrollPosition: 0,
      blogResult: {
        list: []
      },
      sideInitData: {
        recommendList: [],
        categoryList: [],
        clickRankList: [],
        tagList: []
      },
      isLogin: this.$store.state.user.isLogin,
      userInfo: this.$store.state.user.userInfo,
    }
  },
  mounted () {
    this.getToken()
    axios.get('api/blogs/index').then(result => {
      var data = result.data.data
      if (result.data.status === 1000) {
        this.blogResult = data.blog_list
        this.sideInitData.categoryList = data.category_list
        this.sideInitData.recommendList = data.recommend_list
        this.sideInitData.tagList = data.tag_list
        this.sideInitData.clickRankList = data.click_rank_list
      } else {
        alert(result.data.msg)
      }
    })
  },
  methods: {
    getUrlVars: function () {
      var vars = {};
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&#]*)/gi,
        function (m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    },
    getToken: function() {
      let token = this.getUrlVars()["token"];
      // 判断url中是否含有token
      if (token != undefined) {
        // 设置token七天过期
        setCookie("token", token, 7)
      } else {
        // 从cookie中获取token
        token = getCookie("token")
      }
      if (token != undefined) {
        authVerify(token).then(response => {
          console.log('verify response', response)
          if (response.data.status == Constants.STATUS.SUCCESS) {
            this.userInfo = response.data.data;
            console.log('user info', this.userInfo)
            this.$store.commit(SET_LOGIN_STATE, true)
            this.$store.commit(SET_USER_INFO, this.userInfo)
          } else {
            this.$store.commit(SET_LOGIN_STATE, false)
            this.$store.commit(SET_USER_INFO, {})
            delCookie("token");
          }
          this.$store.commit(SET_LOGIN_STATE, this.isLogin);
        });
      } else {
        this.$store.commit(SET_LOGIN_STATE, this.isLogin);
      }
    }
  }
}
</script>
<style lang='stylus'>
</style>
