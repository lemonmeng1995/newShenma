<template>
<div id="briefintroduction">
    <GlobaHeader :text="text" />
    <p class="briefint-title">个人简历</p>
    <p class="briefint-des">简介</p>
     <p class="briefint-text">
         我是一名平面设计师我是一名平面设计师我是一名我是 
         我是一名平面设计师我是一名平面设计师我是一名平面 
         我是一名平面设计师我是一名平面设计师
     </p>
    <img  :src="images.vanswipe"/>
</div>
  
</template>

<script>
import GlobaHeader from "../globalcom/globaHeader";
export default {
    name:'briefintroduction',
    components:{GlobaHeader},
    data(){
        return{
             text: "简介",
             images:{
                  vanswipe: require("../../assets/product/vanswipe.png")
             }

        }
    },
    create(){
        console.log("进来简介了。。。。")

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
    
}

</style>