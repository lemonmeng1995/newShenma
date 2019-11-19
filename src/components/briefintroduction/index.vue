<template>
<div id="briefintroduction">
    <GlobaHeader :text="text" />
    <p class="briefint-title">个人简历</p>
    <div v-if="introduceTitle">
    <p class="briefint-des">{{introduceTitle}}</p>
    <p class="briefint-text">
         {{richText}}     
    </p>
     <div class="vanimage" v-for="(item,index) in imgIdArrFile" :key="index">
         <van-image fit="contain" :src="item.url"/>
     </div>
    <div class="uploadMP4-box" v-for="(item,index) in videoArr" :key="index">
          <video class="videoclass" :src="item.url" controls="controls"></video>
    </div>
    </div>
    <div v-else>
        <van-image width="10rem" height="10rem" fit="contain" :src="images.zhanwei" />
    </div>
    
  
</div>
  
</template>

<script>
import GlobaHeader from "../globalcom/globaHeader";
import { baseUrl } from "@/tools/httpApi";
export default {
    name:'briefintroduction',
    components:{GlobaHeader},
    data(){
        return{
             text: "简介",
             introduceTitle:"",
             richText:"",
             imgIdArrFile:[],
             videoArr:[],
             images:{
                  vanswipe: require("../../assets/product/vanswipe.png"),
                  zhanwei:require("../../assets/zhanwei.png")
             }

        }
    },
    mounted(){
        console.log("进来简介了。。。。")
  
    let datas={customerNo:localStorage.getItem('customerNo')}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smIntroduce/detailUserInfo`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
              console.log("res",res)    
               if(res.errCode ="0000"){
              if(res.data){
                  let obj= res.data
               that.introduceTitle = obj.introduceTitle
               that.richText =  obj.richText
                    if(res.data.videoId && res.data.videoUrlList){
          let linvideoId= res.data.videoId.split(",")
        res.data.videoUrlList.length>0 && res.data.videoUrlList.forEach((qq,ww) => {
          linvideoId.forEach((cc,pp)=> {
            if(ww == pp){
                that.videoArr.push({
                  url:qq,
                  id:cc,
                });
            }
          })
        })
       }

      if(res.data.imgId &&  res.data.imgUrlList){
          res.data.imgUrlList.forEach((ii,dd) => {
         that.imgIdArrFile.push({url:ii})
      })
      }
    }
              
               }else{
                   that.$toast(res.errMsg)

               }
            }
        });
    }

}
</script>

<style lang="scss" scoped>
#briefintroduction{
    margin-bottom: 120px;
    .briefint-title{
        font-size:50px;
        font-family:FZDaHei-B02S;
        font-weight:bold;
        color:rgba(0,0,0,1);
        text-align: center;
        margin:30px;

    }
    .briefint-des{
        height:87px;
        line-height: 87px;
        margin:0 20px 0 20px;
background:rgba(241,241,241,1);
border-radius:5px;

font-size:40px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(163,162,162,1);

    }
    .briefint-text{
          margin:0 20px 0 20px;
        font-size:40px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(85,85,85,1);

    }
    img{
        margin:0 20px 0 20px;
        width:710px;
       height:1987px;

    }
    .vanimage{
        margin:0 20px;
    }
    .uploadMP4-box{
        margin:0 20px;
        overflow: hidden;

        .videoclass{
            width: 100%;
            // height: 400px;
        }
    }
    
}

</style>