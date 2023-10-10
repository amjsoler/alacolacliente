<template>
  <establecimiento-lista
      v-for="establecimientoFavorito in establecimientosFavoritos"
      v-bind:key="establecimientoFavorito.establecimiento.id"
      :establecimiento="establecimientoFavorito.establecimiento" />
</template>

<script>
    import axios from "axios";

    import EstablecimientoLista from "@/components/establecimientos/EstablecimientoLista.vue";

    export default {
        name: "EstablecimientosFavoritos",
      components: {EstablecimientoLista},

      data() {
          return {
            establecimientosFavoritos: []
          }
      },

      mounted() {
          console.log("EstablecimientosFavoritos: Entrando a ver los establecimientos favoritos");
          console.log("EstablecimientosFavoritos: Pidiendo al servidor los establecimientos favoritos");

          axios.get(process.env.VUE_APP_API_BASE_URL+"establecimientos/favoritos")
              .then(response => {

                console.log("EstablecimientosFavoritos: Respuesta OK. Almaceno los establecimeintos en el local state");
                this.establecimientosFavoritos = response.data;
              })
              .catch(error => {
                console.log("EstablecimientosFavoritos: Respuesta KO. El servidor no ha devuelto una respuesta esperada");
                console.log(error);
              })
      }
    }
</script>