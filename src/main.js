import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/bootstrap.min.css'
import './assets/css/googlefonts.css'

import './assets/css/estilos-generales.css'
import axios from "axios";

createApp(App).use(store).use(router).mount('#app');

axios.interceptors.request.use(function(config){
    const tokenAuth = store.state.tokenAuth;

    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";

    if(tokenAuth){
        config.headers.Authorization = `Bearer ${tokenAuth}`;
    }

    return config;
}, function(error){
    return Promise.reject(error)
});

//Si alguna petición me devuelve 401 unauthorized, borro los token de sesión que hayan porque el token se habrá perdido en el servidor
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response.status == 401){
        window.localStorage.removeItem("tokenAuth");
        store.state.tokenAuth = "";
        router.push({name:"IniciarSesion"});
    }

    return Promise.reject(error)
});
