import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

import BuscarEstablecimiento from "@/views/BuscarEstablecimiento.vue";
import MisEstablecimientos from "@/views/MisEstablecimientos.vue";
import LectorQR from "@/views/LectorQR.vue";
import VerEstablecimiento from "@/views/VerEstablecimiento.vue";
import RegistrarUsuario from "@/views/user/RegistrarUsuario.vue";
import IniciarSesion from "@/views/user/IniciarSesion.vue";
import CuentaUsuario from "@/views/user/CuentaUsuario.vue";
import EstablecimientosFavoritos from "@/views/establecimientos/EstablecimientosFavoritos.vue";
import AccionNoAutorizada from "@/views/AccionNoAutorizada.vue";

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
        path: '/mis-establecimientos',
        name: 'MisEstablecimientos',
        component: MisEstablecimientos
    },
    {
        path: '/establecimientos-favoritos',
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
        path: '/no-autorizado',
        name: 'AccionNoAutorizada',
        component: AccionNoAutorizada
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
    //Comprobamos si la ruta de destino precisa autenticación
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log("router/index.js: Redirect con requiresAuth...");
        //Si el token de store y el token de localstorage están establecidos continuo la redirección
        if (store.state.tokenAuth && window.localStorage.getItem("tokenAuth")) {
            console.log("router/index.js: Tenemos token en state y storage por tanto dejo continuar");
            next();
        } else {
            //Si no hay sesión en el state o en el local storage, miro cuál es el que falta y sincronizo ambos
            if(window.localStorage.getItem("tokenAuth")){
                console.log("router/index.js: Tenemos toquen en storage, sincronizo y dejo continuar");
                store.dispatch(
                    "almacenarTokenSesion",
                    window.localStorage.getItem("tokenAuth"));

                next();
            }else{
                if(store.state.tokenAuth){
                    console.log("router/index.js: Tenemos token en state, sincronizo y dejo continuar");
                    window.localStorage.setItem("tokenAuth", store.state.tokenAuth);
                }else{
                    console.log("router/index.js: No había token en ningún sitio, redirijo al login");
                    //Si ninguna de las dos fuentes tiene el token, redirijo al inicio de sesión
                    next({name: "IniciarSesion"});
                }
            }
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
                console.log("router/index.js: He encontrado algún token, redirijo al perfil");
                //Si no, redirijo a la cuenta de usuario
                next({name: "CuentaUsuario"});
            }
        } else {
            console.log("router/index.js: La ruta destino no tiene ningun requisito, dejo continuar");
            next();
        }
    }
});

export default router
