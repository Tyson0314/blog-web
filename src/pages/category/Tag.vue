<template>
  <div>
    <header-menus></header-menus>
    <article>
      <blog-left></blog-left>
      <main>
        <article-list></article-list>
        <comment-list></comment-list>
      </main>
    </article>
  </div>
</template>

<script>
import HeaderMenus from 'common/HeaderMenus'
import BlogLeft from 'common/BlogLeft'
import CopyRight from 'common/CopyRight'
import CommentList from 'common/CommentList'
import ArticleList from '../../common/ArticleList'

export default {
  name: 'Comment',
  components: {
    HeaderMenus,
    BlogLeft,
    CommentList,
    CopyRight,
    ArticleList
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='stylus'>
</style>
