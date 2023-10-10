import {createStore} from 'vuex'

import establecimientos from "@/store/establecimientos";
import router from "@/router";

export default createStore({
    strict: true,

    state: {
        tokenAuth: "",
        errors: [],
        message: ""
    },
    mutations: {
        almacenarTokenSesion(state, newTokenSesion){
            console.log("storage/index.js: almacenando token de sesión en el state");
            state.tokenAuth = newTokenSesion;
        },

        cerrarSesion(state) {
            console.log("storage/index.js: cerrando sesión de state");
            state.tokenAuth = "";
        },

        almacenarArrayErrores(state, errors) {
            console.log("storage/index.js: almacenando errores en el state");
            state.errors = errors;
        },

        almacenarMensaje(state, mensaje) {
            console.log("storage/index.js: almacenando el mensaje en el state");
            state.message = mensaje;
        }
    },
    actions: {
        almacenarTokenSesion({commit}, newTokenSesion) {
            console.log("storage/index.js: almacenando token de sesión en el localstorage");
            //Almaceno en la memoria del dispositivo
            window.localStorage.setItem("tokenAuth", newTokenSesion);

            //Almaceno en el state para la sesión actual
            commit("almacenarTokenSesion", newTokenSesion);
        },

        cerrarSesion({commit}) {
            console.log("storage/index.js: Borrando token del storage");
            //Borrando el token del localstorage
            window.localStorage.removeItem("tokenAuth");

            //Llamada al mutator cerrar sesión
            commit("cerrarSesion");

            //Finalmente redirijo a iniciar sesión
            router.push({name:"IniciarSesion"});
        }
    },
    modules: {
        establecimientos
    }
})
