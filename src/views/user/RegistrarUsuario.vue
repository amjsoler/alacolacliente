<template>
  <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
    <div class="card w-75 border-0">
      <div class="card-body">
        <form>
          <div class="mb-5">
            <FormLabel>Nombre</FormLabel>
            <input v-model="name" class="form-control block w-full rounded-md shadow-sm" type="text" autofocus />
            <span v-if="errors.name" class="text-danger small w-100">{{ errors.name[0] }}</span>
          </div>
          <div class="mb-5">
            <FormLabel>Correo electrónico</FormLabel>
            <input v-model="email" class="form-control block w-full rounded-md shadow-sm" type="email" autofocus />
            <span v-if="errors.email" class="text-danger small w-100">{{ errors.email[0] }}</span>
          </div>
          <div class="mb-5">
            <FormLabel>Contraseña</FormLabel>
            <input v-model="password" class="form-control block w-full rounded-md shadow-sm" type="password" autofocus />
            <span v-if="errors.password" class="text-danger small w-100">{{ errors.password[0] }}</span>
          </div>
          <div class="mb-5">
            <FormLabel>Repetir contraseña</FormLabel>
            <input v-model="password_confirmation" class="form-control block w-full rounded-md shadow-sm" type="password" autofocus />
            <span v-if="errors.password_confirmation" class="text-danger small w-100">{{ errors.password_confirmation[0] }}</span>
          </div>

          <div class="d-grid gap-2 col-12 mx-auto">
            <button @click.prevent="enviarFormularioRegistro" class="btn btn-primary" type="submit">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

import FormLabel from "@/components/generales/formularios/FormLabel.vue";

export default {
    name:"RegistrarUsuario",
  components: {FormLabel},

  data() {
      return {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors:[],
        message:"",
      }
  },
  mounted() {
        console.log("RegistrarUsuario.vue: Entrando a la vista de RegistrarUsuario");
  },
  methods: {
      enviarFormularioRegistro(){
        try{
          console.log("RegistrarUsuario.vue: Mandando petición al registro del servidor");
          axios.post(process.env.VUE_APP_API_BASE_URL+"register",{
            "name":this.name,
            "email":this.email,
            "password":this.password,
            "password_confirmation":this.password_confirmation
          })
              .then(response => {
                console.log("RegistrarUsuario.vue: Respuesta OK a la peticiión de registro");

                this.$store.dispatch("almacenarTokenSesion", response.data.access_token);

                //Una vez tengo el token guardado, redirijo adonde quería ir
                if(router.currentRoute.value.redirectedFrom){
                  router.push(router.currentRoute.value.redirectedFrom);
                }else{
                  router.push({name:"CuentaUsuario"});
                }
              })
              .catch(error => {
                console.log("RegistrarUsuario.vue: Resputa KO a la petición de registro");
                //Si es un error de validación...
                if(error.response && error.response.data &&
                    error.response.data.errors &&
                    error.response.data.message){
                  this.errors = error.response.data.errors;
                  this.message = error.response.data.message;
                }
                //Si no, muestro un error generico
                else{
                  this.errors.email = [];
                  this.errors.password = ["¿La contraseña es correcta?"];
                }
              })
        }catch(error){
          console.log("RegistrarUsuario.vue: Error al intentar dar de alta los datos del usuario");
        }
      }
  }
}
</script>
