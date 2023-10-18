<template>
  <input type="file" class="invisible" id="inputLogo" @change="imagenSubida"/>
  <div class="d-flex justify-content-center">
    <img :src="urlAux" class="img-fluid cursor-pointer" onclick="document.getElementById('inputLogo').click()">
  </div>
</template>

<script>
export default {
  name: "InputImageWithPreview",
  props: ["imageDefault"],
  emits: ["logoSubido"],
  data() {
    return {
      urlAux: null,
    }
  },
  mounted() {
    if(this.imageDefault){
      this.urlAux = this.imageDefault;
    }else{
      this.urlAux = "/no-logo.jpg";
    }
  },
  methods: {
    imagenSubida(e) {
      const file = e.target.files[0];
      this.urlAux = URL.createObjectURL(file);
      this.$emit("logoSubido", file);
    }
  }
}
</script>