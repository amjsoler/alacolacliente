<template>
    <div class="w-75 mx-auto">
      <form-group>
        <form-label>Nombre</form-label>
        <input-control type="text" v-model="nombre" />
        <input-error v-if="errors.nombre">{{errors.nombre[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Logo</form-label>
        <input type="file" class="file" />
        <input-error v-if="errors.logo">{{errors.logo[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Dirección</form-label>
        <input-control v-model="direccion" type="text" />
        <input-error v-if="errors.direccion">{{errors.direccion[0]}}</input-error>
      </form-group>
      <form-group>
        <form-label>Descripción</form-label>
        <textarea v-model="descripcion"></textarea>
        <input-error v-if="errors.descripcion">{{errors.descripcion[0]}}</input-error>
      </form-group>
      <button @click.prevent="crearEstablecimiento" class="btn btn-primary w-100">Crear mi establecimiento</button>
    </div>
</template>

<script>
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import axios from "axios";
import router from "@/router";
import {mapState} from "vuex";

export default {
  name: "CrearEstablecimiento",
  components: {InputControl, InputError, FormLabel, FormGroup},
  data() {
    return {
      nombre: "",
      logo: "",
      direccion: "",
      descripcion: "",
      geolocalizacionActiva: false,
      latitud: "",
      longitud: "",
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
      axios.post(process.env.VUE_APP_API_BASE_URL+"establecimientos",
          {
            nombre:this.nombre,
            direccion:this.direccion,
            descripcion:this.descripcion,
          })
          .then(response => {
            console.log("CrearEstablecimiento.vue: Establecimiento creado crrectamente, redirigiendo al nuevo establecimiento");
            router.push({name:"VerEstablecimiento",params:{id:response.data.id}})
          })
          .catch(error => {
            console.log("CrearEstablecimiento.vue: Error al crear el establecimiento");
            console.log(error);
          })
    }
  }
}
</script>