<template>
<div class="header">
    <!-- <span  class="fanhui">  <img :src="images.fanhui" /></span> -->
     <img  class="fanhui"  :src="images.fanhui" @click="goBack"/>
     <span>{{text}}</span>
     <img class="tel" :src="images.tel" />
</div>
  
</template>

<script>
export default {
    name:"globaHeader",
    props:["text"],
    data(){
        return{
            images:{
                fanhui:require("../../assets/product/fanhui.png"),
                tel:require("../../assets/product/tel.png"),

            }

        }
    },
    created(){
        console.log("text",this.text)
    },
    methods:{
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

}

</style>