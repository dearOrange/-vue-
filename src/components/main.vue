<template>
  <div>
    <Header/>
    <div class="section">
      <LeftNav/>
      <div class="right-section">
        <BreadCrumb/>
        <div class="container_page">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../common/header'
import LeftNav from '../common/layout-left'
import BreadCrumb from '../common/breadcrumb'
export default {
  name: 'Main',
  components: {
    Header,
    LeftNav,
    BreadCrumb
  },
  mounted(){
    let token = this.$local.fetch('loginMsg').token;
    if(token){
      this.$router.push('/main/home')
    }else{
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section{
  height:100%;
}
.right-section{
  position:fixed;
  top:50px;
  left:250px;
  width:95%;
}
</style>
