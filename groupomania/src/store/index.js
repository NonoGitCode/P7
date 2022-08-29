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
    // importOnePost(state, payload){
    //   state.currentPost = payload
    // },
    // resetCurrentPost(state){
    //   state.currentPost = null
    // }
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
      console.log(postInfo)
      commit;
      return new Promise((resolve, reject) => {
        UrlApi.post("/Post", postInfo)
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
        UrlApi.get("/Post")
        .then(function(response){
          commit('importAllPosts', response)
          state.postLoaded = true;
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    },
    // getOnePost({commit}, id) {
    //   return new Promise((resolve, reject) => {
    //     UrlApi.get("/Post/id")
    //     .then(function(response){
    //       commit('importOnePost', response)
    //       resolve(response);
    //   })
    //     .catch(function(error){
    //       reject(error);
    //   })
    //   })
    // },
    deleteOnePost({commit}, id){
      return new Promise ((resolve, reject) =>{
        UrlApi.delete("/Post/id")
        .then(function(response){
          commit('resetCurrentPost')
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    },
    modifyPost({commit}, postID ,postInfo){
      commit;
      return new Promise((resolve, reject) => {
        UrlApi.put({name: "post", params: {postid: postID}}, postInfo)
        .then(function(response){
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      });
    }
  },
});
