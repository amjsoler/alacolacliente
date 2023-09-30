import axios from "axios";

export default {
    namespaced: true,

    state: {
        busquedaRealizada: null,
        verEstablecimiento: null,
    },
    mutations: {
        buscarEstablecimientosMut(state, data) {
            state.busquedaRealizada = data;
        },

        verEstablecimientoMut(state, data) {
            state.verEstablecimiento = data;
        }
    },
    actions: {
        async buscarEstablecimientos({commit}, busqueda) {
            try {
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
                console.log(error);
            }
        },

        async verEstablecimiento({commit, state}, establecimientoID) {
            console.log("Entro al ver establecimiento del store");
            var encontrado = false;

            //Primero compruebo si el verEstablecimiento tiene un establecimiento y si coincide con el que recibo por param
            if (state.verEstablecimiento && state.verEstablecimiento.id == establecimientoID) {
                console.log("busco en el state ver establecimiento");
                encontrado = true;
                //OK, ya puedo pintar en la vista
            }
            //TODO: Si no, Compruebo si el id a buscar está en el listado de mis establecimientos
            //TODO: Si no, Compruebo si el id a buscar está en el listado de mis establecimientos favoritos
            //Si no, Compruebo si el id a buscar está en el listado de busqueda realizada
            if (!encontrado && state.busquedaRealizada) {
                console.log("busco en el busqueda realiaada");
                //Busco dentro de la lista de busqueda
                const establecimiento = state.busquedaRealizada.find(elem => elem.id == establecimientoID);

                if(establecimiento){
                    console.log("Guardo el de busqueda realizada en ver establecimiento" + establecimiento);
                    commit("verEstablecimientoMut", establecimiento);

                    encontrado = true;
                }
            }

            if(!encontrado){
                console.log("No encontrado, peticiono a servidor");
                try {
                    const data = await axios.get(
                        "http://localhost:8000/api/establecimientos/"+establecimientoID
                    );

                    commit("verEstablecimientoMut", data.data);
                } catch(error){
                    commit("verEstablecimientoMut", null);
                }
            }

            //Si no lo encuentro, peticiono el ver establecimietno con el id
            //Si recibo ok 200 con establecimiento lo guardo en el verEstablecimiento y paso a la vista
            //Si no está en servidor, dejo a null el verEstablecimiento y muestro un no encontradoen la vista

        }
    },
}