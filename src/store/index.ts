import Vue from "vue";
import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    login: false,
    token: "",
    avatarUrl: "",
    userName: "tom",
    user: { name: "seeking" },
  },
  mutations: {
    login(state, provider) {
      state.login = true;
      state.token = provider.token;
      state.userName = provider.userName;
      state.avatarUrl = provider.avatarUrl;
    },
    logout(state) {
      state.login = false;
      state.token = "";
      state.userName = "";
      state.avatarUrl = "";
    },
  },
  modules: {},
});

export default store;
