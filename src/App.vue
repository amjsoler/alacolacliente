<template>
    <router-view></router-view>
    <menu-inferior></menu-inferior>
</template>

<script>

  import MenuInferior from "@/components/generales/MenuInferior.vue";

  export default {
    name: "App",
    components: {MenuInferior},
  }
</script>