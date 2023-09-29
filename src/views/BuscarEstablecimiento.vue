<template>
    <form class="d-flex flex-row mb-3">
        <div class="flex-fill">
            <input v-model="busqueda" type="text" class="form-control">
        </div>
        <button @click.prevent="buscarEstablecimientos(busqueda)" class="btn btn-primary ms-3">
            <span class="material-symbols-outlined icono">search</span>
        </button>
    </form>

    <router-link :to="{name: 'VerEstablecimiento', params:{id:establecimiento.id}}"
                 v-for="(establecimiento) in busquedaRealizada"
                 :key="establecimiento.id"
                 class="text-decoration-none">
        <div class="card mb-3">
            <div class="g-0 d-flex">
                <div class="col-4">
                    <img src="http://localhost:8000/storage/noimage.jpg" class="img-fluid rounded-start" alt="logo">
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ establecimiento.nombre }}</h5>
                        <p class="card-text">{{ establecimiento.direccion }}</p>
                        <p class="card-text">
                            <small class="text-body-secondary">
                                Unos cuantos usuarios encolados
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "BuscarEstablecimiento",
    data() {
        return {
            busqueda: "",
        }
    },
    computed: {
        ...mapState({
            busquedaRealizada: state => state.establecimientos.busquedaRealizada
        })
    },
    methods: {
        ...mapActions({
            buscarEstablecimientos: "establecimientos/buscarEstablecimientos"
        })
    }
}
</script>