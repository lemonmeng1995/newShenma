
import {GETDRODUCTDESCRI,BACKGROUNDBOTM } from './mutation-types'

export default {

      ////产品副文本框
      [GETDRODUCTDESCRI]:(state,data)=>{
        state.productDescribe = data;
    },
       //底部颜色
       [ BACKGROUNDBOTM]:(state,data)=>{
        state.backgroundbotm = data;
        console.log("底部颜色",data)
    },
   
}