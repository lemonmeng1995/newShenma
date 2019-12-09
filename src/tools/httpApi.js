let baseUrl = '';
let routerMode = 'hash';
if (process.env.NODE_ENV == 'development') {  
    console.log("开发模式")
    // baseUrl = 'http://www.shenmaguanggao.top'; // 接口的域名   http://www.shenmaguanggao.top/smUserinfo/select
    baseUrl = '/api';   //代理
    //  baseUrl = 'http://www.shenmaguanggao.top'; 
}else{  
    baseUrl = 'http://www.shenmaguanggao.top/card'; 
}
const test = '/';

 const apis = {
    // //微信配置
    // wechatConfirm:test+'wechat/base-setting',       //微信授权
    // sendCode:test+'wechat/auth-user-scope-info',    //发送code

    textApi:test+'smUserinfo/select',    //测试数据
    useradduser:test+'smUserinfo/addUserInfo',   //新增用户   POST POST /smUserinfo/addUserInfo
    selesmUser:test+'smUserinfo/selectUserInfo',                      // GET 查询全部用户不分页
    indexsmUser:test+'smUserinfo/indexInfo',          //  POST /首页
    fileUploadImg:test+'fileUpload/fileImg',             //上传图片，视频，音频
    updateUserInfo:test+'smUserinfo/updateUserInfo',      //编辑用户信息
    addIntroduce:test + 'smIntroduce/addIntroduce',                        //新增简介
    updateIntroduce:test + 'smIntroduce/updateIntroduce',      //编辑简介
    selectSmUserlogTotal:test + 'smUserlog/selectSmUserlogTotal',      //访客统计
    addUserlog:test + 'smUserlog/addUserlog' ,            //保存2 拨号1
   

}

export { baseUrl, routerMode,apis }

