export default {
    // productDescribe:"" ,      //产品副文本框
    getDroductDescribe:function({commit},data){
        commit('GETDRODUCTDESCRI',data);
    },
    backgroundBotm:function({commit},data){   //底部颜色
        commit('BACKGROUNDBOTM',data);
    },

 
}