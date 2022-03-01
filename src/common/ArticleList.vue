
<template>
  <main class="r_box">
    <li class="listClass"  v-for="(item, index) in blogList.list" :key="index">
        <i v-if="item.img_url"><router-link tag="a" :to="'/blog/detail/'+item.id"><img :src="item.img_url"></router-link></i>
      <!--[ 顶 ]-->
        <h3> <router-link tag="a" :to="'/blog/detail/'+item.id">{{item.title}}   </router-link></h3>
        <p>{{item.summary}}</p>
      <div class="bloginfo">
        <ul>
          <li style="margin-right:0;padding-right:5px;">
            <img v-bind:src="item.avatar_url" style="width:36px;border-radius:50%;">
          </li>
          <li class="author">
            <a href="javascript:void(0);" @click="goToAuthor(item.author)">{{item.author_name}}</a>
          </li>
          <li class="lmname">
            <div class="cloud">
              <ul>
                <router-link tag="a" v-for="(item, index) in item.tag_list" :key="index" :to="'/blogs/category/'+ item.id +'?type=2'">{{item.tag_name}}</router-link>
              </ul>
            </div>
          </li>
          <li class="viewCount">
            <img src="../assets/img/read.svg" style="width:20px;float:left">
            &nbsp{{item.view_count}}
          </li>
          <li class="voteCount">
            <img src="../assets/img/vote.svg" style="width:20px;float:left">
            &nbsp{{item.vote_count}}
          </li>
          <li class="createTime">
            <img src="../assets/img/clock.svg" style="width:20px;float:left">
            &nbsp{{item.create_time}}
          </li>
        </ul>
      </div>
    </li>
    <paginate
      v-model="currentPage"
      active-class="curPage"
      disabled-class="disabledEle"
      :page-count="blogList.pages||1"
      :page-range="5"
      :click-handler="goToPage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :break-view-text="'...'"
      :no-li-surround="true"
      class="pagelist"
    >
    </paginate>
  </main>

</template>

<script>
import Paginate from 'vuejs-paginate'
import axios from 'axios'
export default {
  components: {
    Paginate
  },
  name: 'ArticleList',
  props: {
    blogResult: {
      type: Object,
      defaultValue: null
    },
    categoryId: {
      type: String,
      defaultValue: null
    }
  },
  data () {
    return {
      currentPage: 1,
      listClass: 'listIn',
      blogList: [],
    }
  },
  watch: {
    blogResult: function (newV, oldV) {
      this.blogList = this.blogResult
      this.listClass = this.listClass === 'list' ? 'list1' : 'list'
    }
  },
  methods: {
    goToPage (pageNum) {
      axios.get('/api/blogs', {
        params: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          categoryId: this.categoryId
        }
      }).then(result => {
        this.blogList = result.data.data
      })
    }
  }
}
</script>

<style scoped>
.author,.viewCount,.voteCount,.createTime {
  margin-top: 8px;
}

img {
  outline: none !important;
}

.bloginfo {
  overflow: hidden;
  margin-top: 15px;
}

.bloginfo ul li {
  float: left;
  font-size: 12px;
  padding: 0 20px 0 0;
  color: #748594;
  line-height: 1.5;
  display: inline-block;
}

.cloud ul a {
  margin-top: 0 !important;
}

.list{
  position: relative;
  opacity: 0;
  /*left:30px;*/
  animation: .5s linear .3s slidetop;
  animation-fill-mode: forwards;
}
.list:hover{
  /*background: #4AF2A1;*/
  font-weight: bolder;
  color:#EEF5FF;
  left:5px;
  top:-4px;
  transition: .3s;
}
.list1{
  position: relative;
  opacity: 0;
  /*left:30px;*/
  animation: .5s linear .3s slidetopa;
  animation-fill-mode: forwards;
}
.list1:hover{
  /*background: #4AF2A1;*/
  font-weight: bolder;
  color:#EEF5FF;
  left:5px;
  top:-4px;
  transition: .3s;
}
.r_box li h3 {
  font-size: 16px;
  line-height: 25px;
  text-shadow: #FFF 1px 1px 1px;
  color: #de4949;
}
.r_box li h3 a {
  color: #222;
}
@keyframes slidetop {
  from {top:20px;opacity: 0}
  to {top:0px;opacity: 1}
}
@keyframes slidein {
  from { transform: scaleX(0);opacity: 0 }
  to   { transform: scaleX(1);opacity: 1 }
}
@keyframes leftIn {
  from {left:700px;opacity: 0}
  to {left:30px;opacity: 1}
}
@keyframes slidetopa {
  from {top:20px;opacity: 0}
  to {top:0px;opacity: 1}
}
@keyframes slideina {
  from { transform: scaleX(0);opacity: 0 }
  to   { transform: scaleX(1);opacity: 1 }
}
@keyframes leftIna {
  from {left:700px;opacity: 0}
  to {left:30px;opacity: 1}
}
</style>
