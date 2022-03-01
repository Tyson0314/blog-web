<template>
  <div id="login" v-show="showPersonalCenter">
    <div style="margin: auto; height: 100%; width: 80%">
      <img src="../assets/img/arrow.svg" @click="goBack()" style="width: 30px"/>
      <div style="height: 50px; font-size: 20px; font-weight: bolder; margin-top: 10px">个人中心</div>
      <el-form label-position="left" :model="userInfo" label-width="100px" :rules="rules" ref="userInfo">

        <el-form-item label="昵称" :label-width="labelWidth">
          <el-input v-model="userInfo.nickName" style="width: 100%"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="labelWidth">
          <el-radio-group v-model="userInfo.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日" :label-width="labelWidth">
          <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="labelWidth" prop="email">
          <el-input v-model="userInfo.email" style="width: 100%"></el-input>
        </el-form-item>

        <el-form-item label="QQ号" :label-width="labelWidth" prop="qqNumber">
          <el-input v-model="userInfo.qqNo" style="width: 100%"></el-input>
        </el-form-item>

        <el-form-item label="微信号" :label-width="labelWidth" prop="qqNumber">
          <el-input v-model="userInfo.wechat" style="width: 100%"></el-input>
        </el-form-item>

        <el-form-item label="简介" :label-width="labelWidth" prop="summary">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"
            placeholder="请输入内容"
            style="width: 100%"
            v-model="userInfo.summary">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="edit()">保 存</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>

  import {editUser} from "../api/user";
  import {SET_USER_INFO} from "../store/mutations_type";

  export default {
    name: "PersonalCenter",
    components: {},
    data() {
      return {
        showPersonalCenter: true,
        userInfo: this.$store.state.user.userInfo,
      }
    },
    created() {
      console.log('personal center created')
    },
    methods: {
      // 标签选择
      edit() {
        this.$refs.userInfo.validate((valid) => {
          if(!valid) {
            console.log("校验失败")
          } else {
            console.log('user info ', this.userInfo)
            editUser(this.userInfo).then(response => {
              if(response.data.status == this.$Code.STATUS) {
                this.$message({
                  type: "success",
                  message: response.data.data
                })
                this.$store.commit(SET_USER_INFO, this.userInfo)
              } else {
                this.$message({
                  type: "error",
                  message: response.data.data
                })
              }
            });
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      },
    }
  };
</script>

<style scoped>
  #login {
    min-width: 100%;
    min-height: 100%;
    margin-top: 80px;
  }

  .createBlog {
    position: absolute;
    top: 16px;
    right: -20px;
  }

  .el-tag {
    height: 25px;
    line-height: 25px;
    margin-left: 6px;
  }

  #starlist li .title {
    color: #00a7eb;
  }

  .create {
    width: 35px;
    height: 35px;
    position: absolute;
    right: 0px;
  }

  .userInfoAvatar {
    width: 35px;
    height: 35px;
    position: absolute;
    right: -77px;
  }

  .userInfoAvatar img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .searchboxDefault {
    position: absolute;
    right: 1px;
    top: 0
  }

  @media only screen and (max-width: 1300px) {
    .userInfoAvatar {
      width: 35px;
      height: 35px;
      position: absolute;
      right: 100px;
      top: 0px;
    }

    .searchbox {
      position: absolute;
      right: 50px;
      top: 0
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .imgBody {
    width: 100px;
    height: 100px;
    border: solid 2px #ffffff;
    float: left;
    position: relative;
  }

  .imgBody img {
    width: 100px;
    height: 100px;
  }

  .uploadImgBody {
    margin-left: 5px;
    width: 100px;
    height: 100px;
    border: dashed 1px #c0c0c0;
    float: left;
    position: relative;
  }

  .uploadImgBody :hover {
    border: dashed 1px #00ccff;
  }

  .inputClass {
    position: absolute;
  }

  .commentList {
    width: 100%;
    margin: 0 auto;
  }

  .commentList .p1 {
    float: left;
  }

  .commentList .left {
    display: inline-block;
    width: 10%;
    height: 100%;
  }

  .commentList .left img {
    margin: 0 auto;
    width: 100%;
    border-radius: 50%;
  }

  .commentList .right {
    display: inline-block;
    width: 85%;
    margin-left: 5px;
  }

  .commentList .rightTop {
    height: 30px;
  }

  .commentList .rightTop .userName {
    color: #303133;
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .commentList .rightTop .timeAgo {
    color: #909399;
    margin-left: 10px;
    font-size: 15px;
  }

  .commentList .rightCenter {
    margin-left: 20px;
    line-height: 30px;
    height: 60px;
  }

  .commentList .rightBottom el-link {

  }

  .feedbackCard .item .title {
    display: inline-block;
    width: 70px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }

  .feedbackCard .item .content {
    display: inline-block;
    width: 240px;
    margin-bottom: 5px;
  }

  .myArticle .blogpic {
    float: left;
    max-height: 170px;
    margin-right: 20px;
    display: block;
    overflow: hidden;
  }

  .myArticle .blogpic img {
    width: 100%;
    max-height: 70px;
    -webkit-transition: all 0.6s ease;
    transition: all 0.6s ease;
    margin-bottom: 10px;
  }

  .myArticle .bloginfo {
    margin-top: 5px;
  }

  .myArticle .operation {
    float: right;
    margin-top: 3px;
    margin-left: 20px;
    height: 40px;
  }

  .search_ico2 {
    width: 60px;
    height: 60px;
    display: block;
    position: absolute;
    right: 0;
    top: 15px;
    padding: 0;
    margin: 0;
    line-height: 60px;
    cursor: pointer;
  }

</style>
