<template>
  <div class="horse-runner" :style="{ left: left + '%' }">
    <HorseIcon :color="horse.color" :size="36" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import HorseIcon from '@/components/icons/HorseIcon.vue'

const props = defineProps({
  horse: {
    type: Object,
    required: true,
  },
  finishPercent: {
    type: Number,
    default: 100,
  },
})

const store = useStore()

const progress = computed(() => {
  return store.state.race.progress[props.horse.id] || 0
})

const left = computed(() => {
  return (progress.value * props.finishPercent) / 100
})
</script>

<style scoped>
.horse-runner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scaleX(-1);
  transition: left 0.05s linear;
}
</style>
