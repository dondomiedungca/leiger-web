<template lang="">
  <div class="w-full flex flex-row items-center gap-3">
    <slot name="startIcon"> </slot>
    <input
      autocomplete="off"
      :readonly="disabled"
      :class="`px-4 py-2 rounded-md outline-none text-xs ${
        disabled
          ? 'border-0 border-gray-400 focus:border-gray-400 focus:ring-0'
          : 'border-2 border-gray-400 focus:border-blue-400'
      } ${props?.class}`"
      :type="props?.type || 'text'"
      :placeholder="props?.placeholder || 'Enter keyword here ...'"
      :label="props?.label || 'Keyword'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot name="endIcon"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type?: "email" | "password" | "text";
  placeholder?: string;
  label?: string;
  class?: string;
  modelValue?: string;
  disabled?: boolean;
}>();
</script>

<style lang=""></style>
