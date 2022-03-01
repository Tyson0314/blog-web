<template>
  <div class="infosbox">
    <div class="newsview">
      <h3 class="news_title">{{articleData.title}}</h3>
      <div class="bloginfo">
        <ul>
          <li class="author">作者：<a href="#">{{articleData.author_name}}</a></li>
          <li class="lmname"><a href="/">{{articleData.category_name}}</a></li>
          <li class="timer">时间：{{articleData.create_time}} ({{articleData.calc_time}})</li>
          <li class="view">{{articleData.view_count}}人阅读</li>
        </ul>
      </div>
      <div class="tags">
        <router-link tag="a" v-for="(item, index) in articleData.tag_list" :key="index"
                     :to="'/blogs/category/'+ item.id +'?type=2'" target="_self">{{item.tag_name}}
        </router-link>
      </div>
      <div class="news_about" v-html="articleData.summary"></div>
      <div class="news_con markdown-body" v-html="articleData.html_content">
      </div>
    </div>
    <div class="share">
      <p class="diggit" style="background-color: white">
        <el-button type="text" :class="[articleData.vote_status ?'el-tyson-good-fill':'el-tyson-good']"
                   @click="voteArticle(articleData.id)">
          {{articleData.vote_count}}
        </el-button>
      </p>
    </div>
    <div class="nextinfo">
      <p v-if="articleData.last != null">上一篇：
        <router-link tag="a" :to="'/blog/detail/'+articleData.last.id">{{articleData.last.title}}</router-link>
      </p>
      <p v-if="articleData.next != null">下一篇：
        <router-link tag="a" :to="'/blog/detail/'+articleData.next.id">{{articleData.next.title}}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import CommentList from 'common/CommentList'
  import axios from 'axios'
  import {SET_SHOW_LOGIN} from "../../store/mutations_type";
  import Constants from "../../utils/Constants";

  export default {
    name: 'ArticleInfo',
    props: {
      articleData: {
        type: Object
      },
      id: {
        type: Number
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 100,
        target_type: 'ARTICLE',
        blogDetail: {}
      }
    },
    components: {
      CommentList
    },
    mounted() {
    },
    methods: {
      voteArticle(id) {
        var _this = this
        axios.put('/api/vote/' + id, {type: 'article'}).then(result => {
          if (result.data.status === Constants.STATUS.SUCCESS) {
            this.articleData.vote_count = result.data.data
            this.articleData.vote_status = !this.articleData.vote_status
          } else if (result.data.status === Constants.STATUS.NO_LOGIN) {
            setTimeout(() => {
              _this.$store.commit(SET_SHOW_LOGIN, true)
            }, 1500)
          } else {
            console.warn(result.data.msg)
            _this.$message.error(result.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .user_like {
    background-color #E2523A
    border none
    cursor pointer
    width 160px
    height 40px
  }

  .markdown-body {
    color: #555
  }

  .news_title {
    font-size: 26px;
    font-weight: normal;
    padding: 18px 0;
    color: #333;
    text-align: center;
  }

</style>
