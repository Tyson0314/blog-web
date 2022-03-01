<template>
  <div>
    <header-menus></header-menus>
    <article>
      <left-side></left-side>
      <main>
        <comment-list :targetType="targetType" :targetId="id" :commentsPageInfoData="commentsPageInfoData"></comment-list>
      </main>
    </article>
  </div>
</template>

<script>
import HeaderMenus from 'common/HeaderMenus'
import LeftSide from 'common/LeftSide'
import CopyRight from 'common/CopyRight'
import CommentList from 'common/CommentList'
import axios from 'axios'

export default {
  name: 'Comment',
  components: {
    HeaderMenus,
    LeftSide,
    CommentList,
    CopyRight
  },
  mounted(){
    this.getCommentsList()
  },
  data () {
    return {
      msg: 'Welcome!',
      id: 0,
      targetType: "MESSAGE_BOARD",
      page_num: 1,
      page_size: 100,
      commentsPageInfoData: {
        list:[],
        total:0
      },
    }
  },
  methods:{
    getCommentsList() {
      var url = 'api/comments/'
      url += this.id
      axios.get(url, {
        params: {
          page_num: this.page_num,
          page_size: this.page_size,
          targetType: this.targetType
        }
      }).then(result => {
        var pageInfo = result.data.data
        if (pageInfo) {
          this.commentsPageInfoData.list = pageInfo.list
          this.commentsPageInfoData.total = pageInfo.total
        }
      })
    }
  }
}
</script>
<style lang='stylus'>
</style>
