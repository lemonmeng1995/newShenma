<template>
  <div id="freecreation">
    <div class="required-box">
      <div class="required">
        <p class="requi-box">必填项</p>
        <!-- <van-cell-group> -->
        <van-field v-model="formData.name" placeholder="姓名" />
        <van-field
          v-model="formData.phoneNum"
          placeholder="手机（账户）"
          type="tel"
          maxlength="11"
          rows="1"
          autosize
          ref="regPhoneVal"
          @click="jujiao"
          @input="handleInput"
          @blur.prevent="getSuretel"
        />
        <van-field
          v-model="formData.email"
          placeholder="邮箱"
         @blur.prevent="handleEmali"
      
        />
        <van-field
          v-model="formData.password"
          type="password"
          autosize
          placeholder="密码（用于以后修改名片信息）"
        />
        <van-field v-model="formData.weChatNo" placeholder="微信号" />
        <!-- </van-cell-group> -->
      </div>

        <div class="xingx-box">
                    <van-uploader                 
                        v-model="headIdArr"
                        :max-count="1"
                        :after-read="afterReadheadId"
                    >
                    </van-uploader>
                    <div class="xingx-box-right">
                   
                      <!-- <img :src="images.selexingx" /> -->
                    <p class="uploadtitle">
                      上传形象照
                    </p>
                        <span>(注：头像尺寸建议为正方形）</span>
                    </div>
                </div>

          <div class="xingx-box">
                    <van-uploader :after-read="afterwechatId"   :max-count="1" v-model="wechatCodeIdArr">
                        <img :src="images.addimg" />
                    </van-uploader>
                    <div class="xingx-box-right">
                          <p class="uploadtitle">
                      上传微信二维码
                    </p>
                      <!-- <img :src="images.weiximage" /> -->
                 
                        <span>（注：个人微信二维码)</span>
                    </div>
                </div>


    </div>
    <div class="sele-box">
      <div class="sele-boxs">
        <p class="requi-box">选填项</p>
      </div>
      <div class="sle-input">
        <van-field v-model="formData.companyName" placeholder="公司名称" />
        <van-field v-model="formData.tel" placeholder="固定电话" />
        <van-field v-model="formData.expertise" placeholder="个人专长" />
        <van-field v-model="formData.companyAddress " placeholder="公司地址" />
        <van-field v-model="formData.job" placeholder="职位" />
      </div>
      <div class="onmusic">
        <van-uploader :after-read="afterReadYP" accept=".mp3, .Ogg, .WAV">
          <img :src="images.onloadmuci" />
        </van-uploader>
        <div class="success" v-if="formData.bagMusicId !=''">
          <img :src="images.mucs"/>
        </div>
        <span>支持mp3格式，建议10MB之内</span>
      </div>
    </div>
    <p class="requi-box">内容</p>
    <div class="context-mp4">
      <div class="onmusic">
        <div class="uploadMP" :style="{background:images.vidoe}">
           <input id="upmpID" type="file" @change="afterReadMP" accept="video/*" multiple="multiple" />
        </div> 
        <!-- <van-uploader :after-read="afterReadMP" accept=".mp4, .qlv, .ogg" v-model="videoArr">
          <img :src="images.vidoe" v-if="videoArr.length == 0" />
          <video  :src="item.url" controls="controls" v-else></video>
        </van-uploader> -->
        <span>支持MP4、WebM、Ogg</span>
      </div>
      <div class="uploadMP4">
        <div class="uploadMP4-box" v-for="(item,index) in videoArr" :key="index">
          <div class="videoclass">
            <video class="videoclass" :src="item.url" controls="controls"></video>
          </div>
          <van-icon name="cross" color="red" @click="deleVideo(index)" />
        </div>
      </div>
    </div>

    <!-- <div class="context">   //上传vr先注销 
            <div class="onmusic">
                <img :src="images.vrvidoe" />
                <span>支持VR专用文件（上传vr视频）</span>
            </div>

            <van-uploader :after-read="afterRead" v-model="formData.imgIdArr" />
    </div>-->
    <div class="context">
      <div class="onmusic">
        <!-- <van-uploader :after-read="afterRead"> -->
          <!-- <img :src="images.uppicet" /> -->
        <!-- </van-uploader> -->
        <span>内容图片</span>
      </div>
      <van-uploader
        ref="upImgLenght"
        :after-read="afterRead"
        v-model="imgIdArrFile"
        :before-delete="delImg"
      />
    </div>
    <div class="onBaocun" @click="getSubmit">
      <p>保  存</p>
    </div>

    
    <div class="httpMask" v-show="isLoading">
    <van-loading size="24px" color="#1989fa" vertical>上传中...</van-loading>
   </div>
  </div>
</template>

<script>
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "freecreation",
  data() {
    return {
      dataObj:null,
      formData: {
        name: "",
        mobile: "",
        email: "",
        wechatNum: "",
        password: "",
        bagMusicId: "", ///背景音乐id
        companyAddress: "",
        companyName: "",
        expertise: "",
        headId: "", // 头像得url
        headIdFile: "",
        imgId: "", //图片id
        job: "",
        phoneNum: "",
        tel: "",
        videoId: "",
        weChatNo: "",
        wechatCodeId: "" // 微信二维码url
      },
      headIdArr: [],
      wechatCodeIdArr: [],
      imgIdArr: [], // 上传内容多张图片的数组
      imgIdArrFile: [], //上传图片绑定的数据
      videoArr: [], //多个视频得数组
      Video: "http://www.shenmaguanggao.top/data/img/1572776601767.mp4",
      videoFlag: false, //刚开始的时候显示为flase
      videoUploadPercent: "0%", //进度条刚开始的时候为0%
      paramsdata: {
        //添加其他参数
      },
      images: {
        vidoe: require("../../assets/creact/vidoe.png"),
        uppicet: require("../../assets/creact/uppicet.png"),
        vrvidoe: require("../../assets/creact/vrvidoe.png"),
        selexingx: require("../../assets/creact/selexingx.png"),
        addimg: require("../../assets/creact/addimg.png"),
        weiximage: require("../../assets/creact/weiximage.png"),
        onloadmuci: require("../../assets/creact/onloadmuci.png"),
        mucs:require("../../assets/creact/mucs.png"),
      },
       isLoading:false, //每次上传的lodaing
       isHave:false,
    };
  },
  //  beforeRouteEnter(to, from, next) {
  //  next(vm=>{ 
  //    console.log("vm,",vm)         //  这里的vm指的就是vue实例，可以用来当做this使用
  //     if(from.fullPath == "/manhome"){
  //       vm.isHave = true
  //     }
  //   })
  // },
  created(){
    console.log("2222,",window.location.href, this.$RegExp.getQueryString("state"))
   
    if(localStorage.getItem('customerNo') && this.$RegExp.getQueryString("state")== 1){
      let datas={
      customerNo: localStorage.getItem('customerNo') 
      }
        let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smUserinfo/detailUserInfo`,  //POST /smDynamic/deleteDynamic
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {          
              if (res.errCode == "0000") { 
                console.log("res,11111111",res)  
                let dataObj = res.data 
                that.formData.name =  res.data.name
                that.formData.password =  res.data.password
                that.formData.phoneNum =  res.data.phoneNum
                that.formData.weChatNo =  res.data.weChatNo
                that.formData.email =  res.data.email
                that.formData.wechatCodeId =  res.data.wechatCodeId
                that.formData.headId =  res.data.headId
                let obj = {};
                obj.url = res.data.headId;
                 that.headIdArr[0] = obj;
                let weobj={}
                 weobj.url = res.data.wechatCodeId;
                 that.wechatCodeIdArr[0] = weobj;
                 if( res.data.companyName ){
                     that.formData.companyName =  res.data.companyName

                 }
                  if( res.data.tel ){
                     that.formData.tel =  res.data.tel

                 }
                  if( res.data.expertise ){
                     that.formData.expertise =  res.data.expertise

                 }
                  if( res.data.companyAddress ){
                     that.formData.companyAddress =  res.data.companyAddress

                 }
                  if( res.data.job ){
                     that.formData.job =  res.data.job

                 }
                    if( res.data.bagMusicId ){
                     that.formData.bagMusicId =  res.data.bagMusicId

                 }
             //多个视频跟图片
               let linarr = []
      let linObj = {}
      if(dataObj.imgId &&  dataObj.imgUrlList){
          dataObj.imgUrlList.forEach((ii,dd) => {
         that.imgIdArrFile.push({url:ii})
      })
            linarr = dataObj.imgId.split(",")
       linarr.forEach((aa,bb) => {
         dataObj.imgUrlList.forEach((cc,dd) => {
           if(bb == dd){
               that.imgIdArr.push({url:cc,id:aa})
           }
         })
       })
      }
       console.log("图片，，，", that.imgIdArrFile, that.imgIdArr)
       if(dataObj.videoId && dataObj.videoUrlList){
            let linvideoId= dataObj.videoId.split(",")
        dataObj.videoUrlList.length>0 &&  dataObj.videoUrlList.forEach((qq,ww) => {
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
                                                      
             }
            }
        });


    }

  },
  methods: {
    //验证邮箱
    handleEmali() {
      console.log("123,验证邮箱",this.formData.email,  this.$RegExp.email(this.formData.email));
      if (!this.$RegExp.email(this.formData.email)) {
        this.$toast("请填写正确得邮箱！");
        // this.jujiao();
      }
      //  this.formData.email = this.$RegExp.email(e)
    },

    //验证手机
    handleInput(e) {
        console.log("e验证手机,",e, this.$RegExp.setOnlyNunber(e))
      this.formData.phoneNum = this.$RegExp.setOnlyNunber(e);
    },
    //失去焦点时候，判断手机号码，是否已经注册
    getSuretel(e){
          let datas = {PhoneNum:this.formData.phoneNum}
     let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smUserinfo/checkPhoneNum`,  //POST /smDynamic/deleteDynamic
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {          
              if (res.errCode == "0000") {      
          } else {
              that.jujiao();
            that.$toast(res.errMsg);
          }
            }
        });

        // this.fetch("/smUserinfo/checkPhoneNum", {
        //    PhoneNum:e
        // }, "post").then(res => {
        //   console.log("res1,", res);
        //   if (res.errCode == "0000") {      
        //   } else {
        //       this.jujiao();
        //     this.$toast(res.errMsg);
        //   }
        // });
    },

    //默认聚焦
    jujiao() {
      this.$refs.regPhoneVal.focus();
    },
    //视频删除
    deleVideo(index) {
      console.log("删除得下标，", index);
      this.videoArr.splice(index, 1);
    },
    //上传头像
    afterReadheadId(file) {
      var file1 = file.file;
       this.isLoading = true 
      let arr = [];
      arr.push(file);
      this.headIdArr = arr;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "1");
      const url = this.apis.fileUploadImg;
      //  const url =  'http://www.shenmaguanggao.top/fileUpload/fileImg'
      this.fetch(url, formData, "post").then(res => {
        if (res.errCode == "0000") {
          let obj = {};
          obj.url = res.data.filePath;
          console.log("obj,", obj);

          this.formData.headId = res.data.filePath;
          this.headIdArr[0] = obj;
          console.log(" this.headIdArr,", this.headIdArr);
          setTimeout(()=>{
                    this.isLoading = false 
                  },300);
        }
      });
    },
    //上传微信
    afterwechatId(file) {
      var file1 = file.file;
       this.isLoading = true
      let arr = [];
      arr.push(file);
      this.wechatCodeIdArr = arr;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "1");
      const url = this.apis.fileUploadImg;
      this.fetch(url, formData, "post").then(res => {
        if (res.errCode == "0000") {
          this.formData.wechatCodeId = res.data.filePath;
           let obj = {};
          obj.url = res.data.filePath;
          console.log("obj,", obj);

   
          this.wechatCodeIdArr[0] = obj;
             setTimeout(()=>{
                    this.isLoading = false 
                  },300);
        }
      });
    },
    //删除图片
    delImg(detail,index) {
      console.log("删除图片",detail,index,index.index)
      if (this.imgIdArr.length > 0) {
          this.imgIdArr.splice(index.index,1)
          this.imgIdArrFile.splice(index.index,1)
      }
      console.log("this.imgIdArr",this.imgIdArr, this.imgIdArrFile)
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
    //上传音乐
    afterReadYP(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
        this.isLoading = true
      var file1 = file.file;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "2");
      const url = this.apis.fileUploadImg;
      this.fetch(url, formData, "post").then(res => {
        console.log("res1file音频,", res);
        if (res.errCode == "0000") {
          this.formData.bagMusicId = res.data.fileId;
                       setTimeout(()=>{
                    this.isLoading = false 
                  },300);
        }
      });
    },
    //上传视频
    afterReadMP(file) {
      // 此时可以自行将文件上传至服务器
      console.log("视频",file,event.target.files[0],file.target,file.target.files[0]);
       this.isLoading = true

      var file1 = file.file;
      var formData = new FormData();
      // formData.file = file.file;
      // formData.append("file", file.file);
      formData.append("file",file.target.files[0]);
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
    //提交
    getSubmit() {
      console.log("this.formData", this.formData);
      if (!this.formData.name) {
        this.$notify("请输入姓名");
      } else if (
        !this.formData.phoneNum ||
        !this.$RegExp.phone(this.formData.phoneNum)
      ) {
        this.$notify("请输入正确的手机号码");
        this.$refs.regPhoneVal.focus();
      } else if (!this.formData.email ||
        !this.$RegExp.email(this.formData.email)) {
        this.$notify("请输入正确邮箱");
         this.$refs.regPhoneVal.focus();
      } else if (!this.formData.password) {
        this.$notify("请输入密码");
      } else if (!this.formData.weChatNo) {
        this.$notify("请输入微信号");
      } else if (!this.formData.headId) {
        this.$notify("头像必传");
      } else if (!this.formData.wechatCodeId) {
        this.$notify("微信二维码必传");
      } else {
        console.log("this.formData", this.formData, Object.keys(this.formData));
        let datas = {};
        Object.keys(this.formData).forEach((item, index) => {
            if(item == "headIdArr" || item == "wechatCodeIdArr"){

            }else{
                  if (this.formData[item]) {
                        datas[item] = this.formData[item];
                    }
            }
        });
        let imgidString = "";
        let imgidStrArr = [];
        let videoArrLin = [];
         this.imgIdArr.length>0 && this.imgIdArr.forEach((item, index) => {
          //   console.log("2323,",item)
          imgidStrArr.push(item.id);
        });

        console.log("imgidString", imgidStrArr, datas);

         this.videoArr.length>0 && this.videoArr.forEach((item, index) => {
          //   console.log("2323,",item)
          videoArrLin.push(item.id);
        });
        datas.imgId = imgidStrArr.join(",");
        datas.videoId = videoArrLin.join(",");
          let url;
      
        if(this.$RegExp.getQueryString("state")== 1){
          datas.customerNo = localStorage.getItem('customerNo')
           url = this.apis.updateUserInfo
        }else{
            url = this.apis.useradduser
        }
        this.fetch(url, datas, "post").then(res => {
          console.log("res1,", res);
          if (res.errCode == "0000") {
            this.$toast("保存成功");
           
            //  this.$router.push("/home")
             if(this.$RegExp.getQueryString("state")== 1){
          this.$router.push({
              name: "Home",
              query: {
                customerNo:localStorage.getItem('customerNo') 
              }
            });
        }else{
           localStorage.setItem("customerNo", res.custNo);
             this.$router.push({
              name: "Home",
              query: {
                customerNo: res.custNo
              }
            });
        }
          
            console.log("123,", res.custNo);
          } else {
            this.$toast(res.errMsg);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#freecreation {
  margin-bottom: 120px;

  .required-box {
    padding: 20px;
    .requi-box {
      position: absolute;
      z-index: 6;
      margin-left: 30px;
      margin-top: -60px;
      width: 175px;
      text-align: center;
      height: 46px;
      background: rgba(255, 102, 0, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      box-shadow: 0px 1px 3px 0px rgba(143, 141, 131, 1);
      border-radius: 23px;
      font-size: 31px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .required {
      // height: 500px;
      margin: 30px;
      padding-top: 30px;
      padding-bottom: 30px;
      background: rgba(255, 204, 0, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      border-radius: 10px;

      .van-cell {
        margin: 20px auto;
        border-radius: 10px;
        width: 90%;
      }
    }
  }
  
      .xingx-box {
            display: flex;
            border-bottom: 3px solid #eee;
            margin:40px 20px;
            box-shadow: 0px 0px 17px 0px rgba(208, 208, 207, 1);
            border-radius: 10px;
            .van-uploader {
                padding: 40px 20px 20px 30px;
                /deep/ .van-uploader__wrapper {
                    width: 239px;
                    height: 239px;
                    img {
                        width: 239px;
                        height: 239px;
                    }
                    /deep/.van-uploader__preview,
                    .van-uploader__preview-image {
                        width: 100%;
                        height: 100%;
                    }
                    /deep/ .van-uploader__upload {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .xingx-box-right {
                        img {
                            width: 269px;
                            height: 89px;                     
                            margin: 40px 0px;
                            display: block;
                        }
                        .uploadtitle{
                          font-size: 32px;
                          margin:40px 20px;
                        }
                .van-uploader{
                    display: block;
                    height:150px;
                    margin:0;
                    padding:0;
                    /deep/ .van-uploader__wrapper{
                         height:200px;
                                img {
                            width: 269px;
                            height: 89px;
                          
                            margin: 40px 0px;
                        }
                    }
                }
               
                span {
                    // margin-top:-30px;
                    font-size: 21px;
                    font-family: Droid Sans Fallback;
                    font-weight: 400;
                    color: rgba(158, 158, 158, 1);
                }
            }
        }

  .sele-box {
    margin: 40px;
    // height: 2303px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 17px 0px rgba(208, 208, 207, 1);
    border-radius: 10px;
    .requi-box {
      position: absolute;
      z-index: 6;
      margin-left: 30px;
      margin-top: -30px;
      width: 175px;
      text-align: center;
      height: 46px;
      background: rgba(255, 102, 0, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      box-shadow: 0px 1px 3px 0px rgba(143, 141, 131, 1);
      border-radius: 23px;
      font-size: 31px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .xingx-box {
      display: flex;
      border-bottom: 3px solid #eee;
      margin: 0 20px;
      box-shadow: 0px 0px 17px 0px rgba(208, 208, 207, 1);
      border-radius: 10px;
      .van-uploader {
        padding: 40px 20px 20px 30px;
        /deep/ .van-uploader__wrapper {
          width: 239px;
          height: 239px;
          img {
            width: 239px;
            height: 239px;
          }
          /deep/.van-uploader__preview,
          .van-uploader__preview-image {
            width: 100%;
            height: 100%;
          }
          /deep/ .van-uploader__upload {
            width: 100%;
            height: 100%;
          }
        }
      }
      .xingx-box-right {
        .van-uploader {
          display: block;
          height: 150px;
          margin: 0;
          padding: 0;
          /deep/ .van-uploader__wrapper {
            height: 200px;
            img {
              width: 269px;
              height: 89px;

              margin: 40px 0px;
            }
          }
        }

        span {
          // margin-top:-30px;
          line-height:50px;
          font-size: 21px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(158, 158, 158, 1);
        }
      }
    }

    .sele-boxs {
    }
    .sle-input {
      margin: 0 20px;
      padding: 20px 0;
      //   border-bottom: 3px solid #eee;
      /deep/ .van-cell {
        .van-cell__value {
          box-shadow: 0px 5px 6px 0px rgba(202, 212, 195, 0.35);
          .van-field__body {
            height: 78px;
            padding-left: 20px;
            background: rgba(249, 249, 249, 1);
            border: 0px solid rgba(0, 0, 0, 1);
            border-radius: 5px;
          }
        }
      }
    }

    .onmusic {
      margin: 0 40px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .success {
        // margin-left:-30px;
        position: absolute;
        margin-left: 239px;
        z-index: 8;
        width: 40px;
        height: 40px;
        // border-radius: 50px;
        // background: rgb(224, 204, 204);
        // border: 2px solid red;
        // text-align: center;
        img {
              width: 40px;
              height: 40px;
        //   line-height: 40px;
        //   font-size: 30px;
        //   color: green;
        }
      }
      img {
        width: 269px;
        height: 90px;
      }
      span {
        margin-left: 20px;
        font-size: 21px;
        line-height: 80px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(158, 158, 158, 1);
      }
    }
  }
  .requi-box {
    // position: absolute;
    z-index: 6;
    margin-left: 30px;
    margin-top: 30px;
    width: 175px;
    text-align: center;
    height: 46px;
    background: rgba(255, 102, 0, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 0px 1px 3px 0px rgba(143, 141, 131, 1);
    border-radius: 23px;
    font-size: 31px;
    font-family: Droid Sans Fallback;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .context-mp4 {
    margin: 40px;
    // height: 284px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 17px 0px rgba(208, 208, 207, 1);
    border-radius: 10px;
    overflow: hidden;
    .onmusic {
      padding: 10px;
      // padding-bottom: 10px;
      display: flex;
      // justify-content:space-around;
      img {
        width: 269px;
        height: 90px;
      }
      .uploadMP{
        // background-image: 
        width: 269px;
        height: 90px;
        // background-color: red;
        background: url(~@/assets/creact/vidoe.png) no-repeat center;
        background-size:100% 100%;
         #upmpID{
         opacity: 0;
         width: 269px;
         height: 90px;
       }
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
        height:400px;
        position: relative;
        .videoclass {
          width: 100%;
          height: 400px;
          position: absolute;
        }
        .van-icon {
          margin-top:20px;
          background-color: aliceblue;
          font-size: 40px;
          z-index: 2;
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
          // i{
          //     display:none;
          // }
        }
      }
    }
  }
  .context {
    margin: 40px;
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
        font-size: 31px;
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
  .onBaocun {
    padding: 20px 40px 40px 40px;
    p {
      height: 84px;
      line-height: 84px;
      background: rgba(255, 150, 0, 1);
      border: 0px solid rgba(0, 0, 0, 1);

      text-align: center;
      font-size: 31px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
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