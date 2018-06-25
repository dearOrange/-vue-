<template>
    <div class="left-nav">
        <ul>
            <router-link :to="list.url" v-for="list in leftNavData" :key="list.id">
                <li>
                    <i class="list.icon"></i>
                    <div>{{list.name}}</div>
                </li>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'LeftNav',
    data(){
        return {
            leftNavData: []
        }
    },
    mounted(){
        let token = this.$local.fetch('loginMsg').token;
        this.$ajax({
            url: this.$http + '/operator/getUserPermission',
            headers: {
                'X-Token':token,
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res => {
            let data = res.data;
            if (data.code === 'SUCCESS') {
                this.leftNavData = data.data;
            }else if (data.code === 'TOKEN_FAIL') {
              this.open(data.msg);
            }else{
              this.open(data.msg);
            }
        })   
    },
    methods:{
        open(msg) { //打开弹窗
            this.$alert(msg, '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$local.save('loginMsg',{});
                    this.$router.push('/')
                }
            });
        }
    }
}
</script>
<style>
    .left-nav{
        color:#fff;
        font-size:10px;
        height:100%;
        background-color:#363845;
        position:fixed;
        top:50px;
        width:250px;
    }
    .iconfont{
        font-size:24px;
    }
    .left-nav ul{
        padding:0;
        margin:0;
    }
    .left-nav ul a{
        text-decoration-line: none;
        color:#fff;
    }
    .left-nav li{
        list-style: none;
        text-align: center;
        border-bottom:1px solid #474a5e;
        padding:20px 10px;
    }
</style>

