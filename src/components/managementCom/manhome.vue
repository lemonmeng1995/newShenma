<template>
  <div id="manhome">
    <div class="manhome-box">
      <p class="manhome-userid">ID：{{smUserinfo.customerNo}}</p>
      <div class="manhome-context">
        <div class="context-top">
            <div class="brjing" >
            <!-- <img class="top-Head" :src="smUserinfo.headId" /> -->
            <van-image :src="smUserinfo.headId" round fit="cover"/>
          </div>

          <div class="top-dec">
            <p class="dec-text">{{smUserinfo.name}}   {{smUserinfo.job}}</p>
            <p class="dec-tel" @click="callPhone(smUserinfo.phoneNum)">
              <img :src="images.tel" />
              <span>{{smUserinfo.phoneNum}}</span>
            </p>
          </div>
          <img @click="showCard" class="top-card" :src="images.card" />
        </div>
        <div class="context-bom">
          <p>智想版:2019-10-08到期</p>
          <img :src="images.code"  @click="getQucode"/>
        </div>
        <div class="compon-name">{{smUserinfo.companyName}}</div>
      </div>
    </div>
    <div class="man-cell">
      <van-cell title="产品管理" is-link to="/productman" />
      <van-cell title="发布动态" is-link to="/publicadynamics"/>
      <van-cell title="修改简介" is-link to="/introduction"/>
      <van-cell title="选择风格" is-link to="/chosestyle"/>
      <van-cell title="基本信息" is-link  to="/briefintroduction"/>
      <van-cell title="访客统计" is-link to="/vsitorsta"/>
      <van-cell title="系统设置" is-link to="/systemsetup"/>
    </div>

        <div class="alert_mask" v-show="showqrCode">
      <div class="alert_bg" id="mymap">
          <!-- <img class="alert_img" :src="shareImg" alt="" /> -->
          <div class="qrCode" id="qrcode" ref="qrcode" :style="{width:150+'px',height:150+'px'}"></div> 
      </div>
    
      <div class='alert_close' >
         <p>长按图片识别保存</p>
          <van-icon name="cross"  @click="closePopup()"/>
        <!-- <img src="../assets/images/close.png" alt="" @click="closePopup()"/> -->
     </div> 
    </div> 
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
import html2canvas from 'html2canvas';
import QRCode from 'qrcodejs2'
import Clipboard from "clipboard";
export default {
  name: "manhome",
  data() {
    return {
      images: {
          tel: require("../../assets/man/tel.png"),
        card: require("../../assets/man/card.png"),
        circular: require("../../assets/man/circular.png"),
        code: require("../../assets/man/code.png"),
        heade: require("../../assets/man/heade.png")
      },
      smUserinfo:{},  //数据
      showqrCode:false,
    };
  },
  created(){
    let datas={
      customerNo:localStorage.getItem('customerNo')

    }

      let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smUserinfo/indexInfo`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {      
               if(res.errCode ="0000"){
                 that.smUserinfo = res.data.smUserinfo       
               }
            }
        });
          // this.fetch("/smUserinfo/indexInfo", datas, "post").then(res => {
          //    if(res.errCode ="0000"){
          //        console.log("res999，",res.data)
          //       //  this.$toast("提交成功！")
          //       //  this.$router.push("/productman")                                   
          //      }
          // })

  },
  methods:{
         //拨号
    callPhone (phoneNumber) {
        window.location.href = 'tel://' + phoneNumber
    },
    showCard(){
    this.$router.push("/cardholder")
   },
   
    //获取二维码 保存
    getQucode(){
      this.showqrCode = true
      let shareUrl = "http://www.shenmaguanggao.top/card"
      document.getElementById("qrcode").innerHTML = "";
      let image = new Image();
      let customerNoLin = localStorage.getItem('customerNo') 
       this.qrCode(`${shareUrl}/home?customerNo=${customerNoLin}`)
    },
       //转二维码
      qrCode (url) {
          let qrcode = new QRCode('qrcode', {
              width: 150, //图像宽度
              height: 150, //图像高度
              colorDark : "#000000", //前景色
              colorLight : "#ffffff", //背景色
              correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
          })
          qrcode.clear() //清除二维码 
          qrcode.makeCode(url) //生成另一个新的二维码
             setTimeout(() => {
                this.toImage()
            }, 20);
      },
         //图片转base64
        toImage() {
            html2canvas(document.getElementById('mymap'),{
                    backgroundColor: null
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    // console.log(dataURL)
                    // this.fileDownload(dataURL);
                    // this.shareImg = dataURL;
                    this.z_index = 1;
                });
        },
        //关闭二维码的
        closePopup(){
            this.showqrCode = !this.showqrCode;
        document.body.style.overflow = 'inherit';
        this.shareImg = '';

        },
  }

};
</script>

<style lang="scss" scoped>
#manhome {
  margin-bottom: 120px;
  .manhome-box {
    height: 326px;
    background: rgba(9, 178, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    .manhome-userid {
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      padding: 20px;
    }
    .manhome-context {
      height: 329px;
      width:710px;
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      box-shadow: 0px 0px 5px 0px rgba(197, 189, 189, 1);
      border-radius: 9px;
      margin: 10px 20px;
      position: absolute;
      z-index: 2;
      .context-top {
        display: flex;
        .brjing {
          margin: 20px;
          // width: 162px;
          width:25%;
          height: 162px;
          border-radius: 50%;
          overflow: hidden;
          border:2px solid #eee;
          box-shadow:10px  10px 10px rgb(179, 176, 176) outset;
          .van-image{
               height: 100%;
               width: 100%;
          }

          .top-Head {
            border-radius: 50%;
            overflow: hidden;
            // height: 134px;
            // width: 134px;
             height: 100%;
             width: 100%;
            // margin: 5px;
          }
        }

        .top-dec {
          margin: 20px 10px;
          overflow: hidden;
          width:50%;
          .dec-text {
            margin-top: 30px;
            font-size: 32px;
            font-family: Droid Sans Fallback;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1; //行数
            -webkit-box-orient: vertical;
          }
          .dec-tel {
            margin-top: 25px;
            span {
              font-size: 24px;
              font-family: Droid Sans Fallback;
              font-weight: 400;
              color: rgba(140, 255, 86, 1);
            }
            img{
                width:18px;
                height:28px;
                margin-top:10px;
            }
          }
        }
        .top-card {
          // width: 160px;
          width:20%;
          height: 74px;
          margin: 40px 20px;
        }
      }
      .context-bom {
        border-bottom: 3px solid #eee;
        display: flex;
        margin: 0px 20px;
        justify-content: space-between;
        padding-bottom: 10px;
        p {
          font-size: 28px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(150, 150, 150, 1);
          padding-left: 80px;
        }
        img {
          margin-top: -25px;
          padding-right: 20px;
          width: 73px;
          height: 73px;
        }
      }
      .compon-name {
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        margin: 10px 20px;
      }
    }
  }
  .man-cell {
    background: #eee;
    padding-top: 110px;
    padding-bottom: 40px;
    .van-cell {
      margin: 10px 0;
    }
  }


    //弹出层的样式
  .alert_mask{
    position: fixed;
    display: flex;
    align-content: flex-start;
    justify-content: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 10;
    flex-wrap: wrap;
     
    .alert_bg{
      position: absolute;
      display: flex;
       margin-bottom: 120px;
    
      bottom: 0;
      width:100%;
      height: 500px;
      flex-wrap: wrap;
      justify-content: center;
      background-color: #fff;
      overflow: hidden;
      .alert_img{
        width: 400px;
        height: 400px;
      }
      .qrCode{
        position: absolute;
        bottom: 70px;
        background: white;
      }
    }
    .alert_close{
        margin-top: 30px;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 400px;
        margin-bottom: 120px;
        p{
          color:#000;
          font-size: 30px;
          font-weight: 600;
          text-align: center;
        }
        .van-icon{
          font-size: 50px;
          right: 30px;
          position: absolute;
          top: -14px;
        }
        img{
          width: 64px;
          height: 64px;
        }
      }
  }

}
</style>