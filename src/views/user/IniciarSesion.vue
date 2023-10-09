<template>
    <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <div class="w-50">
            <img src="/login.png" class="img-fluid login-logo">
        </div>

        <FormCard>
            <form>
                <div class="mb-4">
                    <FormLabel>Correo electrónico</FormLabel>
                    <input v-model="email" class="form-control block w-full shadow-sm" type="email" autofocus/>
                    <span v-if="errors.email" class="text-danger small w-100">{{ errors.email[0] }}</span>
                </div>
                <div class="mb-5">
                    <FormLabel>Contraseña</FormLabel>
                    <input v-model="password" class="form-control block w-full shadow-sm" type="password"
                           autofocus/>
                    <span v-if="errors.password" class="text-danger small w-100">{{ errors.password[0] }}</span>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                    <button @click.prevent="iniciarSesion" class="btn btn-primary" type="submit">
                        Iniciar Sesión
                    </button>

                    <router-link :to='{name:"RecordarContrasena"}' class="text-decoration-none text-center w-100 mt-4">
                        Recordar contraseña
                    </router-link>
                    <router-link :to='{name:"RegistrarUsuario"}' class="text-decoration-none text-center mt-1">¿No tienes
                        cuenta? Regístrate
                    </router-link>
                </div>
            </form>
        </FormCard>
    </div>
</template>

<script>

import axios from "axios";
import {mapActions} from "vuex";
import router from "@/router";

import FormLabel from "@/components/generales/formularios/FormLabel.vue";
import FormCard from "@/components/generales/formularios/FormCard.vue";

export default {
    name: "IniciarSesion",
    components: {FormCard, FormLabel},

    data() {
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
                        if (error.response && error.response.status == 422 && error.response.data &&
                            error.response.data.errors &&
                            error.response.data.message) {
                            console.log("IniciarSesion.vue: es un error de validación, muestro el error que devuelve el servidor");
                            this.errors = error.response.data.errors;
                            this.message = error.response.data.message;
                        }
                        //Si no, muestro un error generico
                        else {
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