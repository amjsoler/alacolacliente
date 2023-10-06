import axios from "axios";

export default {
    namespaced: true,

    state: {
        busquedaRealizada: [],
        verEstablecimiento: {},
    },
    mutations: {
        buscarEstablecimientosMut(state, data) {
            console.log("store/establecimientos.js: almacenando busqueda realizada en el state");
            state.busquedaRealizada = data;
        },

        verEstablecimientoMut(state, data) {
            console.log("store/establecimientos.js: Almacenando el último establecimiento visto en el state");
            state.verEstablecimiento = data;
        }
    },
    actions: {
        async buscarEstablecimientos({commit}, busqueda) {
            try {
                console.log("store/establecimientos.js: buscarEstablecimiento. Axios get");
                const data = await axios.get(
                    "http://localhost:8000/api/buscar-establecimientos",
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

        verEstablecimiento({commit, state}, establecimientoID) {
            console.log("store/establecimientos.js: Entro al ver establecimiento del store");
            var encontrado = false;

            //Primero compruebo si el verEstablecimiento tiene un establecimiento y si coincide con el que recibo por param
            if (state.verEstablecimiento && state.verEstablecimiento.id == establecimientoID) {
                console.log("store/establecimientos.js: El último establecimiento visto es el que quiero ver ahora");
                encontrado = true;
                //OK, ya puedo pintar en la vista
            }
            //Si no, Compruebo si el id a buscar está en el listado de busqueda realizada
            if (!encontrado && state.busquedaRealizada) {
                console.log("store/establecimientos.js: busco en la última busqueda realiaada");
                //Busco dentro de la lista de busqueda
                const establecimiento = state.busquedaRealizada.find(elem => elem.id == establecimientoID);

                if(establecimiento){
                    console.log("store/establecimientos.js: Encontrado en la última busqueda realizada, lo almaceno en el verestablecimiento");
                    commit("verEstablecimientoMut", establecimiento);

                    encontrado = true;
                }
            }

            if(!encontrado){
                console.log("store/establecimientos.js: No encontrado, peticiono a servidor");
                try {
                    axios.get(
                        "http://localhost:8000/api/establecimientos/"+establecimientoID
                    )
                        .then(response => {
                            console.log("store/establecimientos.js: Petición OK. Almaceno el establecimiento en verestablecimiento");
                            commit("verEstablecimientoMut", response.data)
                        });
                } catch(error){
                    console.log("store/establecimientos.js: Error en la consulta, dejo el verestablecimeinto vacío");
                    commit("verEstablecimientoMut", {});
                }
            }
        }
    },
}