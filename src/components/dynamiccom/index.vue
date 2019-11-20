<template>
<div id="dynamiccom">
    <GlobaHeader :text="text" />
    <van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch"></van-search>
    <div class="Vanswipe" v-show="dataBanner.length>0">
      <van-swipe :autoplay="3000" indicator-color="white">
         <van-swipe-item v-for="(item,index) in dataBanner" :key="index">
            <van-image fit="contain" :src="item.bannerImgUrl"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="allTitle">
        <div class="allTitle-box">
            <p :class="activeIndex == 'all'?'allTitle-tit active':'allTitle-tit'"  @click="getDatatype(null,'all')">全部</p>
            <p class="allTitle-line" v-if="activeIndex == 'all'"></p>
        </div>
        <div class="allTitle-box"  v-show="List.length > 0" v-for="(item,index) in List" :key="index">
            <p :class="activeIndex == index?'allTitle-tit active':'allTitle-tit'"  @click="getDatatype(item.dynamicTypeId,index)">{{item.dynamicTypeName}}</p>
            <p class="allTitle-line" v-if="activeIndex == index"></p>
        </div>
    </div>
    <div class="detail" v-if="dataSource.length>0" >
        <div class="detail-box" 
      v-for="(item,index) in dataSource"  :key="index">
            <p class="detail-box-title">{{item.dynamicTitle }}</p>
            <p class="detail-box-des" v-html="item.content" ></p>
            <img  :src="item.coverImgId"/>
            <p class="detail-box-time">  {{$RegExp.getNowTime(item.insertTime)}}发布</p>
        </div>
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
    name:'dynamiccom',
    components: { GlobaHeader },
    data(){
        return{
             text: "动态",
             value:"",
            images: {
                vanswipe: require("../../assets/product/vanswipe.png"),
                 zhanwei:require("../../assets/zhanwei.png")
            },
            dataBanner:[],
            dataSource:null,
            List:[],
            activeIndex:"all",
            linCus: localStorage.getItem('customerNo')? localStorage.getItem('customerNo'):11139
        }
    },
    created(){
     let datas={customerNo:this.linCus}
       console.log("res2222,",datas)
     let that = this
      $.ajax({
            type : "get",
            url : `${baseUrl}/smDynamic/selectDynamic`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {        
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });

       $.ajax({
            type : "get",
            url : `${baseUrl}/smDynamicBanner/selectSmDynamicBanner`,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
               if(res.errCode ="0000"){
                   that.dataBanner = res.data                           
               }
            }
        }); 
            $.ajax({
            type : "get",
            url : `${baseUrl}/smDynamictype/selectDynamictype`,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
               if(res.errCode ="0000"){
                 that.List = res.data                              
               }
            }
        });

  },
    methods:{
          getDatatype(id,index){
            if(index == "all"){
                  this.activeIndex = index
            }else{
                this.activeIndex = index
            }
          
        let linCus = localStorage.getItem('customerNo')?localStorage.getItem('customerNo'): 11139
        let datas={
        customerNo:linCus,
        }
        if(id){
          datas.dynamicTypeId = id
        }
        if(this.value){
            datas.searchTxt = this.value
        }
        let that = this

      $.ajax({
            type : "post",
            url : `${baseUrl}/smDynamic/selectSmDynamicByWhere`,
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
         onSearch() {
        let data={customerNo : this.linCus,searchTxt:this.value }
        let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smDynamic/selectSmDynamicByWhere`,
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
    }
}
</script>

<style lang="scss" scoped>
#dynamiccom{
  margin-bottom: 120px;
   .zhanweitu{
    text-align: center;
        top: 50%;position: absolute;left: 50%; transform: translate(-50%,-50%);

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
  .allTitle{
      height:60px;
      padding:20px;
      border-bottom: 5px solid #eee;
      display:flex;
    //   justify-content:space-between;
      .allTitle-box{
          text-align: center;
           width:20%;
          .allTitle-tit{
            font-size:28px;
            font-family:Droid Sans Fallback;
            font-weight:400;
            color:rgba(168,168,168,1);
          }
          .allTitle-line{
              background:rgba(255,41,41,1);
                // border:0px solid rgba(0,0,0,1);
                border-radius:3px;
                width:39px;
                height:6px;
                margin:10px auto;

          }
          .active{
            font-size:33px;
            font-family:Droid Sans Fallback;
            font-weight:bold;
            color:rgba(255,41,41,1);

          }

      }
  }
  .detail{
      .detail-box{
          padding:34px;
          border-bottom: 4px solid #eee;
          .detail-box-title{
              padding:0px 0 0 10px;
              font-size:35px;
            font-family:Droid Sans Fallback;
            font-weight:400;
            color:rgba(27,27,27,1);

          }
          .detail-box-des{
            padding:0 0 5px 10px;
              font-size:28px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(168,168,168,1);

          }
          img{
              height:320px;
              width:100%;

          }
          .detail-box-time{
              padding:8px 0;
              font-size:24px;
                font-family:Droid Sans Fallback;
                font-weight:400;
                color:rgba(168,168,168,1);
          }

      }

  }
    
}

</style>