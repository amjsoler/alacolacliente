<template>
  {{ usuario }}

  <button class="btn btn-primary" @click.prevent="cerrarSesion">Cerrar Sesión</button>
</template>

<script>

import store from "@/store";
import axios from "axios";
import {mapActions} from "vuex";

export default {
    name:"CuentaUsuario",

  data() {
    return {
      usuario: "",
    }
  },
  methods: {
      ...mapActions({
        cerrarSesion: "cerrarSesion"
      }),
  },
  mounted() {
    axios.get(process.env.VUE_APP_API_BASE_URL+"user",{},{
      headers: {
        "Authorization": "Bearer "+store.tokenAuth
      }
    }).then(response => {
      console.log("Respuesta de user" + response);
      this.usuario = response.data;
    })
        .catch(error => console.log(error))
  }
}
</script>
