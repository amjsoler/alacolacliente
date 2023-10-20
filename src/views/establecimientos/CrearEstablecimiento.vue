<template>
    <div class="w-75 mx-auto">
      <form-group>
        <form-label>Nombre</form-label>
        <input-control type="text" v-model="nombre" />
        <input-error v-if="errors.nombre">{{errors.nombre[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Dirección</form-label>
        <input-control v-model="direccion" type="text" />
        <input-error v-if="errors.direccion">{{errors.direccion[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Descripción</form-label>
        <text-area-tiny-mce v-model="descripcion"/>
        <input-error v-if="errors.descripcion">{{errors.descripcion[0]}}</input-error>
      </form-group>
      <form-group>
        <latitud-longitud-posicionamiento :posicionamiento_prop="posicionamiento"
        @update:posicionamiento="value => this.posicionamiento = value"/>
      </form-group>
      <form-group>
        <form-label>Logo</form-label>
        <input-image-with-preview image-default="/no-logo.jpg" @logo-subido="elLogo => this.logo = elLogo"/>
        <input-error v-if="errors.logo">{{errors.logo[0]}}</input-error>
      </form-group>
      <button @click.prevent="crearEstablecimiento" class="btn btn-primary w-100">Crear mi establecimiento</button>
    </div>
</template>

<script>

import axios from "axios";
import router from "@/router";
import {mapState} from "vuex";

import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import TextAreaTinyMce from "@/components/generales/formularios/TextAreaTinyMce.vue";
import InputImageWithPreview from "@/components/generales/formularios/InputImageWithPreview.vue";
import LatitudLongitudPosicionamiento from "@/components/generales/formularios/LatitudLongitudPosicionamiento.vue";

export default {
  name: "CrearEstablecimiento",
  components: {
    LatitudLongitudPosicionamiento,
    InputImageWithPreview, TextAreaTinyMce, InputControl, InputError, FormLabel, FormGroup},
  data() {
    return {
      nombre: "",
      logo: "",
      direccion: "",
      descripcion: "",
      geolocalizacionActiva: false,
      posicionamiento: {
        lat: "",
        lng: "",
      }
    }
  },
  computed: {
    ...mapState([
      "errors", "message"
    ])
  },
  mounted() {
    console.log("CrearEstablecimiento.vue: Entrando al crear establecimiento");
  },
  methods: {
    crearEstablecimiento(){
      console.log("CrearEstablecimiento.vue: Mandando petición de creación de establecimiento...");
      console.log("El logo: " + this.logo);
      const formData = new FormData();
      formData.append("nombre", this.nombre);
      formData.append("logo", this.logo);
      formData.append("direccion", this.direccion);
      formData.append("descripcion", this.descripcion);
      formData.append("latitud", this.posicionamiento.lat);
      formData.append("longitud", this.posicionamiento.lng);
      axios.post(process.env.VUE_APP_API_BASE_URL+"establecimientos",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
      })
          .then(response => {
            console.log("CrearEstablecimiento.vue: Establecimiento creado crrectamente, redirigiendo al nuevo establecimiento");
            router.push({name:"VerEstablecimiento",params:{id:response.data.id}})
          })
          .catch(error => {
            console.log("CrearEstablecimiento.vue: Error al crear el establecimiento");
            console.log(error);
          })
    },
  }
}
</script>