<template>
    <nav class="nav navbar fixed-bottom bg-white border-top h-15 d-flex flex-row">
        <router-link :to="{name: 'BuscarEstablecimiento'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">search</span>
            <span class="fuente-menu">Buscar</span>
        </router-link>
        <router-link :to="{name: 'MisEstablecimientos'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">store</span>
            <span class="fuente-menu">Mis establecimientos</span>
        </router-link>
        <router-link :to="{name: 'EstablecimientosFavoritos'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">favorite</span>
            <span class="fuente-menu">Favoritos</span>
        </router-link>
        <router-link :to="{name: 'CuentaUsuario'}"
                     class="d-block w-100 text-center text-decoration-none text-secondary">
            <span class="material-symbols-outlined w-100 icono">account_circle</span>
            <span class="fuente-menu">Perfil</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "MenuInferior"
}
</script>