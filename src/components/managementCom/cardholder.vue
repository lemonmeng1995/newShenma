<template>
  <div class="cardholder">
    <div class="cardholder-box" v-if="dataList.length>0">
      <div class="cardholder-list" v-for="(item,index) in dataList" :key="index">
        <div class="list-top">
          <div class="top-img" @click="getTohome(item.customerNo)">
            <!-- <img  :src="item.headId" /> -->
              <van-image :src="item.headId" round fit="cover"/>
            </div>
          <div class="top-right">
            <div class="right-text">{{item.name}}</div>
            <div class="right-tel">
              <img :src="images.tel" />
              <a href="" @click="callPhone(item.phoneNum)">{{item.phoneNum}}</a>
            </div>
          </div>
          <div class="del" @click="del(item.cardId)">
            删除
          </div>
        </div>
        <div class="list-bottom">
          <div>{{item.companyName}}</div>
          <div>{{item.job}}</div>
        </div>
      </div>
        <!-- <div class="cardholder-list">
        <div class="list-top">
          <div class="top-img"><img  :src="images.heade" /></div>
          <div class="top-right">
            <div class="right-text">张三</div>
            <div class="right-tel">
              <img :src="images.tel" />
              <a href="">123456789</a>
            </div>
          </div>
        </div>
        <div class="list-bottom">
          <div>盼盼公司</div>
          <div>设计师</div>
        </div>
      </div>
        <div class="cardholder-list">
        <div class="list-top">
          <div class="top-img"><img  :src="images.heade" /></div>
          <div class="top-right">
            <div class="right-text">张三</div>
            <div class="right-tel">
              <img :src="images.tel" />
              <a href="">123456789</a>
            </div>
          </div>
        </div>
        <div class="list-bottom">
          <div>盼盼公司</div>
          <div>设计师</div>
        </div>
      </div> -->
    </div>
    <div v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "cardholder",
  data() {
    return {
      images: {
        tel: require("../../assets/man/tel.png"),
        bg: require("../../assets/man/bg.png"),
        heade: require("../../assets/man/heade.png")
      },
      dataList:[],  //列表数据
    };
  },
  created(){
    this.getData()
    

  },
  methods:{
    //删除名片夹功能
    del(id){
      //  POST /smCard/deleteSmCard
        let that = this
      let datas={cardId:id}

      $.ajax({
            type : "post",
            url : `${baseUrl}/smCard/deleteSmCard`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {    
               if(res.errCode ="0000"){
                 that.getData()   
                 that.$toast("删除成功")              
               }
            }
        });

    },
    //获取数据源
    getData(){
        let that = this
      let datas={customerNo:localStorage.getItem('customerNo')}

      $.ajax({
            type : "post",
            url : `${baseUrl}/smCard/selectAll`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {   
              console.log("res",res)   
               if(res.errCode ="0000"){
                 that.dataList = res.data                    
               }
            }
        });

    },
           //拨号
    callPhone (phoneNumber) {
    window.location.href = 'tel://' + phoneNumber
},
getTohome(id){
  this.$router.push({
    name:"Home",
    query:{
      customerNo:id
    }
  })

}
  }
};
</script>

<style scoped lang="scss">
.cardholder {
  margin-bottom: 120px;
  background:#eee;
  .cardholder-box {
      padding:20px;
    
    .cardholder-list {
        padding:20px;
        margin:20px 0;
        // width:706px;
        height:269px;
        background:rgba(255,255,255,1);
        border:0px solid rgba(0,0,0,1);
        border-radius:7px;
      .list-top {
          display: flex;
          position: relative;
        .top-img {
          width: 190px;
          height: 190px;
          box-shadow:0px 0px 30px rgb(177, 170, 170);
          border-radius: 50%;
          overflow: hidden;
          .van-image{
              width:190px;
              height:190px;
          }
          img{
              width:190px;
              height:190px;
          }
        }
        .top-right {
            margin-left:30px;
            margin-top:20px;
          .right-text {
            font-size: 35px;
            font-family: Droid Sans Fallback;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          .right-tel {
              margin-top: 20px;
            width: 232px;
            height: 60px;
            background: rgba(240, 240, 240, 1);
            border: 0px solid rgba(0, 0, 0, 1);
            border-radius: 30px;
            text-align: center;
            line-height: 60px;
            img{
                width:18px;
                height:28px;
                margin-top:10px;
            }
            a{
                font-size:28px;
font-family:Droid Sans Fallback;
font-weight:400;
text-decoration:underline;
color:rgba(18,150,219,1);

            }
          }
        }
        .del{
          position:absolute;
          right:20px;
          top:20px;
          text-align: right;

        }
      }
      .list-bottom {
          display: flex;
          justify-content:space-between;
          margin-top:25px;
          border-top:2px solid #eee;
          padding:10px;
        div {
          font-size: 32px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(8, 8, 8, 1);
        }
      }
    }
  }
}
</style>