<template>
  <div>
    <header-menus></header-menus>
    <article>
      <left-side></left-side>
      <detail></detail>
    </article>
  </div>
</template>

<script>
import HeaderMenus from 'common/HeaderMenus'
import CopyRight from 'common/CopyRight'
import CommentList from 'common/CommentList'
import Detail from './Detail'
import LeftSide from 'common/LeftSide'

export default {
  name: 'Comment',
  components: {
    LeftSide,
    HeaderMenus,
    CommentList,
    CopyRight,
    Detail
  },
  data () {
    return {
      msg: 'Welcome!'
    }
  }
}
</script>
<style lang='stylus'>
</style>
