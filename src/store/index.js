import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './modules/mutation';
import actions from './modules/action';
import getters from './modules/getters';

Vue.use(Vuex)

const state = {
    productDescribe:"" ,      //产品副文本框
    backgroundbotm:0,     // 底部颜色
   
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})