<template>
<div id="loginBg">
  <div id="login_content">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm loginForm">   
      <h1>运营平台登录</h1>
      <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm2.username" auto-complete="off" id="username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" id="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkCode" id="checkCode">
          <el-input type="text" v-model="ruleForm2.checkCode" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
          <img @click="changeCode" :src="src" />
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
// import axios from '../api/resource.js'
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      }else{
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        username: '',
        pass: '',
        checkCode: ''
      },
      src: this.$http + '/operator/getAuthCode',
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        checkCode: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loginParams = {
              username: this.ruleForm2.username,
              password: this.ruleForm2.pass,
              authCode: this.ruleForm2.checkCode,
              captchaCode: document.cookie.captchaCode
          };
          this.$ajax({
            method: 'post',
            url: this.$http + '/operator/login',
            data: qs.stringify(loginParams),
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }).then(res => {
            let data = res.data;
            if (data.code === 'SUCCESS') {
              this.$local.save('loginMsg',{
                token:data.data.token,
                username: this.ruleForm2.username,
                type:data.data.type
              })
              this.$router.push('/main/home')

            }else if (data.code === 'TOKEN_FAIL') {
              this.open(data.msg);
            }else{
              this.open(data.msg);
            }

          })
          
        } else {
          this.refreshCode();
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    changeCode() {
      this.refreshCode();
    },
    refreshCode(){
      this.src = this.$http + '/operator/getAuthCode?random=' + Math.ceil(Math.random() * 100000000)
    },
    open(msg) { //打开弹窗
      this.$alert(msg, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.refreshCode();
        }
      });
    }
  }
}
</script>
<style>
  #loginBg{
    width:100%;
    height:100%;
    background:url(../assets/loginbg.png) no-repeat center;
    background-size:cover;
  }
  #login_content{
      width:530px;
      margin:auto;
      /* padding: 36px 0; */
      overflow: hidden;
  }
  .loginForm{
    width:400px;
    background-color:rgba(0, 0, 0, .3);
    padding: 35px 35px 15px 35px;
    border-radius: 10px;
    margin:20% auto 0;
    color:#fff;
  }
  .loginForm h1{
    padding:0 0 15px;
  }
  .el-form-item__label{
    color:#fff;
  }
  .loginForm input{
    color:#eee;
    background-color:transparent;
  }
  #username{
    background:url(../assets/login_user.png) no-repeat 10px center;
    text-indent: 20px;
  }
  #password{
    background:url(../assets/login_pass.png) no-repeat 10px center;
    text-indent: 20px;
  }
  #checkCode .el-input{
    width:59%;
  }
  #checkCode .el-input input{
    float: left;
  }
</style>

