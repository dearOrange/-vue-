<template>
    <div id="person_center">
        <el-row>
            <el-button type="primary" plain>修改密码</el-button>
            <el-button type="success" v-if="!isEdit" @click="changeFile" plain>编辑资料</el-button>
            <el-button type="info" v-if="!isEdit" plain>下载二维码</el-button>
        </el-row>
        <ul>
            <li>
                <label>用户名</label>
                <span>{{personCenter.username}}</span>
            </li>
            <li>
                <label>密码</label>
                <span>{{personCenter.password}}</span>
            </li>
        </ul>
        <ul>
            <li>
                <label>真实姓名</label>
                <input v-if="isEdit" type="text" v-model="personCenter.realName">
                <span v-else>{{personCenter.realName}}</span>
            </li>
            <li>
                <label>联系电话</label>
                <input v-if="isEdit" type="text" v-model="personCenter.phone">
                <span v-else>{{personCenter.phone}}</span>
            </li>
            <li>
                <label>微信账号</label>
                <input v-if="isEdit" type="text" v-model="personCenter.wechat">
                <span v-else>{{personCenter.wechat}}</span>
            </li>
            <li>
                <label>邮箱</label>
                <input v-if="isEdit" type="text" v-model="personCenter.email">
                <span v-else>{{personCenter.email}}</span>
            </li>
            <li>
                <label>负责区域</label>
                <span>{{personCenter.mainArea}}</span>
            </li>
        </ul>
        <el-row class="footer_bth" v-if="isEdit">
            <el-button type="primary" plain>保存</el-button>
            <el-button type="success" @click="changeFile" plain>取消编辑</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
   name: 'Person',
   data(){
       return {
           personCenter:{
               username:'',
               password:'',
               realName:'',
               phone:'',
               wechat:'',
               email:'',
               mainArea:''
           },
           isEdit:false,
       }
   },
   mounted(){
       let token = this.$local.fetch('loginMsg').token;
        this.$ajax({
            method:'get',
            url:this.$http + '/operator/info',
            headers:{
            'X-Token':token,
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
        .then(res=>{
            
        })
   },
   methods:{
       changeFile(){
           this.isEdit = !this.isEdit;
       }
   }
}
</script>
<style lang="less" scoped>
#person_center{
    padding:60px 20px 10px 100px;
    .footer_bth{
        margin-top:30px;
    }
    ul{
        width:900px;
        overflow: hidden;
        &:nth-of-type(1){
            margin:30px 0;
        }
        li{
            float: left;
            width: 48%;
            border: 1px solid #cecece;
            label{
                display: inline-block;
                width:120px;
                text-align: center;
                padding: 10px 0;
                border-right: 1px solid #cecece;
                background-color: aliceblue;
            }
            input{
                height:28px;
                width:69%;
            }
        }
    }
}
</style>

