<template>
    <form class="d-flex flex-row mb-3">
        <div class="flex-fill">
          <input-control v-model="busqueda" type="text" />
          <input-error v-if="errors.campobusqueda">{{ errors.campobusqueda[0] }}</input-error>
        </div>
        <button @click.prevent="buscarEstablecimientos" class="btn btn-primary ms-3 align-self-start">
            <span class="material-symbols-outlined icono">search</span>
        </button>
    </form>

  <establecimiento-lista v-for="establecimiento in busquedaRealizada"
                         v-bind:key="establecimiento.id"
                         :establecimiento="establecimiento" />

  <button class="btn btn-primary" @click.prevent="buscarEstablecimientosCercanos">
    Buscar establecimientos cercanos
  </button>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import EstablecimientoLista from "@/components/establecimientos/EstablecimientoLista.vue";
import store from "@/store";

export default {
    name: "BuscarEstablecimiento",
  components: {EstablecimientoLista, InputError, InputControl},
    data() {
        return {
            busqueda: "",
        }
    },
    computed: {
        ...mapState(["errors", "message"]),
        ...mapState("establecimientos", ["busquedaRealizada"])
    },
  mounted() {
      console.log("BuscarEstablecimiento.vue: Entrando al buscar establecimiento");
  },
  methods: {
        buscarEstablecimientos(){
          console.log("BuscarEstablecimiento.vue: Realizando búsqueda de establecimientos...");
          axios.post(
              process.env.VUE_APP_API_BASE_URL + "establecimientos/buscar",
              {
                "campobusqueda": this.busqueda
              }
          )
              .then(response =>{
                console.log("BuscarEstablecimiento.vue: Response OK: Pintando los establecimientos");

                this.$store.dispatch("establecimientos/buscarEstablecimientos", response.data)
              })
              .catch(error => {
                console.log("BuscarEstablecimiento.vue: Response KO: Error al buscar");
                console.log(error);
              })
        },

    buscarEstablecimientosCercanos() {
      const opcionesDeSolicitud = {
        enableHighAccuracy: true, // Alta precisión
        maximumAge: 0, // No queremos caché
        timeout: 5000 // Esperar solo 5 segundos
      };

        navigator.geolocation.getCurrentPosition(ubicacion => {
          const latitud = ubicacion.coords.latitude;
          const longitud = ubicacion.coords.longitude;

          //Aquí hacemos la llamada al server para buscar los establecimientos
          axios.post(process.env.VUE_APP_API_BASE_URL+"establecimientos/buscar-cercanos",
              {
                latitud: latitud,
                longitud: longitud
              })
              .then(response => {
                store.dispatch("establecimientos/buscarEstablecimientos", response.data);
              })
              .catch(error => {
                console.log(error);
              })
        }, error => {
          console.error( error );
        }, opcionesDeSolicitud);
      }
    }
}
</script>