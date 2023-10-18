<template>
  <editor
      v-model="content"
      api-key="eak771xf3qwmkwezluldm6jjbvf5jwmbukprayz16q2o9qrq"
      :init="{
        menubar: false,
        toolbar: 'bold italic | alignleft aligncenter alignright',
        statusbar: false,
        plugins: '',
      }"
      :disabled="dameDisabled"
  />
</template>

<script>

import Editor from '@tinymce/tinymce-vue'

export default {
  name: "TextAreaTinyMce",
  components: {Editor},
  data: function () {
    return {
      content: this.value, // default to the passed valu
    }
  },
  computed: {
    dameDisabled() {
      if(this.disabled){
        return true;
      }else{
        return false;
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {},
  },
  methods: {
    update: function () {
      // pass updated content back to the parent
      this.$emit('input', this.content);
    }
  }
}
</script>

<style>
.tox-tinymce--disabled .tox-editor-header{
  display: none;
}
</style>