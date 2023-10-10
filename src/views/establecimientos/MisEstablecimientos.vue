<template>
    <div>
        {{establecimientos}}

      <router-link :to="name=CrearEstablecimiento">Crear establecimiento</router-link>
    </div>
</template>

<script>
import axios from "axios";
import CrearEstablecimiento from "@/views/establecimientos/CrearEstablecimiento.vue";

export default {
    name: "MisEstablecimientos",
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
        axios.get(process.env.VUE_APP_API_BASE_URL+"establecimientos/favoritos")
            .then(response => {
                this.establecimientos = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>