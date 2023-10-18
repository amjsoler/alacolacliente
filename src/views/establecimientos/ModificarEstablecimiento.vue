<template>
    <div class="w-75 mx-auto">
      <form-group>
        <form-label>Nombre</form-label>
        <input-control type="text" v-model="establecimiento.nombre" />
        <input-error v-if="errors.nombre">{{errors.nombre[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Dirección</form-label>
        <input-control v-model="establecimiento.direccion" type="text" />
        <input-error v-if="errors.direccion">{{errors.direccion[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Descripción</form-label>
        <text-area-tiny-mce v-model="establecimiento.descripcion"/>
        <input-error v-if="errors.descripcion">{{errors.descripcion[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Logo</form-label>
        <input-image-with-preview :image-default="dameRutaAbsolutaLogo" @logo-subido="elLogo => this.establecimiento.logo = elLogo"/>
        <input-error v-if="errors.logo">{{errors.logo[0]}}</input-error>
      </form-group>
      <button @click.prevent="modificarEstablecimiento" class="btn btn-primary w-100">Modificar mi establecimiento</button>
    </div>
</template>

<script>

import axios from "axios";
import router from "@/router";
import {mapActions, mapState} from "vuex";

import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import TextAreaTinyMce from "@/components/generales/formularios/TextAreaTinyMce.vue";
import InputImageWithPreview from "@/components/generales/formularios/InputImageWithPreview.vue";

export default {
  name: "ModificarEstablecimiento",
  components: {InputImageWithPreview, TextAreaTinyMce, InputControl, InputError, FormLabel, FormGroup},
  data() {
    return {
      establecimiento: {
        nombre: "",
        direccion: "",
        descripcion: "",
        logo: null
      }
    }
  },
  computed: {
    ...mapState([
      "errors", "message"
    ]),
    ...mapState("establecimientos", ["establecimientoAModificar"]),
    dameRutaAbsolutaLogo(){
      return process.env.VUE_APP_BASE_URL + this.establecimientoAModificar.logo;
    },
  },
  mounted() {
    console.log("ModificarEstablecimiento.vue: Entrando al modificar establecimiento");

    this.establecimiento.nombre = this.establecimientoAModificar.nombre;
    this.establecimiento.direccion = this.establecimientoAModificar.direccion;
    this.establecimiento.descripcion = this.establecimientoAModificar.descripcion;

  },
  methods: {
    ...mapActions({
      guardarEstablecimientoAModificar: "establecimientos/guardarEstablecimientoAModificar"
    }),
    modificarEstablecimiento(){
      console.log("ModificarEstablecimiento.vue: Mandando petición de modificar establecimiento...");
      axios.post(process.env.VUE_APP_API_BASE_URL+"establecimientos/"+this.establecimientoAModificar.id,
          {
            _method: "patch",
            nombre: this.establecimiento.nombre,
            direccion: this.establecimiento.direccion,
            descripcion: this.establecimiento.descripcion,
            logo: this.establecimiento.logo
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
      })
          .then(response => {
            console.log("ModificarEstablecimiento.vue: Establecimiento modificado correctamente");
            this.guardarEstablecimientoAModificar(response.data);
            router.push({name:"VerEstablecimiento",params:{id:this.establecimientoAModificar.id}})
          })
          .catch(error => {
            console.log("ModificarEstablecimiento.vue: Error al modificar el establecimiento");
            console.log(error);
          })
    },
  }
}
</script>