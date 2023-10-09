<template>
  <button class="btn btn-danger" @click.prevent="cerrarSesion">
      <span class="material-symbols-outlined align-bottom">logout</span>
      Cerrar sesión
  </button>
  {{ usuario }}

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

<style>
.btn.btn-danger {
    position: relative;
    float: right;
}
</style>