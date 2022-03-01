<template>
  <div>
    <header-menus></header-menus>
    <article>
      <blog-left></blog-left>
      <main>
        <album-info></album-info>
        <comment-list></comment-list>
      </main>
    </article>
  </div>
</template>

<script>
import HeaderMenus from 'common/HeaderMenus'
import BlogLeft from '../../common/BlogLeft'
import AlbumInfo from './AlbumInfo'
import CommentList from 'common/CommentList'

export default {
  name: 'Album',
  components: {
    BlogLeft,
    HeaderMenus,
    CommentList,
    AlbumInfo
  }
}
</script>

<style lang='stylus'>
</style>
