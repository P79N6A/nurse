import Vue from"vue"
import Vuex from"vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state(){
    return {
      userinfo : null,
      publicDoc : null,
      ways : [],
      cats : [],
      bedType : 'all_bed_count',
      showType : 'card', //值为card时显示病人详情
      patientDetile : {}, //病人详情
      patientShow : false,//病人详情显示
      today : '', //当天时间YYYY-MM-DD
      patientDocList : [],//routerList 要用的数据
      importTemplateObj : {//评估单所需数据
        saveType : 'post',
        importTemplateArr : [] //导入的模板的数据
      },
    }
  },
  getters:{
    getStorage : function(state){
      if(!state.userinfo){
        state.userinfo = localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : ''
      }
      return state.userinfo;
    },
    getPublicDoc : function (state) {
      if(!state.publicDoc){
        state.publicDoc = JSON.parse(sessionStorage.getItem("publicDoc"))
      }
      return state.publicDoc
    },
    getBedType : function (state) {
      return state.bedType
    },
    getShowType : function (state) {
      return state.showType
    },
    getToday : function (state) {
      return state.today
    },
    getPatientDocList : function (state) {
      return state.patientDocList
    },
    getImportTemplateObj : function (state) {
      return state.importTemplateObj
    }
  },
  mutations:{
    showinfo(state,newinfo){
      state.userinfo = newinfo;
    },
    showpatients(state,newdata){
      state.patients = newdata;
    },
  },
})
// store.commit('increment')
export default store;
