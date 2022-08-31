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
    level: 0,
    pseudo:'',
  };
}else{
  try{
    user = JSON.parse(user);
    UrlApi.defaults.headers.common['Authorization'] = user.token;
  } catch(ex){
    user = {
      userId: -1,
      token:'',
      level: 0,
      pseudo:'',
    };
  };
};

export default createStore({
  state: {
    status:'',
    statusLiked: '',
    user:user,
    isAdmin: null,
    postLoaded: null,
    allPosts:[],
    postDescription: "",
    postPseudo: null,
    postPhotoName:"",
    postPhotoFileURL: null,
    currentPost:null,
    postCoverPhoto: null,
    postLoaded: null,
    PostInfo: null,
    currentId:null
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
        token:'',
        level: 0
      },
      localStorage.removeItem('user');
      state.status = '',
      state.statusLiked = '',
      state.isAdmin = null,
      state.postLoaded = null,
      state.allPosts = [],
      state.postDescription = "",
      state.postPseudo =  null,
      state.postPhotoName = "",
      state.postPhotoFileURL =  null,
      state.currentPost = null,
      state.postCoverPhoto = null,
      state.postLoaded = null,
      state.PostInfo = null,
      state.currentId = null

    },
    grantAdmin(state, value){
      state.isAdmin = value
    },
    newPost(state, payload){
      state.postDescription = payload;
    },
    updatePostDescription(state, payload){
      state.postDescription = payload
    },
    fileNameChange(state, payload){
      state.postPhotoName = payload;
    },
    createFileURL(state, payload){
      state.postPhotoFileURL = payload;
    },
    importAllPosts(state, payload){
      state.allPosts = payload
    },
    importOnePost(state, payload){
      state.currentPost = payload
    },
    resetCurrentPost(state){
      state.currentPost = null
    },
    statutPostLoader  (state, payload){
      state.postLoaded = payload
    },
    fileInfo(state, payload){
      state.PostInfo = payload
    },
    setCurrentId(state, payload){
      state.currentId = payload
    },
    setStatusLike(state,payload){
      state.statusLiked = payload
    }
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        UrlApi.post("auth/signup", userInfos)
          .then(function(response){
            commit('setStatus', 'created');
            commit('logUser', response.data)
            resolve(response);
          })
          .catch(function(error){
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
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
      });
    },
    createPost: ({commit}, postInfo) => {
      commit;
      return new Promise((resolve, reject) => {
        UrlApi.post("/post", postInfo)
        .then(function(response){
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      });
    },
    getAllPosts({commit}) {
      return new Promise((resolve, reject) => {
        UrlApi.get("/post")
        .then(function(response){
          let myObj = response.data
          commit('importAllPosts', myObj)
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    },
    getOnePost({commit}, currentId) {
      return new Promise((resolve, reject) => {
        let currentUrl = `post/${currentId}`
        UrlApi.get(`${currentUrl}`)
        .then(function(response){
          let myObj = response.data
          commit('importOnePost', myObj)
          resolve(response);
      })
        .catch(function(error){
          reject(error);
      })
      })
    },
    deletePost({commit}, id){
      return new Promise ((resolve, reject) =>{
        let currentUrl = `post/${id}`
        UrlApi.delete(`${currentUrl}`)
        .then(function(response){
          commit('resetCurrentPost')
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    },
    modifyPost: ({commit}, formData) => {
      commit;
      console.log(formData)
      return new Promise((resolve, reject) => {
        let currentUrl = `/post/${formData.currentId}`
        UrlApi.put(`${currentUrl}`, formData)
        .then(function(response){
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      });
    },
    setLike({commit},payload){
      commit;
      console.log(payload)
      return new Promise((resolve,reject) =>{
        let currentUrl = `/post/${payload.id}/like`;
        console.log(currentUrl)
        UrlApi.post(`${currentUrl}`, payload)
        .then(function(response){
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    }
  },
});
