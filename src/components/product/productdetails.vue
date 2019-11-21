<template>
  <div id="productdetails">
    <GlobaHeader :text="text" />
    <div class="context-banban">
          <!-- <van-image :src="images.xiaolongx"   fit="contain"/> -->
      <img :src="dataList.productImgId?dataList.productImgId:dataList.coverImgId" />
      <p class="context-banban-text">{{dataList.productName?dataList.productName:dataList.dynamicTitle }}</p>
      <p class="context-banban-price" v-if="this.$route.query.productId">￥ {{dataList.productPrice}}</p>
    </div>
    <div class="gelixian"></div>
    <div class="product-detail">
        <p class="product-title">产品介绍</p>
        <p class="product-text"  v-html="dataList.productDescribe?dataList.productDescribe:dataList.content">
          <!-- {{dataList.productDescribe}} -->
          </p>
        <!-- <p class="text-img"   :style="{backgroundImage: 'url(' + images.xiaolongx + ')', backgroundSize:'cover'}"></p> -->
           <!-- <van-image :src="images.xiaolongx"   fit="scale-down"/> -->
           <div class="imagevan">
              <van-image fit="contain"  v-if="dataList.imgUrlList"  v-for="(item,index) in dataList.imgUrlList" :key="index" :src="item" />
           </div>
      
        <!-- <img v-if="dataList.imgUrlList"  v-for="(item,index) in dataList.imgUrlList" :key="index" :src="item" /> -->
         <!-- <img v-if="dataList.imgUrlList"  v-for="(item,index) in dataList.imgUrlList" :key="index" :src="item" /> -->
          <div class="uploadMP4" v-if="dataList.videoUrlList>0">
          <div class="uploadMP4-box" v-for="(item,index) in dataList.videoUrlList" :key="index">
          <video class="videoclass" :src="item" controls="controls"></video>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GlobaHeader from "../globalcom/globaHeader";
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "productdetails",
  components: { GlobaHeader },
  data() {
    return {
      text: "产品详情",
      images: {
        xiaolongx: require("../../assets/product/xiaolongx.png")
      },
      dataList:{}, //
    };
  },
  created(){
    let nowCon ;
    let url;
    let datas;
    if( this.$route.query.productId){
      nowCon = this.$route.query.productId
      url =  `${baseUrl}/smProduct/detailSmProduct`
       datas={
        productId:nowCon,
        }

    }else{
        nowCon = this.$route.query.dynamicId
        this.text = this.$route.query.name
        datas ={dynamicId:nowCon}
        url =  `${baseUrl}/smDynamic/detailDynamic`
    }
    console.log("nowCon",nowCon,this.$route.query)
        let that = this

      $.ajax({
            type : "post",
            url : url,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("res",res)      
               if(res.errCode ="0000"){
                 that.dataList = res.data                              
               }
            }
        });  
  },
};
</script>

<style scoped lang="scss">
#productdetails {
    margin-bottom: 120px;
  .context-banban {
    // .van-image{
    //   width: 576px;
    //   height: 694px;
    //   margin: 87px;
    // }
       img{
      width: 576px;
      height: 694px;
      margin: 87px;
    }
    .context-banban-text {
      font-size: 35px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(38, 38, 38, 1);
      margin-left: 33px;
      margin-bottom: 20px;
    }
    .context-banban-price {
      font-size: 35px;
      font-family: FZDaHei-B02S;
      font-weight: bold;
      color: rgba(255, 64, 64, 1);
      margin-left: 33px;
      margin-bottom: 20px;
    }
  }
  .gelixian{
      width:100%;
      height:20px;
      background:rgba(241,241,241,1);
  }
  .product-detail{
      .product-title{
          margin:25px;
          font-size:35px;
font-family:Droid Sans Fallback;
font-weight:bold;
color:rgba(38,38,38,1);

      }
      .product-text{
            margin:25px;
          font-size:35px;
font-family:Droid Sans Fallback;
font-weight:bold;
color:rgba(109,109,109,1);
overflow: hidden;

      }
      .text-img{
          height:351px;
          width:710px;
          padding:20px;
          overflow: hidden;
        //   background: url('./assets/product/xiaolongx.png') center top no-repeat

      }
      .imagevan{
        font-size: 0;
       .van-image{
            margin:0 20px;
          }
      }
    
     img{
          height:351px;
          width:710px;
          padding:0 20px 0 20px;

      }
   .uploadMP4 {
      // width: 100%;
      padding:0 20px 0 20px;
      .uploadMP4-box {
        width: 100%;
        .videoclass {
          width: 100%;
          height: 400px;
        }
      }
    }

  }
}
</style>