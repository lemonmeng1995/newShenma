<template>
  <div id="bannerdynam">
    <div class="banner-title">新闻Banner管理</div>
       <div class="upload-img">
      <!-- <van-uploader v-model="fileList" multiple /> -->
      <van-uploader
        multiple
        :after-read="afterReadMore"
        v-model="imgIdArrFile"
        :before-delete="delImg"
      />
    </div>

     <div class="httpMask" v-show="isLoading">
    <van-loading size="24px" color="#1989fa" vertical>上传中...</van-loading>
   </div>

    <div class="onsubmit" @click="getSubmit">
      <div>提交</div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "bannerdynam",
  data() {
    return {
      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
      ],
      imgIdArr:[],
      imgIdArrFile:[],
      isLoading:false,
    };
  },
  created(){
    let datas={
      customerNo : localStorage.getItem('customerNo')
    }
       let that = this
       $.ajax({
            type : "get",
            url : `${baseUrl}/smDynamicBanner/selectSmDynamicBanner`,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("res",res)      
               if(res.errCode ="0000"){
                   if(res.data.length>0){
                     that.imgIdArr = res.data
                   res.data.forEach((aa,bb) => {
                       that.imgIdArrFile.push({url:aa.bannerImgUrl,id:aa.bannerImgId})
                     })
                 }                           
               }
            }
        }); 


      //  this.fetch("/smDynamicBanner/selectSmDynamicBanner", datas, "get").then(res => {
      //        if(res.errCode ="0000"){
      //            console.log("res999，",res.data)
      //            if(res.data.length>0){
      //                this.imgIdArr = res.data
      //              res.data.forEach((aa,bb) => {
      //                  this.imgIdArrFile.push({url:aa.bannerImgUrl,id:aa.bannerImgId})
      //                })
      //            }                                
      //          }
      //     })
  },
  methods:{
       //内容图片，多个
    afterReadMore(file) {
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
            this.isLoading = false 
          linObj.bannerImgUrl = res.data.filePath;
          linObj.bannerImgId = res.data.fileId;
          linObj.customerNo = localStorage.getItem('customerNo')
        }
      });
      this.imgIdArr.push(linObj);
    },

      //删除图片
    delImg(detail,index) {
      console.log("删除图片",detail,index,index.index)
      if (this.imgIdArr.length > 0) {
          this.imgIdArr.splice(index.index,1)
          this.imgIdArrFile.splice(index.index,1)
      }
    },
    //提交走新增接口 POST /smProductBanner/saveBathSmProductBanner
    getSubmit(){
          let datas;
          if( this.imgIdArr.length == 0){
            datas={
            smDynamicBannerList : [{
              bannerImgUrl :"",
              bannerImgId : "",
              customerNo : localStorage.getItem('customerNo')
            }]
          }
          }else{
             datas={
            smDynamicBannerList : this.imgIdArr
          }
          }

          this.fetch("/smDynamicBanner/saveBathDynamicBanner", datas, "post").then(res => {
             if(res.errCode =="0000"){
                 console.log("res999，",res.data)
                 this.$toast("提交成功！")
                 this.$router.push("/publicadynamics")                                   
               }else{
                  this.$toast(res.message)
               }
          })
    }
  }
};
</script>

<style lang="scss" scoped>
#bannerdynam {
  height: 100%;
  width: 100%;
  // position: relative;
  margin-bottom: 250px;
  .banner-title {
    padding: 20px;
    font-size: 35px;
    font-family: Droid Sans Fallback;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    background:#fff;
  }
  .upload-img {
    padding: 20px;
    height:70%;
    width:710px;
    // margin-bottom: 20px;
    overflow-y: scroll;
    position:absolute;
    background: #eee;
    /deep/ .van-uploader__input{
        height: 350px;
        width: 100%;
    }
    /deep/ .van-uploader{
       height: 350px;
       width: 100%;
    }
    /deep/ .van-uploader__preview {
      //   padding:40px;
      height: 350px;
      width: 100%;
      .van-uploader__preview-image {
        height: 350px;
        width: 100%;
      }
    }
    /deep/ .van-uploader__upload {
      height: 340px;
      width: 100%;
    }
  }
  .onsubmit {
    position: fixed;
    bottom: 120px;
    height: 126px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    div {
      margin: 20px;
      height: 88px;
      line-height: 88px;
      background: rgba(64, 179, 244, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      border-radius: 44px;
      text-align: center;
      font-size: 35px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>