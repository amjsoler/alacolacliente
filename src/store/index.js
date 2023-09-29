import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        busquedaRealizada: []
    },
    getters: {},
    mutations: {
        buscarEstablecimientosMut(state, data){
            console.log("Entro al mut con: " + data)
            state.busquedaRealizada = data;
        }
    },
    actions: {
        async buscarEstablecimientos({commit}, busqueda) {
            const data = await axios.get(
                "http://localhost:8000/api/buscar-establecimientos",
                {
                    params: {
                        "busqueda": busqueda
                    }
                }
            )

            commit("buscarEstablecimientosMut", data.data);
        }
    },
    modules: {}
})
