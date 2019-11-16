 <template>
  <div class="catrelease">
    <div class="catrelease-title">产品类别*</div>
    <van-field v-model="productTypeName "  placeholder="请输入产品类别" />
    <div class="catre-status">
      <div class="status-title">状态</div>
      <div class="status-click">
        <div 
         :class="{active : (states == '0' ? true : false)}"
          @click="getStates('0')">启动</div>
        <div :class="{active : (states == '1' ? true : false)}" @click="getStates('1')">隐藏</div>
      </div>
    </div>
    <div class="catrelease-title">排序*</div>
    <van-field v-model="productTypeSort"   placeholder="请排序（越大越排在前面）" />
    <div class="rels-images">
        <van-uploader                 
                v-model="productTypeImg"
                :max-count="1"
                :after-read="afterRead"
            >
              <!-- <img :src="productTypeImgSrc?productTypeImgSrc:images.addimg" /> -->

            </van-uploader>
      <div class="images-text">
        <div class="text-name">类别图标</div>
        <div class="text-size">建议尺寸120 * 120</div>
      </div>


        <!-- <van-uploader                           
                :after-read="afterRead"
            >
            <div class="images-change" >更换</div>
        </van-uploader> -->
      <!-- <div class="images-change" >更换</div> -->


    </div>
    <div class="submit" @click="getSubmit">
        提交
    </div>

      <div class="httpMask" v-show="isLoading">
    <van-loading size="24px" color="#1989fa" vertical>上传中...</van-loading>
   </div>

  </div>
</template>

<script>
export default {
  name: "catrelease",
  data() {
    return {
      customerNo:"", // 客户编号 ,
      productTypeName:"",  // 产品类别名称 ,
      // productTypeId: "",  //类别
      states:"0", //状态
      productTypeImgId:"", //产品类别图片ID
      productTypeImgSrc:"", //图片地址
      productTypeImg:[], //图片
      productTypeSort :null, //排序
      isLoading:false,
      listSip:{}, //编辑得时候带过来得对象
      images: {
        addimg: require("../../../assets/man/addimg.png")
      }
    };
  },
  created(){
    if(this.$route.query.recode){
      console.log("一进来，，，",this.$route.query.recode)
      this.listSip = this.$route.query.recode
      this.productTypeName = this.$route.query.recode.productTypeName
      this.productTypeSort =  this.$route.query.recode.productTypeSort
      this.states = this.$route.query.recode.states
      this.productTypeImgId =  this.$route.query.recode.productTypeImgId
      this.productTypeImg.push({url:this.$route.query.recode.productTypeImgId})
    }

  },
  methods:{
    //状态改变
    getStates(sta){
      this.states = sta
    },
    //上传图片
     afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log("1", file);
          this.isLoading = true
      let linImg = []
      var file1 = file.file;
      var formData = new FormData();
      formData.file = file.file;
      formData.append("file", file.file);
      formData.append("fileType", "1");
      const url = this.apis.fileUploadImg;
      let linObj = {};
      this.fetch(url, formData, "post").then(res => {
        if (res.errCode == "0000") {
           this.productTypeImg[0] = {url:res.data.filePath}
          this.productTypeImgSrc = res.data.filePath;
         this.productTypeImgId = res.data.filePath;

             setTimeout(()=>{
                    this.isLoading = false 
                  },300);
                  
        }
      });
    
   
    },
     //POST /smProducttype/addsmProducttype
    getSubmit(){
      if(!this.productTypeName ||  !this.productTypeSort || !this.productTypeImgId ){
        this.$toast("请填写完整！")
      }else{
          let datas={
        customerNo:localStorage.getItem('customerNo'),
        productTypeName:this.productTypeName,
        // productTypeId:this.productTypeId,
        states:this.states,
        productTypeImgId:this.productTypeImgId,
        productTypeSort:Number(this.productTypeSort),
        }
        if(this.$route.query.recode){
          datas.productTypeId =this.$route.query.recode.productTypeId

            let that = this
         const url = "/smProducttype/updateSmProducttype"

         this.fetch(url, datas, "post").then(res => {
            console.log("res",res)    
        if (res.errCode == "0000") {
          this.$toast("编辑成功！")
          this.$router.push("/procategory")
        }
      });
        }else{
            let that = this
         const url = "/smProducttype/addsmProducttype"

         this.fetch(url, datas, "post").then(res => {
            console.log("res",res)    
        if (res.errCode == "0000") {
          this.$toast("提交成功！")
          this.$router.push("/procategory")
        }
      });

        }
      
      } 
    }
   
  }
};
</script>

<style lang="scss" scoped>
.catrelease {
  margin: 30px 26px 100px 26px;
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
  .catre-status {
    .status-title {
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      padding: 20px 0;
    }
    .status-click {
      display: flex;
      div {
        margin: 5px 40px 5px 0;
        width: 159px;
        height: 60px;
        border: 1px solid rgba(207, 204, 204, 1);
        border-radius: 7px;
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(170, 170, 170, 1);
        text-align: center;
        line-height: 60px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(207, 204, 204, 1);
      }
      .active {
        background: rgba(61, 173, 0, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .rels-images {
    display: flex;
    margin: 40px;
    .van-uploader{
  
   
    }
    img {
      height: 126px;
      width: 126px;
      margin: 20px 20px 20px 0px;
    }
    .images-text {
      margin-top: 40px;
      .text-name {
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: bold;
        color: rgba(4, 4, 4, 1);
      }
      .text-size {
        margin-top: 10px;
        font-size: 21px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(167, 167, 167, 1);
      }
    }
    .images-change {
      width: 138px;
      height: 61px;
      background: rgba(220, 244, 255, 1);
      border: 0px solid rgba(0, 0, 0, 1);
      border-radius: 31px;

      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(60, 194, 255, 1);
      text-align: center;
      line-height: 61px;
      margin: auto;
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