<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore()
const isRacing = computed(() => store.state.race.isRacing)

const generateProgram = async () => {
  store.commit('race/RESET_RACE')
  await store.dispatch('program/generateProgram')
}

const startRace = () => {
  if (isRacing.value) return
  store.dispatch('race/startRace')
}

const hasProgram = computed(() => {
  return store.state.program.program?.length > 0
})
</script>

<template>
  <header class="header" data-test="header">
    <h1 class="title">🐎 Horse Racing</h1>
    <div class="actions">
      <BaseButton @click="generateProgram" data-test="generate-program-btn">
        Generate Program
      </BaseButton>
      <BaseButton :disabled="isRacing || !hasProgram" @click="startRace" data-test="start-race-btn">
        Start
      </BaseButton>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-purple);
  padding: 4px 8px;
}

h1 {
  margin: 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (max-width: 576px) {
  .header {
    flex-direction: column;
  }
}
</style>
