<template>
  <div class="col-4">
    <span v-if="estadoMeGusta" @click.prevent="quitarMeGusta" class="material-symbols-outlined cursor-pointer text-danger">favorite</span>
    <span v-else @click.prevent="darMeGusta" class="material-symbols-outlined cursor-pointer">heart_plus</span>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["estadoMeGusta", "urlDarMeGusta", "urlQuitarMeGusta"],
  emits: ["meGustaDado", "meGustaQuitado"],
  mounted() {
    console.log("darQuitarMeGusta.vue: Entrando al componente de darQuitarMeGusta.vue");
  },
  methods: {
    darMeGusta() {
      console.log("darQuitarMeGusta.vue: Entrando al darMeGusta. Lanzo petición al server");

      try {
        axios.get(this.urlDarMeGusta,)
            .then( () => {
              console.log("darQuitarMeGusta.vue: Response OK. Se ha marcado me gusta correctamente");

              this.$emit("meGustaDado");
            })
            .catch(() => {
              console.log("darQuitarMeGusta.vue: Respuesta KO: No se ha podido dar me gusta");
            });
      }catch(error){
        console.log("erEstablecimiento.vue: Excepción en darMeGusta");
        console.log(error);
      }
    },
    quitarMeGusta() {
      console.log("darQuitarMeGusta.vue: Entrando al quitarMeGusta. Lanzo petición al server");

      try {
        axios.get(this.urlQuitarMeGusta,)
            .then( () => {
              console.log("darQuitarMeGusta.vue: Response OK. Se ha dado me gusta correctamente");

              this.$emit("meGustaQuitado");
            })
            .catch(() => {
              console.log("darQuitarMeGusta.vue: Respuesta KO: No se ha podido quitar el me gusta");
            });
      }catch(error){
        console.log("erEstablecimiento.vue: Excepción en quitarMeGusta");
        console.log(error);
      }
    }
  }
}
</script>