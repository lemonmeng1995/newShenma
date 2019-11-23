<template>
  <div class="systemsetup">
   <van-cell title="修改密码" is-link to="/login"/>
   <van-cell title="退出系统" is-link @click="goBackpage"/>
  </div>
</template>

<script>
export default {
    name:"systemsetup",
    data(){
        return{

        }
    },
    methods:{
      goBackpage(){
        console.log("123,",)
         var that = this;//window.onpopstate方法指向window,所以要储存一下当前的vue实例
      let route = '上一页';//根据业务逻辑的上一页决定
      window.history.pushState('forward', null, ''); 
      window.history.forward(1);
      window.onpopstate = function() {
          //将当前页面window.location.href 放入页面栈当中
          window.history.pushState({}, null, window.location.href);
          Dialog.confirm({
          title: '提示',
          message: '是否退出页面'
          }).then(() => {
            wx.closeWindow();
          }).catch(()=>{
            
           }
          );
      }
      }
    }

}
</script>

<style scoped lang="scss">
.systemsetup{
   margin:20px 20px 120px 20px;

}

</style>