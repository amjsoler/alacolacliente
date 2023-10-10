<template>
    <div>
      <establecimiento-lista v-for="establecimiento in establecimientos"
                             v-bind:key="establecimiento.id"
                              :establecimiento="establecimiento">
      </establecimiento-lista>
      <router-link class="btn btn-primary w-100" :to="name=CrearEstablecimiento">Crear establecimiento</router-link>
    </div>
</template>

<script>
import axios from "axios";
import CrearEstablecimiento from "@/views/establecimientos/CrearEstablecimiento.vue";
import EstablecimientoLista from "@/components/establecimientos/EstablecimientoLista.vue";

export default {
    name: "MisEstablecimientos",
  components: {EstablecimientoLista},
  computed: {
    CrearEstablecimiento() {
      return CrearEstablecimiento
    }
  },
    data() {
        return {
            establecimientos: []
        }
    },
    mounted() {
      console.log("MisEstablecimientos.vue: Entrando a mis establecimientos");
      console.log("MisEstablecimientos.vue: Peticionando lista de establecimientos");

        axios.get(process.env.VUE_APP_API_BASE_URL+"mis-establecimientos")
            .then(response => {
              console.log("MisEstablecimientos.vue: Respuesta OK. Almaceno el listado en el local store");
                this.establecimientos = response.data;
            })
            .catch(error => {
              console.log("MisEstablecimientos.vue: Respuesta KO. Error desconocido al leer los establecimientos");
                console.log(error);
            });
    }
}
</script>