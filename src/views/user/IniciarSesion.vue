<template>
    <div-centro-pantalla>
      <div class="w-50">
        <img src="/login.png" class="img-fluid login-logo">
      </div>

      <FormCard>
        <form>
          <form-group>
            <form-label>Correo electrónico</form-label>
            <input-control type="email" v-model="email" />
            <input-error v-if="errors.email">{{ errors.email[0] }}</input-error>
          </form-group>
          <form-group>
            <form-label>Contraseña</form-label>
            <input-control type="password" v-model="password" />
            <input-error v-if="errors.password">{{ errors.password[0] }}</input-error>
          </form-group>
          <button-submit @submit-click="iniciarSesion">Iniciar Sesión</button-submit>
          <router-link :to='{name:"RecordarContrasena"}' class="text-decoration-none text-center w-100 d-block mt-4">
            Recordar contraseña
          </router-link>
          <router-link :to='{name:"RegistrarUsuario"}' class="text-decoration-none text-center mt-1 w-100 d-block">¿No tienes
            cuenta? Regístrate
          </router-link>
        </form>
      </FormCard>
    </div-centro-pantalla>
</template>

<script>

import axios from "axios";
import {mapActions, mapState} from "vuex";
import router from "@/router";

import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import FormCard from "@/components/generales/formularios/FormCard.vue";
import InputControl from "@/components/generales/formularios/InputControl.vue";
import InputError from "@/components/generales/formularios/InputError.vue";
import FormGroup from "@/components/generales/formularios/FormGroup.vue";
import DivCentroPantalla from "@/components/generales/DivCentroPantalla.vue";
import ButtonSubmit from "@/components/generales/formularios/ButtonSubmit.vue";

export default {
    name: "IniciarSesion",
    components: {ButtonSubmit, DivCentroPantalla, FormGroup, InputError, InputControl, FormCard, FormLabel},

    data() {
        return {
            email: "",
            password: "",
        }
    },
  computed: {
      ...mapState(["errors", "message"]),
  },
    mounted() {
        console.log("IniciarSesion.vue: Entrando al iniciar sesión de IniciarSesion");
    },
    methods: {
        ...mapActions({
            almacenarTokenSesion: "almacenarTokenSesion",
        }),
        iniciarSesion() {
            try {
                console.log("IniciarSesion.vue: Lanzando petición post a login");
                axios.post(process.env.VUE_APP_API_BASE_URL + "login", {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    console.log("IniciarSesion.vue: El servidor ha respondido con un 200");
                    //Almaceno el token en el root state y después lo almaceno en memoria local
                    this.$store.dispatch("almacenarTokenSesion", response.data.access_token);

                    //Una vez tengo el token guardado, redirijo adonde quería ir si hay una página de origen si no a la cuenta de usuario
                    if (router.currentRoute.value.redirectedFrom) {
                        console.log("IniciarSesion.vue: redirijo a la página adonde quería ir");
                        router.push(router.currentRoute.value.redirectedFrom);
                    } else {
                        console.log("IniciarSesion.vue: redirijo a la cuenta de usuario");
                        router.push({name: "CuentaUsuario"});
                    }
                })
                    .catch(error => {
                        console.log("IniciarSesion.vue: Error en la petición de inicio de sesión");
                        //Si es un error de validación...
                        if (error.response && error.response.status != 422) {
                          console.log("IniciarSesion.vue: Error generico");
                          this.errors.email = [];
                          this.errors.password = ["¿La contraseña es correcta?"];
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>