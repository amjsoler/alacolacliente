<script>
import {Modal, Toast} from "bootstrap"
import store from "@/store";

export default {
  cerrarTodosLosModalesAbiertos() {
    //Cierro el modal primeroa ntes de redirigir
    var modal = Modal.getInstance(document.querySelector(".modal.show"));

    if(modal){
      modal.hide();
    }
  },

  mostrarToast(mensaje, tipo){
    console.log("globalHelpers.vue: Entrando al mostrarToast con params: {mensaje: " + mensaje + ", tipo: " + tipo + "}");
    store.dispatch("almacenarMensajeToast", {mensaje, tipo});

    //Muestro el toast
    Toast.getOrCreateInstance(document.getElementById("toastApp")).show();
  }
}
</script>