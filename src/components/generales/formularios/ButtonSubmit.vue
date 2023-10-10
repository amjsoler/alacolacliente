<template>
  <button @click.prevent="$emit('submitClick')" class="btn btn-primary w-100 mt-3" type="submit">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonSubmit"
}
</script>