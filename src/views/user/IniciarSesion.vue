<template>
    <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <div>
            Logo
        </div>

        <div class="card w-75">
           <div class="card-body">
               <span v-if="message" class="text-danger small w-100">{{ message }}</span>
               <form>
                   <div class="mb-4">
                       <label class="form-label block font-medium text-sm text-gray-700">Email</label>
                       <input v-model="email" class="form-control block w-full rounded-md shadow-sm" type="email" autofocus />
                   </div>
                   <div class="mb-5">
                       <label class="form-label block font-medium text-sm text-gray-700">Contraseña</label>
                       <input v-model="password" class="form-control block w-full rounded-md shadow-sm" type="password" autofocus />
                   </div>

                   <div class="d-grid gap-2 col-12 mx-auto">
                       <button @click.prevent="iniciarSesion" class="btn btn-primary" type="submit">
                           Iniciar Sesión
                       </button>
                   </div>
               </form>
           </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";

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
    methods: {
        iniciarSesion(){
            try{
                axios.post("http://localhost:8000/api/login", {
                    email: this.email,
                    password: this.password
                }).then(response => console.log("Respuesta login: " + response.data))
                    .catch(error => {
                        console.log(error.response.data);
                        this.errors = error.response.data.errors;
                        this.message = error.response.data.message;
                    });


            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>
