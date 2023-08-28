<template lang="">
  <div class="w-full flex flex-row items-center gap-3">
    <slot name="startIcon"> </slot>
    <input
      :id="props.id"
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
      v-on:keyup.enter="handlekeyPress"
    />
    <slot name="endIcon"></slot>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["onPressEnter"]);

const props = defineProps<{
  type?: "email" | "password" | "text";
  id?: string;
  placeholder?: string;
  label?: string;
  class?: string;
  modelValue?: string;
  disabled?: boolean;
}>();

const handlekeyPress = (event: any) => {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    emit("onPressEnter", event.target.value);
  }
};
</script>

<style lang=""></style>
