<template>
  <div class="modal fade" id="herramientasAdministradorModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Herramientas administrador</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <button class="btn btn-danger" data-bs-target="#eliminarEstablecimientoModal" data-bs-toggle="modal">Eliminar Establecimiento</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="eliminarEstablecimientoModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">¡Atención!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Estás a punto de eliminar el establecimiento y todos sus datos. ¿Deseas continuar?
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-primary" data-bs-target="#herramientasAdministradorModal" data-bs-toggle="modal">Me lo he pensado mejor</button>
          <button class="btn btn-danger" @click.prevent="eliminarEstablecimiento">
            <span class="material-symbols-outlined align-bottom">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-primary d-block mx-auto" data-bs-target="#herramientasAdministradorModal" data-bs-toggle="modal">Herramientas administrador</button>
  <hr>
</template>

<script>

import axios from "axios";

import helpers from "@/helpers/globalHelpers.vue"
import router from "@/router";

export default {
  props: ["establecimientoId"],
  mounted() {
    console.log("HerramientasAdministrador.vue: Entrando al herramientas administrador");
  },
  methods: {
    eliminarEstablecimiento() {
      console.log("HerramientasAdministrador.vue: Entrando al eliminarEstablecimiento. Mandando petición");

      axios.delete(process.env.VUE_APP_API_BASE_URL+"establecimientos/"+this.establecimientoId)
          .then(() => {
            console.log("HerramientasAdministrador.vue: Response OK: Redirigiendo a mis establecimientos");

            helpers.cerrarTodosLosModalesAbiertos();

            helpers.mostrarToast("El establecimiento se ha eliminado correctamente");

            router.push({name:"MisEstablecimientos"});
          })
          .catch(error => {
            console.log("HerramientasAdministrador.vue: Response KO: Error al intentar eliminar el establecimiento");
            console.log(error);
          });
    }
  }
}
</script>