<template>
<div class="introduction">
    <div class="catrelease-title">标题*</div>
    <van-field v-model="name" placeholder="请输入标题" />
    <div class="catrelease-title">内容*</div>
    <Profileeditor/>
     <div class="submit">提交</div>
 </div>  
</template>

<script>

import Profileeditor from "../globalcom/profileeditor"
export default {
    name:"introduction",
    components:{Profileeditor},
    data(){
        return{

        }
    }

}
</script>

<style scoped lang="scss">
.introduction{
      margin: 30px 26px 140px 26px;
  .catrelease-title {
    padding: 20px;
    font-size: 28px;
    font-family: Droid Sans Fallback;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
  }
  .van-cell {
    border: 2px solid #eee;
  }
   .submit{
      height:86px;
background:rgba(255,59,59,1);
border:0px solid rgba(0,0,0,1);
border-radius:7px;

font-size:32px;
font-family:Droid Sans Fallback;
font-weight:bold;
color:rgba(255,255,255,1);
text-align: center;
line-height:86px;
  }

}
</style>