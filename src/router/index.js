import { createRouter, createWebHistory } from 'vue-router'

import BuscarEstablecimiento from "@/views/BuscarEstablecimiento.vue";
import MisEstablecimientos from "@/views/MisEstablecimientos.vue";
import CuentaUsuario from "@/views/CuentaUsuario.vue";
import LectorQR from "@/views/LectorQR.vue";

const routes = [
  {
    path: '/',
    name: 'BuscarEstablecimiento',
    component: BuscarEstablecimiento
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
    component: CuentaUsuario
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
