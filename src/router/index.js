import {createRouter, createWebHistory} from 'vue-router'

import BuscarEstablecimiento from "@/views/BuscarEstablecimiento.vue";
import MisEstablecimientos from "@/views/MisEstablecimientos.vue";
import CuentaUsuario from "@/views/CuentaUsuario.vue";
import LectorQR from "@/views/LectorQR.vue";
import VerEstablecimiento from "@/views/VerEstablecimiento.vue";
import RegistrarUsuario from "@/views/user/RegistrarUsuario.vue";
import store from "@/store";
import IniciarSesion from "@/views/user/IniciarSesion.vue";

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
        component: LectorQR
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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.tokenAuth) {
            //Si ya hay sesíon prosigo
            next();
        } else {
            //Si no hay sesión en el state, miro si hay token en memoria local
            if(window.localStorage.getItem("tokenAuth")){
                store.dispatch(
                    "almacenarTokenSesion",
                    window.localStorage.getItem("tokenAuth"));

                next();
            }else{
                next({name: "IniciarSesion"});
            }
        }
    } else {
        if (to.matched.some((record) => record.meta.requiresGuest)) {
            if (!store.state.tokenAuth) {
                next();
            } else {
                next({name: "CuentaUsuario"});
            }
        } else {
            next();
        }
    }
});

export default router
