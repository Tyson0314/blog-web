<template>
  <aside class="l_box">
    <div class="about_me">
      <h2>技术交流</h2>
      <ul>
        <i><img src="https://gitee.com/tysondai/img/raw/master/个人微信索隆.jpg"></i>
        <p><strong>如果想进技术、面试交流群，可以扫描下方二维码加我微信，备注加群，我拉你进群，大家互相学习~</strong></p>
      </ul>
    </div>
    <div ref="fix_position" class="fixedSide" id="fixedSide">
      <div class="search">
        <form action="/e/search/index.php" method="post" name="searchform" id="searchform">
          <input name="keyboard" id="keyboard" class="input_text" value="请输入关键字词" style="color: rgb(153, 153, 153);" onfocus="if(value=='请输入关键字词'){this.style.color='#000';value=''}" onblur="if(value==''){this.style.color='#999';value='请输入关键字词'}" type="text">
          <input name="show" value="title" type="hidden">
          <input name="tempid" value="1" type="hidden">
          <input name="tbname" value="news" type="hidden">
          <input name="Submit" class="input_submit" value="搜索" type="submit">
        </form>
      </div>
      <div class="catalog-custom">
        <h2>文章分类</h2>
        <ul>
           <router-link tag="li" :to="'/blogs/category/'+ item.id" v-for="(item, index) in sideInitData.categoryList" :key="index"><a href="/">{{item.tag_name}}（{{item.blog_count}}）</a></router-link>
        </ul>
      </div>
      <div class="cloud">
        <h2>标签云</h2>
        <ul>
          <router-link tag="a" v-for="(item, index) in sideInitData.tagList" :key="index" :to="'/blogs/category/'+ item.id +'?type=2'">{{item.tag_name}}（{{item.blog_count}}）</router-link>
        </ul>
      </div>
      <!--<div class="tuijian">-->
        <!--<h2>站长推荐</h2>-->
        <!--<ul>-->
          <!--<li v-for="(item, index) in sideInitData.recommendList" :key="index"><router-link tag ='a' :to="'/blog/detail/'+item.id">{{item.title}}</router-link></li>-->
        <!--</ul>-->
      <!--</div>-->
      <div class="tuijian">
        <h2>点击排行</h2>
        <ul>
          <li v-for="(item, index) in sideInitData.clickRankList" :key="index"><router-link tag ='a' :to="'/blog/detail/'+item.id">{{item.title}}</router-link></li>
        </ul>
      </div>
      <div class="links">
        <h2>推荐</h2>
        <ul>
          <a href="https://github.com/Tyson0314/Java-learning">Java高频面试题</a>
          <a href="https://github.com/Tyson0314/java-books">200+经典计算机电子书</a>

        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LeftSide',
  props: {
    sideInitDataParam: {
      recommendList: [],
      categoryList: [],
      tagList: []
    }
  },
  data () {
    return {
      sideInitData: {
        recommendList: [],
        categoryList: [],
        clickRankList: [],
        tagList: []
      }
    }
  },
  mounted () {
    this.dataInit()
    // window.addEventListener('scroll', this.throttle(this.handleScroll, 50))
  },
  destroyed () {
    // window.removeEventListener('scroll', this.throttle(this.handleScroll, 50))
  },
  methods: {
    dataInit () {
      if (this.sideInitDataParam) {
        this.sideInitData = this.sideInitDataParam
        localStorage.setItem('sideInitData', this.sideInitData)
        return
      }
      var sideData = localStorage.getItem('sideInitData')
      if (sideData != null && (sideData.recommendList != null || sideData.categoryList)) {
        this.sideInitData = sideData
      } else {
        axios.get('/api/blogs/left').then(result => {
          this.sideInitData.categoryList = result.data.data.category_list
          this.sideInitData.recommendList = result.data.data.recommend_list
          this.sideInitData.tagList = result.data.data.tag_list
          this.sideInitData.clickRankList = result.data.data.click_rank_list
        })
      }
    },
    handleScroll () {
      if (document.documentElement.scrollTop > 230) {
        document.getElementById('fixedSide').style.position = 'fixed'
      } else {
        document.getElementById('fixedSide').style.position = ''
      }
    },
    throttle (func, delay) {
      let timer = null
      let startTime = Date.now()
      return function () {
        let curTime = Date.now()
        let remaining = delay - (curTime - startTime)
        const context = this
        const args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
          func.apply(context, args)
          startTime = Date.now()
        } else {
          timer = setTimeout(func, remaining)
        }
      }
    }
  }
}
</script>

<style scoped>
.fixedSide{
  bottom: -50px;
}
</style>
