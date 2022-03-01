<template>
   <div>
     <header-menus></header-menus>
     <article>
      <album-list></album-list>
     </article>
     <copy-right></copy-right>
  </div>
</template>

<script>
import HeaderMenus from 'common/HeaderMenus'
import LeftSide from 'common/LeftSide'
import AlbumList from './AlbumList'
import CopyRight from 'common/CopyRight'
export default {
  name: 'Album',
  components: {
    HeaderMenus,
    LeftSide,
    AlbumList,
    CopyRight
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
