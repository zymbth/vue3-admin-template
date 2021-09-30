<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <form>
        <div class="user-box">
          <input v-model="loginForm.username" type="text" name="" required="">
          <label>{{options.username}}</label>
        </div>
        <div class="user-box">
          <input @keyup.enter="handleLogin" v-model="loginForm.password" :type="options.type === 'phone' ? 'text' : 'password'" name="" required="">
          <label>{{options.password}}</label>
          <div v-show="options.type === 'phone'" class="verify-code">
            <a v-if="!codeVisible" @click="warningPhone" data-disabled>获取验证码</a>
            <a v-else-if="codeAvailable" @click="getCode">获取验证码</a>
            <span v-else>{{restSec}}</span>
          </div>
        </div>
        <a class="change-login" @click="changeLoginType">{{options.typeName}}</a>
        <a id="submit-btn" @click="handleLogin"><span></span><span></span><span></span><span></span>登录</a>
      </form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getVerifyCode } from '@/api/user'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

export default {
  name: 'Login',
  data() {
    return {
      options: {
        type: 'origin',
        typeName: '手机验证码登录',
        username: '用户名',
        password: '密码'
      },
      loginForm: {
        username: '',
        password: ''
      },
      redirect: undefined,
      codeAvailable: true,    // 是否可获取验证码
      restSec: 60,            // 剩余时间
      interval: 60,           // 限制获取验证码间隔
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
    codeVisible() {
      return this.options.type === 'phone' && this.loginForm.username &&
        /^((\+86)|(86))?(1[3-9])\d{9}$/.test(this.loginForm.username)
    }
  },
  methods: {
    // 登录
    async handleLogin() {
      if(this.options.type === 'origin') {
        if(this.loginForm.username.length < 3) {
          this.$message.error('用户名不正确')
          return
        } else if(this.loginForm.password.length < 6) {
          this.$message.error('请输入最少六位密码')
          return
        }
      } else {
        if(this.loginForm.password.length < 4) {
          this.$message.error('请输入正确的校验码')
          return
        }
      }
      this.loginForm.type = this.options.type === 'origin' ? 'name' : 'tel'
      NProgress.start()
      await this.$store.dispatch('user/login', this.loginForm).catch((err) => this.$message.error(err.message))
      NProgress.done()
      this.$router.push({ path: this.redirect || '/' })
    },
    // 更改登录方式
    changeLoginType() {
      if(this.options.type === 'origin') {
        this.options = {
          type: 'phone',
          typeName: '用户名/密码登录',
          username: '手机号',
          password: '验证码'
        }
      } else {
        this.options = {
          type: 'origin',
          typeName: '手机验证码登录',
          username: '用户名',
          password: '密码'
        }
      }
    },
    // 获取验证码
    getCode() {
      getVerifyCode(this.loginForm.username).then(res => {
        this.codeAvailable = false
        this.restSec = this.interval
        let tmp = setInterval(() => { // 倒计时 - 再次获取时间
          this.restSec--
        }, 1000)
        setTimeout(() => { // 可再次获取验证码
          this.codeAvailable = true
          window.clearInterval(tmp)
        }, this.interval * 1000)
        this.$message.success('短信已发送，注意查收！')
      })
    },
    // 手机号格式校验失败提醒
    warningPhone() {
      this.$message.info('请输入正确的手机号')
    },
  }
}
</script>

<style lang="scss" scoped>
// $bg:#2d3a4b;
// $dark_gray:#889aa4;
// $light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  margin:0;
  padding:0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

#submit-btn {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

#submit-btn:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

#submit-btn span {
  position: absolute;
  display: block;
}

#submit-btn span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

#submit-btn span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

#submit-btn span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

#submit-btn span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

.change-login {
  font-size: 12px;
  margin: 0 auto;
  color: #03e9f4;
  float: right;
  text-decoration: none;
  text-align: right;
/*   width: 150px; */
/*   border-radius: 50px; */
/*   border: 1px solid #03e9f4; */
  cursor: pointer;
}
.verify-code {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #03e9f4;

  a[data-disabled] {color: #9ea8a9;}
}
.login-box .user-box input:focus ~ .verify-code,
.login-box .user-box input:valid ~ .verify-code {display: none;}
</style>
