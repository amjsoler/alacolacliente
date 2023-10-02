<template>
    Cuanta de usuario

  {{ usuario }}
</template>

<script>
import store from "@/store";
import axios from "axios";

export default {
    name:"CuentaUsuario",

  data() {
    return {
      busqueda: "",
    }
  },
  mounted() {
      alert("hOLA");
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
