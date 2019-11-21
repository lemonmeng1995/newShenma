<template>
  <div class="procategory">
    <div class="procategory-top">
      <div class="procategory-top-left">产品类别</div>
      <div class="procategory-top-right">
        <div @click="getCatrelease">+添加新类别</div>
      </div>
    </div>
    <div class="procategory-context"> 
      <div class="context-box" v-for="(item,index) in dataList" :key="index">
        <div class="text">
          <span class="text-onen">{{item.productTypeSort}}</span>
          <span class="text-onet">{{item.productTypeName}}</span>
        </div>
        <div class="icon">
          <img :src="images.bianji" @click="edia(item)"/>
          <img :src="images.shanchu" @click="dele(item.productTypeId)"/>
        </div>
      </div>
      <!-- <div class="context-box">
        <div class="text">
          <span class="text-onen">排序1</span>
          <span class="text-onet">食物</span>
        </div>
        <div class="icon">
          <img :src="images.bianji" @click="goTocatrele"/>
          <img :src="images.shanchu" @click="dele"/>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "procategory",
  data() {
    return {
      images: {
        bianji: require("../../../assets/man/bianji.png"),
        shanchu: require("../../../assets/man/shanchu.png")
      },
      dataList:[], //数据源
    };
  },
  created(){
    this.getData()

    

  },
  methods:{
    getData(){
        let datas={
        customerNo:localStorage.getItem('customerNo'),
        }
        let that = this

      $.ajax({
            type : "post",
            url : `${baseUrl}/smProducttype/selectSmProduct`,
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
    getCatrelease(){
      this.$router.push("/catrelease")
    },
    edia(item){
        this.$router.push({
          name:"Catrelease",
          query:{
            recode:item
          }
        })

    },
    //删除页面
    dele(id){
          let datas = {productTypeId:id}
     let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smProducttype/deleteSmProducttype`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("数据源0",res )         
               if(res.errCode ="0000"){
                  that.getData()
                 that.$toast("删除成功！") 
               }
            }
        });

    }
  }
};
</script>

<style  lang="scss" scoped>
.procategory {
  margin-bottom: 120px;
  .procategory-top {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    border-bottom: 30px solid #eee;
    .procategory-top-left {
      font-size: 35px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .procategory-top-right {
      height: 59px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(207, 204, 204, 1);
      border-radius: 7px;
      width: 177px;
      div {
        line-height: 59px;
        text-align: center;
        font-size: 24px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(52, 191, 255, 1);
      }
    }
  }
  .procategory-context {
    .context-box {
      display: flex;
      border-bottom: 3px solid #eee;
      height: 120px;
      margin-left: 30px;
      .text {
        flex: 1;
        line-height: 120px;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
        .text-onen {
          font-size: 24px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(177, 177, 177, 1);
          padding: 0 20px;
        }
        .text-onet {
          font-size: 28px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(99, 98, 98, 1);
          padding: 0 40px 0 80px;
        }
      }
      .icon {
        flex: 1;
        line-height: 140px;
        img {
          padding: 0 40px 0 100px;
          width: 36px;
          height: 36px;
        }
      }
    }
  }
}
</style>