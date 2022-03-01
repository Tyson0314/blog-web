<template>
  <div class="message_board">
    <h2>留言板</h2>
    <div>
      <div>
        <div v-for="(item, index) in commentsPageInfoData.list" :key="item.user_email + index">
          <div class="comment_info">
            <ul>
              <p class="comment_time">
                <img v-bind:src="item.avatar_url" style="width: 20px;float: left;margin-right: 10px"/>
                <span>{{item.create_time}}</span>{{item.user_name}}
              </p>
              <p class="comment_content">
                {{item.content}}
                <el-button type="text" :class="[item.vote_status != 0?'el-tyson-good-fill':'el-tyson-good']"
                           style="float: right" @click="vote(item)">{{item.vote_count}}
                </el-button>
              </p>
            </ul>
          </div>
          <div class="child_comment" v-if="item.children_comments !=null && item.children_comments.length > 0">
            <ul v-for=" child_comment in item.children_comments">
              <p><font color="#FF0000">{{child_comment.user_name}}:</font>{{child_comment.content}}</p>
            </ul>
          </div>
        </div>
        <a href="#">
          <div style="text-align: center" v-if="commentsPageInfoData.has_next_page" @click="goToPage()">查看更多</div>
        </a>
      </div>
      <p class="saying">
            <span><a href="#">
              共有{{commentsPageInfoData.total}}条评论</a>
            </span>
      </p>
      <el-form :model="commentAddParam" :rules="rules" ref="comment_form" label-width="100px" class="demo-blog" v-if="isLogin">
        <el-form-item label="留言内容" prop="content" style="margin-top:40px">
          <el-input type="textarea" v-model="commentAddParam.content"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addComment()" style="display:block;margin:auto">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import * as arrayObject from "friendly-errors-webpack-plugin/src/utils";
  import {Loading} from 'element-ui';
  import Constants from "../utils/Constants";
  import {SET_SHOW_LOGIN} from "../store/mutations_type";

  export default {
    name: 'CommentInput',
    props: {
      commentsPageInfoData: {
        type: Object,
      },
      targetId: {
        type: Number,
        defaultValue: 0
      },
      targetType: {
        type: String,
      }
    },
    data() {
      return {
        loading: null,
        commentAddParam: {
          user_email: null,
          user_name: null,
          content: '',
          target_id: 0,
          target_type: null
        },
        page_size: 10,
        page_num: 1,
        target_id: null,
        target_type: null,
        isLogin: this.$store.state.user.isLogin,
        rules: {
          content: [
            {required: true, message: '输入留言内容', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      if (JSON.stringify(this.commentsPageInfoData)) {
        let id = this.$route.params.id
        this.target_type = this.targetType
        this.target_id = this.targetId
        let pageSize = this.$route.query.page_size
        let pageNum = this.$route.query.page_num
        let targetType = this.$route.query.target_type
        this.getCommentsList(id, pageNum, pageSize, targetType)
      }
    },
    methods: {
      getCommentsList() {
        var url = 'api/comments/'
        url += this.targetId
        axios.get(url, {
          params: {
            pageNum: this.page_num,
            page_size: this.page_size,
            targetType: this.targetType
          }
        }).then(result => {
          console.log(result)
          var pageInfo = result.data.data
          if (pageInfo) {
            this.commentsPageInfoData.list = pageInfo.list
            this.commentsPageInfoData.total = pageInfo.total
            this.commentsPageInfoData.page_nux = pageInfo.page_num
            this.commentsPageInfoData.has_next_page = pageInfo.has_next_page
          }
        })
      },
      vote(item) {
        var _this = this
        axios.put('/api/vote/' + item.id, {type: 'comment'}).then(result => {
          if (result.data.status === Constants.STATUS.SUCCESS) {
            item.vote_count = result.data.data
            item.vote_status = !item.vote_status
          } else if (result.data.status === Constants.STATUS.NO_LOGIN) {
            setTimeout(() => {
              _this.$store.commit(SET_SHOW_LOGIN, true)
            }, 1500)
          } else {
            console.warn(result.data.msg)
            _this.$message.error(result.data.msg)
          }
        })
      },
      addComment() {
        var _this = this
        this.commentAddParam.target_id = this.targetId
        this.commentAddParam.target_type = this.targetType
        this.$refs['comment_form'].validate((valid) => {
          if (valid) {
            if (this.target_id) {
              this.commentAddParam.target_id = this.target_id
            }
            if (this.target_type) {
              this.commentAddParam.target_type = this.targetType
            }
            if (this.isLogin) {
              this.commentAddParam.user_name = this.$store.state.user.id
            }
            this.loading = Loading.service({
              lock: true,
              text: '加载中……',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            axios.post('/api/comments/add', this.commentAddParam, {headers: {'Content-Type': 'application/json'}}).then(result => {
              if (result.data.status === Constants.STATUS.SUCCESS) {
                this.getCommentsList()
                this.commentAddParam.content = ''
              } else if (result.data.status) {
                _this.$message.error(result.data.msg)
              }
              this.loading.close()
            })
          } else {
            return false
          }
        })
      },
      goToPage() {
        var url = 'api/comments/'
        url += this.targetId
        axios.get(url, {
          params: {
            pageNum: this.page_num + 1,
            page_size: this.page_size,
            targetType: this.targetType
          }
        }).then(result => {
          var pageInfo = result.data.data
          if (pageInfo) {
            if (pageInfo.list && pageInfo.list.length > 0) {
              this.commentsPageInfoData.list = arrayObject.concat(this.commentsPageInfoData.list, pageInfo.list)
              this.commentsPageInfoData.total = pageInfo.total
              this.commentsPageInfoData.has_next_page = pageInfo.has_next_page
              this.page_num = pageInfo.page_num + 1
            }
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .like
    color #FF464D

  .like:hover
    color #FF2D8C

  .error-message
    display none
    color red
    padding-left 5px

  .show
    display inline-block

  .message_board
    padding: 10px

  .el-form-item__label
    margin-top: 35px
</style>
