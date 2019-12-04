<template>
<div class="introduction">
    <div class="catrelease-title">标题*</div>
    <van-field v-model="introduceTitle" placeholder="请输入标题" />
    <div class="catrelease-title">内容*</div>
      <div class="context-mp4">
      <div class="onmusic">
        <van-uploader :after-read="afterReadMP" accept=".mp4, .qlv, .ogg">
          <img :src="images.vidoe" />
        </van-uploader>
        <span>支持MP4、WebM、Ogg</span>
      </div>
      <div class="uploadMP4">
        <div class="uploadMP4-box" v-for="(item,index) in videoArr" :key="index">
          <video class="videoclass" :src="item.url" controls="controls" x5-video-player-type="h5"></video>
          <van-icon name="cross" color="red" @click="deleVideo(index)" />
        </div>
      </div>
    </div>
    <div class="context">
      <div class="onmusic">
          <img :src="images.uppicet" />
        <span>内容图片</span>
      </div>
      <van-uploader
        ref="upImgLenght"
        :after-read="afterRead"
        v-model="imgIdArrFile"
        :before-delete="delImg"
      />
    </div>
    <Profileeditor ref="vueHtml"/>
    <div class="httpMask" v-show="isLoading">
    <van-loading size="24px" color="#1989fa" vertical>上传中...</van-loading>
   </div>
     <div class="submit" @click="onSubmit">提交</div>
 </div>  
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
import Profileeditor from "../globalcom/profileeditor"
export default {
    name:"introduction",
    components:{Profileeditor},
    data(){
        return{
          introduceTitle:"",
          imgId: "", //图片id
          videoArr:[],
          imgIdArr: [], // 上传内容多张图片的数组
          imgIdArrFile: [], //上传图片绑定的数据
          isLoading:false,
          richText :"",    //副文本框
          isEdie:false,   //是编辑还是新增
          images: {
            vidoe: require("../../assets/creact/vidoe.png"),
            uppicet: require("../../assets/creact/uppicet.png"),
          },

        }
    },
    created(){
  
    let datas={customerNo:localStorage.getItem('customerNo')}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smIntroduce/detailUserInfo`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
              console.log("res",res)    
               if(res.errCode ="0000"){ 
                 if(res.data){
                   that.isEdie = true

                    
                 that.introduceTitle = res.data.introduceTitle
          that.$store.dispatch('getDroductDescribe', res.data.richText);
          if(res.data.videoId && res.data.videoUrlList){
          let linvideoId= res.data.videoId.split(",")
        res.data.videoUrlList.length>0 && res.data.videoUrlList.forEach((qq,ww) => {
          linvideoId.forEach((cc,pp)=> {
            if(ww == pp){
                that.videoArr.push({
                  url:qq,
                  id:cc,
                });
            }
          })
        })
       }

      let linarr = []
      let linObj = {}
      if(res.data.imgId &&  res.data.imgUrlList){
          res.data.imgUrlList.forEach((ii,dd) => {
         that.imgIdArrFile.push({url:ii})
      })
       linarr = res.data.imgId.split(",")
       linarr.forEach((aa,bb) => {
         res.data.imgUrlList.forEach((cc,dd) => {
           if(bb == dd){
               that.imgIdArr.push({url:cc,id:aa})
           }
         })
       })
      }
 }   



               }else{
                   that.$toast(res.errMsg)

               }
            }
        });
    },
    methods:{
         //删除图片
    delImg(detail,index) {
      console.log("删除图片",detail,index,index.index)
      if (this.imgIdArr.length > 0) {
          this.imgIdArr.splice(index.index,1)
          this.imgIdArrFile.splice(index.index,1)
      }
      console.log("this.imgIdArr",this.imgIdArr, this.imgIdArrFile)
    },
         //视频删除
    deleVideo(index) {
      console.log("删除得下标，", index);
      this.videoArr.splice(index, 1);
    },
         //上传视频
    afterReadMP(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
       this.isLoading = true

      var file1 = file.file;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "3");

      const url = this.apis.fileUploadImg;
      let linObj = {};

      this.fetch(url, formData, "post").then(res => {
        console.log("res1file视频,", res);

        if (res.errCode == "0000") {
          console.log("8989");
          linObj.url = res.data.filePath;
          linObj.id = res.data.fileId;

          //   this.Video = res.data.filePath
          //   this.videoId = res.data.fileId
          this.videoArr.push(linObj);
                     setTimeout(()=>{
                    this.isLoading = false 
                  },300);
        }
        console.log("////res1file,", this.Video, this.videoId);
      });
    },
        //内容图片，多个
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log("1", file);
          this.isLoading = true
      var file1 = file.file;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "1");
      const url = this.apis.fileUploadImg;
      let linObj = {};
      this.fetch(url, formData, "post").then(res => {
        if (res.errCode == "0000") {
          console.log("8989", this.imgIdArr);
          linObj.url = res.data.filePath;
          linObj.id = res.data.fileId;
          // linObj.flag = this.formData.imgIdArr.length
        }
      });
      this.imgIdArr.push(linObj);
       setTimeout(()=>{
                    this.isLoading = false 
                  },300);
    },
    
destroyed() {
  console.log("我销毁了，，，")
  this.$store.dispatch('getDroductDescribe', "");
},
    onSubmit(){
      console.log("提交，",this.introduceTitle)
      if(!this.introduceTitle ){
          this.$toast("请填写完整")
      }else{
          let datas={
            introduceTitle:this.introduceTitle,
            customerNo:localStorage.getItem('customerNo'),
      }
        let imgidString = "";
        let imgidStrArr = [];
        let videoArrLin = [];
        if( this.imgIdArr.length>0  ){
            this.imgIdArr.forEach((item, index) => {
          imgidStrArr.push(item.id);
        });
        
        }
          datas.imgId = imgidStrArr.join(",") || "";
        if( this.videoArr.length>0 ){
             this.videoArr.forEach((item, index) => {
          videoArrLin.push(item.id);
        });
       
        }
        datas.videoId = videoArrLin.join(",") || "";
        datas.richText = this.$refs.vueHtml.content || ""
    //      if(this.$refs.vueHtml.content){
    //    datas.richText = this.$refs.vueHtml.content || ""
    // }
    let url;
    if(this.isEdie){
      url = this.apis.updateIntroduce
    }else{
        url =  this.apis.addIntroduce
    }
        console.log("提交，0",datas)
          this.fetch(url, datas, "post").then(res => {
            console.log("res,",res)
            if(res.errCode == "0000"){
              this.$toast("保存成功")
              this.$router.go(-1)
            }
          })

      }
    
    }
    }

}
</script>

<style scoped lang="scss">
.introduction{
      margin: 30px 26px 140px 26px;
  .catrelease-title {
    padding: 20px;
    font-size: 28px;
    font-family: Droid Sans Fallback;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
  }
  .van-cell {
    border: 2px solid #eee;
  }
    .context-mp4 {
    margin: 10px;
    // height: 284px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 17px 0px rgba(208, 208, 207, 1);
    border-radius: 10px;

    .onmusic {
      padding: 10px;
      // padding-bottom: 10px;
      display: flex;
      // justify-content:space-around;
      img {
        width: 269px;
        height: 90px;
      }
      span {
        margin-left: 100px;
        font-size: 21px;
        line-height: 100px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(158, 158, 158, 1);
      }
    }
    .uploadMP4 {
      width: 100%;
      .uploadMP4-box {
        width: 100%;
        position: relative;
        .videoclass {
          width: 100%;
          height: 400px;
        }
        .van-icon {
          margin-top:20px;
          background-color: aliceblue;
          font-size: 40px;
          position: absolute;
          right: 30px;
          border-radius: 50%;
          color: #eee;
          border: 1px solid #eee;
        }
      }
    }

    .van-uploader {
      padding: 0px 20px 20px 30px;
      /deep/ .van-uploader__wrapper {
        width: 150px;
        height: 150px;
        /deep/ .van-uploader__upload {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

    .context {
    margin: 40px 10px;
    // height: 284px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 17px 0px rgba(208, 208, 207, 1);
    border-radius: 10px;

    .onmusic {
      padding: 10px;
      // padding-bottom: 10px;
      display: flex;
      // justify-content:space-around;
      .van-uploader {
        // padding: 0px 20px 20px 30px;
        width: 269px;
        height: 90px;
        /deep/ .van-uploader__wrapper {
          width: 100px;
          height: 100px;
          /deep/ .van-uploader__upload {
            width: 100%;
            height: 100%;
          }
        }
      }
      img {
        width: 269px;
        height: 90px;
        margin-left:40px;
      }
      span {
        margin-left: 20px;
        font-size: 21px;
        line-height: 100px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(158, 158, 158, 1);
      }
    }

    /deep/ .van-uploader__wrapper {
      display: flex;
      // justify-content:space-between;
    }

    /deep/ .van-uploader {
      margin: 0px 40px 22px 30px;
    }

    /deep/ .van-uploader__upload {
      border-style: solid;
      border-radius: 10px;
    }

    /deep/ .van-uploader__preview {
      // margin-right: 25px;
    }
  }
   .submit{
      height:86px;
background:rgba(255,59,59,1);
border:0px solid rgba(0,0,0,1);
border-radius:7px;

font-size:32px;
font-family:Droid Sans Fallback;
font-weight:bold;
color:rgba(255,255,255,1);
text-align: center;
line-height:86px;
  }

}
</style>

<style lang="scss">
   .httpMask{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    align-items: center;
    justify-content: center;
    z-index: 10;
    flex-wrap: wrap;
    span{
        color: #1989fa;
    }
   }
</style>