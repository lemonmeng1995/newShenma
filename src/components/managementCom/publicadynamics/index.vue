
<template>
  <div class="publicadynamics">
    <div class="productman-banna">
      <div class="pro-nowbanan">
        <p>动态管理</p>
      </div>
      <div class="pro-click">
        <router-link to="/bannerdynam">
          <img :src="images.banner" />
        </router-link>
        <router-link to="/dyprocategory">
          <img :src="images.fenlai" />
        </router-link>
        <router-link to="/dynamicspub">
          <img :src="images.dabdy" />
        </router-link>
      </div>
    </div>
    <div class="productman-context" v-if="dataSource.length>0" 
      v-for="(item,index) in dataSource"  :key="index"
      >
      <div class="pro-text-top">
        <div class="img-dis">
          <!-- <img :src="images.xiaolongx" /> -->
        </div>
        <div class="text-name">
          <span class="name">{{item.dynamicTitle }}</span>
          <span class="price">
            {{$RegExp.getNowTime(item.insertTime)}}
          </span>
        </div>
        <van-icon name="arrow" @click="goTopaoducdatail(item.dynamicId)"/>
      </div>
      <div class="pro-edit-bom">
        <div class="weilxian" @click="goTodetail(item)">
          <img :src="images.bianji" />
          <span>编辑</span>
        </div>
        <div @click="getDel(item.dynamicId)">
          <img :src="images.shanchu" />
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "publicadynamics",
  data() {
    return {
      images: {
        banner: require("../../../assets/man/banner.png"),
        fenlai: require("../../../assets/man/fenlai.png"),
        fabu: require("../../../assets/man/fabu.png"),
        bianji: require("../../../assets/man/bianji.png"),
        shanchu: require("../../../assets/man/shanchu.png"),
        xiaolongx: require("../../../assets/man/xiaolongx.png"),
        dabdy: require("../../../assets/product/dabdy.png")
      },
      dataSource:[],   //数据源
    };
  },
  created(){
    this.getData()
  },
  methods: {
      getData(){
        let datas = {customerNo:localStorage.getItem('customerNo')}
     let that = this
      $.ajax({
            type : "get",
            url : `${baseUrl}/smDynamic/selectDynamic`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("数据源",res )         
               if(res.errCode ="0000"){
                 that.dataSource = res.data   
               }
            }
        });

    },
       //编辑
    goTodetail(item){

      this.$store.dispatch('getDroductDescribe',item.content);
      this.$router.push({
        name:"Dynamicspub",
        query:{
          dynamicId:item.dynamicId,
          dynamicTypeId :item.dynamicTypeId 
        }
      })
      // this.$router.push({
      //   name:"Dynamicspub",
      //   query:{
      //     dynamicId:id
      //   }
      // })
    },
      //去详情
    goTopaoducdatail(id){
      this.$router.push({
        name:"Productdetails",
        query:{
          dynamicId:id,
          name:"动态详情"
        }
      })
      
    },
        //删除
    getDel(id){

       let datas = {dynamicId:id}
     let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smDynamic/deleteDynamic`,  //POST /smDynamic/deleteDynamic
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {          
               if(res.errCode ="0000"){
                  that.getData()
                 that.$toast("删除成功！") 
               }
            }
        });

    },
  }
};
</script>

<style scoped lang="scss">
.publicadynamics {
  margin-bottom: 120px;
  .productman-banna {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    .pro-nowbanan {
      background: rgba(241, 241, 241, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      border-radius: 7px;
      text-align: center;
      margin-top: 20px;
      width: 160px;
      height: 50px;
      p {
        line-height: 50px;
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(162, 162, 162, 1);
      }
    }
    .pro-click {
      img {
        width: 172px;
        height: 85px;
      }
    }
  }
  .productman-context {
    border-bottom: 20px solid #eee;
    .pro-text-top {
      display: flex;
      margin: 20px;
      .img-dis {
        // flex: 1;
        margin-top: 25px;
        width: 30px;
        height: 30px;
        border-radius: 100px;
        background: #eee;
      }

      .text-name {
        flex: 5;
        margin: 20px;
        .name {
          font-size: 28px;
          display: block;
          font-family: Droid Sans Fallback;
          font-weight: bold;
          color: rgba(46, 46, 46, 1);
          margin-bottom: 20px;
        }
        .price {
          font-size: 28px;
          font-family: Droid Sans Fallback;
          font-weight: bold;
          color: rgba(162, 162, 162, 1);
        }
      }
      /deep/ .van-icon {
        flex: 1;
        font-size: 50px;
        margin: auto;
      }
    }
    .pro-edit-bom {
      border-top: 2px solid #eee;
      display: flex;
      .weilxian {
        border-right: 3px solid #eee;
      }
      div {
        flex: 1;
        text-align: center;
        margin: 20px 0;
        img {
          width: 26px;
          height: 26px;
        }
        span {
          font-size: 22px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(173, 173, 173, 1);
        }
      }
    }
  }
}
</style>