import {createStore} from 'vuex'

import establecimientos from "@/store/establecimientos";

export default createStore({
    state: {
        tokenAuth: "",
    },
    getters: {},
    mutations: {
        almacenarTokenSesion(state, newTokenSesion){
            state.tokenAuth = newTokenSesion;
        }
    },
    actions: {
        almacenarTokenSesion({commit}, newTokenSesion) {
            //Almaceno en la memoria del dispositivo
            window.localStorage.setItem("tokenAuth", newTokenSesion);

            //Almaceno en el state para la sesión actual
            commit("almacenarTokenSesion", newTokenSesion);
        }
    },
    modules: {
        establecimientos
    }
})
