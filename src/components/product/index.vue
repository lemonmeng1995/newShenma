<template>
  <div id="product">
    <GlobaHeader :text="text" />
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch"></van-search>
    <div class="Vanswipe" v-show="dataBanner.length>0">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in dataBanner" :key="index">
                  <van-image fit="contain" :src="item.bannerUrl"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="banlan">
      <div class="banlan-all">
         <div class="img-box" @click="getDatatype()"><img :src="images.all" /></div>
        <span>全部</span>
      </div>
      <div class="banlan-all" v-show="dataType.length>0"  v-for="(itype,indextype) in dataType" :key="indextype">
        <div class="img-box"  @click="getDatatype(itype.productTypeId)"><img :src="itype.productTypeImgId" /></div>
        <span>{{itype.productTypeName}}</span>
      </div>
    </div>
    <div class="titlesorting">
      <div 
      :class="isdecshow == 0?'moren':'moren nomoren'"
        @click="getAll">
        <span>默认</span>
        <img :src="isdecshow == 0?images.arrowO:images.arrow" />
      </div>
      <div  @click="getTime"
        :class="isdecshow == 1?'moren':'moren nomoren'">
        <span>时间</span>
        <img  :src="isdecshow == 1?images.arrowO:images.arrow"/>
      </div>
      <div  @click="getXiao" :class="isdecshow == 2?'moren':'moren nomoren'">
        <span>销售</span>
        <img :src="isdecshow == 2?images.arrowO:images.arrow"/>
      </div>
    </div>
    <div class="showall"  v-if="dataSource.length>0">
      <p class="showall-title">全部</p>
      <div class="showall-context"  @click="goTopaoducdatail(item.productId)"   
        v-for="(item,index) in dataSource" :key="index">
        <img :src="item.productImgId" />
        <div class="showall-title-right">
          <p class="right-text">{{item.productName}}</p>
          <p class="right-price">￥ {{item.productPrice}}</p>
        </div>
        <div class="showall-arrow">
          <img :src="images.rightarr" />
          <p>浏览量10</p>
        </div>
      </div>
      <p class='noproduct'>已展示全部产品</p>
    </div>
    <div v-else class="zhanweitu">
        <van-image  fit="contain" :src="images.zhanwei" />
    </div>
  </div>
</template>

<script>
import GlobaHeader from "../globalcom/globaHeader";
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "product",
  components: { GlobaHeader },
  data() {
    return {
      text: "产品",
      value: "",
      isdecshow:0, //排序
      images: {
        vanswipe: require("../../assets/product/vanswipe.png"),
        all: require("../../assets/product/all.png"),
        foods: require("../../assets/product/foods.png"),
        arrowO: require("../../assets/product/arrowO.png"),
        arrow: require("../../assets/product/arrow.png"),
        xiaolongx: require("../../assets/product/xiaolongx.png"),
        rightarr: require("../../assets/product/rightarr.png"),
        zhanwei:require("../../assets/zhanwei.png")
      },
      dataBanner:[],
      dataType:[],
      dataSource:[],
    };
  },
  created(){
     let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
      let datas={
      customerNo : linCus
    }
       this.fetch("/smProductBanner/selectSmProductBanner", datas, "get").then(res => {
             if(res.errCode ="0000"){
                 if(res.data.length>0){
                     this.dataBanner = res.data

                  //  res.data.forEach((aa,bb) => {
                  //      this.imgIdArrFile.push({url:aa.bannerUrl,id:aa.bannerImgId})
                  //    })
                 }                                  
               }
          })

        let that = this

      $.ajax({
            type : "post",
            url : `${baseUrl}/smProducttype/selectSmProduct`,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {       
               if(res.errCode ="0000"){
                 that.dataType = res.data                              
               }
            }
        }); 
    let data={
      custNo : linCus
    }

      $.ajax({
            type : "post",
            url : `${baseUrl}/smProduct/selectSmProductByWhere`,
            dataType: "json",
            data:data, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("数据源",res )         
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });


  },
  methods: {
    getAll(){
      this.isdecshow = 0
        let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
        let data={custNo : linCus,orderBy:0 }
        if(this.value){
          data.searchTxt = this.value
        }
        let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smProduct/selectSmProductByWhere`,
            dataType: "json",
            data:data, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {                 
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });

    },
    getTime(){
      this.isdecshow = 1
           let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
        let data={custNo : linCus,orderBy:1 }
        if(this.value){
          data.searchTxt = this.value
        }
        let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smProduct/selectSmProductByWhere`,
            dataType: "json",
            data:data, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {                 
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });

    },
      getXiao(){
      this.isdecshow = 2
           let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
        let data={custNo : linCus,orderBy:2 }
        if(this.value){
          data.searchTxt = this.value
        }
        let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smProduct/selectSmProductByWhere`,
            dataType: "json",
            data:data, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {                 
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });

    },
    onSearch() {
        let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
        let data={custNo : linCus,searchTxt:this.value }
        let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smProduct/selectSmProductByWhere`,
            dataType: "json",
            data:data, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {                 
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });


    },

    getDatatype(id){
        let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
        let datas={
        custNo:linCus,
        }
        if(id){
          datas.productTypeId = id
        }
        if(this.value){
            datas.searchTxt = this.value
        }
        let that = this

      $.ajax({
            type : "post",
            url : `${baseUrl}/smProduct/selectSmProductByWhere`,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
               if(res.errCode ="0000"){
                 that.dataSource = res.data                            
               }
            }
        });  
    },
     //去详情
    goTopaoducdatail(id){
      this.$router.push({
        name:"Productdetails",
        query:{
          productId:id
        }
      })
      
    },
  }
};
</script>

<style lang="scss" scoped>
#product {
  margin-bottom: 120px;
  .zhanweitu{
    text-align: center;
    top: 50%;position: absolute;left: 50%; transform: translate(-50%,-50%);

    .van-image{
      // width:50%;
      margin-top:40%;
    }
  }
  .Vanswipe {
    margin: 25px;
    .van-swipe {
      width: 700px;
      height: 395px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .banlan {
    margin: 15px;
    border-bottom: 2px solid #eee;
    display: flex;
    flex-wrap: wrap;
    // height:150px;
    .banlan-all {
      width: 100px;
      margin-right: 20px;
      margin-bottom: 20px;
      text-align: center;
      .img-box{
        width:92px;
        height:92px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 10px;
        img {
          width: 92px;
          height: 92px;
          margin-bottom: 10px;
        }
      }
     
      span {
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(45, 45, 45, 1);
      }
    }
  }
  .titlesorting {
    display: flex;
    .moren {
      margin: 20px 40px;
      span {
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      img {
        width: 13px;
        height: 21px;
      }
    }
    .nomoren {
      span {
        color: rgba(153, 152, 152, 1);
      }
    }
  }
  .showall {
    width: 100%;
    background: rgba(241, 241, 241, 1);
    .noproduct{
        font-size:28px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(188,188,188,1);
text-align: center;
padding:53px;
    }
    .showall-title {
      font-size: 28px;
      padding: 30px 0 0 30px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
    .showall-context {
      height: 200px;
      margin: 20px;
      padding: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 7px;
      display: flex;
      img {
        width: 200px;
        height: 200px;
        flex: 2;
      }
      .showall-title-right {
        margin-left: 25px;
        flex: 4;
        .right-text {
          font-size: 28px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-top: 40px;
          margin-bottom: 30px;
        }
        .right-price {
          font-size: 35px;
          font-family: FZDaHei-B02S;
          font-weight: bold;
          color: rgba(255, 64, 64, 1);
        }
      }
      .showall-arrow {
        right: 30px;
        flex: 2;
        text-align: center;
        img {
          width: 30px;
          height: 56px;
          margin-top: 60px;
          margin-left: 70px;
        }
        p {
          font-size: 28px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(178, 175, 175, 1);
          margin-top: 40px;
        }
      }
    }
  }
}
</style>