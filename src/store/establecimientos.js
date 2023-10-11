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

                commit("buscarEstablecimientosMut", busqueda);
            } catch (error) {
                console.log("store/establecimientos.js: Error en el buscarEstablecimientos");
            }
        },
    },
}