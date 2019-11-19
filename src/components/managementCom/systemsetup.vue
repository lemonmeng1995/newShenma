<template>
  <div class="systemsetup">
   <van-cell title="修改密码" is-link to="/login"/>
   <van-cell title="退出系统" is-link />
  </div>
</template>

<script>
export default {
    name:"systemsetup",
    data(){
        return{

        }
    }

}
</script>

<style scoped lang="scss">
.systemsetup{
   margin:20px 20px 120px 20px;

}

</style>