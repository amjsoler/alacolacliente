<template>
  <div class="toast-container position-fixed d-flex justify-content-center bottom-0 w-100">
    <div id="toastApp" class="toast align-items-center"
         :class="dameTipoToast"
         role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{toastApp.mensaje}}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>

</template>

<script>

import {mapState} from "vuex";

export default {
  name: "ToastApp",
  computed: {
     ...mapState(["toastApp"]),
    dameTipoToast() {
       switch(this.toastApp.tipo){
         case "default":
           return "text-bg-primary";
         case "success":
           return "text-bg-success";
         case "danger":
           return "text-bg-danger";

         default:
           return "text-bg-success";
       }
    }
  }
}
</script>