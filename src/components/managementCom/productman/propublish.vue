<template>
  <div class="propublish">
    <div class="catrelease-title">名称*</div>
    <van-field v-model="productName" placeholder="请输入名称" />
    <div class="catrelease-title">类别*</div>
    <van-field @click="getLeibie" readOnly='readOnly' ref="val" v-model="productTypeName?productTypeName:moreren" placeholder="请选择" />
    <div class="catrelease-title">价格(元)*</div>
    <van-field v-model="productPrice" type="number" placeholder="请输入价格" />
    <div class="catrelease-title">序号*</div>
    <van-field v-model="productSort" placeholder="请输入序号" type="number"/>
    <div class="catrelease-title">产品主图*</div>
    <div class="rels-images">
       <van-uploader                 
                v-model="productTypeImg"
                :max-count="1"
                :after-read="afterRead"
            >
              <!-- <img :src="images.addimg" /> -->

            </van-uploader>
      <div class="images-text">
        <!-- <div class="text-name">点击上传图片</div> -->
        <div class="text-size">支持JPG，PNG，GIF格式，建议尺寸：600*600px</div>
      </div>
    </div>
          <div class="catrelease-title">名称</div>
     <Profileeditor ref="vueHtml"/>
      <div class="context">
      <div class="onmusic">
        <!-- <van-uploader :after-read="afterRead"> -->
          <!-- <img :src="images.uppicet" /> -->
        <!-- </van-uploader> -->
        <span>内容图片</span>
      </div>
      <van-uploader
        ref="upImgLenght"
        :after-read="afterReadMore"
        v-model="imgIdArrFile"
        :before-delete="delImg"
      />
    </div>

      <div class="context-mp4">
      <div class="onmusic">
        <!-- <van-uploader :after-read="afterReadMP" accept=".mp4, .qlv, .ogg">
          <img :src="images.vidoe" />
        </van-uploader> -->
          <div class="uploadMP" >
           <input id="upmpID" type="file" @change="afterReadMP" accept="video/*" multiple="multiple" />
        </div> 
        <span>支持MP4、WebM、Ogg</span>
      </div>
      <div class="uploadMP4">
        <div class="uploadMP4-box" v-for="(item,index) in videoArr" :key="index">
          <video class="videoclass" :src="item.url" controls="controls"></video>
          <van-icon name="cross" color="red" @click="deleVideo(index)" />
        </div>
      </div>
    </div>
       <div class="submit"  @click="onSubmit">提交</div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-radio-group v-model="radio" v-for="(item,index) in List" :key="index">
        <van-radio  :name="item.productTypeId" @click="onAssignment(item)">{{item.productTypeName}}</van-radio>
        <!-- <van-radio name="2">单选框 2</van-radio> -->
      </van-radio-group>
    </van-popup>


      
    <div class="httpMask" v-show="isLoading">
    <van-loading size="24px" color="#1989fa" vertical>上传中...</van-loading>
   </div>
  </div>
</template>

<script>
import Profileeditor from "../../globalcom/profileeditor"
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "propublish",
  components:{Profileeditor},
  data() {
    return {
      show: false,
      name:"",
      radio: "1",
      images: {
        addimg: require("../../../assets/man/addimg.png"),
         uppicet: require("../../../assets/creact/uppicet.png"),
          vidoe: require("../../../assets/creact/vidoe.png"),
      },
      // customerNo (integer, optional): 客户编号 ,

      imgId :"", // 图片ID ,
      productDescribe:"", // 产品描述 ,
      productImgId:"",// 产品主图ID ,
      productName :"", // 产品名称 ,
      productPrice:"", // 产品价格 ,
      productSort:"",  // 产品序号 ,
      productTypeId:"",  // 产品类别 ,
      videoId:'',  //短视频ID ,
      viewCount :"", // 浏览量 ,
      vrId:"",  //VRID
      List:[], //产品类别得选择数组
      videoArr:[],  //视频上传得数组
      productTypeImg:[] ,  //上传图片得数组
      isLoading:false,  //上传得动画
      imgIdArr:[] ,   //内容图片得数组
       imgIdArrFile: [], //上传图片绑定的数据
       productTypeName:"", //选择类别得时候渲染得name
       moreren:"默认",
    };
  },
  created(){
    if(this.$route.query.productId){
      console.log("我看得id，",this.$route.query.productId)
       this.getLie()
          console.log("123,", this.List,this.$route.query.productTypeId,)
          setTimeout(()=> {
          this.List.length>0 && this.List.forEach((items,index) => {
          console.log("22",items.productTypeId,this.$route.query.productTypeId)
          if(items.productTypeId == this.$route.query.productTypeId ){
              console.log("22333",items.productTypeName,)
            this.productTypeName = items.productTypeName
          }
        })
          },300)
      let datas={
        custNo:localStorage.getItem('customerNo'),
        productId:this.$route.query.productId
      }
       let that = this
      $.ajax({
            type : "post",
            // url : "api/smProduct/selectSmProductByWhere",
             url : `${baseUrl}/smProduct/detailSmProduct`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("数据源",res, res.data.productDescribe )         
               if(res.errCode ="0000"){
                //  that.dataSource = res.data[0]  
                let obj= res.data
                //  imgId :"", // 图片ID ,
      that.productDescribe = obj.productDescribe, // 产品描述 ,
      that.productImgId = obj.productImgId,// 产品主图ID ,
      that.productName  = obj.productName, // 产品名称 ,
      that.productPrice = obj.productPrice, // 产品价格 ,
      that.productSort = obj.productSort,  // 产品序号 ,
      that.productTypeId = obj.productTypeId,  // 产品类别 ,
      that.radio = obj.productTypeId,
      that.videoId = obj.videoId,  //短视频ID ,
      that.productTypeImg[0] = {url: obj.productImgId} //产品主图
      let linarr = []
      let linObj = {}
      if(obj.imgId &&  obj.imgUrlList){
          obj.imgUrlList.forEach((ii,dd) => {
         that.imgIdArrFile.push({url:ii})
      })
            linarr = obj.imgId.split(",")
       linarr.forEach((aa,bb) => {
         obj.imgUrlList.forEach((cc,dd) => {
           if(bb == dd){
               that.imgIdArr.push({url:cc,id:aa})
           }
         })
       })
      }
       console.log("图片，，，", that.imgIdArrFile, that.imgIdArr)
       if(obj.videoId && obj.videoUrlList){
            let linvideoId= obj.videoId.split(",")
        obj.videoUrlList.length>0 &&  obj.videoUrlList.forEach((qq,ww) => {
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
    }else{
       this.$store.dispatch('getDroductDescribe', "");
    }
  },
  methods: {
    //上传主图
    afterRead(file){
        var file1 = file.file;
       this.isLoading = true 
      let arr = [];
      arr.push(file);
      this.productTypeImg = arr;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "1");
      const url = this.apis.fileUploadImg;
      //  const url =  'http://www.shenmaguanggao.top/fileUpload/fileImg'

        // var file = this.files[0];
        // var formData = new FormData();
        // formData.append("file",file);
        // console.log(formData);
     


      this.fetch(url, formData, "post").then(res => {
        if (res.errCode == "0000") {
          let obj = {};
          obj.url = res.data.filePath;
          console.log("obj,************", obj);

          this.productImgId = res.data.filePath;
          this.productTypeImg[0] = obj;
          console.log(" this.headIdArr,", this.headIdArr);
          // setTimeout(()=>{
                    this.isLoading = false 
          //         },300);
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
      //上传视频
    afterReadMP(file) {
      // 此时可以自行将文件上传至服务器
      console.log("此时可以自行将文件上传至服务器",file);
       this.isLoading = true

      var file1 = file.file;
      var formData = new FormData();
      formData.file = file.file;
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

      //视频删除
    deleVideo(index) {
      console.log("删除得下标，", index);
      this.videoArr.splice(index, 1);
    },

    getLeibie() {
      this.show = true;
      this.getLie()

     
    },
    //得到类别得函数
    getLie(){
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
               if(res.errCode ="0000"){
                 console.log("res类别，",res.data)
                 that.List = res.data                              
               }
            }
        }); 
    },
    onAssignment(item){
      this.productTypeId =  item.productTypeId
      this.productTypeName = item.productTypeName
    },
      onSubmit(){
    console.log("提交,imgId", this.$refs.vueHtml.content)
    // this.productImgId = "137"
    if(
      !this.productImgId 
    || !this.productName  || !this.productPrice || !this.productSort
    || !this.productTypeId){
      this.$toast("请填写完整")

    }else{
      
    let datas = {
      customerNo:localStorage.getItem('customerNo'),
      // productImgId :"137",
      productName :this.productName ,
      productPrice:this.productPrice,
      productSort:this.productSort,
      productTypeId:this.productTypeId,

    }
    if(this.productImgId){
        datas.productImgId = this.productImgId
    }
    if(this.$refs.vueHtml.content){
       datas.productDescribe = this.$refs.vueHtml.content
    }
        let imgidString = "";
        let imgidStrArr = [];
        let videoArrLin = [];
        if( this.imgIdArr.length>0  ){
            this.imgIdArr.forEach((item, index) => {
          //   console.log("2323,",item)
          imgidStrArr.push(item.id);
        });
          datas.imgId = imgidStrArr.join(",");
        }
        console.log("imgidString", imgidStrArr, datas);
        if( this.videoArr.length>0 ){
             this.videoArr.forEach((item, index) => {
          //   console.log("2323,",item)
          videoArrLin.push(item.id);
        });
        datas.videoId = videoArrLin.join(",");
        }
    
        let url;
       if(this.$route.query.productId){
            url = "/smProduct/updateSmProduct"
            datas.productId = this.$route.query.productId
       }else{
            url = "/smProduct/addSmProduct"
       }
       this.fetch(url, datas, "post").then(res => {
          console.log("res1,", res);
          if (res.errCode == "0000") {
            this.$toast("提交成功");
            this.$router.push("/productman")
          } else {
            this.$toast(res.errMsg);
          }
        });

    }
  },
  }
};
</script>

<style scoped lang="scss">
.propublish {
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

  .rels-images {
    display: flex;
    margin: 20px;
    border-bottom: 3px solid #eee;
    img {
      height: 126px;
      width: 126px;
      margin: 20px 20px 20px 0px;
    }
    .images-text {
      margin-top: 30px;
      .text-name {
        width: 200px;
        height: 50px;
        background: #eee;
        text-align: center;
        border-radius: 20px;
        line-height: 50px;
        font-size: 23px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(85, 84, 84, 1);
      }
      .text-size {
        margin-top: 10px;
        font-size: 21px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(167, 167, 167, 1);
      }
    }
  }

    .context {
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

  .van-popup{
    margin-bottom:100px;
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
.van-popup {
  .van-radio-group {
    padding: 20px;
    .van-radio {
      padding: 30px;
      .van-radio__icon {
        /deep/ .van-icon {
          font-size: 35px;
          //   color:red;
        }
      }
      .van-radio__label {
        font-size: 35px;
        // color: red;
      }
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
    z-index: 1001;
    flex-wrap: wrap;
    span{
        color: #1989fa;
    }
   }
</style>