import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import todos from "@/store/todos";
import snackbar from "@/store/snackbar";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    todos,
    snackbar
  }
})
