import axios from "axios";

export default {
    namespaced: true,

    state: {
        busquedaRealizada: [],
    },
    mutations: {
        buscarEstablecimientosMut(state, data) {
            console.log("store/establecimientos.js: almacenando busqueda realizada en el state");
            state.busquedaRealizada = data;
        },
    },
    actions: {
        async buscarEstablecimientos({commit}, busqueda) {
            try {
                console.log("store/establecimientos.js: buscarEstablecimiento. Axios get");
                const data = await axios.get(
                    process.env.VUE_APP_API_BASE_URL + "buscar-establecimientos",
                    {
                        params: {
                            "busqueda": busqueda
                        }
                    }
                )

                commit("buscarEstablecimientosMut", data.data);
            } catch (error) {
                console.log("store/establecimientos.js: Error en el buscarEstablecimientos");
            }
        },
    },
}