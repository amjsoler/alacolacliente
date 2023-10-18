export default {
    namespaced: true,

    state: {
        busquedaRealizada: [],
        establecimientoAModificar: {},
    },
    mutations: {
        buscarEstablecimientosMut(state, data) {
            console.log("store/establecimientos.js: almacenando busqueda realizada en el state");
            state.busquedaRealizada = data;
        },

        guardarEstablecimientoAModificar(state, data) {
            console.log("store/establecimientos.js: almacenando establecimiento a modificar en el state");
            state.establecimientoAModificar = data;
        }
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

        guardarEstablecimientoAModificar({commit}, data) {
            console.log("store/establecimientos.js: guardarestablecimientoamodificar.");

            commit("guardarEstablecimientoAModificar", data);
        }
    },
}