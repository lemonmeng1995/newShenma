<template>
<div class="forgetpass">
   <GlobaHeader :text="text" />
   <div class="context-box">
       <div class="catrelease-title">手机号码*</div>
    <van-field v-model="phoneNum" placeholder="请输入手机号码" />
     <div class="catrelease-title">密码*</div>
    <van-field v-model="password" type="password" placeholder="请输入密码" />
    <div class="sumcode" @click="onSubmit">保存</div>
   </div>
</div>  

</template>

<script>
import GlobaHeader from "../globalcom/globaHeader";
import { baseUrl } from "@/tools/httpApi";
export default {
    name:"forgetpass",
    components:{GlobaHeader},
    data(){
        return{
              text: "登 入",
              time: 60,
              code:'',
              password:"",
              phoneNum:"",
              disabled:false,
        }
    },
    created(){
      if(this.$route.query.phoneNum || localStorage.getItem('phoneNumUser')){
        this.phoneNum = this.$route.query.phoneNum|| localStorage.getItem('phoneNumUser')
      }
    },
    methods:{
        onSubmit(){
    let datas={phoneNum:this.phoneNum ,password:this.password}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smUserinfo/updatePassword`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {      
               if(res.errCode ="0000"){         
                 that.$router.push("/home")            
               }else{
                   that.$toast(res.errMsg)
               }
            }
        });
        },
    }

}
</script>

<style scoped lang="scss">
.forgetpass{
    .context-box{
        margin: 30px 26px 120px 26px;
    }
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
  .yanzhnegm{
      margin:10px;
      font-size: 28px;
      width:180px;
      height:60px;
      background: red;
      color:#fff;
      text-align: center;
      line-height:60px;
      border-radius: 20px;
  }
  .sumcode{
      height: 100px;
      line-height: 100px;
      background: red;
      color:#fff;
      text-align: center;
      border-radius: 20px;
      margin-top:100px;
      font-size: 35px;
  }

}
</style>