<template>
  <div class="program-table" data-test="program-table">
    <h3 class="program-table-title">Program</h3>
    <div
      v-if="store.state.program.program.length"
      v-for="lap in program"
      :key="lap.round"
      class="lap-section"
    >
      <h3 class="lap-title">{{ appendText(lap.round) }} Lap – {{ lap.distance }}m</h3>
      <BaseTable :columns="columns" :data="rows(lap)" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseTable from '@/components/common/BaseTable.vue'
import { appendText } from '../utils/index.js'

const store = useStore()

const program = computed(() => store.state.program.program)

const columns = [
  { key: 'position', label: 'Position' },
  { key: 'name', label: 'Name' },
]

const rows = (lap) => {
  return lap.horses.map((horseId, index) => {
    const horse = store.getters['horses/getHorseById'](horseId)

    return {
      position: index + 1,
      name: horse?.name || '-',
    }
  })
}
</script>

<style scoped>
.program-table-title {
  background-color: var(--color-blue);
  margin: 0;
  font-weight: 600;
  font-size: var(--text-xl);
  text-align: center;
}
.program-table {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 90vh;
}
.lap-title {
  margin: 0;
  font-weight: 600;
  background-color: var(--color-red);
  font-size: var(--text-md);
  text-align: center;
}
</style>
