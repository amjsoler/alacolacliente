<template>
  <div>
    <herramientas-administrador v-if="usuarioAdmin" :establecimiento="establecimiento"/>
    <div class="row datos-establecimiento">
      <div class="col-4">
        <img :src="dameRutaLogo" class="img-fluid rounded-start" alt="logo">
      </div>
      <div class="col-8 mb-4">
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
      <div class="text-center">
        <div id="tinyCollapseContainer" class="collapse">
          <text-area-tiny-mce v-model="establecimiento.descripcion"
                              v-if="establecimiento.descripcion"
                              disabled="true"/>
        </div>
        <button class="btn btn-primary btn-sm" data-bs-toggle="collapse" data-bs-target="#tinyCollapseContainer">
          <span class="material-symbols-outlined align-bottom">expand_more</span>
          Ver descripción
          <span class="material-symbols-outlined align-bottom">expand_more</span>
        </button>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-center" v-if="usuarioAdmin">
      <button @click="pasarTurno" class="btn btn-primary">Pasar turno</button>
    </div>

    <!-- TODO: Cuadro con tres siguientes -->
    <div class="d-flex justify-content-center flex-column">
      <div v-for="(usuario, index) in usuariosEncolados"
           v-bind:key="usuario.id">
        <!-- Comprobar si es user anonimo -->
        <div v-if="usuario.usuario_en_cola" class="d-flex align-items-center">
          <div class="cuadrado-logo-listado-usuario me-2">
            <img class="img-fluid" :src="usuario.usuario.profile_photo_url">
          </div>
          {{ usuario.usuario.name }}
          <a v-if="usuarioAdmin" class="cursor-pointer ms-2" @click="quitarUsuarioDeLaCola(usuario.id, index, usuario.usuario.name)">
            <span class="material-symbols-outlined align-bottom">person_remove</span>
          </a>
        </div>
        <div v-else class="d-flex align-items-center">
          <div class="cuadrado-logo-listado-usuario me-2">
            <img class="img-fluid" src="/no-user-logo.jpg">
          </div>
          {{ usuario.nombre_usuario_anonimo}}
          <a v-if="usuarioAdmin" class="cursor-pointer ms-2" @click="quitarUsuarioDeLaCola(usuario.id, index, usuario.nombre_usuario_anonimo)">
            <span class="material-symbols-outlined align-bottom">person_remove</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Botones de apuntarse -->
    <div>
      <!-- apuntarse/desapuntarse -->
      <!-- Usuario con login -->
      <div v-if="usuarioEnCola != null">
        <!-- Usuario ya en cola -->
        <div v-if="usuarioEnCola == true" class="d-flex justify-content-center fixed-bottom">
          <button @click="desencolarConSesion" class="btn btn-primary mb-75">Desapuntarme</button>
        </div>
        <!-- Usuario no está en cola -->
        <div v-else class="d-flex justify-content-center fixed-bottom">
          <button @click="encolarConSesion" class="btn btn-primary mb-75">Apuntarme</button>
        </div>
      </div>
      <!-- Usuario sin login -->
      <div v-else class="d-flex justify-content-center fixed-bottom">
        <div v-if="nombreUsuarioInvitado" class="mb-75 text-center">
          Estás apuntado como invitado con nombre de usuario <b>{{nombreUsuarioInvitado}}</b>
        </div>
        <div v-else>
          <button class="btn btn-primary mb-75" data-bs-target="#apuntarseSinLogin" data-bs-toggle="modal">Apuntarme</button>
        </div>
      </div>
    </div>


    <modal-general id="apuntarseSinLogin" titulo="¡Atención!" v-if="usuarioEnCola == null">
      No has iniciado sesión de usuario. Si te apuntas como invitado, corres el riesgo de perder tu posición en la cola si se cierra la app
      <div class="d-flex justify-content-center">
        <router-link :to='{name: "IniciarSesion"}' class="btn btn-primary">Iniciar sesión</router-link>
        <button data-bs-target="#formularioApuntarseInvitado" data-bs-toggle="modal" class="btn btn-secondary ms-2">Apuntarme</button>
      </div>
    </modal-general>
    <modal-general id="formularioApuntarseInvitado" titulo="Apuntarse como invitado" v-if="usuarioEnCola == null">
      <form>
        <form-label>Nombre de usuario</form-label>
        <input-control type="text" v-model="usernameGuest" />
        <input-error v-if="errors.nombre_usuario_anonimo">{{errors.nombre_usuario_anonimo[0]}}</input-error>
        <button-submit @submit-click="apuntarComoInvitado">
          Apuntarme
        </button-submit>
      </form>
    </modal-general>
  </div>
</template>

<script>
import axios from "axios";
import DarQuitarMegusta from "@/components/establecimientos/DarQuitarMegusta.vue";
import HerramientasAdministrador from "@/components/establecimientos/HerramientasAdministrador.vue";
import TextAreaTinyMce from "@/components/generales/formularios/TextAreaTinyMce.vue";
import ModalGeneral from "@/components/generales/modales/ModalGeneral.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import {mapActions, mapState} from "vuex";
import globalHelpers from "@/helpers/globalHelpers.vue";

export default {
    name: "VerEstablecimiento",
  components: {
    InputError,
    FormLabel,
    ButtonSubmit, InputControl, ModalGeneral, TextAreaTinyMce, HerramientasAdministrador, DarQuitarMegusta},
    data() {
        return {
            establecimientoID: this.$route.params.id,
            establecimiento: {
              nombre: "",
              direccion: "",
              descripcion: "",
              logo: "",
              latitud: "",
              longitud: "",
            },
            usuariosEncolados: [],
            establecimientoFavorito: null,
            usuarioEnCola: null,
            usuarioAdmin: null,

          usernameGuest: null,
        }
    },
    computed: {
      ...mapState(["errors", "message", "nombreUsuarioInvitado"]),
        dameRutaLogo: function() {
            if(this.establecimiento.logo){
                return process.env.VUE_APP_BASE_URL + this.establecimiento.logo;
            }      else{
                return "/no-logo.jpg";
            }
        },
      dameRutaMeGusta: function() {
          return process.env.VUE_APP_API_BASE_URL + "establecimientos/" + this.establecimientoID + "/marcar-favorito";
      },
      dameRutaQuitarGusta: function() {
        return process.env.VUE_APP_API_BASE_URL + "establecimientos/" + this.establecimientoID + "/desmarcar-favorito";
      }
    },
  methods: {
      ...mapActions({
        almacenarNombreDeUsuario: "almacenarNombreUsuarioInvitado"
      }),
    encolarConSesion() {
      console.log("verEstablecimiento.vue: Entro al encolarConSesión");
      console.log("verEstablecimiento.vue: Mando petición de encolado");

      axios.get(
          process.env.VUE_APP_API_BASE_URL+"establecimientos/"+this.establecimientoID+"/apuntarse"
      ).then(() => {
        console.log("verEstablecimiento.vue: Apuntarse response OK. Modificando la interfaz como toca");

        this.usuarioEnCola = true;
      }).catch(error => {
        console.log("verEstablecimiento.vue: Apuntarse response KO. Log de error y no hago nada");
        console.log("verEstablecimiento.vue: Error al apuntarse: " + error);
      })
    },

    desencolarConSesion() {
      console.log("verEstablecimiento.vue: Entro al desencolarConSesión");
      console.log("verEstablecimiento.vue: Mando petición de desencolado");

      axios.get(
          process.env.VUE_APP_API_BASE_URL+"establecimientos/"+this.establecimientoID+"/desapuntarse"
      ).then(() => {
        console.log("verEstablecimiento.vue: Despuntarse response OK. Modificando la interfaz como toca");

        this.usuarioEnCola = false;
      }).catch(error => {
        console.log("verEstablecimiento.vue: Despuntarse response KO. Log de error y no hago nada");
        console.log("verEstablecimiento.vue: Error al desapuntarse: " + error);
      })
    },

    apuntarComoInvitado() {
      console.log("verEstablecimiento.vue: Entro al apuntarComoInvitado");
      console.log("verEstablecimiento.vue: Mando petición de encolar invitado");

      axios.post(
          process.env.VUE_APP_API_BASE_URL + "establecimientos/" + this.establecimientoID + "/apuntarse-como-invitado",
          {
            nombre_usuario_anonimo: this.usernameGuest
          }
      ).then(response => {
        console.log("verEstablecimiento.vue: apuntarse invitado response OK. Modificando la interfaz como toca");

        //Guardo el nuevo user en el array local
        this.usuariosEncolados.push(response.data);

        //Almaceno en global state
        this.almacenarNombreDeUsuario(this.usernameGuest);

        //Muestro toast avisando del success
        globalHelpers.mostrarToast("Te has apuntado correctamente", "success");

        //Cierro los modales
        globalHelpers.cerrarTodosLosModalesAbiertos();
      }).catch(error => {
        console.log("verEstablecimiento.vue: apuntarse invitado response KO. Log de error y no hago nada");
        console.log("verEstablecimiento.vue: Error al apuntarse invitado: " + error);
      })
    },

    pasarTurno() {
        console.log("verEstablecimiento.vue: Entrando al pasarTurno");
        console.log("verEstablecimiento.vue: Mandando petición para pasar turno");

      axios.get(
          process.env.VUE_APP_API_BASE_URL+"establecimientos/"+this.establecimientoID+"/pasar-turno"
      ).then(() => {
        console.log("verEstablecimiento.vue: pasarturno response OK. Modificando la interfaz como toca");

        this.usuariosEncolados.splice(0, 1);

        globalHelpers.mostrarToast("Has pasado turno");
      }).catch(error => {
        console.log("verEstablecimiento.vue: pasarturno response KO. Log de error y no hago nada");
        console.log("verEstablecimiento.vue: Error al pasar turno: " + error);
      })
    },

    quitarUsuarioDeLaCola(usuarioEnColaID, index, username) {
      console.log("verEstablecimiento.vue: Entrando al quitarUsuarioDeLaCola");
      console.log("verEstablecimiento.vue: Mandando petición para desapuntar usuario");

      axios.get(
          process.env.VUE_APP_API_BASE_URL+"establecimientos/"+this.establecimientoID+"/admin-desapunta-usuario/"+usuarioEnColaID
      ).then(() => {
        console.log("verEstablecimiento.vue: admin desapunta usuario response OK. Modificando la interfaz como toca");

        globalHelpers.mostrarToast("has quitado a " + username + " de la cola");

        this.usuariosEncolados.splice(index, 1);

      }).catch(error => {
        console.log("verEstablecimiento.vue: admin desapunta usuario response KO. Log de error y no hago nada");
        console.log("verEstablecimiento.vue: Error al desapuntar usuario como admin: " + error);
      })
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
                console.log(response);
                this.establecimiento = response.data.establecimiento;
                this.establecimiento.latitud = parseFloat(response.data.establecimiento.latitud);
                this.establecimiento.longitud = parseFloat(response.data.establecimiento.longitud);
                this.usuariosEncolados = response.data.usuariosEncolados;
                this.establecimientoFavorito = response.data.establecimientoFavorito;
                this.usuarioEnCola = response.data.usuarioEnCola;
                this.usuarioAdmin = response.data.userAdmin;
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

<style>

</style>