import axios from "axios";

export default {
    namespaced: true,

    state: {
        busquedaRealizada: []
    },
    mutations: {
        buscarEstablecimientosMut(state, data){
            state.busquedaRealizada = data;
        }
    },
    actions: {
        async buscarEstablecimientos({commit}, busqueda) {
            try{
                const data = await axios.get(
                    "http://localhost:8000/api/buscar-establecimientos",
                    {
                        params: {
                            "busqueda": busqueda
                        }
                    }
                )

                commit("buscarEstablecimientosMut", data.data);
            } catch(error){
                console.log(error);
            }
        }
    },
}