<template>
  <div class="header">
    <router-link to="/main/home">
        <div class="leftLogo">
            <img src="../assets/logo1.png" alt="">
        </div>
    </router-link>
    <div class="rightLoginout">
        <ul>
            <router-link to="/main/person">
            <li>
                <i class="icon iconfont icon-yonghuming"></i>
                <span>{{username}}</span>
            </li>
            </router-link>
            <li @click="dialogVisible = true">
                <i class="icon iconfont icon-icon"></i>
                <span>退出</span>
            </li>
        </ul>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :modal-append-to-body="false">
        <span>确定退出登录吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="loginOut">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data(){
      return {
          username: '',
          dialogVisible: false
      }
  },
  mounted(){
    this.username = this.$local.fetch('loginMsg').username;
  },
  methods: {
      loginOut(){
          let token = this.$local.fetch('loginMsg').token;
          this.$ajax({
              method:'get',
              url:this.$http + '/operator/logout',
              headers:{
                'X-Token':token,
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
          })
          .then(res=>{
              this.dialogVisible = false;
              this.$local.save('loginMsg',{});
              this.$router.push('/');
          })
      }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .header{
        width:100%;
        height:50px;
        background-color:#434554;
        position:fixed;
        z-index:9;
    }
    .leftLogo{
        float: left;
        padding:8px 10px;
    }
    .leftLogo img{
        height:30px;
    }
    .rightLoginout{
        float:right;
        padding:10px;
        color:#fff;
    }
    .rightLoginout ul li{
        list-style: none;
        float:left;
        margin:4px 10px;
        cursor: pointer;
    }
</style>

