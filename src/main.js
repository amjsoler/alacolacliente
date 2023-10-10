import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/bootstrap.min.css'
import './assets/css/googlefonts.css'

import './assets/css/estilos-generales.css'
//TODO: Ver como minificar todo los recursos

import axios from "axios";

const app = createApp(App).use(store).use(router);

//interceptor de todas las request que se encarga de incluir el token de auth (Si lo hay), accept y content-type a los headers
axios.interceptors.request.use(function(config){
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";

    if(store.state.tokenAuth){
        config.headers.Authorization = "Bearer " + store.state.tokenAuth;
    }

    return config;
}, function(error){
    return Promise.reject(error)
});

/*Cosas a comprobar en todas las respuestas:
Si el server responde 401 significa que no hay autenticación por tanto, o bien el user no está logueado y ha intentado
acceder a algún sitio que no debía o el token que ha mandado ya no es válido
En ambos casos, borro el token de sesión en el store y en el localstorage y redirijo al login

Si el server responde 403 significa que no hay autorización para acceder al recurso que está pidiendo. Si es así,
capturo el error, lo logueo y redirijo a una página de forbidden
 */
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response.status == 401){
        console.log("main.js: Response error captured. 401. Eliminando token de storage y state y redirigiendo a login");
        //TODO: Comprobar qué pasa cuandoe l token caduca en el servidor
        window.localStorage.removeItem("tokenAuth");
        store.state.tokenAuth = "";
        //TODO: Comprobar aquí si ya estamos en login para no redirigir
        router.push({name:"IniciarSesion"});
    }

    else if(error.response.status == 403){
        console.log("main.js: Response error captured. 403. Acción no permitida al user.");
        //TODO: Loguear esto al server por si hay que emprender acciones contra el usuario
    }

    else if(error.response.status == 422){
        console.log("main.js: Response error captured 422. Set de state errors y message");
        if(error.response && error.response.data &&
            error.response.data.errors &&
            error.response.data.message){
            store.commit("almacenarArrayErrores", error.response.data.errors);
            store.commit("almacenarMensaje", error.response.data.message);
        }
    }
    //TODO: Manejar también los 404

    return Promise.reject(error)
});

//Este código es el que se encarga de capturar los errores y mandar el log al servidor para tenerlo centralizado
app.config.errorHandler = (err, instance, info) => {
    console.log("Manejando error: " + err + toString(instance) + toString(info))

    //TODO: Implementar el envío al servidor
}

app.mount('#app');