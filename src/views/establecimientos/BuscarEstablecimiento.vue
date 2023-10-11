<template>
    <form class="d-flex flex-row mb-3">
        <div class="flex-fill">
          <input-control v-model="busqueda" type="text" />
          <input-error class="position-absolute" v-if="errors.campobusqueda">{{ errors.campobusqueda[0] }}</input-error>
        </div>
        <button @click.prevent="buscarEstablecimientos" class="btn btn-primary ms-3">
            <span class="material-symbols-outlined icono">search</span>
        </button>
    </form>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";

export default {
    name: "BuscarEstablecimiento",
  components: {InputError, InputControl},
    data() {
        return {
            busqueda: "",
        }
    },
    computed: {
        ...mapState(["establecimientos/busquedaRealizada", "errors", "message"])
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
                params: {
                  "campobusqueda": this.busqueda
                }
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
        }
    }
}
</script>