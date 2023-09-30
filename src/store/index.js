import {createStore} from 'vuex'

import establecimientos from "@/store/establecimientos";

export default createStore({
    state: {
        tokenAuth: "",
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        establecimientos
    }
})
