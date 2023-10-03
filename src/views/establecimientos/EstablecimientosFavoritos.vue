<template>
    {{ establecimientosFavoritos }}
</template>

<script>
    import axios from "axios";

    export default {
        name: "EstablecimientosFavoritos",

      data() {
          return {
            establecimientosFavoritos: []
          }
      },

      mounted() {
          axios.get(process.env.VUE_APP_API_BASE_URL+"establecimientos/favoritos")
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              })
      }
    }
</script>