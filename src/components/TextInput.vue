<template lang="">
  <input
    :class="`px-4 py-2 rounded-md outline-none text-xs border-2 border-gray-400 focus:border-blue-400 ${props?.class}`"
    :type="props?.type || 'text'"
    :placeholder="props?.placeholder || 'Enter keyword here ...'"
    :label="props?.label || 'Keyword'"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  type?: "email" | "password" | "text";
  placeholder?: string;
  label?: string;
  class?: string;
}>();
</script>

<style lang=""></style>
