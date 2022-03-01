<template>
  <div v-show="getShowLogin">
    <div class="box loginBox">
      <div class="title"  >
        <span class="t1">
          {{showPasswordLogin == false ? "微信扫码登录":"登录"}}
        </span>
        <div class="t2" @click="closeLogin()">
          X
        </div>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <el-form :label-position="labelPosition" :rules="loginRules" :model="loginForm" ref="loginForm">

<!--        <div class="passwordLogin" v-if="showPasswordLogin">-->
<!--          <el-form-item label="用户名" prop="userName">-->
<!--            <el-input v-model="loginForm.userName" placeholder="请输入用户名或邮箱" :disabled="loginType.password.disable"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="密码" prop="password">-->
<!--            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :disabled="loginType.password.disable"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-row class="btn">-->
<!--            <el-button class="loginBtn" type="primary" @click="startLogin" :disabled="loginType.password.disable">登录</el-button>-->
<!--            <el-button class="registerBtn" type="info" @click="goRegister" :disabled="loginType.password.disable">注册</el-button>-->
<!--          </el-row>-->
<!--        </div>-->

        <div v-if="showPasswordLogin == false" style="text-align: center" class="block">
          <el-image :src="wechatOrCode" style="width: 250px;"></el-image>
        </div>


        <el-row class="elRow">
          <el-tooltip content="码云" placement="bottom">
            <el-button circle @click="goAuth('gitee')" :disabled="!loginType.gitee">
              <img src="../../assets/img/gitee.png" class="login_type_icon">
            </el-button>
          </el-tooltip>

          <el-tooltip content="Github" placement="bottom">
            <el-button circle @click="goAuth('github')" :disabled="!loginType.github">
              <img src="../../assets/img/github.png" class="login_type_icon">
            </el-button>
          </el-tooltip>

          <el-tooltip content="QQ" placement="bottom">
            <el-button circle @click="goAuth('qq')" :disabled="!loginType.qq">
              <img src="../../assets/img/QQ.png" class="login_type_icon">
            </el-button>
          </el-tooltip>

          <el-tooltip content="微信" placement="bottom">
            <el-button circle @click="goAuth('wechat')" :disabled="!loginType.wechat">
              <img src="../../assets/img/wechat.png" class="login_type_icon">
            </el-button>
          </el-tooltip>

        </el-row>
        <div class="loginTip">目前登录方式支持
          <span v-if="loginType.password"> 账号密码 </span>
          <span v-if="loginType.gitee"> 码云 </span>
          <span v-if="loginType.github"> Github </span>
<!--          <span v-if="loginType.qq"> QQ </span>-->
<!--          <span v-if="loginType.wechat"> 微信 </span>-->
        </div>
      </el-form>

    </div>

<!--    <div class="box registerBox" v-if="showLogin == false">-->
<!--      <div class="title">-->
<!--        <span class="t1">-->
<!--          注册-->
<!--        </span>-->
<!--        <div class="t2" @click="closeLogin()">-->
<!--          X-->
<!--        </div>-->
<!--      </div>-->
<!--      <el-divider></el-divider>-->
<!--      <el-form :rules="rules" :label-position="labelPosition" :model="registerForm" ref="registerForm">-->
<!--        <el-form-item label="用户名" prop="userName">-->
<!--          <el-input v-model="registerForm.userName" placeholder="用户名长度在5~20之间" :disabled="loginType.password.disable"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="昵称" prop="nickName">-->
<!--          <el-input v-model="registerForm.nickName" placeholder="昵称长度在1~20之间" :disabled="loginType.password.disable"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="密码" prop="password">-->
<!--          <el-input type="password" v-model="registerForm.password" placeholder="密码长度在5~20之间" :disabled="loginType.password.disable"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="重复密码" prop="password2">-->
<!--          <el-input type="password" v-model="registerForm.password2" placeholder="请再次输入密码" :disabled="loginType.password.disable"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="邮箱" prop="email">-->
<!--          <el-input v-model="registerForm.email" placeholder="请输入正确的邮箱进行注册认证" :disabled="loginType.password.disable"></el-input>-->
<!--        </el-form-item>-->

<!--        <div class="loginTip">注册后，需要到邮箱进行邮件认证~</div>-->
<!--      </el-form>-->
<!--    </div>-->

    <div class="mask"></div>

  </div>
</template>

<script>
  import {login, getWechatOrCodeTicket} from "@/api/user";
  import { Loading } from 'element-ui';
  import {mapMutations} from 'vuex';
  import {SET_SHOW_LOGIN} from "../../store/mutations_type";
  import Constants from "../../utils/Constants";
  export default {
    name: "LoginBox",
    data() {
      return {
        loading: null,
        option: {
          fullscreen: true,
          lock: true
        },
        showPasswordLogin: true, // 是否显示账号密码登录
        wechatOrCode: "", // 微信公众号登录二维码
        // 显示登录页面
        showLogin: this.$store.state.user.showLogin,
        isLogin: false,
        table: false,
        dialog: false,
        labelPosition: "right",
        loginForm: {
          userName: "",
          password: ""
        },
        registerForm: {
          userName: "",
          password: "",
          password2: "",
          email: ""
        },
        // 登录类别
        loginType: {
          password: false,
          gitee: true,
          github: true,
          qq: false,
          wechat: false
        },
        loginRules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            { min: 5, message: "用户名长度大于等于 5 个字符", trigger: "blur" },
            { max: 20, message: "用户名长度不能大于 20 个字符", trigger: "blur" }
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            { min: 1, message: "用户名长度大于等于 1 个字符", trigger: "blur" },
            { max: 20, message: "用户名长度不能大于 20 个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 5, message: "密码长度需要大于等于 5 个字符", trigger: "blur" },
            { max: 20, message: "密码长度不能大于 20 个字符", trigger: "blur" }
          ]
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            { min: 5, message: "用户名长度大于等于 5 个字符", trigger: "blur" },
            { max: 20, message: "用户名长度不能大于 20 个字符", trigger: "blur" }
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 5, message: "密码长度需要大于等于 5 个字符", trigger: "blur" },
            { max: 20, message: "密码长度不能大于 20 个字符", trigger: "blur" }
          ],
          password2: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
            { min: 5, message: "密码长度需要大于等于 5 个字符", trigger: "blur" },
            { max: 20, message: "密码长度不能大于 20 个字符", trigger: "blur" }
          ],
          email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            {pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '请输入正确的邮箱'},
          ]
        }
      };
    },
    components: {},
    created() {
      this.setLoginTypeList()
    },
    computed: {
      getShowLogin() {
        return this.$store.state.user.showLogin
      }
    },
    methods: {
      ...mapMutations(['setUserInfo', 'setLoginState', 'setWebConfigData']),
      setLoginTypeList: function() {
        this.loginType.password = false
        this.loginType.gitee = true
        this.loginType.github = true
        this.loginType.qq = false
        this.loginType.wechat = false
        // 获取登录方式列表
        // let webConfigData = this.$store.state.app.webConfigData
        // if(webConfigData.loginTypeList != undefined) {
        //   let loginTypeList = JSON.parse(webConfigData.loginTypeList)
        //   for(let a=0; a<loginTypeList.length; a++) {
        //     switch (loginTypeList[a]) {
        //       case "1": {
        //         this.loginType.password.disable = false
        //       } break;
        //       case "2": {
        //         this.loginType.gitee.disable = false
        //       } break;
        //       case "3": {
        //         this.loginType.github.disable = false
        //       } break;
        //       case "4": {
        //         this.loginType.qq.disable = false
        //       } break;
        //       case "5": {
        //         this.loginType.wechat.disable = false
        //       } break;
        //       default: {
        //         console.log("登录方式设置有误！！")
        //       }
        //     }
        //   }
        // }
      },
      goLogin: function () {
        // this.$store.commit(SET_SHOW_LOGIN, true)
      },
      goRegister: function () {
        this.registerForm.userName="";
        this.registerForm.password="";
        this.registerForm.password2="";
        this.registerForm.email="";
        // this.showLogin = false;
      },
      goAuth: function (source) {
        this.loading = Loading.service({
          lock: true,
          text: '加载中……',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        var params = new URLSearchParams();
        params.append("source", source);
        login(source).then(response => {
          setTimeout(this.loading.close(), 5000)
          console.log("response:", response)
          var data = response.data
          if (data.status == Constants.STATUS.SUCCESS) {
            this.closeLogin()
            this.setLoginState(true)
            window.location.href = data.data.url
          }
        });
      },
      closeLogin: function() {
        this.closeLoginBox();
      },
      closeLoginBox: function () {
        this.$store.commit(SET_SHOW_LOGIN, false);
      }
    }
  };
</script>


<style>
  .box {
    width: 500px;
    height: 220px;
    background: white;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 101;
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .registerBox {
    height: 660px;
  }

  .box .title {
    height: 48px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
  }
  .box .title .t2 {
    font-size: 16px;
    float: right;
    margin-right: 6px;
    margin-top: -6px;
    cursor: pointer;
  }

  .box .el-divider--horizontal {
    margin: 12px 0;
  }

  .box .el-form-item__label {
    margin-left: 25px;
    font-size: 16px;
  }

  .box .el-input__inner {
    margin-left: 10px;
    width: 90%;
  }

  .box .btn {
    text-align: center;
  }

  .box .loginBtn {
    width: 40%;
  }

  .box .registerBtn {
    width: 40%;
  }

  .elRow {
    margin-top: 15px;
    text-align: center;
  }

  .loginTip {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: #bababa;
  }

  .remarksBox {
    position: fixed;
    left: 50%;
    margin-left: -100px;
    top: 50%;
    margin-top: -50px;
    border: 1px solid red;
    width: 200px;
    height: 100px;
    text-align: center;
    z-index: 101; /* 要比遮罩层大 */
  }

  /* 遮罩层 */
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .login_type_icon {
    width: 25px;
    outline: 0 !important;
  }

  .el-button {
    outline: 0 !important;
  }
</style>
