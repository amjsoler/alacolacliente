<template>
  <input :type="type"
         :value="modelValue"
         @keyup="$emit('update:modelValue', $event.target.value)"
         class="form-control block w-full rounded-md shadow-sm" />
</template>

<script>
export default {
  name:"InputControl",
  props: ["type", "modelValue"],
  emits: ["update:modelValue"]
}
</script>