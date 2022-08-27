import { createStore } from 'vuex'
import axios from "axios"

const UrlApi = axios.create({
  baseURL: "http://localhost:3000/api/"
});

let user = localStorage.getItem('user');
if (!user){
  user = {
    userId: -1,
    token: '',
  };
}else{
  try{
    user = JSON.parse(user);
    UrlApi.defaults.headers.common['Authorization'] = user.token;
  } catch(ex){
    user = {
      userId: -1,
      token:''
    };
  }
};

export default createStore({
  state: {
    status:'',
    user:user,
  },
  getters: {
  },
  mutations: {
    setStatus(state, status){
      state.status = status;
    },
    logUser(state, user){
      UrlApi.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    logout(state){
      state.user = {
        userId: -1,
        token:''
      }
      localStorage.removeItem('user');
    },
    poster(){
      UrlApi.defaults.headers.common['Authorization'] = user.token ;
    }

  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        UrlApi.post("auth/signup", userInfos)
          .then(function(response){
            commit('setStatus', 'created');
            resolve(response);
          })
          .catch(function(error){
            commit('setStatus', 'error_create');
            reject(error);
          });
      })
    },
    login: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        UrlApi.post("auth/login", userInfos)
          .then(function(response){
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function(error){
            commit('setStatus', 'error_login');
            reject(error);
          });
      })
    },
    poster: ({commit}, userInfos) => {
      commit;
      return new Promise((resolve, reject) => {
        UrlApi.post("/post", userInfos)
        console.log(user.token)
        .then(function(response){
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    }
  }
})
