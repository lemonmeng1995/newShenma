<template>
  <div id="home" >
    <div v-if="isMorec" class="home-Caidan" @click="getMoreCaidan(false)">
      <img :src="image.caidan" />
    </div>
    <div v-else class="home-morecai">
      <img class="home-morecai-close" :src="image.close" @click="getMoreCaidan(true)" />
      <img class="home-morecai-baocun" :src="image.baocun" @click="getinformaCode"/>
      <img class="home-morecai-caierwei" :src="image.caierwei" @click="getQucode"/>
      <img class="home-morecai-tuijian" :src="image.shoucan" @click="getMoreColl(true)" />
      <router-link to="/freecreation"><img class="home-morecai-chaunjian" :src="image.chaunjian" /></router-link>
    
    </div>
    <div class="home-music">
      <audio :src="(dataSource && dataSource.musicList)?dataSource.musicList[0]:''" class="media-audio" loop autoplay ref="MusicPlay"></audio>
      <img v-if="isMusci" :src="image.musci" @click="getMoremusci(false)" />
      <img v-else :src="image.nomuic" @click="getMoremusci(true)" />
    </div>
    <div
      class="topHome"
     
      :style="!styleShow?{backgroundImage: 'url(' + dataSource.smUserinfo.headId + ')' , backgroundSize:'140%',
       backgroundRepeat:no-repeat,
      } : ''"
    >
     <div v-if="styleShow" class="stylewuwu">
      
        <!-- <div class="touximage" :style="{background:custStyle.backgroundCir}">
           <van-image :src="dataSource.smUserinfo.headId" round fit="cover"/>
        </div> -->
         <van-image
              fit="fill"
              :src="dataSource.smUserinfo.headId"
            />
        <div class="stylewuwu-info" :style="{background:custStyle.backgroundHeader}">
          <!-- <img   :src="custStyle.backgroundHeader"/> -->
         
            <h3>{{dataSource.smUserinfo.companyName }}</h3>
            <div class="info-box">
            <span class="nameZ">{{dataSource.smUserinfo.name }}</span>
            <span>{{dataSource.smUserinfo.job }}</span>
            <span @click="callPhone(dataSource.smUserinfo.phoneNum)">{{dataSource.smUserinfo.phoneNum }}</span>
            </div>
         
        </div>

      
        <div class="xiangmessage" :style="{background:custStyle.firstbox}">
          <div class="xiangmessage-top">
            <p class="xiangmessage-top-left">
              <img :src="image.youxiang" />
              <span>{{dataSource.smUserinfo.email }}</span>
            </p>
            <p class="xiangmessage-top-right">
              <img :src="image.wode01" />
              <span>人脉{{dataSource.smUserinfo.viewCount }}</span>
            </p>
          </div>
          <div v-if="dataSource.smUserinfo.companyAddress" class="xiangmessage-bom">
            <img :src="image.dingwei" />
            <span>{{dataSource.smUserinfo.companyAddress }}</span>
          </div>
        </div>

      </div>
      <div v-else class="overlayhome" :style="{background:custStyle.backgroundHeader}">
        <h3>{{dataSource.smUserinfo.companyName }}</h3>
        <div class="touximage" :style="{background:custStyle.backgroundCir}">
           <van-image :src="dataSource.smUserinfo.headId" round fit="cover"/>
          <!-- <van-image round :src="dataSource.smUserinfo.headId" /> -->
        </div>

        <p class="nameZ">{{dataSource.smUserinfo.name }}</p>
        <p>{{dataSource.smUserinfo.job }}</p>
        <p @click="callPhone(dataSource.smUserinfo.phoneNum)">{{dataSource.smUserinfo.phoneNum }}</p>
        <div class="xiangmessage" :style="{background:custStyle.firstbox}">
          <div class="xiangmessage-top">
            <p class="xiangmessage-top-left">
              <img :src="image.youxiang" />
              <span>{{dataSource.smUserinfo.email }}</span>
            </p>
            <p class="xiangmessage-top-right">
              <img :src="image.wode01" />
              <span>人脉 {{dataSource.smUserinfo.viewCount}}</span>
            </p>
          </div>
          <div v-if="dataSource.smUserinfo.companyAddress" class="xiangmessage-bom">
            <img :src="image.dingwei" />
            <span>{{dataSource.smUserinfo.companyAddress }}</span>
          </div>
        </div>
      </div>
     
    </div>
      <div class="information" :style="{background:custStyle.backgroundTab}">
        <div class="information-header">
          <div @click="ongetinfo('0')">
            <p  :class="{activediv : (active == 0 ? true : false)}" >其他信息</p>
            <span  :class="{activeline : (active == 0 ? true : false)}" ></span>
            </div>
          <div @click="ongetinfo('1')">
             <p  :class="{activediv : (active == 1 ? true : false)}" >个人资料</p>
             <span  :class="{activeline : (active == 1 ? true : false)}" ></span>
          </div>
        </div>
        <div class="information-context">
           <div v-if="active == 0">
              <div v-if="dataSource.smUserinfo.weChatNo">
            <span class="context-title">微信账户</span>
            <span   v-if="dataSource.smUserinfo.weChatNo"  class="myorign-copy" @click="copyWc(dataSource.smUserinfo.weChatNo)">{{dataSource.smUserinfo.weChatNo }}</span>
            <img class="erweimaclas" @click="gerenErweima(dataSource.smUserinfo.wechatCodeId)" 
            v-if="dataSource.smUserinfo.wechatCodeId" :src="dataSource.smUserinfo.wechatCodeId"/>
            
          </div>
          <div v-if="dataSource.smUserinfo.tel">
            <span  class="context-title">固定电话</span>
            <span  class="context-num" @click="callPhone(dataSource.smUserinfo.tel)">{{dataSource.smUserinfo.tel }}</span>
          </div> 
           </div>
           <div v-if="active == 1">
               <div  v-if="dataSource.smUserinfo.expertise">
            <span class="context-title">个人专长</span>
            <span  class="context-num">{{dataSource.smUserinfo.expertise }}</span>
          </div>
           </div>
        </div>
    </div>
    <!-- <div class="information">
      <van-tabs v-model="active" @click="onClick">
        <van-tab title="其他信息">
          <div v-if="dataSource.smUserinfo.weChatNo">
            <span>微信账户</span>
            <span v-if="dataSource.smUserinfo.weChatNo"  class="myorign-copy" @click="copyWc(dataSource.smUserinfo.weChatNo)">{{dataSource.smUserinfo.weChatNo }}</span>
            <img clss="erweimaclas" @click="gerenErweima(dataSource.smUserinfo.wechatCodeId)" v-if="dataSource.smUserinfo.wechatCodeId" :src="dataSource.smUserinfo.wechatCodeId"/>

          </div>
          <div v-if="dataSource.smUserinfo.tel">
            <span>固定电话</span>
            <span @click="callPhone(dataSource.smUserinfo.tel)">{{dataSource.smUserinfo.tel }}</span>
          </div>  
        </van-tab>
        <van-tab title="个人资料">
          <div  v-if="dataSource.smUserinfo.expertise">
            <span>个人专长</span>
            <span>{{dataSource.smUserinfo.expertise }}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div> -->
    <div class="contont" :style="{background:custStyle.firstbox}">
      <p>内容</p>
    </div>
    <div class="conImage" :style="{background:custStyle.backgroundTab}">
      <div class="conImage-box" >
        <div v-if="dataSource.imgList && dataSource.imgList.length>0">
             <!-- <div > -->
             <van-image fit="contain"  v-for="(item,index) in dataSource.imgList" :key="index" :src="item" />
               <!-- <img :src="item"  v-lazy="item" > -->
             <!-- <lazy-component>
               <img :src="item"  v-lazy="img" >
            </lazy-component> -->
            <!-- </div> -->
              <div class="uploadMP4-box" v-for="(item,index) in dataSource.videoList" :key="index">
                <video class="videoclass" :src="item" controls="controls"></video>
              </div>
            <!-- <img class="sig-banner" :src="image.bannar" /> -->
        </div>
     
      </div>
    </div>

    <div class="joinman" :style="{background:custStyle.backgroundCir || custStyle.firstbox}"> 
      <p class="joinman-name" @click="getLogin">进入名片管理中心</p>
      <!-- <p class="joinman-image" > 
         <img  :src="image.xuanfu"/>
      </p> -->
    </div>
    <!-- //二维码的容器 -->
    <!-- <van-popup v-show="showqrCode">
      <div id="mymap">
        <div class="qrCode" id="qrcode" ref="qrcode" :style="{width:120+'px',height:120+'px'}"></div>
      </div>
    </van-popup> -->
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
    <van-popup v-model="show" position="bottom" :style="{}">
      <div class="login">
        <div class="login-title">登入名片</div>
        <div class="login-zhanghu">账号：</div>
        <van-field v-model="phoneNumUser" placeholder="请输入账户" 
         type="tel"
          maxlength="11"
          rows="1"
          autosize
          ref="regPhoneVal"
          @input="handleInput"
        
        />
        <div class="login-zhanghu">密码：</div>
        <van-field v-model="passwordUser" placeholder="请输入密码" 
         type="password"
          autosize
        />
        <div class="login-foword" @click="getforgetpass">忘记密码？</div>
        <div class="onsubmit" @click="onsubmit">登 入</div>
        <div class="cancal" @click="onCancal">取 消</div>
      </div>
    </van-popup>

    <van-popup v-model="moreColl" :style="{ width:'70%' }">
      <div class="shoucan">
        <div class="title">请输入您的名片账号</div>
        <van-field v-model="phoneNumSou" placeholder="请输入账户" />
        <div class="bottom">
          <div class="sub" @click="getSure">确定</div>
          <div class="can" @click="getMoreColl(false)">取消</div>
        </div>
      </div>
    </van-popup>
   
    <van-popup class="daoqibox" v-model="showTUtime" :close-on-click-overlay= 'false'>您访问得名片已到期</van-popup>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import QRCode from 'qrcodejs2'
import Clipboard from "clipboard";
import { Dialog } from "vant";
import { nextTick } from 'q';
import { baseUrl } from "@/tools/httpApi";
export default {
  name: "home",
  data() {
    return {
      dataSource:{},
      musicfile: require("../../assets/musci/muc.mp3"),
      value:"",
      showTUtime:false,
       styleArr:[
            {isShow:0,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.6)',
          backgroundCir:'rgba(60,60,60,0.9)',
          firstbox:'rgba(60,60,60,0.9)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
           bomImag:{
            businesscard: require("../../assets/chostyle/fffcard.png"),
            product1: require("../../assets/chostyle/fffpro.png"),
            freecreation: require("../../assets/chostyle/ffffree.png"),
            dynamiccom: require("../../assets/chostyle/fffdyn.png"),
            briefintroduction: require("../../assets/chostyle/fffinto.png")
          }
        }},
        {isShow:1,styleObj:{
          backgroundHeader:'rgba(34,34,66,0.8)',
          backgroundCir:'rgba(90,90,122,1)',
          firstbox:'rgba(90,90,134,1)',
          backgroundTab:'rgba(52,52,82,1)',
          backgroundBotm:'rgba(90,90,134,1)',
            bomImag:{
            businesscard: require("../../assets/chostyle/businesscard.png"),
            product1: require("../../assets/chostyle/product1.png"),
            freecreation: require("../../assets/chostyle/freecreation.png"),
            dynamiccom: require("../../assets/chostyle/dynamiccom.png"),
            briefintroduction: require("../../assets/chostyle/briefintroduction.png")
          }
        }},
         {isShow:2,styleObj:{
          backgroundHeader:'rgba(60,28,29,0.7)',
          backgroundCir:'rgba(191,85,84,1)',
          firstbox:'rgba(214,97,97,1)',
          backgroundTab:'rgba(221,69,69,1)',
          backgroundBotm:'rgba(214,97,97,1)',
          bomImag:{
            businesscard: require("../../assets/chostyle/redcard.png"),
            product1: require("../../assets/chostyle/redpro.png"),
            freecreation: require("../../assets/chostyle/redfree.png"),
            dynamiccom: require("../../assets/chostyle/reddyn.png"),
            briefintroduction: require("../../assets/chostyle/redinto.png")
          }
        }},
            {isShow:3,styleObj:{
          backgroundHeader:'rgba(65,35,76,0.8)',
          backgroundCir:'rgba(132,104,142,0.8)',
          firstbox:'rgba(177,97,214,0.8)',
          backgroundTab:'rgba(151,69,221,1)',
          backgroundBotm:'rgba(173,92,206,1)',
          bomImag:{
            businesscard: require("../../assets/chostyle/zisecard.png"),
            product1: require("../../assets/chostyle/zisepro.png"),
            freecreation: require("../../assets/chostyle/zisefree.png"),
            dynamiccom: require("../../assets/chostyle/zisedyn.png"),
            briefintroduction: require("../../assets/chostyle/redinto.png")
          }
        }},
             {isShow:4,styleObj:{
          backgroundHeader:'rgba(60,60,60,0.5)',
          firstbox:'rgba(60,60,60,0.8)',
          backgroundTab:'rgba(22,22,22,1)',
          backgroundBotm:'rgba(47,47,47,1)',
            bomImag:{
            businesscard: require("../../assets/chostyle/fffcard.png"),
            product1: require("../../assets/chostyle/fffpro.png"),
            freecreation: require("../../assets/chostyle/ffffree.png"),
            dynamiccom: require("../../assets/chostyle/fffdyn.png"),
            briefintroduction: require("../../assets/chostyle/fffinto.png")
          }
        }},
      ],
      image: {
        erweima:require("../../assets/home/erweima.png"),
        xuanfu:require("../../assets/home/xuanfu.png"),
        shoucan: require("../../assets/home/shoucan.png"),
        bannar: require("../../assets/home/bannar.png"),
        touxiang: require("../../assets/home/touxiang.png"),
        wode01: require("../../assets/home/wode01.png"),
        youxiang: require("../../assets/home/youxiang.png"),
        dingwei: require("../../assets/home/dingwei.png"),
        contentpicture: require("../../assets/home/contentpicture.png"),
        caidan: require("../../assets/home/caidan.png"),
        musci: require("../../assets/home/musci.png"),
        nomuic: require("../../assets/home/nomuic.png"),
        baocun: require("../../assets/home/baocun.png"),
        close: require("../../assets/home/close.png"),
        caierwei: require("../../assets/home/caierwei.png"),
        tuijian: require("../../assets/home/tuijian.png"),
        chaunjian: require("../../assets/home/chaunjian.png")
      },
      active: 0, //tab切换得标示
      isMorec: true, //左上角得到更多得菜单标示
      isMusci: true, //右上角音乐
      show: false, //弹出层
      moreColl: false, //收藏弹出
      showqrCode:false, //二维码弹出层
      shareImg:"",
      nowCustomerNo:"",  //当前得客户编码
      phoneNumSou:"",   //收藏得手机号码
      phoneNumUser:''||localStorage.getItem('phoneNumUser'),      //登入输入得账户
      passwordUser:''||localStorage.getItem('passwordUser'),    //登入输入得密码
      gloabCus:"",  //全局得客户编码
      custStyle:{},   //选择得风格得对象，
      styleShow:false, //选择风格5得时候为true
    };
  },
  created(){
     console.log("点头像进来得，",this.$route.query.customerNo)
      if(this.$RegExp.getQueryString('customerNo')===null||this.$RegExp.getQueryString('customerNo')===''
      ||this.$RegExp.getQueryString('customerNo')===undefined ){
      }else{
         localStorage.setItem('customerNo',this.$RegExp.getQueryString('customerNo'));
      }
      if(this.$route.query.customerNo){
         localStorage.setItem('customerNo',this.$route.query.customerNo);
      }
    let linCus=  this.$RegExp.getQueryString('customerNo')||localStorage.getItem('customerNo') || 
                                       this.$route.query.customerNo|| 11139
    this.nowCustomerNo = linCus
    this.gloabCus = linCus?linCus:11139
     let datas={customerNo:linCus}
    let that = this
      $.ajax({
            type : "post",
            url :  `${baseUrl}/smUserinfo/indexInfo`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {      
               if(res.errCode ="0000"){
                 that.dataSource = res.data  
                 localStorage.setItem('phoneNumUser',res.data.smUserinfo.phoneNum) 
                 console.log("数据源", that.dataSource ) 
                 document.title = res.data.smUserinfo.name
                 let tineqi = new Date(res.data.smUserinfo.duTime)
                 let tineNow = new Date()
 console.log("日期,",tineqi,tineNow,tineqi.getTime(tineqi) ,tineNow.getTime(tineNow),
 tineqi.getTime(tineqi) < tineNow.getTime(tineNow))
                 if(tineqi.getTime(tineqi) < tineNow.getTime(tineNow)){
                   that.showTUtime = true
                 }

                // if(res.data.smUserinfo.custStyle){
                  let isStyle = res.data.smUserinfo.custStyle?res.data.smUserinfo.custStyle:4
                  console.log("123,custStyle",res.data.smUserinfo.custStyle,isStyle)
                       that.custStyle = that.styleArr[isStyle].styleObj
                if(that.styleArr[isStyle].isShow == 4){
                  that.styleShow = true
                }
                that.$store.dispatch('backgroundBotm', Number(isStyle)); 
                // }else{
                //    that.custStyle = that.styleArr[4].styleObj
                // }
            
               }
            }
        });
  },
  methods: {
        //验证手机
    handleInput(e) {
      this.phoneNumUser = this.$RegExp.setOnlyNunber(e);
    },
    gerenErweima(url){
        this.showqrCode = true
        document.getElementById("qrcode").innerHTML = "";
       this.qrCode(url)

    },
    //保存得二维码
    getinformaCode(){
        this.showqrCode = true
         document.getElementById("qrcode").innerHTML = "";
         let string = this.dataSource.smUserinfo.name.split("")      
        var a, b = this.dataSource.smUserinfo.name.split("")[0],
       c =  this.dataSource.smUserinfo.name.slice(1,this.dataSource.smUserinfo.name.length),
       d = this.dataSource.smUserinfo.companyName,
       e = this.dataSource.smUserinfo.companyAddress,
       g = this.dataSource.smUserinfo.tel ,
       h = this.dataSource.smUserinfo.phoneNum ,
       i = "",
       j = this.dataSource.smUserinfo.email;

          //     var a, b = "姓",
    //    c = "名",
    //    d = "XX集团前端",  公司名称
    //    e = "北京市五环区GT路19号", 公司地址
    //    g = "159351111111", 单位电话
    //    h = "010-6666666", 手机电话
    //    i = "www.gt.com",  个人主页
    //    j = "253413617@qq.com"; 邮箱

           a = "BEGIN:VCARD", a += "\r\nN:" + b + ";" + c + ";;;",
    a += "\r\nFN: " + c + "  " + b, d && (a += "\r\nTITLE:" + d),
    e && (a += "\r\nADR;WORK:;;" + e + ";;;;"), g && (a += "\r\nTEL;CELL,VOICE:" + g),
    h && (a += "\r\nTEL;WORK,VOICE:" + h), i && (a += "\r\nURL;WORK:" + i), j && (a += "\r\nEMAIL;INTERNET,HOME:" + j),
    a += "\r\nEND:VCARD"
   
   this.qrCode(a)

    },

       //拨号
    callPhone (phoneNumber) {
    window.location.href = 'tel://' + phoneNumber
},

          //复制
    copyWc(index) {
      let url = index; //告诉clipboard应该复制对应列表的哪项
      let clipboard = new Clipboard(".myorign-copy", {
        text: function() {
          return url;
        }
      });
      clipboard.on("success", e => {
        this.$toast({
          message: "复制成功",
          position: "bottom",
          duration: 1000,
          className: "panduan"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$toast({
          message: "复制失败该浏览器不支持自动复制",
          position: "bottom",
          duration: 1000,
          className: "panduan"
        });
        // 释放内存
        clipboard.destroy();
      });
    },

    //获取二维码 保存
    getQucode(){
      this.showqrCode = true
      let shareUrl = "http://www.shenmaguanggao.top"
      //  let shareUrl = "http://192.168.2.108:8080"
      console.log("123,", document.getElementById("qrcode"))
      document.getElementById("qrcode").innerHTML = "";
      let image = new Image();
      // let customerNoLin = gloabCus
      console.log("123,",this.nowCustomerNo)
      let customerNoLin = this.nowCustomerNo
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
    getMoreColl(state) {
      this.moreColl = state;
      //       let input = "<van-field v-model="value" placeholder="请输入用户名" />"
      //      Dialog.confirm({
      //   title: '请输入您的名片账号',
      //   message: input,
      // }).then(() => {
      //   // on close
      // });
    },
    getforgetpass() {
      this.$router.push("/forgetpass");
    },
    getSure(){
      if(this.phoneNumSou){
           let datas={cardCustomerId:this.gloabCus,phoneNum:this.phoneNumSou }
      let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smCard/addSmCard`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {    
                console.log("res,",res)  
               if(res.errCode ="0000"){
                //  that.dataSource = res.data
                  that.moreColl = false;
                  that.$toast("收藏成功")
               }else{
                    that.$toast(res.errMsg)          
               }
            }
        });

      }else{
        this.$toast("请填写手机号码！")

      }
 
    },
    onsubmit() {
     

      if(  !this.passwordUser || !this.phoneNumUser
      ){
          this.$toast("请填写完整")
      }else if(!this.$RegExp.phone(this.phoneNumUser)){
         this.$toast("请填写正确的手机")
      }else{

         let datas={password:this.passwordUser,phoneNum:this.phoneNumUser }
    let that = this
      $.ajax({
            type : "post",
            url : `${baseUrl}/smUserinfo/isLogin`,
            dataType: "json",
            data:datas, //请求php的参数名
            ContentType: 'application/json',
            success : function(res) {    
                console.log("res,",res)  
               if(res.errCode =="0000"){ 
                 localStorage.setItem('customerNo',res.data.customerNo); 
                 localStorage.setItem('phoneNumUser',res.data.phoneNum)
                 localStorage.setItem('passwordUser',res.data.password)        
                 that.$router.push("/manhome");                              
               }else{
                    that.$toast(res.errMsg)          
               }
            }
        });

      }
      // this.$router.push("/manhome");
  
    },
    onCancal() {
      this.show = false;
    },
    getLogin() {
       this.show = true;
    
      // if(this.$RegExp.getQueryString('customerNo')||localStorage.getItem('customerNo')){
      //   console.log("有值得时候，直接登入")
      //    this.$router.push("/manhome");  
      // }else{
      //     this.show = true;

      // }
    },
    ongetinfo(state) {
      console.log("打印得好似点击得onClick", this.active);
      this.active = state
        
    },
    //点击得到更多得菜单选择
    getMoreCaidan(state) {
      this.isMorec = state;
    },
    getMoremusci(state) {
      console.log("232,", state, this.isMusci);
      this.isMusci = state;
      // this.autoplay = state
      if (state) {
        this.$refs.MusicPlay.play();
      } else {
        this.$refs.MusicPlay.pause();
      }

      console.log("2222,", state, this.isMusci);
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  margin-bottom: 120px;
  .home-Caidan {
    position: absolute;
    left: 24px;
    top: 25px;
    z-index:2;
    img {
      width: 72px;
      height: 73px;
    }
  }
  .home-morecai {
    position: absolute;
    text-align: center;
    z-index:2;
    left: 24px;
    top: 25px;
    width: 74px;
    height: 483px;
    background: rgba(188, 188, 206, 0.7);
    border: 0px solid rgba(0, 0, 0, 1);
    border-radius: 37px;
    img {
      margin-top: 20px;
    }
    .home-morecai-close {
      width: 53px;
      height: 53px;
      // margin:20px auto;
    }
    .home-morecai-baocun {
      width: 42px;
      height: 64px;
      // margin:6px auto;
    }
    .home-morecai-caierwei {
      width: 63px;
      height: 64px;
      // margin:6px auto;
    }
    .home-morecai-tuijian {
      width: 41px;
      height: 64px;
      // margin:6px auto;
    }
    .home-morecai-chaunjian {
      width: 42px;
      height: 64px;
      // margin:6px auto;
    }
  }
  .home-music {
    position: absolute;
    right: 30px;
    top: 25px;
    z-index:2;
    img {
      width: 72px;
      height: 73px;
    }
  }
  .topHome {
    
    // display: none;
    // opacity:0.6;
    // background:rgba(108,108,1,0.8);
    // background-color: #d9d9d9;
    .stylewuwu{
      font-size:0;
        // padding-top:600px;
      .van-image{
          // position:absolute;、
          width:100%;
          min-height: 720px;
          // height:100%;
          /deep/ .van-image__img, .van-image__loading{
              min-height: 720px  !important; 
          }
      }
      .stylewuwu-info{
        padding:20px;
        line-height:70px;
        height:160px;
        margin-top:-200px;
        position:absolute;
        width:710px;
      
        h3{
          font-size:45px;
          font-family:Droid Sans Fallback;
          font-weight:bold;
          color:rgba(255,255,255,1);
        }
        .info-box{
          display: flex;
          justify-content:space-between;
          
       span{
          font-size:32px;
          font-family:Droid Sans Fallback;
          font-weight:bold;
          color:rgba(255,255,255,1);
          margin-right:20px;
        }
        .nameZ{
          font-size:45px;
        }
        }
 

      }
          .xiangmessage {
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        // height: 215px;
        // margin-top:25px;
        padding:2px 0 30px 0;
        

        .xiangmessage-top {
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          padding-top:20px;
          justify-content: space-between;
          // margin-top: 20px;
          .xiangmessage-top-left {
            // margin-left:35px;
            img {
              width: 33px;
              height: 26px;
            }
            span {
              margin-left: 15px;
              font-size: 28px;
              font-family: Droid Sans Fallback;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }
          .xiangmessage-top-right {
            position: relative;
            img {
              width: 28px;
              height: 33px;
              // margin-top: 10px;
               top: 50%;
              position: absolute;
              // left: 50%; 
              transform: translate(-50%,-50%)
            }
            span {
              margin-left: 25px;
              font-size: 28px;
              font-family: Droid Sans Fallback;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            
              // margin-top:-10px;
            }
          }
        }
        .xiangmessage-bom {
          padding-left: 20px;
          display: flex;
          margin-top: 20px;
          img {
            width: 32px;
            height: 42px;
            //   display: inline-block
          }
          span {
            margin-left: 25px;
            font-size: 28px;
            font-family: Droid Sans Fallback;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }

    }
    .overlayhome {
      background-color: rgba(0, 0, 0, 0.5);
      h3 {
        width: 100%;
        padding-top: 72px;
        // height:274px;
        // line-height:274px;
        text-align: center;
        font-size: 42px;
        font-family: Droid Sans Fallback;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .touximage {
        width: 328px;
        height: 328px;
        z-index: 2;

        text-align: center;
        vertical-align: middle;
        margin: auto;
        margin-top: 79px;
        background-color: rgba(0, 0, 0, 0.6);
        position: relative;
        border-radius: 50%;

        .van-image {
          top: 50%;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);

          //    vertical-align:middle;
          line-height: 328px;
          width: 279px;
          height: 279px;
        }
      }
      p {
        text-align: center;
        font-size: 32px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        margin-top: 25px;
        color: rgba(255, 255, 255, 1);
      }
      .nameZ {
        margin-top: 85px;
        font-size: 42px;
        font-weight: bold;
        // color:rgba(255,255,255,1);
      }
      .xiangmessage {
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        // height: 215px;
        margin-top:25px;
        padding:2px 0 30px 0;

        .xiangmessage-top {
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          justify-content: space-between;
          // margin-top: 20px;
          .xiangmessage-top-left {
            // margin-left:35px;
            img {
              width: 33px;
              height: 26px;
            }
            span {
              margin-left: 15px;
              font-size: 28px;
              font-family: Droid Sans Fallback;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }
          .xiangmessage-top-right {
            position: relative;
            img {
              width: 28px;
              height: 33px;
              // margin-top: 10px;
              top: 50%;
              position: absolute;
              // left: 50%; 
              transform: translate(-50%,-50%)
              // margin-top:-10px;
            }
            span {
              margin-left: 25px;
              font-size: 28px;
              font-family: Droid Sans Fallback;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
             
            }
          }
        }
        .xiangmessage-bom {
          padding-left: 20px;
          display: flex;
          padding-top: 20px;
          img {
            width: 32px;
            height: 42px;
            //   display: inline-block
          }
          span {
            margin-left: 25px;
            font-size: 28px;
            font-family: Droid Sans Fallback;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
  .information {
    width: 100%;
    // height: 430px;
    padding-bottom: 30px;
    background: dimgrey;
    .information-header{
      display: flex;
      justify-content:space-around;
      padding:50px 20px;
      color:#fff;
      font-size: 26px;
      .activediv{
        color:#fff;
        font-weight: 600;
      }
      .activeline{
        width:100px;
        height: 5px;
        border-radius: 20px;
        background-color: #fff;
        display: block;
        position: absolute;
        margin-top:15px;
      }

    }
    .information-context{
      width:708px;
      // height:178px;
      background:rgba(255,255,255,1);
      margin:10px 20px;
      padding:20px 0;
      .context-title{
        font-size:28px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(146,146,146,1);
line-height:45px;
padding:0 20px 10px 20px;
// border-bottom:2px solid #eee;
      }
      .myorign-copy{
        font-size:28px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(90,90,90,1);
// border-bottom:2px solid rgba(90,90,90,1);
      }
      .erweimaclas{
         width:40px;
          height:40px;
          margin-left:30px;

      }
      .context-num{
        font-size:28px;
font-family:Droid Sans Fallback;
font-weight:400;
color:rgba(90,90,90,1);
// border-bottom:2px solid rgba(90,90,90,1);

      }

    }




    /deep/ .van-tabs {
      background: dimgrey;
      .van-tab {
        color: rgba(255, 255, 255, 1);
        // margin-top:20px;
      }
      /deep/ .van-tabs__wrap{
        padding-top:25px;
        // height:64px;
      }
      /deep/ .van-tabs__nav {
        background: dimgrey;
        color: rgba(255, 255, 255, 1);
        font-size: 28px;
        font-family: Droid Sans Fallback;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      /deep/ .van-tab--active{
        font-weight: 700;
      }
      /deep/ .van-tabs__nav--line{
           padding-bottom: 0px;
      }
      /deep/ .van-tabs__line {
        background: rgba(255, 255, 255, 1);
        bottom: 8px;
        width:80px !important;
      }
      .erweimaclas{
          width:40px;
          height:40px;
          margin-left:20px;
      }

      /deep/ .van-tabs__content {
        .van-tab__pane {
          // height: 300px;
          width: 95%;
          margin: auto;
          background: rgba(255, 255, 255, 1);
          div {
            padding: 20px;
            span {
              font-size: 28px;
              font-family: Droid Sans Fallback;
              font-weight: 400;
              color: rgba(146, 146, 146, 1);
            }
            img{
              width:40px;
              height:40px;
              margin-left:20px;
            }
          }
        }
      }
    }
  }
  .contont {
    width: 100%;
    height: 93px;
    text-align: center;
    color: ghostwhite;
    background: #4d4d72;
    p {
      line-height: 93px;
      font-size: 32px;
      font-family: Droid Sans Fallback;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
  .conImage {
    background: rgb(128, 128, 184);
    .conImage-box {
      padding: 20px;
      font-size: 0;
      img{
           width: 100%;
           height: 100%;
      }
      .van-image {
        width: 100%;
        height: 100%;
      }
      //  .van-image:not(:first-child) {
      // margin-top:-5px;
      // }
      .uploadMP4-box{
        // margin:0 20px;
        overflow: hidden;
        margin-top:-5px;
        .videoclass{
            width: 100%;
            margin-top:-5px;
            // height: 400px;
        }
    }
    }
  }
  .sig-banner {
    height: 249px;
    width:100%;
    margin-top:-5px;
  }
  .joinman {
    width: 100%;
    text-align: center;
    height: 110px;
    .joinman-name {
      line-height: 110px;
      font-size: 28px;
      font-family: Droid Sans Fallback;
      font-weight: 400;
      color:#fff;
      // color: rgba(174, 174, 233, 1);
    }
    .joinman-image {
      position:fixed;
      width:80px;
      height:80px;
      right: 40px;
      bottom: 130px;
      img{
          width:80px;
          height:80px;
          // margin-bottom: -40px;
          z-index:999999;
      }
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
        bottom: 40px;
        background: white;
      }
    }
    .alert_close{
        margin-top: 10px;
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
          top: -20px;
        }
        .van-icon{
          font-size: 50px;
          right: 30px;
          position: absolute;
          top: -20px;
        }
        img{
          width: 64px;
          height: 64px;
        }
      }
  }

  .van-popup {
    .login {
      padding: 20px;
      margin-bottom: 120px;
      .login-title {
        font-size: 38px;
        text-align: center;
        font-weight: 700;
        padding: 10px;
        height: 70px;
        line-height: 70px;
        border-bottom: 3px solid #000;
      }
      .login-zhanghu {
        font-size: 30px;
        padding: 20px;
        font-weight: 600;
      }
      .van-cell {
        border: 2px solid #eee;
      }
      .login-foword {
        text-align: center;
        font-weight: 600;
        font-size: 28px;
        padding: 20px 0px 50px 0;
        border-bottom: 2px solid #000;
      }
      .onsubmit {
        margin: 20px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        background: red;
        border-radius: 20px;
        color: #fff;
        font-size: 30px;
      }
      .cancal {
        margin: 20px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        background: #eee;
        border-radius: 20px;
        color: #fff;
        font-size: 30px;
      }
    }
  }
  .van-popup {
    border-radius: 20px;
    .shoucan {
      padding: 20px;
      .title {
        text-align: center;
        font-size: 35px;
        font-family: Droid Sans Fallback;
        font-weight: 400;
        color: rgba(28, 28, 28, 1);
      }
      .van-cell {
        margin: 20px 0;
        border: 2px solid #eee;
      }
      .bottom {
        //  border-top: 2px solid #eee;
        margin-top: 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        .sub {
          font-size: 33px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(51, 186, 240, 1);
        }
        .can {
          font-size: 33px;
          font-family: Droid Sans Fallback;
          font-weight: 400;
          color: rgba(163, 160, 160, 1);
        }
      }
    }
  }
  .daoqibox{
    padding: 20px;
 line-height: 60px;
//  z-index: 2002;
 height: 60px;

      /deep/.van-overlay{
    z-index:999999 !important;
  }
 /deep/ .van-popup--center{
    z-index: 1000000  !important;
    width: 40%;
    height: 200px;
    text-align: center;
   line-height: 200px;
  }

  }

}
</style>