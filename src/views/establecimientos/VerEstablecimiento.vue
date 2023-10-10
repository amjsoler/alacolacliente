<template>
    <div class="row datos-establecimiento">
        <div class="col-4">
            <img :src="dameRutaLogo" class="img-fluid rounded-start" alt="logo">
        </div>
        <div class="col-8">
            <h1 class="text-center">{{ establecimiento.nombre }}</h1>

            <div class="row mt-4">
                <div class="col-8">
                    <p class="dimgrey">{{ establecimiento.direccion }}</p>
                </div>
                <DarQuitarMegusta v-if="establecimientoFavorito != null"
                                  :estado-me-gusta="establecimientoFavorito"
                                  :url-dar-me-gusta="dameRutaMeGusta"
                                  :url-quitar-me-gusta="dameRutaQuitarGusta"
                                  @me-gusta-dado="establecimientoFavorito=true"
                                  @me-gusta-quitado="establecimientoFavorito=false">
                </DarQuitarMegusta>
            </div>
        </div>
        <!-- TODO Textarea descripción -->
        <textarea v-model="establecimiento.descripcion" v-if="establecimiento.descripcion">

        </textarea>
    </div>
</template>

<script>
import axios from "axios";
import DarQuitarMegusta from "@/components/generales/DarQuitarMegusta.vue";

export default {
    name: "VerEstablecimiento",
  components: {DarQuitarMegusta},
    data() {
        return {
            establecimientoID: this.$route.params.id,
            establecimiento: {},
            usuariosEncolados: [],
            establecimientoFavorito: null,
            usuarioEnCola: null,
        }
    },
    computed: {
        dameRutaLogo: function() {
            if(this.establecimiento.logo){
                return process.env.VUE_APP_BASE_URL + this.establecimiento.logo;
            }      else{
                return process.env.VUE_APP_BASE_URL + "storage/noimage.jpg";
            }
        },
      dameRutaMeGusta: function() {
          return process.env.VUE_APP_API_BASE_URL + "establecimientos/" + this.establecimientoID + "/marcar-favorito";
      },
      dameRutaQuitarGusta: function() {
        return process.env.VUE_APP_API_BASE_URL + "establecimientos/" + this.establecimientoID + "/desmarcar-favorito";
      }
    },
    mounted() {
        try{
          console.log("verEstablecimiento.vue: Entro a la vista de ver establecimiento");
          console.log(`verEstablecimiento.vue: Peticiono el establecimiento ${this.establecimientoID} al servidor`);

          axios.get(
              process.env.VUE_APP_API_BASE_URL+"establecimientos/" + this.establecimientoID
          )
              .then(response => {
                console.log("verEstablecimiento.vue: Respuesta OK. Almaceno el establecimiento en el local state");
                this.establecimiento = response.data.establecimiento;
                this.usuariosEncolados = response.data.usuariosEncolados;
                this.establecimientoFavorito = response.data.establecimientoFavorito;
                this.usuarioEnCola = response.data.usuarioEnCola;
              })
              .catch(error => {
                console.log("verEstablecimiento.vue: Respuesta KO. Muestro una vista de error y un botón de recarga?");
                console.log(error);
                //TODO: Cuando no se puedan leer los datos conviene mostrar un mensaje/ vista y un botón para recargar¿?¿?
              });
        }catch(error){
          console.log("verEstablecimiento.vue: Error al peticionar el establecimiento");
        }
    },
}
</script>