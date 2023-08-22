import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
  });
};


import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  SpinnerPlugin, 
  CalendarPlugin, 
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  FormCheckboxPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  CarouselPlugin,
  TablePlugin,
  CollapsePlugin,

} from "bootstrap-vue";
[ SpinnerPlugin ,
  TablePlugin,
  FormCheckboxPlugin,
  CollapsePlugin,
  CalendarPlugin,
  CarouselPlugin,
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  TablePlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  resultPlayers:localStorage.resultPlayers,
  resultTeams:localStorage.resultTeams,
  query:localStorage.query,


  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username); 
  },
   logout() {
  
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
    this.query = " ";
  },
  setResultPlayers(player_result) {
    localStorage.setItem("resultPlayers", JSON.stringify(player_result));
    this.resultPlayers =[];
    this.resultPlayers=player_result
    
  },
  setResultTeam(team_result) {
    localStorage.setItem("resultTeams", JSON.stringify(team_result));
    this.resultTeams=[]
    this.resultTeams=team_result
    
  },
  setquery(query) {
    localStorage.setItem("query", query);
    this.query = query;  
  },

  setFavoriteGame(game) {
    localStorage.setItem("gameFavorite", game);
    this.gameFavorite = game;
    console.log( this.gameFavorite);
  },
 

};
//console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
