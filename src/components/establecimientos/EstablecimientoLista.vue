<template>
  <router-link class="text-decoration-none"
               :to="{name:'VerEstablecimiento', params: {id:establecimiento.id}}">
    <div class="card mb-3">
      <div class="g-0 d-flex">
        <div class="col-4">
          <img :src="dameUrlLogo" class="img-fluid rounded-start" alt="logo">
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">{{ establecimiento.nombre}}</h5>
            <p class="card-text">{{ establecimiento.direccion }}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                {{ establecimiento.usuarios_encolados_count }} usuarios en cola
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "EstablecimientoLista",
  props: ["establecimiento"],
  computed: {
    dameUrlLogo() {
      if(this.establecimiento.logo){
        return process.env.VUE_APP_BASE_URL + this.establecimiento.logo;
      }else{
        return "/no-logo.jpg";
      }
    }
  }
}
</script>