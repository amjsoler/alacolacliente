<template>
  <editor
      v-model="content"
      api-key="eak771xf3qwmkwezluldm6jjbvf5jwmbukprayz16q2o9qrq"
      :init="{
        menubar: false,
        toolbar: 'bold italic | alignleft aligncenter alignright',
        statusbar: false,
        plugins: ''
      }"
  />
</template>

<script>

import Editor from '@tinymce/tinymce-vue'

export default {
  name: "TextAreaTinyMce",
  components: {Editor},
  data: function () {
    return {
      content: this.value // default to the passed value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    update: function () {
      // pass updated content back to the parent
      this.$emit('input', this.content);
    }
  }
}
</script>