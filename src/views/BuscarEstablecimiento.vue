<template>
    <form class="d-flex flex-row">
        <div class="flex-fill">
            <input v-model="busqueda" type="text" class="form-control">
        </div>
        <button @click.prevent="buscarEstablecimientos(busqueda)" class="btn btn-primary ms-3">
            <span class="material-symbols-outlined icono">search</span>
        </button>
    </form>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "BuscarEstablecimiento",
        data() {
            return {
                busqueda: "",
            }
        },
        methods: {
            ...mapActions({
                buscarEstablecimientos: "establecimientos/buscarEstablecimientos"
            })
        }
    }
</script>