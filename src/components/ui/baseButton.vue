<template>
  <button class="base-button" :class="variantClass" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: var(--color-gray);
  color: var(--color-black);
}

.base-button:hover:not(:disabled) {
  background-color: var(--color-dark-gray);
  color: var(--color-black);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
