<template>
  <div>
    <div class="form-check form-switch align-items-center d-flex">
      <input @click="incluirPosicionamientoPulsado" class="form-check-input me-3" type="checkbox" :checked="defaultActive" role="switch" id="checkposicionamiento">
      <label class="form-check-label" for="flexSwitchCheckDefault">Incluir posicionamiento del establecimiento</label>
    </div>
    <GoogleMap
        v-if="center.lat"
        api-key="AIzaSyC2lM3wQfB-uMKK-EZgH9zO60oc_4LciO4"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="15">
      <Marker :options="{ position: center, draggable: true }" @dragend="data => markDragged(data)" />
    </GoogleMap>
  </div>
</template>

<script>
import {GoogleMap, Marker} from "vue3-google-map";

export default {
  props: ["posicionamiento_prop", "defaultActive"],
  emits: ["update:posicionamiento"],
  components: { GoogleMap, Marker },
  data() {
    return {
      center: this.posicionamiento_prop
    }
  },
  methods: {
    markDragged(data) {
      this.center.lat = data.latLng.lat (lat => lat);
      this.center.lng = data.latLng.lng (lng => lng);

      this.$emit('update:posicionamiento', this.center);
    },
    incluirPosicionamientoPulsado() {
        if(document.getElementById("checkposicionamiento").checked){
          this.buscarEstablecimientosCercanos();
        }else{
          this.center.lat = "";
          this.center.lng = "";

          this.$emit('update:posicionamiento', this.center);
        }
    },
    buscarEstablecimientosCercanos() {
      const opcionesDeSolicitud = {
        enableHighAccuracy: true, // Alta precisión
        maximumAge: 0, // No queremos caché
        timeout: 5000 // Esperar solo 5 segundos
      };

      navigator.geolocation.getCurrentPosition(ubicacion => {
        const latitud = ubicacion.coords.latitude;
        const longitud = ubicacion.coords.longitude;

        this.center.lat = latitud;
        this.center.lng = longitud;

        this.$emit('update:posicionamiento', this.center);
      }, error => {
        console.error(error);
      }, opcionesDeSolicitud);
    },
  }
}
</script>