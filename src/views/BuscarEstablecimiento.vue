<template>
    <form class="d-flex flex-row">
        <div class="flex-fill">
            <input v-model="busqueda" type="text" class="form-control">
        </div>
        <button @click.prevent="realizarBusqueda" class="btn btn-primary ms-3">
            <span class="material-symbols-outlined icono">search</span>
        </button>
    </form>

</template>

<script>
    import axios from "axios";

    export default {
        name: "BuscarEstablecimiento",
        data() {
            return {
                busqueda: "",
            }
        },
        methods: {
            realizarBusqueda: function () {
                axios.get(
                    "http://localhost:8000/api/buscar-establecimientos",
                    {
                        params: {
                            "busqueda": this.busqueda
                        }
                    }
                )
            }
        }
    }
</script>