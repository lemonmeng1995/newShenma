<template>
<div class="header"   :style="{background:userBomcolor}">
    <!-- <span  class="fanhui">  <img :src="images.fanhui" /></span> -->
     <img  class="fanhui"  :src="images.fanhui" @click="goBack"/>
     <span>{{text}}</span>
     <img class="tel" :src="images.tel" @click="callPhone()"/>
</div>
  
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"globaHeader",
    props:["text"],
    data(){
        return{
           
            images:{
                fanhui:require("../../assets/product/fanhui.png"),
                tel:require("../../assets/product/tel.png"),

            },
               styleArr:[
            {isShow:0,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.6)',
          backgroundCir:'rgba(60,60,60,0.9)',
          firstbox:'rgba(60,60,60,0.9)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
        
        }},
        {isShow:1,styleObj:{
          backgroundHeader:'rgba(34,34,66,0.8)',
          backgroundCir:'rgba(90,90,122,1)',
          firstbox:'rgba(90,90,134,1)',
          backgroundTab:'rgba(52,52,82,1)',
          backgroundBotm:'rgba(90,90,134,1)',
          
        }},
         {isShow:2,styleObj:{
          backgroundHeader:'rgba(60,28,29,0.7)',
          backgroundCir:'rgba(191,85,84,1)',
          firstbox:'rgba(214,97,97,1)',
          backgroundTab:'rgba(221,69,69,1)',
          backgroundBotm:'rgba(214,97,97,1)',
         
        }},
            {isShow:3,styleObj:{
          backgroundHeader:'rgba(65,35,76,0.8)',
          backgroundCir:'rgba(132,104,142,0.8)',
          firstbox:'rgba(177,97,214,0.8)',
          backgroundTab:'rgba(151,69,221,1)',
          backgroundBotm:'rgba(173,92,206,1)',
       
        }},
             {isShow:4,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.5)',
          firstbox:'rgba(60,60,60,0.9)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
       
        }},
      ],
            userBomcolor:'rgba(60,60,60,0.6)',

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
               console.log("全局,",  this.userBomcolor)
           }
         },
  },
    created(){
        console.log("text",this.text)
        if(  this.userBomcolor != this.styleArr[this.backgroundbotm].styleObj.backgroundBotm){
      this.userBomcolor = this.styleArr[this.backgroundbotm].styleObj.backgroundBotm
        }
    },
    methods:{
               //拨号
    callPhone () {
    window.location.href = 'tel://' + localStorage.getItem('phoneNumUser')
     this.fetch(this.apis.addUserlog, {
              customerNo:localStorage.getItem('customerNo'),
              behavior:"3",
            }, "post").then(res => {
//                console.log("res.......全局拨号.................,",res)  

        })

},
        goBack(){
              this.$router.go(-1);
        }
      
    }

}
</script>

<style lang="scss" scoped>
.header{
    width:100%;
    height:97px;
    line-height:97px;
    background:rgba(222,222,222,1);
    display:flex;
    justify-content:space-between;
    font-size: 30px;
    font-weight: 600;
    // position:absolute;
    .fanhui{
        width:28px;
        height:53px;
        padding-top:20px;
        padding-left:22px;
    }
    .tel{
        width:60px;
        height:60px;
        padding-top:20px;
        padding-right:22px;
    }
    span{
        color:#fff
    }

}

</style>