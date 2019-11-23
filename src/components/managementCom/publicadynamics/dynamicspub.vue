<template>
  <div class="dynamicspub">
    <div class="catrelease-title">标题*</div>
    <van-field v-model="dynamicTitle" placeholder="请输入标题" />
    <div class="catrelease-title">类别</div>
    <van-field @click="getLeibie"  v-model="dynamicTypename?dynamicTypename:moreren" readOnly='readOnly' placeholder="请选择" />
       <div class="catrelease-title">序号*</div>
    <van-field v-model="serialNo" placeholder="请输入序号" />
    <div class="catrelease-title">封面*</div>
    <!-- <van-uploader :after-read="afterRead" /> -->
      <div class="rels-images">
       <van-uploader                 
                v-model="coverImgIdArr"
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
     <div class="catrelease-title">名称*</div>
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
        <van-uploader :after-read="afterReadMP" accept=".mp4, .qlv, .ogg">
          <img :src="images.vidoe" />
        </van-uploader>
        <span>支持MP4、WebM、Ogg</span>
      </div>
      <div class="uploadMP4">
        <div class="uploadMP4-box" v-for="(item,index) in videoArr" :key="index">
          <video class="videoclass" :src="item.url" controls="controls"></video>
          <van-icon name="cross" color="red" @click="deleVideo(index)" />
        </div>
      </div>
    </div>
       <div class="submit" @click="onSubmit">提交</div>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-radio-group v-model="radio"  v-for="(item,index) in List" :key="index">
        <van-radio :name="item.dynamicTypeId"  @click="onAssignment(item)">{{item.dynamicTypeName}}</van-radio>
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
  name: "dynamicspub",
  components:{Profileeditor},
  data() {
    return {
      show: false,
      List:[],
      name:"",
      radio: "1",
      images: {
        addimg: require("../../../assets/man/addimg.png"),
          uppicet: require("../../../assets/creact/uppicet.png"),
          vidoe: require("../../../assets/creact/vidoe.png"),
      },
      isLoading:false,
      moreren:"默认",
      imgIdArrFile:[],    //多张图片得数组
      imgIdArr:[],
      videoArr:[], 
//       content (string, optional): 内容 ,
     coverImgId :"",     // 封面图片ID ,
     coverImgIdArr:[],    //封面图片数组,

// customerNo (integer, optional): 客户编号 ,
// dynamicId (integer, optional): 动态ID ,
       dynamicTitle:"",  // 动态标题 ,
       dynamicId:"",    //类别id
       dynamicTypeId: "", //动态类别ID ,
       dynamicTypename:"",  //渲染得字段
// imgId (integer, optional): 图片ID ,
// insertTime (string, optional): 插入时间 ,
      serialNo:"", // 序号 ,
// updateTime (string, optional): 更新时间 ,
// videoId (integer, optional): 短视频ID ,
// viewCount (integer, optional): 浏览量 ,
// vrId (integer, optional): VRID
    };
  },
  created(){

       if(this.$route.query.dynamicId){
          this.getLie()
          console.log("123,", this.List,this.$route.query.productTypeId,)
          setTimeout(()=> {
          this.List.length>0 && this.List.forEach((items,index) => {
          console.log("22",items.dynamicTypeId,this.$route.query.productTypeId)
          if(items.dynamicTypeId == this.$route.query.dynamicTypeId ){
              console.log("22333",items.dynamicTypeName,)
            this.dynamicTypeName = items.dynamicTypeName
          }
        })
          },300)


      let datas={
        customerNo:localStorage.getItem('customerNo'),
        dynamicId:this.$route.query.dynamicId
      }
       let that = this
      $.ajax({
            type : "post",
            url :   `${baseUrl}/smDynamic/detailDynamic`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("数据源",res )         
               if(res.errCode ="0000"){
                let obj= res.data
                 that.radio = obj.dynamicTypeId? obj.dynamicTypeId:"", // 类别 ,
      that.coverImgId = obj.coverImgId, // 产品描述  产品主图ID ,
      that.dynamicTitle = obj.dynamicTitle,// 名称,
      that.serialNo  = obj.serialNo //  序号 ,
      that.coverImgIdArr[0] = {url: obj.coverImgId} //产品主图
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
            type : "get",
            url : `${baseUrl}/smDynamictype/selectDynamictype`,
            dataType: "json",
            data: datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {  
                console.log("res",res)      
               if(res.errCode ="0000"){
                 that.List = res.data                              
               }
            }
        });
    },
       onAssignment(item){
      console.log("///////////,",item)
      this.dynamicTypeId =  item.dynamicTypeId
      this.dynamicTypename = item.dynamicTypeName

    },
     //上传封面
    afterRead(file){
        var file1 = file.file;
       this.isLoading = true 
      let arr = [];
      arr.push(file);
      this.coverImgIdArr = arr;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "1");
      const url = this.apis.fileUploadImg;
      this.fetch(url, formData, "post").then(res => {
        if (res.errCode == "0000") {
          let obj = {};
          obj.url = res.data.filePath;
          console.log("obj,************", obj);

          this.coverImgId = res.data.filePath;
          this.coverImgIdArr[0] = obj;
          console.log(" this.headIdArr,", this.headIdArr);
          // setTimeout(()=>{
                    this.isLoading = false 
          //         },300);
        }
      });
    },

       //上传视频
    afterReadMP(file) {
      // 此时可以自行将文件上传至服务器
       this.isLoading = true

      var file1 = file.file;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "3");

      const url = this.apis.fileUploadImg;
      let linObj = {};

      this.fetch(url, formData, "post").then(res => {
     

        if (res.errCode == "0000") {
     
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

         onSubmit(){
    console.log("提交,imgId", this.$refs.vueHtml.content)
    // this.coverImgId = "245"
    if(
      !this.coverImgId 
    || !this.dynamicTitle  || !this.serialNo ){
      this.$toast("请填写完整")
    }else{  
    let datas = {
      customerNo:localStorage.getItem('customerNo'),
      coverImgId :this.coverImgId ,
      dynamicTitle :this.dynamicTitle ,
      serialNo:this.serialNo,
     
    }
    if(this.dynamicTypeId){
       datas.dynamicTypeId = this.dynamicTypeId
    }
    if(this.$refs.vueHtml.content){
       datas.content  = this.$refs.vueHtml.content
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
       if(this.$route.query.dynamicId){
            url = "/smDynamic/updateDynamic"
          datas.dynamicId = this.$route.query.dynamicId
       }else{
            url = "/smDynamic/addDynamic"  
       }
       
       this.fetch(url, datas, "post").then(res => {
          console.log("res1,", res);
          if (res.errCode == "0000") {
            this.$toast("提交成功");
            this.$router.push("/publicadynamics")
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
.dynamicspub {
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
          // i{
          //     display:none;
          // }
        }
      }
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