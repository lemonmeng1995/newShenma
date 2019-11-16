
import {apis} from '@/tools/httpApi'
import fetch from '@/tools/fetch'
import wx from 'weixin-js-sdk';
// import store from '@/store'

// console.log(store)
let RegExp = {};
let that = this;
RegExp.install = function (Vue, options) {
    // 手机校验
    const phoneRegExp = /^1[3|4|5|7|8]\d{9}$/;
    // 邮箱检验，正则来源：https://blog.csdn.net/liudglink/article/details/78511759
    const emailRegExp = new window.RegExp(`^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$`)
    // 密码格式校验正则
    const passwordsRegExp = new window.RegExp(`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$`)
     //身份证验证
    const userIdRegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //姓名验证
    const userNameRegExp = /^[\u4e00-\u9fa5]+$/;
    

    
    let _RegExp = {
      phone(telephone){
        return phoneRegExp.test(telephone)
      },
      email (email) {
        return emailRegExp.test(email)
      },

      password (password) {
        return passwordsRegExp.test(password)
      },
      userId(userId){
        return userIdRegExp.test(userId)
      },
      userName(userName){
        return userNameRegExp.test(userName)
      },

      //当天时间
      getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      
      //只能输入数字
      setOnlyNunber(e){
        e = e.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,"");
        e = e.replace(/[^\d]/g,'');
        return e
      },
      
      //获取时间
      getNowTime(times){
        let now = new Date(times);
        let year = now.getFullYear(); //获取年份
        let month = now.getMonth()+1; //获取月份 月份要+1
        let date = now.getDate(); //获取日期
        let hour = now.getHours(); //获取时
        let minu = now.getMinutes(); //获取分钟
        let sec = now.getSeconds(); //获取秒钟
        return year+'-'+month+'-'+date+' '+hour+':'+minu+':'+sec
      },
       //获取url参数
       getQueryString(name) {
          let reg = new window.RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          let reg_rewrite = new window.RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
          let r = window.location.search.substr(1).match(reg);
          let q = window.location.pathname.substr(1).match(reg_rewrite);
          if(r != null){
              return unescape(r[2]);
          }else if(q != null){
              return unescape(q[2]);
          }else{
              return null;
          }
      },
      //截取url 问号前的地址
      getUlr(url){
        if(url.indexOf("?") != -1){
          url = url.split("?")[0];
          return url
        }else{
          return url
        }
      },
      //判断是否是微信环境
      getIsWxClient () {
          let ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
              return true;
          }
          return false;
      },
      //判断是否为手机环境
      ifPC(){
        let sUserAgent = navigator.userAgent.toLowerCase();
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        let bIsMidp = sUserAgent.match(/midp/i) == "midp";
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        let bIsAndroid = sUserAgent.match(/android/i) == "android";
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
          return true
        }else{
        return false
        }
      },


      //微信授权
      wxSq(token){
      let url = this.getUlr(window.location.href);
      let datas = {
        'access-token':token,
        'url':url,
      };
      let code = this.getQueryString('code')||localStorage.getItem('code');
      let wxInfo = ''||localStorage.getItem('wxInfo');
      console.log('我是code',code);
      if(wxInfo==''||wxInfo==null||wxInfo==undefined){
        fetch(apis.wechatConfirm,datas,'get').then(res=>{
          if(res.code==200){
            if(res.data.status){
              let wxConfig = res.data.data;
              sessionStorage.setItem('appId',res.data.data.appId);
              wx.config({
      　　　　　　debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
      　　　　　　appId: wxConfig.appId, // 必填，公众号的唯一标识
      　　　　　　timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
      　　　　　　nonceStr: wxConfig.noncestr, // 必填，生成签名的随机串
      　　　　　　signature: wxConfig.signature,// 必填，签名，见附录1
      　　　　　　jsApiList: [
      　　　　　　　　'onMenuShareAppMessage', 'onMenuShareTimeline'
      　　　　　　] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      　　　　});
             wx.error(function (res) {
                  console.log(res)
      　　　　});
              if(code==null||code==''||code==undefined){
                wx.ready(function () {
                  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+'&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                  // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxConfig.appId+'&redirect_uri=https://test-kol-m.sqqmall.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
                })
              }else{
                localStorage.setItem('code',code);
                this.sendCode(token,code);
              }
            }
          }
        }) 
      }
    },
    //将code发给后台换区信息
    sendCode(token,code){
    //   let datas = {
    //     'access-token':token,
    //     'code':code
    //   }
    //   fetch(apis.sendCode,datas,'post').then(res=>{
    //     let wxInfo = res.data.data;
    //     localStorage.setItem('wxInfo',JSON.stringify(wxInfo));
    //     store.dispatch('getWxInfo',wxInfo);
    //   })
    },
    }
    Vue.prototype.$RegExp = _RegExp
    Vue.RegExp = _RegExp
}
  
export default RegExp