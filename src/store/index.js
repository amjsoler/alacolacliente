import {createStore} from 'vuex'

import establecimientos from "@/store/establecimientos";
import router from "@/router";

export default createStore({
    state: {
        tokenAuth: "",
    },
    getters: {},
    mutations: {
        almacenarTokenSesion(state, newTokenSesion){
            state.tokenAuth = newTokenSesion;
        },

        cerrarSesion(state) {
            state.tokenAuth = "";
        }
    },
    actions: {
        almacenarTokenSesion({commit}, newTokenSesion) {
            //Almaceno en la memoria del dispositivo
            window.localStorage.setItem("tokenAuth", newTokenSesion);

            //Almaceno en el state para la sesión actual
            commit("almacenarTokenSesion", newTokenSesion);
        },

        cerrarSesion({commit}) {
            window.localStorage.removeItem("tokenAuth");

            commit("cerrarSesion");

            router.push({name:"IniciarSesion"});
        }
    },
    modules: {
        establecimientos
    }
})
