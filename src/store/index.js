import Vue from 'vue';
import Vuex from 'vuex';
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    showname: 'mzx',
    isLogin: window.localStorage.getItem("ApiAuthorization") == null ? false: true,
    picture: window.localStorage.getItem("picture") ==null ? null:window.localStorage.getItem("picture"),
    msgdisplay: 0
  },
  mutations: {
    update: (state,zzzz) => {
      console.log("第二次："+zzzz);
      state.showname = zzzz;
      console.log("第三次："+state.showname);
    },
    isLoginMethod: (state) => {
      state.isLogin = !state.isLogin;
    },
    setPicture: (state,pic) => {
      state.picture = pic;
    },
    setMsgdisplay: (state ,number) => {
      state.msgdisplay = number;
    }
  }

});

export default store