<template>
  <div class="chosestyle">
    <div class="cho-style">请选择风格</div>
    <div class="img-box">
      <div  class="img-sigle" v-for="(item,index) in imagesArr" :key="index">
          <img :src="item.imgUrl"  @click="getChose(item,index)"/>
          <!-- <p>蓝色风格</p> -->
          <!-- <img :src="images.fff" @click="getChose"/>
          <img :src="images.red"  @click="getChose"/>
          <img :src="images.blue"  @click="getChose"/>
          <img :src="images.zise"  @click="getChose"/> -->
          <div class="httpMask" 
            v-if="isShow == item.isShow"  @click="getChose(item,index)">       
              <!-- <van-icon name="success" /> -->
                <!-- <img clss="menban" :src="images.menban"/> -->
              <img :src="images.gougou"/>
          </div>
      </div>
  </div>
    <div class="submit" @click="getSubmit">提交</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "chosestyle",
  data() {
    return {
      images: {
        fff: require("../../assets/chostyle/fff.png"),
        blue: require("../../assets/chostyle/blue.png"),
        red: require("../../assets/chostyle/red.png"),
        sss: require("../../assets/chostyle/sss.png"),
        zise: require("../../assets/chostyle/zise.png"),
        menban:require("../../assets/chostyle/menban.png"),
        gougou:require("../../assets/chostyle/gougou.png"),
      },
      isShow:0,
      imagesArr:[
        {imgUrl: require("../../assets/chostyle/fff.png"),isShow:0},
        {imgUrl: require("../../assets/chostyle/blue.png"),isShow:1},
        {imgUrl:require("../../assets/chostyle/red.png"),isShow:2},
        {imgUrl: require("../../assets/chostyle/zise.png"),isShow:3},
        {imgUrl: require("../../assets/chostyle/wuwu.png"),isShow:4}
      ],
        styleArr:[
            {isShow:0,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.6)',
          backgroundCir:'rgba(60,60,60,0.9)',
          firstbox:'rgba(60,60,60,0.9)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
           bomImag:{
            businesscard: require("../../assets/chostyle/fffcard.png"),
            product1: require("../../assets/chostyle/fffpro.png"),
            freecreation: require("../../assets/chostyle/ffffree.png"),
            dynamiccom: require("../../assets/chostyle/fffdyn.png"),
            briefintroduction: require("../../assets/chostyle/fffinto.png")
          }
        }},
        {isShow:1,styleObj:{
          backgroundHeader:'rgba(34,34,66,0.8)',
          backgroundCir:'rgba(90,90,122,1)',
          firstbox:'rgba(90,90,134,1)',
          backgroundTab:'rgba(52,52,82,1)',
          backgroundBotm:'rgba(90,90,134,1)',
            bomImag:{
            businesscard: require("../../assets/chostyle/businesscard.png"),
            product1: require("../../assets/chostyle/product1.png"),
            freecreation: require("../../assets/chostyle/freecreation.png"),
            dynamiccom: require("../../assets/chostyle/dynamiccom.png"),
            briefintroduction: require("../../assets/chostyle/briefintroduction.png")
          }
        }},
         {isShow:2,styleObj:{
          backgroundHeader:'rgba(60,28,29,0.7)',
          backgroundCir:'rgba(191,85,84,1)',
          firstbox:'rgba(214,97,97,1)',
          backgroundTab:'rgba(221,69,69,1)',
          backgroundBotm:'rgba(214,97,97,1)',
          bomImag:{
            businesscard: require("../../assets/chostyle/redcard.png"),
            product1: require("../../assets/chostyle/redpro.png"),
            freecreation: require("../../assets/chostyle/redfree.png"),
            dynamiccom: require("../../assets/chostyle/reddyn.png"),
            briefintroduction: require("../../assets/chostyle/redinto.png")
          }
        }},
            {isShow:3,styleObj:{
          backgroundHeader:'rgba(65,35,76,0.8)',
          backgroundCir:'rgba(132,104,142,0.8)',
          firstbox:'rgba(177,97,214,0.8)',
          backgroundTab:'rgba(151,69,221,1)',
          backgroundBotm:'rgba(173,92,206,1)',
          bomImag:{
            businesscard: require("../../assets/chostyle/zisecard.png"),
            product1: require("../../assets/chostyle/zisepro.png"),
            freecreation: require("../../assets/chostyle/zisefree.png"),
            dynamiccom: require("../../assets/chostyle/zisedyn.png"),
            briefintroduction: require("../../assets/chostyle/redinto.png")
          }
        }},
             {isShow:4,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.5)',
          firstbox:'rgba(60,60,60,0.8)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
            bomImag:{
            businesscard: require("../../assets/chostyle/fffcard.png"),
            product1: require("../../assets/chostyle/fffpro.png"),
            freecreation: require("../../assets/chostyle/ffffree.png"),
            dynamiccom: require("../../assets/chostyle/fffdyn.png"),
            briefintroduction: require("../../assets/chostyle/fffinto.png")
          }
        }},
      ],
    };
  },
    computed:{
       ...mapState(['backgroundbotm'])
     },
     created(){
       if(this.backgroundbotm){
         console.log("已有选择得。",this.backgroundbotm)
         this.isShow = this.backgroundbotm
       }else{
          this.isShow = 0
       }

     },
  methods:{
    getChose(item,index,state){
      this.isShow = index
    },
    getSubmit(){
      // /smUserinfo/updateUserInfo
      let datas={
        customerNo : localStorage.getItem('customerNo'),
        // custStyle : JSON.stringify(this.styleArr[this.isShow])
         custStyle : this.isShow
      }    
        this.fetch(this.apis.updateUserInfo, datas, "post").then(res => {
          // console.log("res1,", res)
          if(res.errCode == '0000'){
            // this.$toast("保存成功")
            this.$router.push("/home")
          }
        });

    },
  }
};
</script>

<style lang="scss" scoped>
.chosestyle {
  margin: 20px 20px 120px 20px;
  .cho-style {
    font-size: 30px;
    font-weight: 600px;
    height: 60px;
    line-height: 60px;
    margin: 20px;
  }
  .img-box {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
  
    .img-sigle{

      height:385px;
      width:45%;
      margin:15px;
      text-align: center;
      img{
         width:222px;
         height:385px;
      }

       .httpMask{
    display: flex;
    position:absolute;
     width:223px;
     height:388px;
     text-align: center;
     margin:-390px 15px 15px 45px;
    background-color: rgba(0,0,0,.7);
    align-items: center;
    justify-content: center;
    z-index: 10;
    flex-wrap: wrap;
    img {
     width:90px;
     height:90px;

    }
   }
    }
  }


  .submit {
    height: 86px;
    background: rgba(255, 59, 59, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    border-radius: 10px;

    font-size: 32px;
    font-family: Droid Sans Fallback;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 86px;
    margin:50px 20px 150px 20px;
    // padding-bottom: 100px;
  }
}
</style>
