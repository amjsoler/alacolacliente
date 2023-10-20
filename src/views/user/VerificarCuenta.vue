<template>
  <div-centro-pantalla class="text-center">
    <p>Parece ser que todavía no has verificado la cuenta de usuario.</p>
    <p>Por favor, revisa el correo electrónico que te hemos mandado al crear la cuenta.</p>
    <p>Si no lo encuentras, revisa el spam.</p>

    <button v-if="!mandandoCorreo" class="btn btn-primary" @click="volverAEnviarCorreo">
      Volver a enviar correo
    </button>
    <div v-else class="spinner-border text-primary" role="status">
    </div>
  </div-centro-pantalla>
</template>

<script>
import DivCentroPantalla from "@/components/generales/DivCentroPantalla.vue";
import axios from "axios";
import globalHelpers from "@/helpers/globalHelpers.vue";

export default {
  name: "VerificarCuenta",
  components: {DivCentroPantalla},

  data(){
    return {
      mandandoCorreo: false
    }
  },
  mounted() {
    console.log("VerificarCuenta.vue: Entrando al verificar cuenta");
  },
  methods: {
    volverAEnviarCorreo() {
      console.log("VerificarCuenta.vue: Entrando al metodo de volver a enviar correo de verificación. Mando petición");

      this.mandandoCorreo = true;

      axios.get(process.env.VUE_APP_API_BASE_URL+"verificar-cuenta")
          .then(() => {
            globalHelpers.mostrarToast("Se ha enviado el correo de verificación")
            this.mandandoCorreo = false;
          })
          .catch(() => {
            globalHelpers.mostrarToast("No se ha podido mandar el correo de verificación. Prueba de nuevo más tarde", "danger")
            this.mandandoCorreo = false;
          })
    }
  }
}
</script>