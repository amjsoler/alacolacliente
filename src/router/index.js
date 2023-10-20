import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

import BuscarEstablecimiento from "@/views/establecimientos/BuscarEstablecimiento.vue";
import MisEstablecimientos from "@/views/establecimientos/MisEstablecimientos.vue";
import LectorQR from "@/views/LectorQR.vue";
import VerEstablecimiento from "@/views/establecimientos/VerEstablecimiento.vue";
import RegistrarUsuario from "@/views/user/RegistrarUsuario.vue";
import IniciarSesion from "@/views/user/IniciarSesion.vue";
import CuentaUsuario from "@/views/user/CuentaUsuario.vue";
import EstablecimientosFavoritos from "@/views/establecimientos/EstablecimientosFavoritos.vue";
import AccionNoAutorizada from "@/views/AccionNoAutorizada.vue";
import RecordarContrasena from "@/views/user/RecordarContrasena.vue";
import CrearEstablecimiento from "@/views/establecimientos/CrearEstablecimiento.vue";
import globalHelpers from "@/helpers/globalHelpers.vue";
import ModificarEstablecimiento from "@/views/establecimientos/ModificarEstablecimiento.vue";
import VerificarCuenta from "@/views/user/VerificarCuenta.vue";

//Las rutas de la aplicación
const routes = [
    {
        path: '/',
        name: 'BuscarEstablecimiento',
        component: BuscarEstablecimiento
    },
    {
        path: '/establecimientos/:id',
        name: 'VerEstablecimiento',
        component: VerEstablecimiento
    },
    {
        path: '/establecimientos/crear',
        name: 'CrearEstablecimiento',
        component: CrearEstablecimiento
    },
    {
        path: '/establecimientos/modificar',
        name: 'ModificarEstablecimiento',
        component: ModificarEstablecimiento,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/mis-establecimientos',
        name: 'MisEstablecimientos',
        component: MisEstablecimientos,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/establecimientos/favoritos',
        name: 'EstablecimientosFavoritos',
        component: EstablecimientosFavoritos
    },
    {
        path: '/lector-qr',
        name: 'LectorQR',
        component: LectorQR
    },
    {
        path: '/cuenta-usuario',
        name: 'CuentaUsuario',
        meta: {
            requiresAuth: true
        },
        component: CuentaUsuario,
    },
    {
        path: '/iniciar-sesion',
        name: 'IniciarSesion',
        meta: {
            requiresGuest: true
        },
        component: IniciarSesion
    },
    {
        path: '/registrarse',
        name: 'RegistrarUsuario',
        meta: {
            requiresGuest: true
        },
        component: RegistrarUsuario
    },
    {
        path: '/recordar-contrasena',
        name: 'RecordarContrasena',
        meta: {
            requiresGuest: true
        },
        component: RecordarContrasena
    },
    {
        path: '/no-autorizado',
        name: 'AccionNoAutorizada',
        component: AccionNoAutorizada
    },
    {
        path: '/verificar-cuenta',
        name: 'VerificarCuenta',
        component: VerificarCuenta
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

/*
* En cada redirección, se comprueba si la ruta de destino tiene algún guard:
* requiresAuth: La ruta de destino obliga a estar autenticado para poder acceder
* requiresGuest: La ruta de destino obliga a no estar logueado para poder acceder
*/
router.beforeEach((to, from, next) => {
    //Vacio el global state de validaciones
    vaciarValidaciones();

    //Cierro modales que puedan quedar abiertos
    globalHelpers.cerrarTodosLosModalesAbiertos();

    //Comprobamos si la ruta de destino precisa autenticación
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log("router/index.js: Redirect con requiresAuth...");
        //Primero sincronizo tokens
        sincronizarTokens();
        //Si el token de store y el token de localstorage están establecidos continuo la redirección
        if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth") &&
        store.state.tokenAuth == window.localStorage.getItem("tokenAuth")) {
            console.log("router/index.js: Tenemos token en state y storage por tanto dejo continuar");
            next();
        } else {
            console.log("router/index.js: No había token, redirijo al login");
            //Si ninguna de las dos fuentes tiene el token, redirijo al inicio de sesión
            next({name: "IniciarSesion"});
        }
    } else {
        //Compruebo si la ruta precisa acceder como invitado
        if (to.matched.some((record) => record.meta.requiresGuest)) {
            console.log("router/index.js: Redirect con requiresGuest...");
            //Si ninguna de las dos fuentes tiene el token, estoy como invitado, así que prosigo
            if (!store.state.tokenAuth && !window.localStorage.getItem("tokenAuth")) {
                console.log("router/index.js: No hay toquen en ningun sitio, dejo continuar porque es invitado.");
                next();
            } else {
                sincronizarTokens();
                console.log("router/index.js: He encontrado algún token, redirijo al perfil");
                //Si no, redirijo a la cuenta de usuario
                next({name: "CuentaUsuario"});
            }
        } else {
            sincronizarTokens();
            console.log("router/index.js: La ruta destino no tiene ningun requisito, dejo continuar");
            next();
        }
    }
});

function vaciarValidaciones() {
    store.commit("almacenarArrayErrores", []);
    store.commit("almacenarMensaje", "");
}

function sincronizarTokens(){
    if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth")) {
        if (store.state.tokenAuth != window.localStorage.getItem("tokenAuth")) {
            //Si hay token en las dos fuentes pero son distintos, borro
            store.state.tokenAuth = "";
            window.localStorage.removeItem("tokenAuth");
        }
    }else{
        if(store.state.tokenAuth){
            window.localStorage.setItem(store.state.tokenAuth);
        }else{
            if (window.localStorage.getItem("tokenAuth")) {
                store.dispatch("almacenarTokenSesion", window.localStorage.getItem("tokenAuth"));
            }
        }
    }
}

export default router
