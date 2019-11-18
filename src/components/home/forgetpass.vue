<template>
<div class="forgetpass">
   <GlobaHeader :text="text" />
   <div class="context-box">
        <div class="catrelease-title">手机号码*</div>
    <van-field v-model="phoneNum" placeholder="请输入手机号码" />
     <div class="catrelease-title">验证码*</div>
    <van-field v-model="code" placeholder="请输入验证码" />
    <div class="yanzhnegm">
      <span v-if="disabled">{{time}}</span>
      <span v-else @click="sendMsg">获取验证码</span>
      </div>
    <div class="sumcode" @click="onSubmit">提交验证码</div>
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
              text: "找回您得名片密码",
              time: 60,
              code:'',
              password:"",
              phoneNum:"",
              disabled:false,
        }
    },
    methods:{
         sendMsg(){
            if (!this.$RegExp.phone(this.phoneNum)) {
                this.$notify("手机号错误，重新输入")          
            }else{
                   let datas={phoneNum:this.phoneNum}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smUserinfo/getCode`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {      
               if(res.errCode ="0000"){
                //  that.$toast(res.errMsg)
                let timer = setInterval(() => {
                    if (that.time > 0 ) {
                                that.time--;
                                 that.disabled = true;
                                // this.btnText = '重新发送(' + this.time + ')';
                            }else{
                                clearInterval(timer)
                                 that.disabled = false;
                                // this.btnText = '发验证码';
                                that.time = 60;
                                that.disabled = false;
                            }
                        }, 1000)
               }else{
                   that.$toast(res.errMsg)

               }
            }
        });
            //     this.fetch(this.apis.sendMsg,{phone:this.phone},'post').then(res=>{
            //     if(res.code==200){
            //         if(res.data.status){                   
            //             let timer = setInterval(() => {
            //                 if (this.time > 0 ) {
            //                     this.time--;
            //                      this.disabled = true;
            //                     // this.btnText = '重新发送(' + this.time + ')';
            //                 }else{
            //                     clearInterval(timer)
            //                      this.disabled = false;
            //                     // this.btnText = '发验证码';
            //                     this.time = 60;
            //                     this.disabled = false;
            //                 }
            //             }, 1000)
            //             this.$notify({ type: 'success', message: res.data.msg||res.data.message });
            //         }else{
            //             this.$notify(res.data.msg||res.data.message)
            //         }
            //     }else{
            //         this.$notify(res.message)
            //     }
            // })
            }
        },
           onSubmit(){
                             let datas={phoneNum:this.phoneNum,code:this.code}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smUserinfo/vailCode`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {      
               if(res.errCode ="0000"){
                //  that.$toast(res.errMsg)
                // this.$router.push("/login")
                 that.$router.push({
                     name:'Login',
                     query:{
                         phoneNum:that.phoneNum
                     }
                 })
              
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