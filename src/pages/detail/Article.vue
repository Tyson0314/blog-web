<template>
  <div>
    <header-menus></header-menus>
    <article>
      <blog-catalog :catalogs="articleData.catalogs"></blog-catalog>
      <main class="blog_detail">
        <article-info :id="id" :articleData="articleData"></article-info>
        <comment-list :targetId="id" :commentsPageInfoData="commentsPageInfo" :targetType="target_type"></comment-list>
      </main>
    </article>
  </div>
</template>

<script>
  import HeaderMenus from 'common/HeaderMenus'
  import CopyRight from 'common/CopyRight'
  import ArticleInfo from './ArticleInfo'
  import CommentList from 'common/CommentList'
  import axios from 'axios'
  import LeftSide from 'common/LeftSide'
  import BlogCatalog from "../../common/BlogCatalog"

  export default {
    name: 'Article',
    components: {
      BlogCatalog,
      BlogCatalog,
      LeftSide,
      HeaderMenus,
      CopyRight,
      ArticleInfo,
      CommentList
    },
    data() {
      return {
        articleData: {},
        id: 0,
        target_type: 'ARTICLE',
        page_num: 1,
        pageSize: 100,
        commentsPageInfo: {
          list: [],
          total: 0
        },
      }
    },
    mounted() {
      let idParam = this.$route.params.id
      this.id = Number.parseInt(idParam)
      this.initData(this.id)
    },
    watch: {
      $route(to, from) {
        let id = this.$route.params.id
        this.id = id;
        this.initData(id)
      }
    },
    methods: {
      initData(id) {
        axios.get('api/blogs/' + id).then(result => {
          if (result) {
            this.articleData = result.data.data
            this.getCommentsList();
          }
        })
      },
      getCommentsList() {
        var url = 'api/comments/'
        url += this.id
        axios.get(url, {
          params: {
            page_num: this.page_num,
            page_size: this.page_size,
            targetType: this.target_type
          }
        }).then(result => {
          var pageInfo = result.data.data
          if (pageInfo) {
            this.commentsPageInfo.list = pageInfo.list
            this.commentsPageInfo.total = pageInfo.total
          }
        })
      }
    }
  }
</script>
<style lang='stylus'>
  .article-catalog h2 {
    color: #e04747;
    font-size: 14px;
    line-height: 30px;
    padding-left: 20px;
    background: #fff;
    border-bottom: 1.2px solid #eee;
  }

  .l_box div {
    background: rgba(255, 255, 255, 0.5);
    margin-bottom: 0px;
    overflow: hidden;
  }

  .blog_detail {
    width: 79%
  }

  @media only screen and (max-width: 479px) {
    .blog_detail {
      width: 100%;
    }
  }

  .blog-left {
    width 20%
    background-color none
  }

  .news_con markdown-body pre, .markdown-body pre {
    padding: 0px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
    border: dashed 0.5px #9e9e9e;
  }

  .article-catalog {
    /*position:fixed;*/
    /*top:1.071429rem;*/
    /*width:100%*/
    width: 11%
    position: fixed;
    top: 5.071429rem;
  }

  .article-catalog .catalog-title {
    margin-bottom: .178571rem;
    color: #999;
    font-size: .357143rem;
    font-weight: 700
  }

  .article-catalog .list-item {
    display: block;
    line-height: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #204040
  }

  .article-catalog .list-item:hover {
    background-color: #f56c6c47
  }

  .article-catalog .list-item[data-lev="1"] {
    padding-left: 1.071429rem;
  }

  .article-catalog .list-item[data-lev="2"] {
    padding-left: 2.071429rem;
    font-weight: 700
  }

  .article-catalog .list-item[data-lev="3"] {
    padding-left: 3.178571rem;
    font-weight: 500
  }

  .article-catalog .list-item[data-lev="4"] {
    padding-left: 3.178571rem;
  }

  .article-catalog .list-item[data-lev="5"] {
    padding-left: 3.178571rem;
  }


</style>
