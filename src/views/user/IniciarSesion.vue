<template>
    <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
      <!-- TODO: maquetar el logo como toca -->
      <div class="w-50">
            <img src="/logo.jpg" class="img-fluid">
        </div>

        <div class="card w-75 border-0">
           <div class="card-body">
               <form>
                   <div class="mb-4">
                       <label class="form-label block font-medium text-sm text-gray-700">Email</label>
                       <input v-model="email" class="form-control block w-full rounded-md shadow-sm" type="email" autofocus />
                     <span v-if="errors.email" class="text-danger small w-100">{{ errors.email[0] }}</span>
                   </div>
                   <div class="mb-5">
                       <label class="form-label block font-medium text-sm text-gray-700">Contraseña</label>
                       <input v-model="password" class="form-control block w-full rounded-md shadow-sm" type="password" autofocus />
                     <span v-if="errors.password" class="text-danger small w-100">{{ errors.password[0] }}</span>
                   </div>

                   <div class="d-grid gap-2 col-12 mx-auto">
                       <button @click.prevent="iniciarSesion" class="btn btn-primary" type="submit">
                           Iniciar Sesión
                       </button>

                     <router-link :to='{name:"RegistrarUsuario"}'>¿No tienes cuenta? Regístrate</router-link>
                   </div>
               </form>
           </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import {mapActions} from "vuex";
import router from "@/router";

export default {
    name:"IniciarSesion",

    data(){
        return {
            email: "",
            password: "",
            errors: [],
            message: ""
        }
    },
  mounted() {
    console.log("IniciarSesion.vue: Entrando al iniciar sesión de IniciarSesion");
  },
  methods: {
      ...mapActions({
        almacenarTokenSesion: "almacenarTokenSesion",
      }),
        iniciarSesion(){
            try{
              console.log("IniciarSesion.vue: Lanzando petición post a login");
                axios.post(process.env.VUE_APP_API_BASE_URL+"login", {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    console.log("IniciarSesion.vue: El servidor ha respondido con un 200");
                  //Almaceno el token en el root state y después lo almaceno en memoria local
                  this.$store.dispatch("almacenarTokenSesion", response.data.access_token);

                  //Una vez tengo el token guardado, redirijo adonde quería ir si hay una página de origen si no a la cuenta de usuario
                  if(router.currentRoute.value.redirectedFrom){
                    console.log("IniciarSesion.vue: redirijo a la página adonde quería ir");
                      router.push(router.currentRoute.value.redirectedFrom);
                  }else{
                    console.log("IniciarSesion.vue: redirijo a la cuenta de usuario");
                      router.push({name:"CuentaUsuario"});
                  }
                })
                    .catch(error => {
                        console.log("IniciarSesion.vue: Error en la petición de inicio de sesión");
                        //Si es un error de validación...
                        if(error.status == 422 && error.response && error.response.data &&
                            error.response.data.errors &&
                            error.response.data.message){
                          console.log("IniciarSesion.vue: es un error de validación, muestro el error que devuelve el servidor");
                          this.errors = error.response.data.errors;
                          this.message = error.response.data.message;
                        }
                        //Si no, muestro un error generico
                        else{
                          console.log("IniciarSesion.vue: Error generico");
                            this.errors.email = [];
                            this.errors.password = ["¿La contraseña es correcta?"];
                        }
                    });
            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>
