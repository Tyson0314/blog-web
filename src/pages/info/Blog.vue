<template>
  <div>
    <header-menus></header-menus>
    <article>
      <blog-left></blog-left>
      <main>
        <article-info></article-info>
        <comment-list></comment-list>
      </main>
    </article>
  </div>
</template>

<script>
import ArticleInfo from '../detail/ArticleInfo'
import HeaderMenus from 'common/HeaderMenus'
import BlogLeft from 'common/BlogLeft'
import CommentList from 'common/CommentList'

export default {
  name: 'Blog',
  components: {
    BlogLeft,
    HeaderMenus,
    ArticleInfo,
    CommentList
  }
}
</script>

<style lang='stylus'>
</style>
