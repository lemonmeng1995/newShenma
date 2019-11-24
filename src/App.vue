<template>
  <div id="app">
    <router-view/>
     <div class="menuList_box"> 
        <div class="menuList" 
        :style="{background:userBomcolor}"> 
       <router-link  :to="{path:'/home'}">
          <img :src="images.businesscard" alt="" >
       </router-link>        
       <router-link :to="{path:'/product'}"  >
          <img :src="images.product1" alt="" >
       </router-link>               
       <router-link  :to="{path:'/freecreation'}" >
          <img class= "freecreation" :src="images.freecreation" alt="" >
       </router-link>        
       <router-link :to="{ path: '/dynamiccom'}">
          <img :src="images.dynamiccom" alt="" >
       </router-link>         
       <router-link :to="{ path: '/briefintroduction'}">
          <img :src="images.briefintroduction" alt="" >
       </router-link>
      </div>
     </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { baseUrl } from "@/tools/httpApi";
export default {
  name: 'App',
  data(){
    return{
      images:{},
      // images:{
      //   briefintroduction:require("../src/assets/chostyle/briefintroduction.png"),
      //   dynamiccom:require("../src/assets/chostyle/product1.png"),
      //   freecreation:require("../src/assets/chostyle/freecreation.png"),
      //   product1:require("../src/assets/chostyle/product1.png"),
      //   businesscard:require("../src/assets/chostyle/businesscard.png"),
      // },
         styleArr:[
            {isShow:0,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.6)',
          backgroundCir:'rgba(60,60,60,0.9)',
          firstbox:'rgba(60,60,60,0.9)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
           bomImag:{
            businesscard: require("../src/assets/chostyle/fffcard.png"),
            product1: require("../src/assets/chostyle/fffpro.png"),
            freecreation: require("../src/assets/chostyle/ffffree.png"),
            dynamiccom: require("../src/assets/chostyle/fffdyn.png"),
            briefintroduction: require("../src/assets/chostyle/fffinto.png")
          }
        }},
        {isShow:1,styleObj:{
          backgroundHeader:'rgba(34,34,66,0.8)',
          backgroundCir:'rgba(90,90,122,1)',
          firstbox:'rgba(90,90,134,1)',
          backgroundTab:'rgba(52,52,82,1)',
          backgroundBotm:'rgba(90,90,134,1)',
            bomImag:{
            businesscard: require("../src/assets/chostyle/businesscard.png"),
            product1: require("../src/assets/chostyle/product1.png"),
            freecreation: require("../src/assets/chostyle/freecreation.png"),
            dynamiccom: require("../src/assets/chostyle/dynamiccom.png"),
            briefintroduction: require("../src/assets/chostyle/briefintroduction.png")
          }
        }},
         {isShow:2,styleObj:{
          backgroundHeader:'rgba(60,28,29,0.7)',
          backgroundCir:'rgba(191,85,84,1)',
          firstbox:'rgba(214,97,97,1)',
          backgroundTab:'rgba(221,69,69,1)',
          backgroundBotm:'rgba(214,97,97,1)',
          bomImag:{
            businesscard: require("../src/assets/chostyle/redcard.png"),
            product1: require("../src/assets/chostyle/redpro.png"),
            freecreation: require("../src/assets/chostyle/redfree.png"),
            dynamiccom: require("../src/assets/chostyle/reddyn.png"),
            briefintroduction: require("../src/assets/chostyle/redinto.png")
          }
        }},
            {isShow:3,styleObj:{
          backgroundHeader:'rgba(65,35,76,0.8)',
          backgroundCir:'rgba(132,104,142,0.8)',
          firstbox:'rgba(177,97,214,0.8)',
          backgroundTab:'rgba(151,69,221,1)',
          backgroundBotm:'rgba(173,92,206,1)',
          bomImag:{
            businesscard: require("../src/assets/chostyle/zisecard.png"),
            product1: require("../src/assets/chostyle/zisepro.png"),
            freecreation: require("../src/assets/chostyle/zisefree.png"),
            dynamiccom: require("../src/assets/chostyle/zisedyn.png"),
            briefintroduction: require("../src/assets/chostyle/redinto.png")
          }
        }},
             {isShow:4,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.5)',
          firstbox:'rgba(60,60,60,0.9)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
            bomImag:{
            businesscard: require("../src/assets/chostyle/fffcard.png"),
            product1: require("../src/assets/chostyle/fffpro.png"),
            freecreation: require("../src/assets/chostyle/ffffree.png"),
            dynamiccom: require("../src/assets/chostyle/fffdyn.png"),
            briefintroduction: require("../src/assets/chostyle/fffinto.png")
          }
        }},
      ],
      userBomcolor:'rgba(60,60,60,0.6)',
      // dynImage:{},
    }
  },

     computed:{
       ...mapState(['backgroundbotm'])
     }, 
       watch:{
         'backgroundbotm':function(newVal,old){
           console.log("123456789,",newVal,old)
           if(newVal!=old){
               this.userBomcolor = this.styleArr[newVal].styleObj.backgroundBotm
              this.images = this.styleArr[newVal].styleObj.bomImag
           }
         },
  },
  created(){
      if(this.$RegExp.getQueryString('customerNo')===null||this.$RegExp.getQueryString('customerNo')===''
      ||this.$RegExp.getQueryString('customerNo')===undefined ){
      }else{
         localStorage.setItem('customerNo',this.$RegExp.getQueryString('customerNo'));
      }
      if(this.$route.query.customerNo){
         localStorage.setItem('customerNo',this.$route.query.customerNo);
      }
    let linCus=  this.$RegExp.getQueryString('customerNo')||localStorage.getItem('customerNo') || 
                                       this.$route.query.customerNo|| 11139
    this.nowCustomerNo = linCus
    this.gloabCus = linCus?linCus:11139
     let datas={customerNo:linCus}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smUserinfo/indexInfo`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {      
               if(res.errCode ="0000"){            
                 if(JSON.parse(res.data.smUserinfo.custStyle)){
                     that.userBomcolor = that.styleArr[res.data.smUserinfo.custStyle].styleObj.backgroundBotm
                     that.images =  that.styleArr[res.data.smUserinfo.custStyle].styleObj.bomImag
                      console.log("app---,",   that.userBomcolor,)    
                 }            
               }
            }
        });
  },
}
</script>

<style  lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin:0;
  padding:0;

   h1,h2,h3,h4,p{
    margin:0;
    padding:0;
  }
  // *{
  //   margin:0;
  //   padding:0;
  // }
   .menuList_box{
      position: fixed;
      z-index:1001;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      border-top:1px solid #e4e4e4;
      box-sizing: border-box;
      .menuList{
        display: flex;
        height: 100%;
        line-height:120px;
        // padding: 20px 0 10px 0;
        justify-content: space-between;
        background: white;
        a{
          display: inline-flex;
          flex: 1;
          justify-content: center;
          flex-wrap: wrap;
          align-content: space-between;
          margin: auto;
          // padding: 20px 0 10px 0;
          img{
            width: 50px;
            height: 73px;
          }
          .freecreation{
            width:103px;
            height:73px;
          }
        }
      }
    }
}
</style>
