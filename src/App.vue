<template>
    <router-view></router-view>
    <menu-inferior></menu-inferior>
  <toast-info />
</template>

<script>

  import MenuInferior from "@/components/generales/MenuInferior.vue";
  import ToastInfo from "@/components/generales/toasts/ToastApp.vue";

  export default {
    name: "App",
    components: {ToastInfo, MenuInferior},
  }
</script>